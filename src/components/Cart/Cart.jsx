import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import CartItem from './CartItem/CartItem';
import useStyles from './styles';

const Cart = ({ cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart }) => {
    const classes = useStyles()
    
      const handleEmptyCart = () => onEmptyCart();

    const renderEmptyCart = () => {
        return (
            <Typography variant="subtitle1">Your cart is empty,&nbsp;
                <Link className={classes.link} to="/">start adding some</Link>!
            </Typography>
        )
    }

    if (!cart.line_items) return "Loading..."

    const renderCart = () => {
        return (
            <>
                <Grid container spacing={3}>
                    {cart.line_items.map((item) => {
                        return (
                            <Grid item key={item.id} xs={12} sm={4}>
                                <CartItem item={item} onUpdateCartQty={onUpdateCartQty} onRemoveFromCart={onRemoveFromCart} />
                            </Grid>
                        )
                    })}
                </Grid>
                <div className={classes.cardDetails}>
                    <Typography variant="h4">
                        Subtotal: {cart.subtotal.formatted_with_symbol}
                    </Typography>
                    <div>
                        <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty cart</Button>
                        <Button className={classes.checkoutButton} component={Link} to="/checkout" size="large" type="button" variant="contained" color="primary">Checkout</Button>
                    </div>
                </div>
            </>
        )
    }

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
            {!cart.line_items.length ? renderEmptyCart() : renderCart()}
        </Container>
    )
}

export default Cart
