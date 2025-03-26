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

function Layout() {
  const location = useLocation()
  const hideHeaderFooter =
    location.pathname === '/signup' || location.pathname === '/login'

  return (
    <>
      {!hideHeaderFooter && <NavBar />}
      <Routes>
        <Route path="/" element={<BannerSection />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
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
