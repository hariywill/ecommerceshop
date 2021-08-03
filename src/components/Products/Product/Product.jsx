import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons'

import useStyles from './styles.js'


const Product = ({ product: { name, description, price, media } }) => {
    const classes = useStyles()

    const handleAddToCart = () => {
        console.log("Added")
    }
    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={media.source} title={name} />
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                        {price.formatted_with_symbol}
                    </Typography>
                </div>
                 <Typography dangerouslySetInnerHTML={{ __html: description }} variant="body2" color="textSecondary" component="p" />
            </CardContent>
            <CardActions className={classes.cardActions} disableSpacing>
                <IconButton aria-label="Add to Cart" onClick={handleAddToCart}>
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Product
