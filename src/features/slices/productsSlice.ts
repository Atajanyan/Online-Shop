import { TOrder } from '../../pages/products/sortBy'
import { IProduct } from '../../pages/productPage/productPage'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAllProducts, getProductsByCategory } from '../../firebase/queries'

export const fetchProductsByCategory = createAsyncThunk<
  {
    pages: number
    products: IProduct[]
  },
  {
    pages: number
    categoryId: string
  }
>('products/fetchProducts', async ({ pages, categoryId }) => {
  //@ts-ignore
  const products = await getProductsByCategory(categoryId)
  return { products, pages }
})

export const fetchProductsForSearch = createAsyncThunk<
  {
    products: IProduct[]
    pages: number
    keyword: string
  },
  {
    pages: number
    keyword: string
  }
>(
  'products/fetchAllProducts',

  async ({ pages, keyword }) => {
    const products = await getAllProducts()
    return { products, keyword, pages }
  },
)

export const fetchAllProducts = createAsyncThunk <
{
  pages: number
  products: IProduct[]
},
{
  pages:number
}
>(
  'allProducts/fetchedProducts',
  async ({pages}) => {
    const products = await getAllProducts()
    return { products, pages }
  },
)

export interface ProductsState {
  products: IProduct[]
  pages: number
  needLoad: boolean
  matchedProductsCount: number
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null | undefined | string
}

const initialState: ProductsState = {
  products: [],
  pages: 10,
  needLoad: true,
  matchedProductsCount: 0,
  status: 'idle',
  error: null,
}

interface ISortAction {
  type: string
  payload: TOrder 
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    sortByPrice(state, action: ISortAction) {
      if (action.payload === 'asc') {
        state.products = state.products.sort((a, b) => a.price - b.price)
      } else if (action.payload === 'desc') {
        state.products = state.products.sort((a, b) => b.price - a.price)
      } else {
        state.products = state.products.sort((a, b) => a.title.localeCompare(b.title))
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const { pages, products } = action.payload
        state.products = products.sort((a, b) => a.title.localeCompare(b.title))
        const original = state.products.length
        state.products = state.products.splice(0, pages)
        if (original === state.products.length) {
          state.needLoad = false
        } else {
          state.needLoad = true
        }
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(fetchProductsForSearch.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProductsForSearch.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const { products, keyword, pages } = action.payload
        state.products = products.filter((product) => {
          return product.title
            .replace(/\s/g, '')
            .toLowerCase()
            .includes(keyword.replace(/\s/g, '').toLowerCase())
        })
        state.matchedProductsCount = state.products.length
        const original = state.products.length
        state.products = state.products.splice(0, pages)
        if (original === state.products.length) {
          state.needLoad = false
        } else {
          state.needLoad = true
        }
      })
      .addCase(fetchProductsForSearch.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const { products, pages } = action.payload
        state.products = products.sort((a, b) => a.title.localeCompare(b.title))
        const original = state.products.length
        state.products = state.products.splice(0, pages)
        if (original === state.products.length) {
          state.needLoad = false
        } else {
          state.needLoad = true
        }
      })
  },
})

export default productsSlice.reducer
export const { sortByPrice } = productsSlice.actions
