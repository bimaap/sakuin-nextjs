
import { createSlice } from '@reduxjs/toolkit'
import { updateProfileAuth } from '../async/updateProfile';

const initialState = {
  data: []
}

export const updateProfile = createSlice({
  name: 'updateProfile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateProfileAuth.fulfilled, (state, action) => {
      state.data = action.payload
    });
  },
})

export { updateProfileAuth }
export default updateProfile.reducer