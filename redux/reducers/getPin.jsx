
import { createSlice } from '@reduxjs/toolkit'
import { getPinAuth } from '../async/getPin';

const initialState = {
  data: []
}

export const getPin = createSlice({
  name: 'getPin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPinAuth.fulfilled, (state, action) => {
      state.data = action.payload
    });
  },
})

export { getPinAuth }
export default getPin.reducer