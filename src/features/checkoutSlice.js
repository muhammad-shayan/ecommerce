import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    billingAddress: '',
    shippingAddress: ''
}

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    ADD_BILLING_ADDRESS: (state,action) => {
        state.billingAddress = action.payload
    },
    ADD_SHIPPING_ADDRESS: (state,action) => {
        state.shippingAddress = action.payload
    }
  }  
});
    
export const {ADD_BILLING_ADDRESS,
            ADD_SHIPPING_ADDRESS} = checkoutSlice.actions

export const selectBillingAddress = (state) => state.checkout.billingAddress
export const selectShippingAddress = (state) => state.checkout.shippingAddress
export default checkoutSlice.reducer