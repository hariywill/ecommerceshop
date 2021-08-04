import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { commerce } from './lib/commerce'

import { Navbar, Products, Cart, Checkout } from './components'

const App = () => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])

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

  useEffect(() => {
    fetchProducts()
    fetchCart()
  }, [])


  console.log(products)
  return (
    <Router>
      <div>
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
            <Checkout />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
