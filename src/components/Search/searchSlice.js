import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  keyword: '',
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addKeyword(state, action) {
      state.keyword = action.payload
    },
  },
})

export const { addKeyword } = searchSlice.actions
export default searchSlice.reducer
