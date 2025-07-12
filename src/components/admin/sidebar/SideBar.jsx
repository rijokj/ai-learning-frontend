import React, { useState } from 'react'
import './SideBar.css'
import { Link } from 'react-router-dom'
import {
  FaHome,
  FaUser,
  FaBook,
  FaChevronDown,
  FaChevronRight,
} from 'react-icons/fa'
import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import logo from '../../../assets/images/Learni.png'

const SideBar = ({ isSidebarOpen, toggleSidebar }) => {
  const [openMenus, setOpenMenus] = useState({
    dashboard: false,
    users: false,
    courses: false,
  })

  const toggleMenu = (menu) => {
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
        {/* Dashboard */}
        <li className="menu-item" onClick={() => toggleMenu('dashboard')}>
          <div className="menu-header">
            <FaHome className="menu-icon" />
            {isSidebarOpen && (
              <div className="menu-title-container">
                <span>HOME</span>
                {openMenus.dashboard ? <FaChevronDown /> : <FaChevronRight />}
              </div>
            )}
          </div>
          {isSidebarOpen && openMenus.dashboard && (
            <ul className="submenu">
              <li>
                <Link to="/admin">Dashboard</Link>
              </li>
            </ul>
          )}
        </li>

        {/* Users */}
        <li className="menu-item" onClick={() => toggleMenu('users')}>
          <div className="menu-header">
            <FaUser className="menu-icon" />
            {isSidebarOpen && (
              <div className="menu-title-container">
                <span>Users</span>
                {openMenus.users ? <FaChevronDown /> : <FaChevronRight />}
              </div>
            )}
          </div>
          {isSidebarOpen && openMenus.users && (
            <ul className="submenu">
              <li>
                <Link to="/admin/userlist">UserList</Link>
              </li>
            </ul>
          )}
        </li>

        {/* Courses */}
        <li className="menu-item" onClick={() => toggleMenu('courses')}>
          <div className="menu-header">
            <FaBook className="menu-icon" />
            {isSidebarOpen && (
              <div className="menu-title-container">
                <span>Courses</span>
                {openMenus.courses ? <FaChevronDown /> : <FaChevronRight />}
              </div>
            )}
          </div>
          {isSidebarOpen && openMenus.courses && (
            <ul className="submenu">
              <li>
                <Link to="/admin/courselist">CourseList</Link>
              </li>
              <li>
                <Link to="/admin/lessonlist">LessonList</Link>
              </li>
              <li>
                <Link to="/admin/languagelist">LanguageList</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  )
}

export default SideBar
