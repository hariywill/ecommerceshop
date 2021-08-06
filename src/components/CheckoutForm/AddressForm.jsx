import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { commerce } from '../../lib/commerce';
import CustomTextField from './CustomTextField';

const AddressForm = ({ checkoutToken, nextStep, test }) => {
    const [shippingCountries, setShippingCountries] = useState([])
    const [shippingCountry, setShippingCountry] = useState('')
    const [shippingSubdivisions, setShippingSubdivisions] = useState([])
    const [shippingSubdivision, setShippingSubdivision] = useState('')
    const [shippingOptions, setShippingOptions] = useState([])
    const [shippingOption, setShippingOption] = useState('')
    const methods = useForm()

    const fetchShippingCountries = async (id) => {
        const { countries } = await commerce.services.localeListShippingCountries(id)
        setShippingCountries(countries)
        setShippingCountry(Object.keys(countries)[0])
    }

    const fetchShippingSubdivisions = async (country) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(country)
        setShippingSubdivisions(subdivisions)
        setShippingSubdivision(Object.keys(subdivisions)[0])
    }

    const fetchShippingOptions = async (id, country, subdivision) => {
        const options = await commerce.checkout.getShippingOptions(id, { country: country, region: subdivision })
        setShippingOptions(options)
        console.log(options[0]);
        setShippingOption(options[0].id)
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    }, [])

    useEffect(() => {
        if (shippingCountry) fetchShippingSubdivisions(shippingCountry)
    }, [shippingCountry])

    useEffect(() => {
        console.log(shippingSubdivisions);
        if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision)
    }, [shippingSubdivision])

    return (
        <div>
            <Typography variant="h6" gutterBottom>Shipping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => test({ ...data, shippingCountry, shippingSubdivision, shippingOption }))}>
                    <Grid spacing={3} container>
                        <CustomTextField required name="firstname" label="First name" />
                        <CustomTextField required name="lastname" label="Last name" />
                        <CustomTextField required name="address1" label="Address line 1" />
                        <CustomTextField required name="email" label="Email" />
                        <CustomTextField required name="city" label="City" />
                        <CustomTextField required name="zip" label="Zip code" />
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                {Object.entries(shippingCountries).map(([ code, name ]) => ({ code: code, name: name })).map(item => {
                                    return (
                                        <MenuItem key={item.code} value={item.code}>
                                            {item.name}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                                {Object.entries(shippingSubdivisions).map(([ code, name ]) => ({ code: code, name: name })).map(item => {
                                    return (
                                        <MenuItem key={item.code} value={item.code}>
                                            {item.name}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Option</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                                {shippingOptions.map((option) => ({ id: option.id, name: `${option.description} - ${option.price.formatted_with_symbol}` })).map(item => {
                                    return (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.name}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </Grid>
                    </Grid>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button component={Link} to="/cart" variant="outlined">Back to cart</Button>
                        <Button type="submit" variant="contained" color="primary">Next</Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}

export default AddressForm
