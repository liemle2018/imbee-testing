import { configureStore } from '@reduxjs/toolkit'

import appReducer from '../components/App/appSlice'
import searchReducer from '../components/Search/searchSlice'
import tagsReducer from '../components/TrendingTags/tagsSlice'
import questionsReducer from '../components/Questions/questionsSlice'

export const store = configureStore({
  reducer: {
    app: appReducer,
    search: searchReducer,
    trendingTags: tagsReducer,
    questions: questionsReducer,
  },
})
