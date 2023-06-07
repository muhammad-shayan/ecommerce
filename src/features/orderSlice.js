import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderHistory: [],
    totalOrderAmount: null
}

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    STORE_ORDERS: (state,action) => {
        state.orderHistory = action.payload
    },
    CALC_TOTAL_ORDER_AMOUNT: (state,action) => {
        const arr = []
        state.orderHistory.map((order)=>{
            return arr.push(order.orderAmount)
        })

        const totalAmount = arr.reduce((a,b)=>{
            return a+b
        },0)
        state.totalOrderAmount = totalAmount;
    }
  }
});

export const {STORE_ORDERS,
             CALC_TOTAL_ORDER_AMOUNT} = orderSlice.actions

export const selectOrderHistory = (state) => state.orders.orderHistory
export const selectTotalOrderAmount = (state) => state.orders.totalOrderAmount

export default orderSlice.reducer