import React from 'react'
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Grid } from '@material-ui/core';
//<FormInput required name="firstname" label="First name" />

const CustomTextField = ({ required, name, label }) => {
    const { control } = useFormContext()
    const isError = false

    return (
        <Grid item xs={12} sm={6}>
            <Controller
                render = {({ field })=> (
                <TextField
                    fullWidth
                    label={label}
                    required
                />
            )}
                name={name}
                control={control}
                error={isError}
            />
        </Grid>
    )
}

export default CustomTextField
