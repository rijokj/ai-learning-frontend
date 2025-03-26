import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { FaSearch } from 'react-icons/fa'
import { FiMenu, FiChevronDown } from 'react-icons/fi'
import logo from '../../assets/images/Learni.png'
import './NavBar.css'

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'My Learning', path: '/my-learning' },
    { name: 'Resource', path: '/resource' },
  ]

  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand me-3" to="/">
          <img src={logo} alt="Logo" className="nav-logo" />
        </Link>

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

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen} // Accessibility improvement
          aria-label="Toggle navigation"
        >
          {menuOpen ? (
            <FiChevronDown size={28} className="toggle-icon" />
          ) : (
            <FiMenu size={28} className="toggle-icon" />
          )}
        </button>

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

          <div className="auth-buttons">
            <Link to="/login" className="btn btn-outline-primary me-2">
              Login
            </Link>
            <Link to="/signup" className="btn btn-primary text-white">
              Signup
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
