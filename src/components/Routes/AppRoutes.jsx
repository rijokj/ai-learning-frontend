import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Signup from '../../pages/Signup'
import Login from '../../pages/Login'
import ForgotPassword from '../../pages/ForgotPassword' // Add this import
import UserLayout from '../../components/Layouts/UserLayout'
import AdminLayout from '../../components/Layouts/AdminLayout'
import ProtectedRoute from '../../config/ProtectedRoute'
import Home from '../../pages/Home'
import Profile from '../../pages/Profile'
import AdminPanel from '../../pages/admin/AdminPanel'
import LanguageList from '../../pages/admin/LanguageList'
import CourseList from '../../pages/admin/CourseList'
import LessonList from '../../pages/admin/LessonList'
import { isAuthenticated, getUserRole } from '../Utils/AuthUtil'
import Dashboard from '../admin/dashboard/Dashboard'
import UserList from '../admin/Userlist/UserList'
import AddLesson from '../../components/admin/Course/Addlesson/AddLesson'
import AddLanguage from '../../pages/admin/Form/AddLanguage'
import AddCourse from '../../pages/admin/Form/AddCourse'

const AppRoutes = () => {
  const isAuth = isAuthenticated()
  const role = getUserRole()

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/signup"
        element={
          isAuth ? (
            role === 'admin' ? (
              <Navigate to="/admin" replace />
            ) : (
              <Navigate to="/" replace />
            )
          ) : (
            <Signup />
          )
        }
      />
      <Route
        path="/login"
        element={
          isAuth ? (
            role === 'admin' ? (
              <Navigate to="/admin" replace />
            ) : (
              <Navigate to="/" replace />
            )
          ) : (
            <Login />
          )
        }
      />
      {/* Add Forgot Password Route */}
      <Route
        path="/forgot-password"
        element={
          isAuth ? (
            role === 'admin' ? (
              <Navigate to="/admin" replace />
            ) : (
              <Navigate to="/" replace />
            )
          ) : (
            <ForgotPassword />
          )
        }
      />

      {/* Protected User Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />

        <Route path="profile/:id" element={<Profile />} />
      </Route>

      {/* Protected Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminPanel />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="/admin/userlist" element={<UserList />} />
        <Route path="/admin/languagelist" element={<LanguageList />} />
        <Route path="/admin/lessonlist" element={<LessonList />} />
        <Route path="/admin/courselist" element={<CourseList />} />
        <Route path="/admin/addlanguage" element={<AddLanguage />} />

        <Route path="/admin/addlesson" element={<AddLesson />} />
        <Route path="/admin/addcourse" element={<AddCourse />} />
      </Route>

      {/* Fallback */}
      <Route
        path="*"
        element={
          isAuth ? (
            role === 'admin' ? (
              <Navigate to="/admin" replace />
            ) : (
              <Navigate to="/" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  )
}

export default AppRoutes
