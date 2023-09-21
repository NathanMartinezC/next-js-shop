import NextLink from 'next/link';
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material';
import { SearchOutlined, ShoppingCart } from '@mui/icons-material';
import { useRouter } from 'next/router';

export const Navbar = () => {

    const { asPath } = useRouter();
    console.log(asPath);

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

                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <NextLink href="/category/men" passHref>
                        <Link component={'span'}>
                            <Button color={ asPath === '/category/men'? 'primary':'info' } >Men</Button>
                        </Link>
                    </NextLink>
                    <NextLink href="/category/women" passHref>
                        <Link component={'span'}>
                            <Button color={ asPath === '/category/women'? 'primary':'info' }>Women</Button>
                        </Link>
                    </NextLink>
                    <NextLink href="/category/kids" passHref>
                        <Link component={'span'}>
                            <Button color={ asPath === '/category/kids'? 'primary':'info' }>Kids</Button>
                        </Link>
                    </NextLink>
                </Box>

                <Box flex={ 1 } />

                <IconButton>
                    <SearchOutlined />
                </IconButton>

                <NextLink href="/cart" passHref>
                    <Link component={'span'}>
                        <IconButton>
                            <Badge badgeContent={ 2 } color='secondary'>
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </Link>
                </NextLink>

                <Button>
                    Menu
                </Button>


            </Toolbar>
        </AppBar>
    )
}