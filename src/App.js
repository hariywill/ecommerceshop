import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { commerce } from './lib/commerce'

import { Navbar, Products, Cart, Checkout } from './components'
import { CssBaseline } from '@material-ui/core'

const App = () => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})
  const [order, setOrder] = useState({})
  const [errorMsg, setErrorMsg] = useState('')

  const fetchProducts = async () => {
    const { data } = await commerce.products.list()
    console.log(data)
    setProducts(data)
  }

  const fetchCart = async () => {
    const data = await commerce.cart.retrieve()
    console.log(data)
    setCart(data)
  }

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity)
    setCart(item.cart)
  }

  const handleUpdateCartQty = async (productId, quantity) => {
    const item = await commerce.cart.update(productId, { quantity })
    setCart(item.cart)
  }

  const handleRemoveFromCart = async (productId) => {
    const item = await commerce.cart.remove(productId)
    setCart(item.cart)
  }

  const handleEmptyCart = async () => {
    const item = await commerce.cart.empty()
    setCart(item.cart)
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh()
    setCart(newCart)
  }

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)

      setOrder(incomingOrder)
      refreshCart()
    } catch (error) {
      setErrorMsg(error.data.error.message)
    }
  }


  useEffect(() => {
    fetchProducts()
    fetchCart()
  }, [])


  console.log(products)
  return (
    <Router>
      <div style={{display: "flex"}}>
        <CssBaseline />
        <Navbar totalItems={cart.total_items} />
        <Switch>
          <Route exact path="/">
            <Products
              products={products} 
              onAddToCart={handleAddToCart} 
            />
          </Route>
          <Route path="/cart">
            <Cart
              cart={cart} 
              onUpdateCartQty={handleUpdateCartQty} 
              onRemoveFromCart={handleRemoveFromCart} 
              onEmptyCart={handleEmptyCart}
            />
          </Route>
          <Route path="/checkout">
            <Checkout
              cart={cart}
              order={order}
              onCaptureCheckout={handleCaptureCheckout}
              error={errorMsg}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
