import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchItems, addItem,  updateItem, deleteItem  } from './cartAPI';
import { RootState } from '../../app/store';

export interface Item {
  id: string;
  title: string;
  brand: string;
  thumbnail: string;
  price: number;
  change:string;
  quantity:number;
  description: string;
}

export interface CartState{
  items:Item[];
  status:'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState:CartState = {
  items:[],
  status: 'idle',
};


export const fetchAsync = createAsyncThunk<Item[], void, { state: RootState }>(
  'cart/fetchItems',
  async () => {
    const response = await fetchItems();
    return response.data;
  }
);

export const addAsync   = createAsyncThunk(
  'cart/addItem',
  async (item:Item) => {
    const {id,title,brand,thumbnail,price}=item
    const response = await addItem({id,title,brand,thumbnail,price, quantity:1});
    return response.data;
  }
);

export const deleteAsync = createAsyncThunk(
  'cart/deleteItem',
  async (id:string) => {
   await deleteItem(id);
    return id;
  }
);

export const updateAsync = createAsyncThunk(
  'cart/updateItem',
  async ({ id, change }: { id: number; change: { quantity: number } }) => {
    const response = await updateItem(id, change);
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(addAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(deleteAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item => item.id === action.payload);
        state.items.splice(index, 1);
      })
      .addCase(updateAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.items.findIndex(item=>item.id===action.payload.id)
        state.items.splice(index,1,action.payload);
      });
  },
});

export default cartSlice.reducer;
