import NextLink from "next/link";
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from "@mui/material";
import { CartList, OrderSummary } from "@/components/cart";
import { ShopLayout } from "@/components/layouts";
import { CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material";


const OrderPage = () => {
    return (
        <ShopLayout title="Order Summary: 1" pageDescription="Order Summary">
            <Typography variant="h1" component="h1">Order: 1</Typography>

            {/* <Chip 
                sx={{ my: 2 }}
                label="Payment pending"
                variant="outlined"
                color="error"
                icon={ <CreditCardOffOutlined /> }
            /> */}

            <Chip 
                sx={{ my: 2 }}
                label="Paid"
                variant="outlined"
                color="success"
                icon={ <CreditScoreOutlined /> }
            />
            
            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList editable />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className="summary-card">
                        <CardContent>
                            <Typography variant="h2">Summary (3 items)</Typography>
                            <Divider sx={{ my: 1 }} />

                            <Box display="flex" justifyContent="space-between">
                            <Typography variant="subtitle1">Shipping Address</Typography>
                                <NextLink href="/checkout/address" passHref>
                                    <Link component={"span"} underline="always">
                                        Edit
                                    </Link>
                                </NextLink>
                            </Box>

                            <Typography>Nathan Martinez</Typography>
                            <Typography>Fake Street 123</Typography>
                            <Typography>CDMX, Cuauhtemoc</Typography>
                            <Typography>Mexico</Typography>
                            <Typography>55 55 55 55</Typography>

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
                                <h1>Pay</h1>
                                <Chip 
                                    sx={{ my: 2 }}
                                    label="Paid"
                                    variant="outlined"
                                    color="success"
                                    icon={ <CreditScoreOutlined /> }
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>

        </ShopLayout>
    )
}

export default OrderPage;