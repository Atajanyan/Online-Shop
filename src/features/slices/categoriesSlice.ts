import { getAllCategories,ICategory } from '../../firebase/queries'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


export const fetchedCategories = createAsyncThunk('allcategories/fetchedCategories', async () => {
    const response = await getAllCategories()
    return response
  })


export interface categoriesState {
    allCategories: ICategory[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null | undefined | string
  }
  
  const initialState: categoriesState = {
    allCategories: [],
    status: 'idle',
    error: null,
  }
  
  const categoriesForAdminSlice = createSlice({
    name: 'allcategories',
    initialState,
    reducers: {
  
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchedCategories.pending, (state) => {
          state.status = 'loading'        
        })
        .addCase(fetchedCategories.fulfilled, (state, action) => {
          state.status = 'succeeded'
          state.allCategories = action.payload.sort((a,b)=> a.name.localeCompare(b.name))
        })
        .addCase(fetchedCategories.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        })
    },
  })
  
  
  export default categoriesForAdminSlice.reducer
  
  
  