import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { FaSearch, FaUserCircle } from 'react-icons/fa' // Adding the profile icon
import { FiMenu, FiChevronDown } from 'react-icons/fi'
import logo from '../../assets/images/Learni.png'
import './NavBar.css'

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState(null) // Store user ID for profile navigation
  const navigate = useNavigate()

  useEffect(() => {
    // Check for login token and user ID in localStorage
    const token = localStorage.getItem('token')
    const storedUserId = localStorage.getItem('userId')
    setIsLoggedIn(!!token) // Set logged-in status based on token presence
    setUserId(storedUserId) // Store the user ID if available
  }, [])

  const handleLogout = () => {
    // Clear localStorage and redirect to login page
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    setIsLoggedIn(false)
    navigate('/login')
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'My Learning', path: '/my-learning' },
    { name: 'Resource', path: '/resource' },
  ]

  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand me-3" to="/">
          <img src={logo} alt="Logo" className="nav-logo" />
        </Link>

        {/* Search Bar */}
        <form
          className="search-bar d-flex"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="form-control search-input"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-primary search-button"
            type="submit"
          >
            <FaSearch />
          </button>
        </form>

        {/* Toggle Button for Navbar */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          {menuOpen ? (
            <FiChevronDown size={28} className="toggle-icon" />
          ) : (
            <FiMenu size={28} className="toggle-icon" />
          )}
        </button>

        {/* Navbar Links */}
        <div
          className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}
          id="navbarNav"
        >
          <ul className="navbar-nav mx-auto text-center">
            {navLinks.map((link, index) => (
              <li className="nav-item" key={index}>
                <Link
                  className="nav-link custom-nav-link"
                  to={link.path}
                  aria-current={link.name === 'Home' ? 'page' : undefined}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Conditional Rendering for Login/Signup or Profile Icon */}
          <div className="auth-buttons">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="btn btn-outline-primary me-2">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary text-white">
                  Signup
                </Link>
              </>
            ) : (
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle profile-icon"
                  id="profileDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FaUserCircle size={24} />
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="profileDropdown"
                >
                  <li>
                    <Link
                      className="dropdown-item"
                      to={`/profile/${userId}`} // Dynamically navigate to user's profile
                    >
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
