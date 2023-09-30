import NextLink from 'next/link';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '@/components/layouts';
import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { validations } from '@/utils.ts';
import { shopApi } from '@/api';
import { ErrorOutline } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { AuthContext } from '@/context';


type FormData = {
    name: string
    email: string
    password: string
}


const Register = () => {

    const router = useRouter();
    const { registerUser } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [ showError, setShowError ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');

    const onRegisterForm = async ({ name, email, password }: FormData) => {
        
        setShowError(false);
        const { hasError, message } = await registerUser(name, email, password);

        if (hasError) {
            setShowError(true);
            setErrorMessage(message!);
            setTimeout(() => {
                setShowError(false);
            }, 3000);
            return;
        }
        router.replace('/');
    }

    return (
        <AuthLayout title="Login">
            <form onSubmit={ handleSubmit(onRegisterForm) } noValidate>
                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h1" component="h1">Create Account</Typography>
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
                                label="Username" 
                                variant="filled" 
                                fullWidth 
                                {...register('name', {
                                    required: 'Username is required',
                                    minLength: {
                                        value: 2,
                                        message: 'Username must be at least 2 characters'
                                    }
                                })}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                label="Email" 
                                variant="filled" 
                                type='email'
                                fullWidth 
                                {...register('email', {
                                    required: 'Email is required',
                                    validate: validations.isEmail
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
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
                                    minLength: {
                                        value: 4,
                                        message: 'Password must be at least 4 characters'
                                    }
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message
                            }
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
                            <NextLink href="/auth/login" passHref>
                                <Link underline='always' component={'span'}>
                                    Do you have an account? Login
                                </Link>
                            </NextLink>
                        </Grid>
                    </Grid>  
                </Box>
            </form>
        </AuthLayout>
    );
}

export default Register;