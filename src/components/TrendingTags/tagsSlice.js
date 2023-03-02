import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tags: [],
  tagSelected: 0,
}

const tagsSlice = createSlice({
  name: 'trendingTags',
  initialState,
  reducers: {
    addTags(state, action) {
      state.tags = [...action.payload]
    },
    setTagSelected(state, action) {
      state.tagSelected = action.payload
    },
  },
})

export const { addTags, setTagSelected } = tagsSlice.actions
export default tagsSlice.reducer
