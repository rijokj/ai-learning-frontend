// components/Routes/AdminLayout.jsx
import React from 'react'
import { Outlet } from 'react-router-dom'
// import AdminSidebar from '../AdminSidebar' if you have one

const AdminLayout = () => {
  return (
    <div style={{ display: 'flex' }}>
      {/* <AdminSidebar /> */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
