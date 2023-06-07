import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    minPrice: null,
    maxPrice: null
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    STORE_PRODUCTS: (state,action) => {
        state.products = action.payload.products
    },
    GET_PRICE_RANGE: (state,action) => {
        const arr=[]
        const {products} = action.payload

        products.map((product)=>{
           return arr.push(product.price)
        })
        state.minPrice = Math.min(...arr)
        state.maxPrice = Math.max(...arr)
                
    }
  }
});

export const {STORE_PRODUCTS,
              GET_PRICE_RANGE} = productSlice.actions

export const selectProducts = (state) => state.product.products
export const selectMinPrice = (state) => state.product.minPrice
export const selectMaxPrice = (state) => state.product.maxPrice

export default productSlice.reducer