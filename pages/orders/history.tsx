import NextLink from "next/link";
import { GetServerSideProps, NextPage } from "next";
import { Chip, Grid, Typography, Link } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { ShopLayout } from "@/components/layouts";
import { getSession } from "next-auth/react";
import { dbOrders } from "@/database";
import { IOrder } from "@/interfaces";


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullname', headerName: 'Full Name', width: 300 },
    {
        field: 'paid',
        headerName: 'Paid',
        width: 150,
        description: 'Is order paid?',
        renderCell: (params: GridRenderCellParams) => {
            return (
                params.row.paid
                ? <Chip label="Paid" color="success" variant="outlined" />
                : <Chip label="Pending" color="error" variant="outlined" />
            )
        }
    },
    {
        field: 'order',
        headerName: 'Order',
        width: 150,
        sortable: false,
        renderCell: (params: GridRenderCellParams) => {
            return (
                <NextLink href={`/orders/${ params.row.orderId }`} passHref>
                    <Link underline="always" component={"span"}>
                        Order
                    </Link>
                </NextLink>
            )
        }
    }
];

interface Props {
    orders: IOrder[]
}



const HistoryPage:NextPage<Props> = ({ orders }) => {

    const rows = orders.map( (order, idx) => ({
        id: idx + 1,
        paid: order.isPaid,
        fullname: `${ order.shippingAddress.firstName } ${ order.shippingAddress.lastName }`,
        orderId: order._id
    }))

    return (
        <ShopLayout title="Order History" pageDescription="Order History">
            <Typography variant="h1" component="h1">Order History</Typography>

            <Grid container className="fadeIn">
                <Grid item xs={12} sm={7}>
                    <DataGrid 
                        rows={ rows }
                        columns={ columns }
                        pageSizeOptions={[5, 10, 20]}
                    />
                </Grid>
            </Grid>
        </ShopLayout>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session:any = await getSession({ req });

    if ( !session ) {
        return {
            redirect: {
                destination: '/auth/login?p=/orders/history',
                permanent: false
            }
        }
    }

    const orders = await dbOrders.getOrdersByUserId(session.user._id);

    return {
        props: {
            orders
        }
    }
}

export default HistoryPage;