
import { createSlice } from '@reduxjs/toolkit'
import { getTransactionsAuth } from '../async/getTransactions'

const initialState = {
  data: [],
}

export const getTransactions = createSlice({
  name: 'getTransactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTransactionsAuth.fulfilled, (state, action) => {
      state.data = action.payload
    })
  },
})

export { getTransactionsAuth }
export default getTransactions.reducer