import { useSession, signOut } from 'next-auth/react';
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
    const { data, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'authenticated') {
            console.log(data);
            dispatch({ type:'[Auth] - Login', payload: data?.user as IUser });
        }
    }, [data, status]);
    
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
        Cookies.remove('cart');
        Cookies.remove('firstName');
        Cookies.remove('lastName');
        Cookies.remove('address');
        Cookies.remove('address2');
        Cookies.remove('postalCode');
        Cookies.remove('city');
        Cookies.remove('country');
        Cookies.remove('phone');
        
        signOut();
        // router.reload();
        // Cookies.remove('token');
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
