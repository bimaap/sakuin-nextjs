
import { createSlice } from '@reduxjs/toolkit'
import { getUserAuth } from '../async/getUser'

const initialState = {
  data: []
}

export const getUser = createSlice({
  name: 'getUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserAuth.fulfilled, (state, action) => {
      state.data = action.payload
    });
  },
})

export { getUserAuth }
export default getUser.reducer