// components/Routes/UserLayout.jsx
import React from 'react'
import NavBar from '../Navbar/NavBar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default UserLayout
