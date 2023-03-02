import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    loaderToggle(state, action) {
      state.isLoading = action.payload
    },
  },
})

export const { loaderToggle } = appSlice.actions
export default appSlice.reducer
