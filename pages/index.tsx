import type { NextPage } from "next";
import { ShopLayout } from "@/components/layouts"; 
import { Typography } from "@mui/material";
import { ProductList } from "@/components/products";
import { useProducts } from "@/hooks";
import { FullScreenLoading } from "@/components/ui";


const Home: NextPage = () => {

  const { products, isLoading } = useProducts('/api/products');

  return (
    <ShopLayout title={'Next-Shop - Home'} pageDescription={'Best Next Shop'}>
      <Typography variant={'h1'} component={'h1'}>Shop</Typography>
      <Typography variant={'h2'} sx={{ mb: 1 }}>All products</Typography>

      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={ products } />
      }
    
    </ShopLayout>
  )
}

export default Home;