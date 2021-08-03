import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import CartItem from './CartItem/CartItem';
import useStyles from './styles';

const Cart = ({ cart }) => {
    const classes = useStyles
    const [cartItems, setCartItems] = useState([])
    console.log(cart);

    useEffect(() => {
        setCartItems(cart)
    }, [cartItems])
    console.log(cartItems);

    const renderEmptyCart = () => {
        return (
            <Typography variant="subtitle1">Your cart is empty,
                <Link className={classes.link} to="/">Start adding some</Link>!
            </Typography>
        )
    }

    const renderCart = () => {
        return (
            <>
                <Grid container spacing={3}>
                    {cartItems.map((item) => {
                        console.log(item)
                        return (
                            <Grid item key={item.id} xs={12} sm={4}>
                                <CartItem item={item} />
                            </Grid>
                        )
                    })}
                </Grid>
                <div className={classes.cartDetails}>
                    <Typography variant="h4">
                        Subtotal: {cartItems.length}
                    </Typography>
                    <div>
                        <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="primary" onClick={handleEmptyCart}>Empty cart</Button>
                        <Button className={classes.checkoutButton} component={Link} to="/" size="large" type="button" variant="contained" color="primary">Checkout</Button>
                    </div>
                </div>
            </>
        )
    }

    const handleEmptyCart = () => {
        setCartItems([])
    }

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
            {!cartItems.length ? renderEmptyCart() : renderCart()}
        </Container>
    )
}

export default Cart
