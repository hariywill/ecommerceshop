import React from 'react'
import useStyles from './styles'

const Checkout = () => {
    const classes = useStyles()
    return (
        <div>
            <div className={classes.toolbar} />
            <h4>Checkout page</h4>
        </div>
    )
}

export default Checkout
