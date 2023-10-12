import React from 'react';
import { DashboardOutlined } from '@mui/icons-material';
import { AdminLayout } from '@/components/layouts';

const DashboardPage = () => {
    return (
        <AdminLayout 
            title="Dashboard" 
            subTitle="Dashboard" 
            icon={<DashboardOutlined />}
        >
            <h3>Dashboard</h3>
        </AdminLayout>
    )
}

export default DashboardPage