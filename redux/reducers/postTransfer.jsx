
import { createSlice } from '@reduxjs/toolkit'
import { postTrnasferAuth } from '../async/postTransfer';

const initialState = {
  data: []
}

export const postTransfer = createSlice({
  name: 'postTransfer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postTrnasferAuth.fulfilled, (state, action) => {
      state.data = action.payload
    });
  },
})

export { postTrnasferAuth }
export default postTransfer.reducer