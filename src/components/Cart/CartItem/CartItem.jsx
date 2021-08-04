import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';

import useStyles from './styles';

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => {
    const classes = useStyles()

    const handleUpdateCartQty = (productId, quantity) => onUpdateCartQty(productId, quantity)
    const handleRemoveFromCart = (productId) => onRemoveFromCart(productId)


    return (
        <Card className="cart-item">
            <CardMedia image={item.media.source} alt={item.name} className={classes.media}></CardMedia>
            <CardContent className={classes.cardContent}>
                <Typography variant="h4">{item.name}</Typography>
                <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions>
                <div className={classes.buttons}>
                    <Button type="button" size="small" onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}>-</Button>
                    <Typography>&nbsp;{item.quantity}&nbsp;</Typography>
                    <Button type="button" size="small" onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}>+</Button>
                </div>
                <Button variant="contained" type="button" color="secondary" onClick={() => handleRemoveFromCart(item.id)}>Remove</Button>
            </CardActions>
        </Card>
    )
}

export default CartItem
