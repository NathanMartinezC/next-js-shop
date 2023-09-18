import NextLink from "next/link";
import { Box, Link, Typography } from "@mui/material";
import { RemoveShoppingCartOutlined } from "@mui/icons-material";

import { ShopLayout } from "@/components/layouts";

const EmptyCart = () => {
  return (
    <ShopLayout title="Empty cart" pageDescription="No selected items">
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height='calc(100vh - 200px)'
            sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
        >
            <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography marginLeft={2}>Your cart is empty</Typography>
                <NextLink href="/" passHref>
                    <Link typography="h4" color="secondary" component={"span"}>
                        Regresar
                    </Link>
                </NextLink>
            </Box>
        </Box>
    </ShopLayout>
  );
}

export default EmptyCart;