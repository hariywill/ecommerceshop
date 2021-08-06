import React, { useState, useEffect } from 'react';
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';

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
    const history = useHistory()

    const lastStep = () => setActiveStep(prevStep => prevStep - 1)
    const nextStep = () => setActiveStep(prevStep => prevStep + 1)

    const [isFinished, setIsFinished] = useState(false)
    const timeout = () => {
        setTimeout(() => {
            setIsFinished(true)
        }, 3000);
    }
    
    const generateToken = async () => {
        if (cart.id) {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'})
                setCheckoutToken(token)
            } catch (error) {
                console.log(error)
                history.pushState('/')
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
        : <PaymentForm checkoutToken={checkoutToken} nextStep={nextStep} lastStep={lastStep} onCaptureCheckout={onCaptureCheckout} shippingInfo={shippingInfo} timeout={timeout} />
    )

    let Confirmation = () => (order.customer ? (
            <>
                <div>
                    <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
                    <Divider className={classes.divider} />
                    <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
                </div>
                <br />
                <Button component={Link} to="/" variant="outlined" type="button">Back to home</Button>
            </>
        ) : isFinished ? (
            <>
                <div>
                    <Typography variant="h5">Thank you for your purchase!</Typography>
                    <Divider className={classes.divider} />
                </div>
                <br />
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
