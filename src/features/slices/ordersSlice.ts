import { IAddressInfo, ICustomerOrder, IUser } from './types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { postCustomerOrder } from '../../firebase/queries';
import { RootState } from '../../app/store';
import { getOrderByNumber } from '../../firebase/auth';
import { async } from 'q';
import { getAllOrders } from '../../firebase/queries';

interface IOrdersState {
  orders: ICustomerOrder[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null | undefined | string
}

const initialState: IOrdersState = {
    orders: [],
    status: 'idle',
    error: null
}


export const placeOrder = createAsyncThunk<ICustomerOrder, {shippingInfo: IAddressInfo, billingInfo: IAddressInfo}, {state: RootState}>(
    'customerOrders/placeOrder', async({shippingInfo, billingInfo }, {getState}) => {
        const {uid, cartItems} = getState().currentUser.currentUser as IUser
        const {userCartSubTotal} = getState().currentUser
     const newOrder = await postCustomerOrder(uid, cartItems, userCartSubTotal, shippingInfo, billingInfo)
     return newOrder
    }
)



const ordersSlice = createSlice({
    name: 'customerOrders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(placeOrder.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(placeOrder.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.orders.push(action.payload)
        })
        .addCase(placeOrder.rejected, (state, action) => {
            state.error = action.error.message
        })
    }
})


export default ordersSlice.reducer
