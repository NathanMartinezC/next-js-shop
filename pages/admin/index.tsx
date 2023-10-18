import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { AccessTimeOutlined, AttachMoneyOutlined, CancelPresentationOutlined, CategoryOutlined, CreditCardOutlined, DashboardOutlined, GroupOutlined, ProductionQuantityLimitsOutlined } from '@mui/icons-material';
import { AdminLayout } from '@/components/layouts';
import { Grid, Typography } from '@mui/material';
import { SummaryTile } from '@/components/admin';
import { DashboardSummaryResponse } from '@/interfaces';

const DashboardPage = () => {

    const { data, error } = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', {
        refreshInterval: 30 * 1000
    })

    const [refreshIn, setRefreshIn] = useState(30)

    useEffect(() => {
        const interval = setInterval(() => {
            setRefreshIn(refreshIn => refreshIn > 0 ? refreshIn - 1 : 30 )
        }, 1000);

        return () => clearInterval(interval)
    }
    , [])

    if ( !error && !data ) return <></>

    if ( error ){
        console.log(error)
        return <Typography>Something went wrong</Typography>
    }

    const {
        numberOfOrders,
        paidOrders,
        notPaidOrders,
        numberOfClients,
        numberOfProducts,
        productsOutOfStock,
        lowStockProducts,
    } = data!;

    return (
        <AdminLayout 
            title="Dashboard" 
            subTitle="Summary of your store" 
            icon={<DashboardOutlined />}
        >
            <Grid container spacing={2}>
                <SummaryTile 
                    title={numberOfOrders}
                    subTitle="Total Orders" 
                    icon={<CreditCardOutlined color='secondary' sx={{ fontSize: 40 }}/>}
                />

                <SummaryTile 
                    title={paidOrders} 
                    subTitle="Paid Orders" 
                    icon={<AttachMoneyOutlined color='success' sx={{ fontSize: 40 }}/>}
                />

                <SummaryTile 
                    title={notPaidOrders}
                    subTitle="Pending Orders" 
                    icon={<CreditCardOutlined color='error' sx={{ fontSize: 40 }}/>}
                />

                <SummaryTile 
                    title={numberOfClients}
                    subTitle="Clients" 
                    icon={<GroupOutlined color='primary' sx={{ fontSize: 40 }}/>}
                />

                <SummaryTile 
                    title={numberOfProducts}
                    subTitle="Products" 
                    icon={<CategoryOutlined color='warning' sx={{ fontSize: 40 }}/>}
                />

                <SummaryTile 
                    title={productsOutOfStock}
                    subTitle="No Stock" 
                    icon={<CancelPresentationOutlined color='error' sx={{ fontSize: 40 }}/>}
                />

                <SummaryTile 
                    title={lowStockProducts}
                    subTitle="Low Stock" 
                    icon={<ProductionQuantityLimitsOutlined color='warning' sx={{ fontSize: 40 }}/>}
                />

                <SummaryTile 
                    title={refreshIn}
                    subTitle="Update: " 
                    icon={<AccessTimeOutlined color='secondary' sx={{ fontSize: 40 }}/>}
                />
            </Grid>


        </AdminLayout>
    )
}

export default DashboardPage