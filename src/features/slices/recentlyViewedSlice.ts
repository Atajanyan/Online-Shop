import { IProduct } from '../../pages/productPage/productPage'
import { createSlice } from '@reduxjs/toolkit'

interface RecentlyViewedState {
  recentlyViewed: IProduct[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null | undefined | string
}

const initialState: RecentlyViewedState = {
  recentlyViewed: [],
  status: 'idle',
  error: null,
}

const recentlyViewedSlice = createSlice({
  name: 'recentlyViewed',
  initialState,
  reducers: {
    getRecentlyViewedItems(state) {
      const recentlyViewed = localStorage.getItem('recentlyViewed')
      let recentlyViewedProducts
      if (recentlyViewed) {
        recentlyViewedProducts = JSON.parse(recentlyViewed)
        state.recentlyViewed = recentlyViewedProducts.reverse()
      }
    },
    updateRecentlyViewedItems(state, action: { payload: IProduct; type: string }) {
      const recentlyViewed = localStorage.getItem('recentlyViewed')
      let recentlyViewedProducts: IProduct[] = []
      if (recentlyViewed) {
        recentlyViewedProducts = JSON.parse(recentlyViewed)
        const isProductViewed = recentlyViewedProducts.find(
          (item: IProduct) => item.id === action.payload.id
        )
        if (!isProductViewed) {
          if (recentlyViewedProducts.length === 10) {
            recentlyViewedProducts.pop()
          }
          recentlyViewedProducts.push(action.payload)
          localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewedProducts))
          state.recentlyViewed = recentlyViewedProducts.reverse()
        }
      } else {
        localStorage.setItem('recentlyViewed', JSON.stringify([action.payload]))
        state.recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') as string)
      }
    },
  },
})

export const { getRecentlyViewedItems, updateRecentlyViewedItems } = recentlyViewedSlice.actions

export default recentlyViewedSlice.reducer
