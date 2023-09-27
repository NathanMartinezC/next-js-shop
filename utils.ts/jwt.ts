import jwt from 'jsonwebtoken';

export const generateToken = (_id: string, email: string) => {
    if (!process.env.JWT_SECRET_SEED) {
        throw new Error('JWT_SECRET is not defined');
    }

    return jwt.sign({ _id, email }, process.env.JWT_SECRET_SEED, {
        expiresIn: '30d',
    });
};


export const isJWTValid = (token: string):Promise<string> => {
    if (!process.env.JWT_SECRET_SEED) {
        throw new Error('JWT_SECRET is not defined');
    }

    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
                if (err) return reject(err);
                const { _id } = payload as { _id: string };
                resolve(_id);
            });
        } catch (error) {
            reject(error);
        }
    });
};