import { useState } from "react";
import { NextPage, GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { Grid, Typography, Box, Button, Chip } from "@mui/material";
import { ShopLayout } from "@/components/layouts";
import { ProductSlideshow, SizeSelector } from "@/components/products";
import { ItemCounter } from "@/components/ui";
import { IProduct, ICartProduct, ISize } from "@/interfaces";
import { dbProducts } from "@/database";

interface Props {
    product: IProduct
}

const ProductPage:NextPage<Props> = ({ product }) => {

    const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
        _id: product._id,
        image: product.images[0],
        price: product.price,
        size: undefined,
        slug: product.slug,
        title: product.title,
        gender: product.gender,
        quantity: 1
    })

    const selectedSize = (size: ISize) => {
        setTempCartProduct({
            ...tempCartProduct,
            size
        })
    }

    return (
        <ShopLayout title={ product.title } pageDescription={ product.description }>
            <Grid container spacing={ 3 }>
                <Grid item xs={ 12 } sm={ 7 }>
                    <ProductSlideshow images={ product.images } />
                </Grid>
                <Grid item xs={ 12 } sm={ 5 }>
                    <Box display='flex' flexDirection='column'>
                        <Typography variant={ 'h1' } component={ 'h1' }>{ product.title }</Typography>
                        <Typography variant={ 'subtitle1' } component={ 'h2' }>${ product.price }</Typography>

                        <Box sx={{ my: 2 }}>
                            <Typography variant="subtitle2">Quantity</Typography>
                            <ItemCounter />
                            <SizeSelector 
                                sizes={ product.sizes }
                                selectedSize={ tempCartProduct.size }
                                onSelectedSize={(size) => selectedSize(size)}
                            />
                        </Box>

                        {
                            (product.inStock > 0)
                            ? (
                                <Button color="secondary" className="circular-btn">
                                    {
                                        tempCartProduct.size
                                            ? 'Add to Cart'
                                            : 'Select a size'
                                    }
                                </Button>
                            ) : (
                                    <Chip label="No available" color="error" variant="outlined" />
                                )
                        }

                        <Box sx={{ mt: 3 }}>
                            <Typography variant="subtitle2">Description</Typography>
                            <Typography variant="body2">{ product.description }</Typography>
                        </Box>

                    </Box>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

// Server Side Rendering - OK  but not optimal
// export const getServerSideProps:GetServerSideProps = async ({ params }) => {
    
//     const { slug = '' } = params as { slug: string };
//     const product = await dbProducts.getProductBySlug(slug);

//     if (!product) {
//         return {
//             redirect: {
//                 destination: '/',
//                 permanent: false
//             }
//         }
//     }

//     return {
//         props: {
//             product
//         }
//     }
// }

export const getStaticPaths:GetStaticPaths = async (ctx) => {

    const productSlugs = await dbProducts.getAllProductSlugs();

    return {
        paths: productSlugs.map( ({ slug }) => ({
            params: { slug }
        })),
        fallback: "blocking"
    }
}

export const getStaticProps:GetStaticProps = async ({ params }) => {
    
    const { slug = '' } = params as { slug: string };
    const product = await dbProducts.getProductBySlug(slug);

    if (!product) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            product
        },
        revalidate: 60 * 60 * 24 // 24 hours
    }
}


export default ProductPage;