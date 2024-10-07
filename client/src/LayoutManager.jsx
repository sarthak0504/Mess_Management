import React from 'react'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import HeaderManager from './components/Header/ManagerHeader'

function LayoutManager() {
  return (
    <>
    <HeaderManager />
    <Outlet />
    <Footer />
    </>
  )
}

export default LayoutManager