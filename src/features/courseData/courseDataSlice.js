import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchCourseData = createAsyncThunk(
  'courseData/fetchCourseData',
  async (_, { rejectWithValue }) => {
    try {
      // Get token from local storage or wherever you store it
      const token = localStorage.getItem('token')

      // Set default authorization header for all requests
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const [languagesRes, lessonsRes] = await Promise.all([
        axios.get('http://localhost:3007/admin/languagelist', config),
        axios.get('http://localhost:3007/admin/lessonlist', config),
      ])

      return {
        languages: languagesRes.data,
        lessons: lessonsRes.data,
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch course data'
      )
    }
  }
)

const courseDataSlice = createSlice({
  name: 'courseData',
  initialState: {
    languages: [],
    lessons: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCourseData.fulfilled, (state, action) => {
        state.languages = action.payload.languages
        state.lessons = action.payload.lessons
        state.loading = false
      })
      .addCase(fetchCourseData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })
  },
})

export default courseDataSlice.reducer
