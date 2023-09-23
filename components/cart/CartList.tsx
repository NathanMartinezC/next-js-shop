import { FC, useContext } from "react"
import NextLink from "next/link"
import { Grid, Card, Link, CardActionArea, CardMedia, Box, Typography, Button } from "@mui/material"
import { ItemCounter } from "../ui"
import { CartContext } from "@/context";
import { ICartProduct } from "@/interfaces";
import { on } from "events";


interface Props {
    editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false}) => {

    const { cart, updateCartQuantity } = useContext(CartContext);

    const onNewQuantity = (product: ICartProduct, newQuantity: number) => {
        product.quantity = newQuantity;
        updateCartQuantity(product);  
    }
    return (
        <>
            {
                cart.map((product) => (
                    <Grid container spacing={2} key={ product.slug + product.size } sx={{ mb: 1 }}>
                        <Grid item xs={3}>
                            <NextLink href={`/product/${ product.slug }`} passHref>
                                <Link component={"span"}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            image={ `/products/${ product.image }` }
                                            alt={ product.slug }
                                            sx={{ borderRadius: '5px' }}
                                        />
                                    </CardActionArea>
                                </Link>
                            </NextLink>
                        </Grid>
                        <Grid item xs={7}>
                            <Box display="flex" flexDirection="column">
                                <Typography variant="body1">{ product.title }</Typography>
                                <Typography variant="body2" color="text.secondary">{ product.slug }</Typography>

                                {
                                    editable
                                    ? (
                                        <ItemCounter 
                                            currentValue={ product.quantity }
                                            maxValue={ 5 }
                                            updatedQuantity={() => onNewQuantity(product, product.quantity)}
                                        />
                                    ) : (
                                        <Typography variant="h5">{ product.quantity } items</Typography>
                                    )
                                }
                            </Box>
                        </Grid>
                        <Grid item xs={2} display="flex" alignItems="center" flexDirection="column">
                            <Typography variant="subtitle1">${`${ product.price }`}</Typography>
                            {
                                editable && (
                                    <Button variant="text" color='secondary'>
                                        Remove
                                    </Button>
                                )
                            }
                        </Grid>
                    </Grid>
                ))
            }
        </>
    )
}

export default CartList