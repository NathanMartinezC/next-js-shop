import { FC, useReducer, PropsWithChildren, useEffect } from 'react';
import { IUser } from '@/interfaces';
import Cookies from 'js-cookie';
import { AuthContext, authReducer } from './';
import { shopApi } from '@/api';
import axios from 'axios';
import { useRouter } from 'next/router';


export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
    const router = useRouter();

    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = async() => {

        if ( !Cookies.get('token') ) return;

        try {
            const { data } = await shopApi.get('/user/validate-token');
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({ type:'[Auth] - Login', payload: user });
        } catch (error) {
            Cookies.remove('token');
        }
    }

    const loginUser = async( email: string, password: string ): Promise<boolean> => {
        try {
            const { data } = await shopApi.post('/user/login', { email, password });
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({ type:'[Auth] - Login', payload: user });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    const registerUser = async( name: string, email: string, password: string ): Promise<{ hasError: boolean; message?: string }> => {
        try {
            const { data } = await shopApi.post('/user/register', { name, email, password });
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({ type:'[Auth] - Login', payload: user });
            return {
                hasError: false,
                message: 'User registered successfully'
            }
        } catch (error) {
            if ( axios.isAxiosError(error) ) {
                return {
                    hasError: true,
                    message: error.response?.data.message || 'Error registering user'
                }
            }
            return {
                hasError: true,
                message: 'Error registering user'
            }
        }
    }

    const logout = () => {
        Cookies.remove('token');
        Cookies.remove('cart');
        router.reload();
    }

    return (
        <AuthContext.Provider value={{ 
            ...state,
            loginUser,
            registerUser,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    );
};
