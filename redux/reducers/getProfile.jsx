
import { createSlice } from '@reduxjs/toolkit'
import { getProfileAuth } from '../async/getProfile'

const initialState = {
  data: []
}

export const getProfile = createSlice({
  name: 'getProfile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(getProfileAuth.pending, (state) => {
    //   state.data = null;
    // });

    builder.addCase(getProfileAuth.fulfilled, (state, action) => {
      state.data = action.payload
    });
  },
})

export { getProfileAuth }
export default getProfile.reducer