import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'
import NavBar from './components/Navbar/NavBar'
import Footer from './components/Footer/Footer'
import BannerSection from './components/Banner/BannerSection'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import ProfileCard from './components/ProfileCard.jsx/ProfileCard'
import Profile from './pages/Profile'
import AdminPanel from './pages/admin/AdminPanel'

function Layout() {
  const location = useLocation()
  const hideHeaderFooter =
    location.pathname === '/signup' || location.pathname === '/login'

  return (
    <>
      {/* <AdminPanel /> */}
      {!hideHeaderFooter && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </>
  )
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  )
}

export default App
