import React, { useState, useRef, useEffect } from 'react'
import { FaBars } from 'react-icons/fa'
import { HiOutlineLogout } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import './AdminNavBar.css'

const AdminNavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  const toggleDropdown = (e) => {
    e.stopPropagation()
    setIsDropdownOpen(!isDropdownOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    // Clear all auth-related data
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('userId')

    // Force a full page reload to reset the application state
    window.location.href = '/login'

    // Alternative: If you prefer SPA navigation without full reload
    // navigate('/login', { replace: true });
  }

  return (
    <div className="admin-navbar">
      <div className="navbar-left">
        <FaBars className="menu-icon" />
      </div>

      <div className="navbar-right" ref={dropdownRef}>
        <div className="admin-dropdown-trigger" onClick={toggleDropdown}>
          Admin
        </div>

        {isDropdownOpen && (
          <div className="admin-dropdown-menu">
            <div className="dropdown-item logout-item" onClick={handleLogout}>
              <HiOutlineLogout className="logout-icon" />
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminNavBar
