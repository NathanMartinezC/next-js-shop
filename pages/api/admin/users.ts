import type { NextApiRequest, NextApiResponse } from 'next'
import { IUser } from '@/interfaces';
import { db } from '@/database';
import { User } from '@/models';
import { isValidObjectId } from 'mongoose';

type Data = 
| { message: string }
| IUser[]


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    switch (req.method) {
        case 'GET':
            return getUsers(req, res);
        case 'PUT':
            return updateUser(req, res);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

const getUsers = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    await db.connect();
    const users = await User.find({}).select('-password');
    await db.disconnect();

    return res.status(200).json(users);
}

const updateUser = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { userId = '', role = '' } = req.body;
    if ( !isValidObjectId(userId) ) return res.status(400).json({ message: 'Invalid user id' });

    const validRoles = ['admin', 'super-user', 'SEO'];
    if ( !validRoles.includes(role) ) return res.status(400).json({ message: 'Invalid role' });

    await db.connect();
    const user = await User.findById( userId );

    if ( !user ) {
        await db.disconnect();
        return res.status(404).json({ message: 'User not found' });
    }

    user.role = role;
    await user.save();
    await db.disconnect();
    
    return res.status(200).json({ message: 'User updated' });
}

