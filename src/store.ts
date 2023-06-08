import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/products/productSlice'
import cartReducer from './features/cart/cartSlice'

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart:cartReducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

