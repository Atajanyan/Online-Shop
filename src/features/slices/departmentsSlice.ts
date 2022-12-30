import { IDepartment } from '../../firebase/queries';
import { RootState } from '../../app/store'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllDepartments } from '../../firebase/queries'

interface DepartmentsState {
  departments: IDepartment[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null | undefined | string
}

const initialState = {
  departments: [],
  status: 'idle',
  error: null,
} as DepartmentsState

export const fetchDepartments = createAsyncThunk(
  'departments/fetchAllDepartments',
  getAllDepartments,
)

const departmentsSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.departments = action.payload.sort((a, b) => a.name.localeCompare(b.name))
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default departmentsSlice.reducer

export const selectAllDepartments = (state: RootState) => state.departments.departments
export const selectDepartmentsStatus = (state: RootState) => state.departments.status
export const selectDepartmentsError = (state: RootState) => state.departments.error
export const selectDepartment = (state: RootState, id: string) =>
  state.departments.departments.find((department) => department.id === id)
