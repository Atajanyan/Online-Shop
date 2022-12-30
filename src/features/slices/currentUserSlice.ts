import { ICartItem } from './../../pages/cart/addToCart'
import { IProduct } from './../../pages/productPage/productPage'
import {
  auth,
  createNewUser,
  getUserById,
  signIn,
  updateUserCart,
  updateUserFavorites,
} from './../../firebase/auth'
import { signOut } from 'firebase/auth'
import { RootState } from './../../app/store'
import { ICustomerOrder, IUser, IUserArgs, TUpdateCartAction, TUpdateFavoritesAction } from './types'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { clearCartItems } from './cartSlice'
import { clearLikedItems } from './favoritesSlice'

interface UserState {
  currentUser: null | IUser;
  userCartSubTotal: number;
  orders: ICustomerOrder[] | null;
  isAdmin: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: null | undefined | string;
}

const initialState: UserState = {
  currentUser: null,
  userCartSubTotal: 0,
  orders: null,
  isAdmin: false,
  status: 'idle',
  error: null,
}

export const signUpUser = createAsyncThunk<IUser, IUserArgs, { state: RootState }>(
  'currentUser/signUp',
  async ({ email, password, name }, { getState }) => {
    const {
      cartItems: { cartItems },
      favoriteItems: { favoriteItems },
    } = getState()
    const response = await createNewUser(email, password, name, favoriteItems, cartItems)
    return response as IUser
  },
)

export const signInUser = createAsyncThunk<
  IUser,
  { email: string; password: string },
  { state: RootState }
>('currentUser/signIn', async ({ email, password }, { getState }) => {
  const {
    cartItems: { cartItems },
    favoriteItems: { favoriteItems },
  } = getState()
  const response = await signIn(email, password, favoriteItems, cartItems)
  return response
})

export const signOutUser = createAsyncThunk('currentUser/signOut', async (_, { dispatch }) => {
  await signOut(auth)
  dispatch(clearCartItems())
  dispatch(clearLikedItems())
})

export const getCurrentUser = createAsyncThunk('currentUser/getCurrentUser', async () => {
  if (auth.currentUser) {
    return (await getUserById(auth.currentUser.uid))
  } else return null
})

export const updateUserLiked = createAsyncThunk<
  IProduct[],
  { likedItem?: IProduct; actionType: TUpdateFavoritesAction },
  { state: RootState }
>('currentUser/updateFavorites', async ({ likedItem, actionType }, { getState }) => {
  const userId = getState().currentUser.currentUser?.uid
  console.log(userId, 'userId before passing t func')

  const updatedFavorites = (
    await updateUserFavorites(userId as string, actionType, likedItem as IProduct)
  ).favoriteItems
  return updatedFavorites
})

export const updateUserCartItems = createAsyncThunk<
  ICartItem[],
  { product: IProduct; actionType: TUpdateCartAction },
  { state: RootState }
>('currentUser/updateCart', async ({ product, actionType }, { getState }) => {
  const userId = getState().currentUser.currentUser?.uid
  const updatedCart = (await updateUserCart(userId as string, product, actionType)).cartItems
  return updatedCart
})

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    calcUserCartSubtotal: (state) => {
      if (state.currentUser) {
        state.userCartSubTotal = state.currentUser.cartItems.reduce((prev, current) => {
          return prev + current.product.price * current.qty
        }, 0)
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.currentUser = action.payload
      })
      .addCase(signUpUser.rejected, (state, action) => {
        ;(state.status = 'failed'), (state.error = action.error.message)
      })
      .addCase(signInUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.currentUser = action.payload
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.status = 'idle'
        state.currentUser = null
        state.isAdmin = false
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
       if(action.payload) {
        if(action.payload.user.email === 'an.mkhitaryann@gmail.com') {
          state.isAdmin = true
        }
        state.currentUser = action.payload.user
        state.orders = action.payload.orders
       }
      })
      .addCase(updateUserLiked.fulfilled, (state, action) => {
        if (state.currentUser) {
          state.currentUser.favoriteItems = action.payload
        }
      })
      .addCase(updateUserCartItems.fulfilled, (state, action) => {
        if (state.currentUser) {
          state.currentUser.cartItems = action.payload
        }
      })
  },
})

export const { calcUserCartSubtotal } = currentUserSlice.actions

export default currentUserSlice.reducer
