import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '@/components/layouts';
import { useForm } from 'react-hook-form';
import { validations } from '@/utils.ts';
import { shopApi } from '@/api';
import { ErrorOutline } from '@mui/icons-material';
import { AuthContext } from '@/context';
import { useRouter } from 'next/router';

type FormData = {
    email: string
    password: string
}

const Login = () => {

    const router = useRouter();
    const { loginUser } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [ showError, setShowError ] = useState(false);

    const onLoginUser = async({ email, password }: FormData) => {

        setShowError(false);

        const isValidLogin = await loginUser(email, password);

        if ( !isValidLogin ) {
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 3000);
            return
        }

        router.push('/');
        
    }

    return (
        <AuthLayout title="Login">
            <form onSubmit={ handleSubmit(onLoginUser) } noValidate>
                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h1" component="h1">Login</Typography>
                            <Chip 
                                label='User not found'
                                color='error'
                                icon={<ErrorOutline />}
                                className='fadeIn'
                                sx={{ display: showError ? 'flex' : 'none' }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField 
                                type='email'
                                label="Email" 
                                variant="filled" 
                                fullWidth 
                                {...register('email', {
                                    required: 'Email is required',
                                    validate: validations.isEmail
                                })}
                                error={!!errors.email}
                                helperText={ errors.email?.message }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                label="password" 
                                type='password' 
                                variant="filled" 
                                fullWidth
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: { value: 4, message: 'Password must be at least 4 characters long' },
                                })}
                                error={!!errors.password}
                                helperText={ errors.password?.message }
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type="submit" 
                                color="secondary" 
                                className='circular-btn' 
                                size='large' 
                                fullWidth
                            >
                                Enter
                            </Button>
                        </Grid>

                        <Grid item xs={12} display="flex" justifyContent="end">
                            <NextLink href="/auth/register" passHref>
                                <Link underline='always' component={'span'}>
                                    Do you have an account? Register
                                </Link>
                            </NextLink>
                        </Grid>
                    </Grid>  
                </Box>
            </form>
        </AuthLayout>
    );
}

export default Login;