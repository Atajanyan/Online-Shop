import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAllUsers } from '../../firebase/queries'
import { async } from '@firebase/util'
import { IUsers } from '../../firebase/queries'

export const fetchUsers = createAsyncThunk<
  {
    users: IUsers[]
    pages: number
  },
  {
    pages: number
  }
>('users/fetchUsers', async ({ pages }) => {
  const users = await getAllUsers()
  return { users, pages }
})

export interface UsersState {
  users: IUsers[]
  pages: number
  needLoad: boolean
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null | undefined | string
}

const initialState: UsersState = {
  users: [],
  pages: 10,
  needLoad: true,
  status: 'idle',
  error: null,
}

const usersToDisplaySlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.users = action.payload.users.sort((a, b) => a.name.localeCompare(b.name))
        const original = state.users.length
        state.users = state.users.splice(0, action.payload.pages)
        if (original === state.users.length) {
          state.needLoad = false
          console.log(original, state.users.length, 'in if')
        } else {
          state.needLoad = true
        }
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default usersToDisplaySlice.reducer
export const { deleteUser } = usersToDisplaySlice.actions
