import { FC, useMemo, useState } from "react";
import NextLink from "next/link";
import { Grid, Card, CardActionArea, CardMedia, Box, Typography } from "@mui/material";

import { IProduct } from "@/interfaces";

interface Props {
    product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
    
    const [isHover, setIsHover] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const productImage = useMemo(() => {
        return isHover
            ? `/products/${ product.images[1] }`
            : `/products/${ product.images[0] }`
    }, [isHover, product.images]);
    
    return (
        <Grid 
            item 
            xs={6} 
            sm={4}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <Card>
                <NextLink href="/product/slug" passHref prefetch={ false }>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            className="fadeIn"
                            image={ productImage }
                            alt={ product.title }
                            onLoad={() => setIsImageLoaded(true)}
                        />
                    </CardActionArea>
                </NextLink>
            </Card>

            <Box sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }} className='fadeIn'>
                <Typography fontWeight={700}>{ product.title }</Typography>
                <Typography fontWeight={400}>${ product.price }</Typography>
            </Box>
        </Grid>
    )
}   