import React from 'react'
import './AdminNavBar.css'
import { FaBars } from 'react-icons/fa' // Mobile menu icon
import { HiOutlineLogout } from 'react-icons/hi' // Logout icon

const AdminNavBar = () => {
  return (
    <nav className="admin-navbar">
      <div className="col-nav">
        {/* Mobile Button */}
        <button
          className="btn btn-icon btn-mobile me-auto"
          data-trigger="#offcanvas_aside"
        >
          <FaBars className="mobile-icon" />
        </button>

        {/* Navigation */}
        <ul className="nav">
          <li className="dropdown nav-item">
            <a
              className="dropdown-toggle"
              data-bs-toggle="dropdown"
              href="#"
              id="dropdownAccount"
              aria-expanded="false"
            >
              Admin
            </a>
            {/* Dropdown Menu */}
            <div
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="dropdownAccount"
            >
              <div className="dropdown-divider"></div>
              <a className="dropdown-item text-danger" href="/admin/logout">
                <HiOutlineLogout className="logout-icon" /> Logout
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default AdminNavBar
