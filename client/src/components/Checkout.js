import React from 'react'
import Address from './Address'
import {useSelector} from 'react-redux'

const Checkout = () => {

    const cart = useSelector((state)=> state.cart)
    let cartProducts = cart.cartItems

  return (
    <div>
      <Address/>
    </div>
  )
}

export default Checkout
