import type { NextPage } from "next";
import { ShopLayout } from "@/components/layouts"; 
import { Typography } from "@mui/material";
import { ProductList } from "@/components/products";
import { useProducts } from "@/hooks";
import { FullScreenLoading } from "@/components/ui";


const WomenPage: NextPage = () => {

  const { products, isLoading } = useProducts('/api/products?gender=women');

  return (
    <ShopLayout title={'Next-Shop - Women'} pageDescription={'Best Next Shop - Women'}>
      <Typography variant={'h1'} component={'h1'}>Shop - Women</Typography>
      <Typography variant={'h2'} sx={{ mb: 1 }}>All products</Typography>

      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={ products } />
      }
    
    </ShopLayout>
  )
}

export default WomenPage;