import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
  questions: [],
}

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    loadQuestions(state, action) {
      state.questions = [...action.payload]
    },
    loadMoreQuestions(state, action) {
      state.questions = state.questions.concat(Object.values(action.payload))
    },
  },
})

export const { loadQuestions, loadMoreQuestions } = questionsSlice.actions
export default questionsSlice.reducer
