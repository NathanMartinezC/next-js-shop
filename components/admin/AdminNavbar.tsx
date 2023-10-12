import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material';
import { CartContext, UIContext } from '@/context';


export const AdminNavbar = () => {

    const { toggleSideMenu } = useContext(UIContext);

    return (
        <AppBar>
            <Toolbar>
                <NextLink href="/" passHref>
                    <Link display="flex" alignItems='center' component={'span'}>
                        <Typography variant="h6">Next</Typography>
                        <Typography sx={{ ml: 0.5 }}>Shop</Typography>
                    </Link>
                </NextLink>

                <Box flex={ 1 } />

                <Button onClick={ toggleSideMenu }>
                    Menu
                </Button>


            </Toolbar>
        </AppBar>
    )
}