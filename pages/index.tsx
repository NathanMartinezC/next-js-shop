import type { NextPage } from "next";
import { ShopLayout } from "@/components/layouts"; 
import { Typography } from "@mui/material";

const Home: NextPage = () => {
  return (
    <ShopLayout title={'Next-Shop - Home'} pageDescription={'Best Next Shop'}>
      <Typography variant={'h1'} component={'h1'}>Shop</Typography>
      <Typography variant={'h2'} sx={{ mb: 1 }}>All products</Typography>
    </ShopLayout>
  )
}

export default Home;