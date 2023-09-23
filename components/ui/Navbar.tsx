import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography, Input, InputAdornment } from '@mui/material';
import { ClearOutlined, SearchOutlined, ShoppingCart } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { CartContext, UIContext } from '@/context';


export const Navbar = () => {

    const { asPath, push } = useRouter();
    const { toggleSideMenu } = useContext(UIContext);
    const { numberOfItems } = useContext(CartContext);

    const [searchTerm, setSearchTerm] = useState('')
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    const onSearchTerm = () => {
        if( searchTerm.trim().length === 0 ) return;
        push(`/search/${searchTerm}`);
    }

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

                <Box sx={{ display: isSearchOpen ? 'none' : { xs: 'none', sm: 'block' } }} className="fadeIn">
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

                    {
                        isSearchOpen
                        ? (
                            <Input
                                sx={{ display: { xs: 'none', sm: 'flex' } }}
                                className='fadeIn'
                                autoFocus
                                value={ searchTerm }
                                onChange={ e => setSearchTerm(e.target.value) }
                                onKeyDown={ e => e.key === 'Enter' ? onSearchTerm() : null }
                                type='text'
                                placeholder="Buscar..."
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={ () => setIsSearchOpen(false) }
                                        >
                                         <ClearOutlined />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        ) : (
                            <IconButton
                                onClick={ () => setIsSearchOpen(true) }
                                className='fadeIn'
                                sx={{ display: { xs: 'none', sm: 'flex' } }}
                            >
                                <SearchOutlined />
                            </IconButton>
                        )
                    }


                <IconButton
                    sx={{ display: { xs: 'block', sm: 'none' } }}
                    onClick={ toggleSideMenu }
                >
                    <SearchOutlined />
                </IconButton>

                <NextLink href="/cart" passHref>
                    <Link component={'span'}>
                        <IconButton>
                            <Badge badgeContent={ numberOfItems > 9 ? '+9' : numberOfItems } color='secondary'>
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </Link>
                </NextLink>

                <Button onClick={ toggleSideMenu }>
                    Menu
                </Button>


            </Toolbar>
        </AppBar>
    )
}