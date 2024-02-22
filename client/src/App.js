import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {QueryClientProvider, QueryClient} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import NavBar from './components/NavBar.js'
import Home from "./components/Home.js"
import About from "./components/About.js"
import Contact from "./components/Contact.js"
import Product from "./components/Product.js"
import Login from "./components/Login.js"
import Register from "./components/Register.js"
import Profile from './components/Profile.js'
import Cart from './components/Cart.js'
import Checkout from './components/Checkout.js'
import OrderConfirmation from './components/OrderConfirmation.js'

const queryClient = new QueryClient()

const App = () => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product" element={<Product />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            {/* <Route path="/checkout" element={<Checkout />} /> */}
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
          </Routes>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
      </QueryClientProvider>
     
    </div>
  )
}

export default App
