import { FC } from "react";
import { Grid } from "@mui/material";
import { IProduct } from "@/interfaces";
import { ProductCard } from "./ProductCard";

interface Props {
    products: IProduct[];
}

export const ProductList: FC<Props> = ({ products }) => {
    return (
        <Grid container spacing={ 2 }>
            { 
                products.map((product: IProduct) => (
                    <ProductCard 
                        key={ product.slug } 
                        product={ product } 
                    />
                )) 
            }
        </Grid>
    )
}