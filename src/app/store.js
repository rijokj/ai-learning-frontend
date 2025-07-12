import { configureStore } from '@reduxjs/toolkit'
import courseDataReducer from '../features/courseData/courseDataSlice'

export const store = configureStore({
  reducer: {
    courseData: courseDataReducer,
  },
})
