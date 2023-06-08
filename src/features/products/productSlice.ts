import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProducts  } from './productsAPI';
import { Item } from '../cart/cartSlice';

export interface Product extends Item {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  description: string;
}

export interface ProductState{
  products:Product[];
  status:'idle' | 'loading' | 'succeeded' | 'failed';
}
const initialState :ProductState= {
  products:[],
  status: 'idle',
};


export const fetchAsync = createAsyncThunk(
  'products/fetchProduct',
  async () => {
    const response = await fetchProducts();
    return response.data;
  }
);

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      });
  },
});

export default productSlice.reducer;
