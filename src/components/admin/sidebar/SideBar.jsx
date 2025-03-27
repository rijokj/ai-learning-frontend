import React, { useState } from 'react'
import './SideBar.css'
import { FaHome, FaUser } from 'react-icons/fa' // Importing icons for menu items
import { HiOutlineMenuAlt2 } from 'react-icons/hi' // Importing toggle button icon
import logo from '../../../assets/images/Learni.png';

const SideBar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true) // State to toggle sidebar open/close

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen) // Toggle sidebar state
  }

  return (
    <div className={`side-bar ${isSidebarOpen ? 'open' : 'closed'}`}>
      {/* Logo Section */}
      <div className="logo-section"> 
        <img
          src={logo}// Replace this with the path to your logo image
          alt="Logo"
          className="logo"
        />
        {isSidebarOpen && <span className="logo-text"></span>}{' '}
        {/* Text appears only in open state */}
      </div>

      {/* Toggle Button */}
      <div className="toggle-btn" onClick={toggleSidebar}>
        <HiOutlineMenuAlt2 />
      </div>

      {/* Sidebar Menu */}
      <ul>
        {/* Dashboard Menu */}
        <li className="menu-item">
          <div className="menu-header">
            <FaHome className="menu-icon" />
            {isSidebarOpen && <span>Dashboard</span>}
          </div>
        </li>

        {/* Users Menu */}
        <li className="menu-item">
          <div className="menu-header">
            <FaUser className="menu-icon" />
            {isSidebarOpen && <span>Users</span>}
          </div>
        </li>
      </ul>
    </div>
  )
}

export default SideBar
