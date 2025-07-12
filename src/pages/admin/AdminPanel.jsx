import React, { useState } from 'react'
import { Outlet } from 'react-router-dom' // 👈 import this
import './AdminPanel.css'
import SideBar from '../../components/admin/sidebar/SideBar'
import AdminNavBar from '../../components/admin/AdminNav/AdminNavBar'

const AdminPanel = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="admin-panel">
      <AdminNavBar />
      <SideBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`content ${isSidebarOpen ? 'expanded' : 'collapsed'}`}>
        <Outlet />{' '}
        {/* 👈 This renders the nested route components like CourseList */}
      </div>
    </div>
  )
}

export default AdminPanel
