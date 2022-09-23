
import { createSlice } from '@reduxjs/toolkit'
import { getAllUsersAuth } from '../async/getAllUsers'

const initialState = {
  data: [],
}

export const getAllUsers = createSlice({
  name: 'getTransactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsersAuth.fulfilled, (state, action) => {
      state.data = []
      state.data = action.payload
    })
  },
})

export { getAllUsersAuth }
export default getAllUsers.reducer