import React from 'react'
import { Grid } from '@material-ui/core'

import Product from './Product/Product'
import useStyles from './styles'

const mockProducs = [
    { id: 1, name: "Apple", description: "Pink lady", price: 2.69, image: "http://via.placeholder.com/2" },
    { id: 2, name: "Orange", description: "Naval", price: 1.69, image: "http://via.placeholder.com/1" },
]


const Products = () => {
    const classes = useStyles()

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container justifyContent="center" spacing={4}>
                {mockProducs.map((product) => {
                    return (
                        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                            <Product product={product} />
                        </Grid>
                    )
                })}
            </Grid>
        </main>
    )
}

export default Products
