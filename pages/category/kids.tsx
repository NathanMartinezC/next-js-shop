import type { NextPage } from "next";
import { ShopLayout } from "@/components/layouts"; 
import { Typography } from "@mui/material";
import { ProductList } from "@/components/products";
import { useProducts } from "@/hooks";
import { FullScreenLoading } from "@/components/ui";


const KidPage: NextPage = () => {

  const { products, isLoading } = useProducts('/api/products?gender=kid');

  return (
    <ShopLayout title={'Next-Shop - Kids'} pageDescription={'Best Next Shop - Kids'}>
      <Typography variant={'h1'} component={'h1'}>Shop - Kids</Typography>
      <Typography variant={'h2'} sx={{ mb: 1 }}>All products</Typography>

      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={ products } />
      }
    
    </ShopLayout>
  )
}

export default KidPage;