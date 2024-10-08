import React from 'react'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import AdminHeader from './components/Header/AdminHeader'

function AdminLayout() {
  return (
    <>
    <AdminHeader />
    <Outlet />
    <Footer />
    </>
  )
}

export default AdminLayout