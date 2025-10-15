import React from 'react'
import { Outlet } from 'react-router-dom'
import ResponsiveNavbar from '../components/Layout/Navbar/ResponsiveNavbar'
import HeroSection from '../components/Common/Hero/HeroSection'

const UserLayout = () => {
  return (
    <div className='bg-amber-50'>
      <ResponsiveNavbar />
      <HeroSection />
      <Outlet />
    </div>
  )
}

export default UserLayout
