import type { NextPage } from "next";
import { ShopLayout } from "@/components/layouts"; 
import { Typography } from "@mui/material";
import { initialData } from "@/database/products";
import { ProductList } from "@/components/products";

const Home: NextPage = () => {
  return (
    <ShopLayout title={'Next-Shop - Home'} pageDescription={'Best Next Shop'}>
      <Typography variant={'h1'} component={'h1'}>Shop</Typography>
      <Typography variant={'h2'} sx={{ mb: 1 }}>All products</Typography>

      <ProductList 
        products={ initialData.products as any }
      />
    
    </ShopLayout>
  )
}

export default Home;