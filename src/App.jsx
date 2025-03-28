import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom'
import NavBar from './components/Navbar/NavBar'
import Footer from './components/Footer/Footer'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import Profile from './pages/Profile'
import AdminPanel from './pages/admin/AdminPanel'

function Layout() {
  const location = useLocation()
  const isAdmin = localStorage.getItem('role') === 'admin'
  const hideHeaderFooter =
    location.pathname === '/signup' ||
    location.pathname === '/login' ||
    location.pathname.startsWith('/admin')

  // Redirect admin trying to access user home
  if (isAdmin && location.pathname === '/') {
    return <Navigate to="/admin" replace />
  }

  return (
    <>
      {!hideHeaderFooter && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route
          path="/admin/*"
          element={isAdmin ? <AdminPanel /> : <Navigate to="/login" replace />}
        />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}

export default App
