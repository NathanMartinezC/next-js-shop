import bcrypt from 'bcryptjs';
import { db } from '@/database';
import { User } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next';

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
        case 'POST':
            return loginUser( req, res );
        default:
            return res.status(405).json({ message: 'Method not allowed' });
    };

}

const loginUser = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {
    
    const { email = '', password = '' } = req.body;

    await db.connect();
    const user = await User.findOne({ email });
    await db.disconnect();

    if ( !user ) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    if ( !bcrypt.compareSync( password, user.password! ) ) {
        return res.status(401).json({ message: 'Invalid password' });
    }

    const { role, name } = user;

    return res.status(200).json({
        token: '123',
        user: {
            name,
            email,
            role
        }
    })
}