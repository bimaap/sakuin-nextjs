
import { createSlice } from '@reduxjs/toolkit'
import { updatePinAuth } from '../async/updatePin';

const initialState = {
  data: []
}

export const updatePin = createSlice({
  name: 'updatePin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updatePinAuth.fulfilled, (state, action) => {
      state.data = action.payload
    });
  },
})

export { updatePinAuth }
export default updatePin.reducer