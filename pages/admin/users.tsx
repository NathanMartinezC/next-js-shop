import { useEffect, useState } from "react";
import { PeopleOutline } from "@mui/icons-material";
import { AdminLayout } from "@/components/layouts";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Grid, MenuItem, Select } from "@mui/material";
import useSWR from "swr";
import { IUser } from "@/interfaces";
import { shopApi } from "@/api";
import { set } from "mongoose";

const UsersPage = () => {

    const { data, error } = useSWR<IUser[]>('/api/admin/users');
    const [ users, setUsers ] = useState<IUser[]>([]);

    useEffect(() => {
        if (data){
            setUsers(data);
        }
    }, [data])

    if ( !data && !error ) return (<></>)

    const setRole = async (userId: string, role: string) => {

        const previousUsers = users.map( user => ({...user}));
        const updatedUsers = users.map( user => ({
            ...user,
            role: user._id === userId ? role : user.role
        }));

        setUsers(updatedUsers);

        try {
            await shopApi.put('/admin/users', { userId, role });
        } catch (error) {
            setUsers(previousUsers);
            console.log(error);
            alert('Something went wrong');
        }
    }

    const columns: GridColDef[] = [
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'name', headerName: 'Name', width: 250 },
        { 
            field: 'role', 
            headerName: 'Role', 
            width: 250,
            renderCell: ({row}: GridRenderCellParams) => {
                return (
                    <Select
                        value={ row.role }
                        label="Role"
                        onChange={ ({ target }) => setRole( row.id, target.value ) }
                        sx={{ width: '300px' }}
                    >
                        <MenuItem value='admin'>Admin</MenuItem>
                        <MenuItem value='client'>Client</MenuItem>
                        <MenuItem value='super-user'>Super User</MenuItem>
                        <MenuItem value='SEO'>SEO</MenuItem>
                    </Select>
                )
            }
        },
    ];

    const rows = users.map( user => ({
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