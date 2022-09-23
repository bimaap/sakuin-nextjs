
import { createSlice } from '@reduxjs/toolkit'
import { updatePasswordAuth } from '../async/updatePassword';

const initialState = {
  data: []
}

export const updatePassword = createSlice({
  name: 'updateProfile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updatePasswordAuth.fulfilled, (state, action) => {
      state.data = action.payload
    });
  },
})

export { updatePasswordAuth }
export default updatePassword.reducer