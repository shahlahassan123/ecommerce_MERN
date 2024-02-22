import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    addresses: null,
    selectedAddress: null, 
}

export const addressSlice = createSlice({
    name : "address",
    initialState,
    reducers: {
        addAddress : (state,action) =>{
            state.addresses = action.payload
        },
        selectAddress : (state,action) =>{
            state.selectedAddress = action.payload

        },
    }
})

export const {addAddress,selectAddress} = addressSlice.actions;
export default addressSlice.reducer