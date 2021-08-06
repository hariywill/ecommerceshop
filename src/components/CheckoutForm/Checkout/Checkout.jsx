import React, { useState, useEffect } from 'react';
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { commerce } from '../../../lib/commerce';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import useStyles from './styles';

const steps = ['Shipping address', 'Payment details']

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
    const classes = useStyles()
    const [checkoutToken, setCheckoutToken] = useState(null)
    const [activeStep, setActiveStep] = useState(0)
    const [shippingInfo, setShippingInfo] = useState({})

    const lastStep = () => setActiveStep(prevStep => prevStep - 1)
    const nextStep = () => setActiveStep(prevStep => prevStep + 1)
    
    const generateToken = async () => {
        if (cart.id) {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'})
                setCheckoutToken(token)
            } catch (error) {
                console.log(error);
            }
        }
    }
    
    const test = (data) => {
            setShippingInfo(data)
            nextStep()
         }

    useEffect(() => {
        generateToken()
    }, [cart])

    const Form = () => ( activeStep === 0
        ? <AddressForm checkoutToken={checkoutToken} nextStep={nextStep} test={test} />
        : <PaymentForm checkoutToken={checkoutToken} nextStep={nextStep} lastStep={lastStep} onCaptureCheckout={onCaptureCheckout} shippingInfo={shippingInfo} />
    )

    let Confirmation = () => (order.customer ? (
            <>
                <div></div>
                <Button component={Link} to="/" variant="outlined" type="button">Back to home</Button>
            </>
        ) : (
            <div className={classes.spinner}>
                <CircularProgress />
            </div>
        )
    )

    if (error) {
        Confirmation = () => (
            <>
              <Typography variant="h5">Error: {error}</Typography>
              <br />
              <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
            </>
        )
    }

    return (
        <>
            <CssBaseline />
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper className={classes.stepper} activeStep={activeStep}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form /> }
                </Paper>
            </main>
        </>
    )
}

export default Checkout
