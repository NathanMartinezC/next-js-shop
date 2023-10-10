import bcrypy from 'bcryptjs';
import { User } from '@/models';
import { db } from './';

export const checkUserEmailPassword = async (email: string, password: string) => {
    await db.connect();
    const user = await User.findOne({ email });
    await db.disconnect();

    if (!user) return null;

    if ( !bcrypy.compareSync(password, user.password!) ) return null;

    const { role, name, _id } = user;

    return {
        id: _id,
        _id,
        role,
        name,
        email
    }
}

export const OAuthToDBUser = async ( OAuthEmail: string, OAuthName: string ) => {
    await db.connect();
    const user = await User.findOne({ email: OAuthEmail });

    if ( user ) {
        await db.disconnect();
        const { _id, role, name, email } = user;
        return {
            id: _id,
            _id,
            role,
            name,
            email
        }
    }

    const newUser = new User({
        name: OAuthName,
        email: OAuthEmail,
        password: 'OAuth',
        role: 'client'
    });
    await newUser.save();
    await db.disconnect();

    const { _id, role, name, email } = newUser;
    return {
        id: _id,
        _id,
        role,
        name,
        email
    }
}