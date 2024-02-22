import { createSlice } from '@reduxjs/toolkit'
import {toast} from 'react-toastify'


const initialState = {
  cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
  cartTotalQuantity : 0,
  cartTotalAmount : 0
}



export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart : (state,action)=>{
        const existingProductIndex = state.cartItems.findIndex((item)=> item.id === action.payload.id)

        if(existingProductIndex >=0){
            state.cartItems[existingProductIndex] = {
                ...state.cartItems[existingProductIndex],
                cartQuantity : state.cartItems[existingProductIndex].cartQuantity + 1,
                qtyPrice : state.cartItems[existingProductIndex].qtyPrice + (state.cartItems[existingProductIndex].price)
                // qtyPrice : state.cartItems[existingProductIndex].price * (state.cartItems[existingProductIndex].cartQuantity + 1)
                
            }
        }else{
            let tempProduct = {...action.payload, cartQuantity : 1 , qtyPrice : action.payload.price}
            state.cartItems.push(tempProduct)
            toast.success('Added successfully to Cart', {
                position: 'top-right'
            })
        }  
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    decreaseQuantity : (state,action) =>{
        const existingProductIndex = state.cartItems.findIndex((item)=> item.id === action.payload.id)

        if(state.cartItems[existingProductIndex].cartQuantity === 1){
            state.cartItems.splice(existingProductIndex,1)

        }else{
            state.cartItems[existingProductIndex] = {
                ...state.cartItems[existingProductIndex],
                cartQuantity : state.cartItems[existingProductIndex].cartQuantity - 1,
                qtyPrice : state.cartItems[existingProductIndex].qtyPrice - state.cartItems[existingProductIndex].price

                
            }
        }   
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    removeFromCart: (state, action) => { 
        const existingProductIndex = state.cartItems.findIndex((item)=> item.id === action.payload.id)
        state.cartItems.splice(existingProductIndex,1)
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    updateCartTotalAmount : (state,acton) =>{
        state.cartTotalAmount = acton.payload
    },
    clearCart : (state) =>{
        // state.cartItems = []
        // state.cartTotalAmount = 0
        localStorage.removeItem('cartItems')

    }

  },
})

// Action creators are generated for each case reducer function
export const {addToCart, decreaseQuantity, removeFromCart, updateCartTotalAmount, clearCart} = cartSlice.actions

export default cartSlice.reducer