import { createSlice } from '@reduxjs/toolkit'
import { IProduct } from '../../pages/productPage/productPage'

interface FavoritesState {
  favoriteItems: IProduct[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null | undefined | string
}

const initialState: FavoritesState = {
  favoriteItems: [],
  status: 'idle',
  error: null,
}

const favoritesSlice = createSlice({
  name: 'favoriteItems',
  initialState,
  reducers: {
    getLikedProducts: (state) => {
      const favorites = localStorage.getItem('favorites')
      let favoritesArr: IProduct[] = []

      if (favorites) {
        favoritesArr = JSON.parse(favorites)
      }
      state.favoriteItems = favoritesArr
    },
    updateLikedProducts: (state, action: { payload: IProduct; type: string }) => {
      const isProductLiked = state.favoriteItems.find(
        (item: IProduct) => item.id === action.payload.id,
      )
      if (isProductLiked) {
        state.favoriteItems = state.favoriteItems.filter(
          (item: IProduct) => item.id !== action.payload.id,
        )
        localStorage.setItem('favorites', JSON.stringify(state.favoriteItems))
      } else {
        state.favoriteItems.push(action.payload)
        localStorage.setItem('favorites', JSON.stringify(state.favoriteItems))
      }
    },
    clearLikedItems: (state) => {
      state.favoriteItems.length = 0
      localStorage.removeItem('favorites')
    },
  },
})

export const { getLikedProducts, updateLikedProducts, clearLikedItems } = favoritesSlice.actions
export default favoritesSlice.reducer
