import { ICartItem } from '../../pages/cart/addToCart'
import { IProduct } from '../../pages/productPage/productPage'
import { createSlice } from '@reduxjs/toolkit'

interface CartState {
  cartItems: ICartItem[]
  subtotal: number
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null | string
}

const initialState: CartState = {
  cartItems: [],
  subtotal: 0,
  status: 'idle',
  error: null,
}

const cartSlice = createSlice({
  name: 'cartItems',
  initialState,
  reducers: {
    getCartItems: (state) => {
      const cartItems = localStorage.getItem('cartItems')
      if (cartItems) {
        state.cartItems = JSON.parse(cartItems)
      }
    },
    updateCartItems: (state, action: { payload: IProduct; type: string }) => {
      const product = action.payload
      const cartItem = state.cartItems.find((item) => item.product.id === product.id)
      if (!cartItem) {
        state.cartItems.push({ product, qty: 1 })
      } else {
        cartItem.qty++
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    addQtyToCartItem: (state, action: { payload: IProduct; type: string }) => {
      const product = action.payload
      state.cartItems = state.cartItems.map((item) => {
        if (item.product.id === product.id && item.product.inStock >= 1) {
          item.qty++
        }
        return item
      })
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    removeQtyFromCartItem: (state, action: { payload: IProduct; type: string }) => {
      const product = action.payload
      state.cartItems = state.cartItems.map((item) => {
        if (item.product.id === product.id && item.qty > 1) {
          item.qty--
        }
        return item
      })
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    removeCartItem: (state, action: { payload: IProduct; type: string }) => {
      const product = action.payload
      state.cartItems = state.cartItems.filter((item) => item.product.id !== product.id)
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    clearCartItems: (state) => {
      state.cartItems.length = 0
      localStorage.removeItem('cartItems')
    },
    calcCartSubtotal: (state) => {
      state.subtotal = state.cartItems.reduce((prev, current) => {
        return prev + current.product.price * current.qty
      }, 0)
    },
  },
})

export const {
  getCartItems,
  updateCartItems,
  addQtyToCartItem,
  removeQtyFromCartItem,
  removeCartItem,
  calcCartSubtotal,
  clearCartItems,
} = cartSlice.actions

export default cartSlice.reducer
