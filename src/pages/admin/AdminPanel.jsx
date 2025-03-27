import React, { useState } from 'react'
import './AdminPanel.css'
import UserList from '../../components/admin/Userlist/UserList' // Corrected UserList import capitalization
import SideBar from '../../components/admin/sidebar/SideBar'
import AdminNavBar from '../../components/admin/AdminNav/AdminNavBar'

const AdminPanel = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true) // Sidebar toggle state

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen) // Toggle sidebar state
  }

  return (
    <div className="admin-panel">
      <AdminNavBar />
      {/* SideBar Component */}
      <SideBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <div className={`content ${isSidebarOpen ? 'expanded' : 'collapsed'}`}>
        <div id="home">Welcome to the Dashboard!</div>
        <div id="users-list">
          <UserList />
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
