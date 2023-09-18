import NextLink from "next/link";
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from "@mui/material";
import { CartList, OrderSummary } from "@/components/cart";
import { ShopLayout } from "@/components/layouts";


const SummaryPage = () => {
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