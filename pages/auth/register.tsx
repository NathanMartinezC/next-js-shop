import NextLink from 'next/link';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '@/components/layouts';


const Register = () => {
    return (
        <AuthLayout title="Login">
            <Box sx={{ width: 350, padding: '10px 20px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h1" component="h1">Create Account</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField label="Username" variant="filled" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Email" variant="filled" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="password" type='password' variant="filled" fullWidth />
                    </Grid>

                    <Grid item xs={12}>
                        <Button color="secondary" className='circular-btn' size='large' fullWidth>
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
        </AuthLayout>
    );
}

export default Register;