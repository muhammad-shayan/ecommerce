import { configureStore,combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import cartReducer from "../features/cartSlice";
import checkoutReducer from "../features/checkoutSlice";
import filterReducer from "../features/filterSlice";
import orderReducer from "../features/orderSlice";
import productReducer from "../features/productSlice";


// export const store = configureStore({
//     reducer: {
//         auth: authSlice,
//         cart: cartSlice,
//         checkout: checkoutSlice,
//         filter: filterSlice,
//         orders: orderSlice,
//         products: productSlice

//      }
// })

const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    filter: filterReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    orders: orderReducer,
  });
  
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
  
  export default store;