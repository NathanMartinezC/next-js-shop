import { FC } from "react"
import NextLink from "next/link"
import { Grid, Card, Link, CardActionArea, CardMedia, Box, Typography, Button } from "@mui/material"
import { initialData } from "@/database/products"
import { ItemCounter } from "../ui"

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
]

interface Props {
    editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false}) => {
    return (
        <>
            {
                productsInCart.map((product) => (
                    <Grid container spacing={2} key={ product.slug } sx={{ mb: 1 }}>
                        <Grid item xs={3}>
                            <NextLink href="/product/slug" passHref>
                                <Link component={"span"}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            image={ `products/${ product.images[0] }` }
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
                                    ? <ItemCounter />
                                    : <Typography variant="body1">1 item</Typography>
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