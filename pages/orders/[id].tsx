import NextLink from "next/link";
import { GetServerSideProps, NextPage } from "next";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { OrderResponseBody } from "@paypal/paypal-js"
import { Box, Button, Card, CardContent, Chip, CircularProgress, Divider, Grid, Link, Typography } from "@mui/material";
import { CartList, OrderSummary } from "@/components/cart";
import { ShopLayout } from "@/components/layouts";
import { CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material";
import { getSession } from "next-auth/react";
import { dbOrders } from "@/database";
import { IOrder } from "@/interfaces";
import { shopApi } from "@/api";
import { useRouter } from "next/router";
import { useState } from "react";


interface Props {
    order: IOrder
}

const OrderPage:NextPage<Props> = ({ order }) => {

    const router = useRouter();
    const { shippingAddress } = order;
    const [isPaying, setIsPaying] = useState(false);

    const onOrderCompleted = async(details: OrderResponseBody) => {
        if (details.status !== "COMPLETED") {
            return alert("Something went wrong with your payment");
        }

        setIsPaying(true);

        try {
            const { data } = await shopApi.post(`/orders/pay`, {
                transactionId: details.id,
                orderId: order._id
            });
            router.reload();
        } catch (error) {
            setIsPaying(false);
            console.log(error);
            alert("Something went wrong with your payment");
        }
    }



    return (
        <ShopLayout title="Order Summary: " pageDescription="Order Summary">
            <Typography variant="h1" component="h1">Order: { order._id }</Typography>
            {
                order.isPaid
                ? (
                    <Chip 
                        sx={{ my: 2 }}
                        label="Paid"
                        variant="outlined"
                        color="success"
                        icon={ <CreditScoreOutlined /> }
                    />
                ) : (
                    <Chip 
                        sx={{ my: 2 }}
                        label="Payment pending"
                        variant="outlined"
                        color="error"
                        icon={ <CreditCardOffOutlined /> }
                    />
                )
            }

            
            <Grid container className="fadeIn">
                <Grid item xs={12} sm={7}>
                    <CartList products={ order.orderItems } />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className="summary-card">
                        <CardContent>
                            <Typography variant="h2">Summary ({ order.numberOfItems } items)</Typography>
                            <Divider sx={{ my: 1 }} />

                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="subtitle1">Shipping Address</Typography>
                            </Box>

                            <Typography>{shippingAddress.firstName} {shippingAddress.lastName}</Typography>
                            <Typography>{shippingAddress.address} {shippingAddress.address2 ? `, ${ shippingAddress.address2 }`: ""}</Typography>
                            <Typography>{shippingAddress.city}, {shippingAddress.postalCode}</Typography>
                            <Typography>{shippingAddress.country}</Typography>
                            <Typography>{shippingAddress.phone}</Typography>

                            <Divider sx={{ my: 1 }} />

                            <Box display="flex" justifyContent="end">
                                <NextLink href="/cart" passHref>
                                    <Link component={"span"} underline="always">
                                        Edit
                                    </Link>
                                </NextLink>
                            </Box>

                            <OrderSummary 
                                orderValues={{
                                    numberOfItems: order.numberOfItems,
                                    subTotal: order.subTotal,
                                    tax: order.tax,
                                    total: order.total
                                }} 
                            />

                            <Box sx={{ mt: 3 }} display="flex" flexDirection="column">

                                <Box 
                                    display="flex" 
                                    justifyContent="center" 
                                    className="fadeIn"
                                    sx={{ display: isPaying ? "flex" : "none" }}
                                >
                                    <CircularProgress />
                                </Box>

                                <Box flexDirection="column" sx={{ display: isPaying ? 'none':'flex', flex: 1 }}>
                                    {
                                        order.isPaid
                                        ? (
                                            <Chip 
                                                sx={{ my: 2 }}
                                                label="Paid"
                                                variant="outlined"
                                                color="success"
                                                icon={ <CreditScoreOutlined /> }
                                            />
                                        ) : (
                                            <PayPalButtons
                                                createOrder={( data, actions ) => {
                                                    return actions.order.create({
                                                        purchase_units: [
                                                            {
                                                                amount: {
                                                                    value: `${order.total}`
                                                                }
                                                            }
                                                        ]
                                                    })
                                                }}
                                                onApprove={(data, actions) => {
                                                    return actions.order!.capture().then((details) => {
                                                        onOrderCompleted(details);
                                                    })
                                                }}
                                            />
                                        )
                                    }
                                </Box>



                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>

        </ShopLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const { id = '' } = query;
    const session:any = await getSession({ req });

    if ( !session ) {
        return {
            redirect: {
                destination: `/auth/login?p=/orders/${id}`,
                permanent: false
            }
        }
    }

    const order = await dbOrders.getOrderById( id.toString() );

    if (!order) {
        return {
            redirect: {
                destination: '/orders/history',
                permanent: false
            }
        }
    }

    if ( order.user !== session.user._id ) {
        return {
            redirect: {
                destination: '/orders/history',
                permanent: false
            }
        }
    }

    return {
        props: {
            order
        }
    }
}

export default OrderPage;