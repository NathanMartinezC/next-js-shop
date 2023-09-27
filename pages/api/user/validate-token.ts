import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { db } from '@/database';
import { User } from '@/models';
import { jwt } from '@/utils.ts';

type Data = 
| { message: string }
| {
    token: string;
    user: {
        name: string;
        email: string;
        role: string;
    }
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    
    switch ( req.method ) {
        case 'GET':
            return checkJWT( req, res );
        default:
            return res.status(405).json({ message: 'Method not allowed' });
    };

}

const checkJWT = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {
    
    const { token = '' } = req.cookies;

    let userId = '';

    try {
        userId = await jwt.isJWTValid( token );
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    await db.connect();
    const user = await User.findById({ userId }).lean();
    await db.disconnect();

    if (!user) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    const { email, role, name, _id } = user;

    return res.status(200).json({
        token: jwt.generateToken( _id!, email ),
        user: {
            name,
            email,
            role
        }
    })
}