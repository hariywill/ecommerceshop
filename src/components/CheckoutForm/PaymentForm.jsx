import React from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Review from './Review';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

const PaymentForm = ({ checkoutToken, nextStep, lastStep, onCaptureCheckout, shippingInfo, timeout }) => {
    

    const handleSubmit = async (e, elements, stripe) => {
        e.preventDefault()
        if (!elements) return
        if (!stripe) return

        const cardElement = elements.getElement(CardElement)
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement
        })
        if (error) {
            console.log(error)
        } else {
            const orderInfo = {
                line_items: checkoutToken.live.line_items,
                customer: {
                    firstname: shippingInfo.firstname,
                    lastname: shippingInfo.lastname,
                    email: shippingInfo.email
                },
                shipping: {
                    name: 'Primary',
                    street: shippingInfo.address1,
                    town_city: shippingInfo.city,
                    country_state: shippingInfo.shippingSubdivision,
                    postal_zip_code: shippingInfo.zip,
                    country: shippingInfo.shippingCountry
                },
                fullfilled: {
                    shipping_method: shippingInfo.shippingOption
                },
                payment: {
                    gateway: 'stripe',
                    stripe: {
                        payment_method_id: paymentMethod.id
                    }
                }
            }
            onCaptureCheckout(checkoutToken.id, orderInfo)
            timeout()
            nextStep()
        }
    }
    
    return (
        <>
            <Review checkoutToken={checkoutToken} />
            <Divider />
            <Typography variant="h6" gutterBottom style={{margin: '20px 0'}}>Payment method</Typography>
            <Elements stripe={stripePromise}>
                <ElementsConsumer> 
                    {({ elements, stripe }) => (
                        <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                            <CardElement />
                            <br /> <br />
                            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                                <Button variant="outlined" onClick={lastStep}>Back</Button>
                                <Button type="submit" variant="contained" disabled={!stripe}>
                                    Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                                </Button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
        </>
    )
}

export default PaymentForm
