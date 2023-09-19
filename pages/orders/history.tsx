import NextLink from "next/link";
import { Chip, Grid, Typography, Link } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { ShopLayout } from "@/components/layouts";


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
                <NextLink href={`/orders/${ params.row.id }`} passHref>
                    <Link underline="always">
                        Order
                    </Link>
                </NextLink>
            )
        }
    }
];

const rows = [
    { id: 1, paid: true, fullname: 'Nathan Martinez' },
    { id: 2, paid: false, fullname: 'Josué Castelán' },
];



const HistoryPage = () => {
    return (
        <ShopLayout title="Order History" pageDescription="Order History">
            <Typography variant="h1" component="h1">Order History</Typography>

            <Grid container>
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

export default HistoryPage;