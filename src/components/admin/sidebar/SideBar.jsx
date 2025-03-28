import React, { useState } from 'react'
import './SideBar.css'
import { FaHome, FaUser, FaChevronDown, FaChevronRight } from 'react-icons/fa'
import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import logo from '../../../assets/images/Learni.png'

const SideBar = ({ isSidebarOpen, toggleSidebar }) => {
  const [openMenus, setOpenMenus] = useState({
    dashboard: false,
    users: false,
  })

  const toggleMenu = (menu) => {
    // Only toggle if sidebar is open
    if (isSidebarOpen) {
      setOpenMenus((prevState) => ({
        ...prevState,
        [menu]: !prevState[menu],
      }))
    }
  }

  return (
    <div className={`side-bar ${isSidebarOpen ? 'open' : 'closed'}`}>
      {/* Logo Section */}
      <div className="logo-section">
        <img src={logo} alt="Logo" className="logo" />
        {isSidebarOpen && <span className="logo-text"></span>}
      </div>

      {/* Toggle Button */}
      <div className="toggle-btn" onClick={toggleSidebar}>
        <HiOutlineMenuAlt2 />
      </div>

      {/* Sidebar Menu */}
      <ul>
        {/* Dashboard Menu */}
        <li className="menu-item" onClick={() => toggleMenu('dashboard')}>
          <div className="menu-header">
            <FaHome className="menu-icon" />
            {isSidebarOpen && (
              <div className="menu-title-container">
                <span>HOME</span>
                {isSidebarOpen &&
                  (openMenus.dashboard ? (
                    <FaChevronDown className="dropdown-icon" />
                  ) : (
                    <FaChevronRight className="dropdown-icon" />
                  ))}
              </div>
            )}
          </div>

          {/* Dashboard Dropdown */}
          {isSidebarOpen && openMenus.dashboard && (
            <ul className="submenu">
              <li>Dashboard</li>
            </ul>
          )}
        </li>

        {/* Users Menu */}
        <li className="menu-item" onClick={() => toggleMenu('users')}>
          <div className="menu-header">
            <FaUser className="menu-icon" />
            {isSidebarOpen && (
              <div className="menu-title-container">
                <span>Users</span>
                {isSidebarOpen &&
                  (openMenus.users ? (
                    <FaChevronDown className="dropdown-icon" />
                  ) : (
                    <FaChevronRight className="dropdown-icon" />
                  ))}
              </div>
            )}
          </div>

          {/* Users Dropdown */}
          {isSidebarOpen && openMenus.users && (
            <ul className="submenu">
              <li>User List</li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  )
}

export default SideBar
