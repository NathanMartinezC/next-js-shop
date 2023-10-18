import React from 'react';
import { AccessTimeOutlined, AttachMoneyOutlined, CancelPresentationOutlined, CategoryOutlined, CreditCardOutlined, DashboardOutlined, GroupOutlined, ProductionQuantityLimitsOutlined } from '@mui/icons-material';
import { AdminLayout } from '@/components/layouts';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { SummaryTile } from '@/components/admin';

const DashboardPage = () => {
    return (
        <AdminLayout 
            title="Dashboard" 
            subTitle="Summary of your store" 
            icon={<DashboardOutlined />}
        >
            <Grid container spacing={2}>
                <SummaryTile 
                    title="0" 
                    subTitle="Total Orders" 
                    icon={<CreditCardOutlined color='secondary' sx={{ fontSize: 40 }}/>}
                />

                <SummaryTile 
                    title="0" 
                    subTitle="Paid Orders" 
                    icon={<AttachMoneyOutlined color='success' sx={{ fontSize: 40 }}/>}
                />

                <SummaryTile 
                    title="0" 
                    subTitle="Pending Orders" 
                    icon={<CreditCardOutlined color='error' sx={{ fontSize: 40 }}/>}
                />

                <SummaryTile 
                    title="0" 
                    subTitle="Clients" 
                    icon={<GroupOutlined color='primary' sx={{ fontSize: 40 }}/>}
                />

                <SummaryTile 
                    title="0" 
                    subTitle="Products" 
                    icon={<CategoryOutlined color='warning' sx={{ fontSize: 40 }}/>}
                />

                <SummaryTile 
                    title="0" 
                    subTitle="No Stock" 
                    icon={<CancelPresentationOutlined color='error' sx={{ fontSize: 40 }}/>}
                />

                <SummaryTile 
                    title="0" 
                    subTitle="Low Stock" 
                    icon={<ProductionQuantityLimitsOutlined color='warning' sx={{ fontSize: 40 }}/>}
                />

                <SummaryTile 
                    title="0" 
                    subTitle="Update: " 
                    icon={<AccessTimeOutlined color='secondary' sx={{ fontSize: 40 }}/>}
                />
            </Grid>


        </AdminLayout>
    )
}

export default DashboardPage