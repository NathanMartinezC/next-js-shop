import { PeopleOutline } from "@mui/icons-material";
import { AdminLayout } from "@/components/layouts";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Grid } from "@mui/material";
import useSWR from "swr";
import { IUser } from "@/interfaces";

const UsersPage = () => {

    const { data, error } = useSWR<IUser[]>('/api/admin/users');

    if ( !data && !error ) return (<></>)

    const columns: GridColDef[] = [
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'name', headerName: 'Name', width: 250 },
        { field: 'role', headerName: 'Role', width: 250 },
    ];

    const rows = data!.map( user => ({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
    }))

    return (
        <AdminLayout
            title={"Users"}
            subTitle={"Manage users"}
            icon={<PeopleOutline />}
        >
            <Grid container className="fadeIn">
                <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                    <DataGrid 
                        rows={ rows }
                        columns={ columns }
                        pageSizeOptions={[5, 10, 20]}
                    />
                </Grid>
            </Grid>



        </AdminLayout>
    )
}

export default UsersPage