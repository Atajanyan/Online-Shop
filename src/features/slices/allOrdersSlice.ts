import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAllOrders } from '../../firebase/queries';
import { IOrders } from '../../firebase/queries';


export const  getOrders = createAsyncThunk(
    'allOrders/getOrders',
    async() => {
        const orders = await getAllOrders()
        return { orders }
    }
)

interface IAllOrdersState {
    orders: IOrders[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null | undefined | string
  }
  
  const initialState: IAllOrdersState = {
      orders: [],
      status: 'idle',
      error: null
  }

const allOrdersSlice = createSlice({
    name: 'allOrders',
    initialState,
    reducers:{

    },
    extraReducers: (builder) => {
        builder
          .addCase(getOrders.pending, (state) => {
            state.status = 'loading'
          })
          .addCase(getOrders.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.orders = action.payload.orders
          })
          .addCase(getOrders.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
          })
      }
})




export default allOrdersSlice.reducer
