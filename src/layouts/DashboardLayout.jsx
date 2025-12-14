import { Outlet } from 'react-router'
import Sidebar from '../components/Dashboard/Sidebar/Sidebar'
import Footer from '../components/shared/Footer/Footer'
import Topbar from '../components/Dashboard/Topbar/Topbar'
import { useState } from 'react'
import ScrollToTop from '../components/shared/ScrollToTop'

const DashboardLayout = () => {
  const [isActive, setActive] = useState(false)

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <ScrollToTop />
      {/* Topbar */}
      <Topbar handleToggle={handleToggle} />
      
      <div className='flex flex-1 relative'>
        {/* Left Side: Sidebar Component */}
        <Sidebar isActive={isActive} />
        
        {/* Right Side: Dashboard Dynamic Content */}
        <div className='flex-1 p-5'>
          <Outlet />
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default DashboardLayout
