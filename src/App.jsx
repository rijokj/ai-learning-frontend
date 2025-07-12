import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './components/Routes/AppRoutes'
import CourseDetailsPage from './pages/CourseDetailsPage'
// import CourseContentPage from './pages/CourseContentPage'
import CourseLessons from './pages/CourseLessons'

function App() {
  return (
    // <BrowserRouter>
    //   <AppRoutes/>
    // </BrowserRouter>

    <div>
       {/* <CourseDetailsPage />
      <CourseContentPage /> */}
       <CourseLessons />
    </div>

  )
}

export default App
