import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../slices/CartSlice.js'
import addressReducer from '../slices/AddressSlice.js'

export const store = configureStore({
  reducer: {
    cart : cartReducer,
    address: addressReducer
  },
})