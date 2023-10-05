import { useContext } from "react";
import NextLink from "next/link";
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from "@mui/material";
import { CartList, OrderSummary } from "@/components/cart";
import { ShopLayout } from "@/components/layouts";
import { CartContext } from "@/context";
import { countries } from "@/utils.ts";


const SummaryPage = () => {

    const { shippingAddress, numberOfItems } = useContext(CartContext);

    if ( !shippingAddress ) {
        return <></>
    }

    const { firstName, lastName, address, address2 = '', postalCode, city, country, phone } = shippingAddress;

    return (
        <ShopLayout title="Order Summary" pageDescription="Order Summary">
            <Typography variant="h1" component="h1">Order Summary</Typography>
            
            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList editable />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className="summary-card">
                        <CardContent>
                            <Typography variant="h2">Summary ({ numberOfItems === 1 ? 'product':'products' })</Typography>
                            <Divider sx={{ my: 1 }} />

                            <Box display="flex" justifyContent="space-between">
                            <Typography variant="subtitle1">Shipping Address</Typography>
                                <NextLink href="/checkout/address" passHref>
                                    <Link component={"span"} underline="always">
                                        Edit
                                    </Link>
                                </NextLink>
                            </Box>

                            <Typography>{ firstName } { lastName }</Typography>
                            <Typography>{ address } { address2 ? address2 : '' }</Typography>
                            <Typography>{ city }, { postalCode }</Typography>
                            <Typography>{ countries.find(c => c.code === country)?.name }</Typography>
                            <Typography>{ phone }</Typography>

                            <Divider sx={{ my: 1 }} />

                            <Box display="flex" justifyContent="end">
                                <NextLink href="/cart" passHref>
                                    <Link component={"span"} underline="always">
                                        Edit
                                    </Link>
                                </NextLink>
                            </Box>

                            <OrderSummary />

                            <Box sx={{ mt: 3 }}>
                                <Button color="secondary" className="circular-btn" fullWidth>
                                    Confirm Order
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>

        </ShopLayout>
    )
}

export default SummaryPage;