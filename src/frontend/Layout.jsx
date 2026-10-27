import React from 'react'
import Header from './shared/header/Header'
import { Outlet } from 'react-router-dom'
import Footer from './shared/footer/Footer'

const Layout = () => {
  return (
    <>
        <Header/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default Layout
