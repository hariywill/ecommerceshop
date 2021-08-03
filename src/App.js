import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { commerce } from './lib/commerce'

import { Navbar, Products, Cart } from './components'

const App = () => {
  const [products, setProducts] = useState([])

  const fetchProducts = async () => {
    const { data } = await commerce.products.list()
    setProducts(data)
  }

  useEffect(() => {
    fetchProducts()
  }, [])
  console.log(products)
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Products products={products} />
          </Route>
          <Route path="/cart">
            <Cart cart={products} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
