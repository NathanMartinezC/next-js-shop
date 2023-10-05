import { GetServerSideProps } from "next";
import Cookies from "js-cookie";
import { ShopLayout } from "@/components/layouts";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { countries, jwt } from "@/utils.ts";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useContext } from "react";
import { CartContext } from "@/context";


type FormData = {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    postalCode: string;
    city: string;
    country: string;
    phone: string;
}

const getAddressFromCookies = ():FormData => {
    return {
        firstName: Cookies.get('firstName') || '',
        lastName: Cookies.get('lastName') || '',
        address: Cookies.get('address') || '',
        address2: Cookies.get('address2') || '',
        postalCode: Cookies.get('postalCode') || '',
        city: Cookies.get('city') || '',
        country: Cookies.get('country') || '',
        phone: Cookies.get('phone') || ''
    }
}


const AddressPage = () => {

    const router = useRouter();
    const { updateAddress } = useContext(CartContext);
    
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: getAddressFromCookies()
    });

    const onSubmitAddress = (data: FormData) => {
        updateAddress(data);
        router.push('/checkout/summary');
    }

    return (
        <ShopLayout title="Address" pageDescription="Confirm your address">

            <form onSubmit={ handleSubmit(onSubmitAddress) }>
                <Typography variant="h1" component="h1">Address</Typography>

                <Grid container spacing={ 2 } sx={{ mt: 2 }}>

                    <Grid item xs={ 12 } sm={ 6 }>
                        <TextField 
                            label="First Name" 
                            variant="filled" 
                            fullWidth 
                            { ...register('firstName', {
                                required: 'First name is required'
                            })}
                            error={ !!errors.firstName }
                            helperText={ errors.firstName?.message }
                        />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 }>
                        <TextField 
                            label="Last Name" 
                            variant="filled" 
                            fullWidth
                            { ...register('lastName', {
                                required: 'Last name is required'
                            })}
                            error={ !!errors.lastName }
                            helperText={ errors.lastName?.message }
                        />
                    </Grid>

                    <Grid item xs={ 12 } sm={ 6 }>
                        <TextField 
                            label="Address" 
                            variant="filled" 
                            fullWidth
                            { ...register('address', {
                                required: 'Address is required'
                            })}
                            error={ !!errors.address }
                            helperText={ errors.address?.message }
                        />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 }>
                        <TextField 
                            label="Address 2 (optional)" 
                            variant="filled" 
                            fullWidth
                            { ...register('address2') } 
                        />
                    </Grid>

                    <Grid item xs={ 12 } sm={ 6 }>
                        <TextField 
                            label="Postal Code" 
                            variant="filled" 
                            fullWidth
                            { ...register('postalCode', {
                                required: 'Postal code is required'
                            })}
                            error={ !!errors.postalCode }
                            helperText={ errors.postalCode?.message }
                        />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 }>
                        <TextField 
                            label="City" 
                            variant="filled"    
                            fullWidth
                            { ...register('city', {
                                required: 'City is required'
                            })}
                            error={ !!errors.city }
                            helperText={ errors.city?.message }
                        />
                    </Grid>

                    <Grid item xs={ 12 } sm={ 6 }>
                        <FormControl fullWidth>
                            <TextField
                                select
                                variant="filled"
                                label="Country"
                                defaultValue={ Cookies.get('country') || countries[0].code }
                                { ...register('country', {
                                    required: 'Country is required'
                                })}
                                error={ !!errors.country }
                            >
                                {
                                    countries.map( country => (
                                        <MenuItem 
                                            key={country.code}
                                            value={country.code}
                                        >
                                            {country.name}
                                        </MenuItem>
                                    ))
                                }
                            </TextField>
                        </FormControl>
                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 }>
                        <TextField 
                            label="Phone" 
                            variant="filled" 
                            fullWidth
                            { ...register('phone', {
                                required: 'Phone is required'
                            })}
                            error={ !!errors.phone }
                            helperText={ errors.phone?.message }
                        />
                    </Grid>

                </Grid>

                <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
                    <Button type="submit" color="secondary" className="circular-btn" size="large">
                        Check Order
                    </Button>
                </Box>
            </form>

        </ShopLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const { token = '' } = req.cookies;
    let isValidToken = false;

    try {
        await jwt.isJWTValid(token);
        isValidToken = true;
    } catch (error) {
        isValidToken = false;
    }

    if ( !isValidToken ) {
        return {
            redirect: {
                destination: '/auth/login?p=/checkout/address',
                permanent: false
            }
        }
    }
    return {
        props: {}
    }

}


export default AddressPage;