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
        case 'POST':
            return registerUser( req, res );
        default:
            return res.status(405).json({ message: 'Method not allowed' });
    };

}

const registerUser = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {
    
    const { email = '', password = '', name = '' } = req.body;
    
    if ( password.length < 4 ) {
        return res.status(401).json({ message: 'Password must be at least 4 characters' });
    }
    
    if ( name.length < 2 ) {
        return res.status(401).json({ message: 'Name must be at least 2 characters' });
    }
    
    
    await db.connect();
    const user = await User.findOne({ email });
    
    if ( user ) {
        await db.disconnect();
        return res.status(401).json({ message: 'User already exists' });
    }

    const newUser = new User({ 
        email: email.toLowerCase(),
        password: bcrypt.hashSync( password ),
        role: "client",
        name,
    });
    
    try {
        await newUser.save({ validateBeforeSave: true });
        await db.disconnect();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error creating user' });   
    }

    const { _id, role } = newUser;

    const token = jwt.generateToken( _id!, email );

    return res.status(200).json({
        token,
        user: {
            name,
            email,
            role
        }
    })
}