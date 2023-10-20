import { AdminLayout } from "@/components/layouts"
import { ConfirmationNumberOutlined } from "@mui/icons-material"


const OrdersPage = () => {
    return (
        <AdminLayout
            title={ 'Orders' }
            subTitle={ 'Manage orders'}
            icon={ <ConfirmationNumberOutlined /> }
        >

        </AdminLayout>
    )
}

export default OrdersPage