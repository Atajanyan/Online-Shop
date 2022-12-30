import { ICategory } from '../../firebase/queries'
import { RootState } from '../../app/store'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getSubdepartmentsWithCategoriesByDepartment } from '../../firebase/queries'

export interface ISubdepartment {
  id: string;
  name: string;
  departmentId: string;
  categories: ICategory[]
}

interface SubdepartmentsState {
  subdepartments: ISubdepartment[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null | undefined | string
}

const initialState: SubdepartmentsState = {
  subdepartments: [],
  status: 'idle',
  error: null,
}

export const fetchSubdepartments = createAsyncThunk(
  'subdepartments/fetchSubdepartments',
  async (departmentId: string) => {
    const response = await getSubdepartmentsWithCategoriesByDepartment(departmentId)
    return response
  },
)

const subdepartmentsSlice = createSlice({
  name: 'subdepartments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubdepartments.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchSubdepartments.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.subdepartments = action.payload.sort((a, b) => a.name.localeCompare(b.name))
      })
      .addCase(fetchSubdepartments.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default subdepartmentsSlice.reducer

export const selectSubdepartmentsByDepartment = (state: RootState) =>state.subdepartments.subdepartments
export const selectSubdepartmentsStatus = (state: RootState) => state.subdepartments.status
export const selectSubdepartmentsError = (state: RootState) => state.subdepartments.error
