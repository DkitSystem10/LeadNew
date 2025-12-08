import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import MobileMenu from './MobileMenu'
import Navbar from './Navbar'

const Layout = ({ children }) => {
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const isContactPage = location.pathname === '/contact'
  const showSidebar = !isHomePage && !isContactPage
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden max-w-full w-full">
      {/* Navbar - Only show on home page for mobile menu toggle */}
      {isHomePage && <Navbar onMenuClick={toggleMobileMenu} />}
      
      {/* Mobile Menu - Only for home page on mobile */}
      {isHomePage && <MobileMenu isOpen={mobileMenuOpen} onClose={closeMobileMenu} />}
      
      <div className="flex flex-grow relative w-full max-w-full">
        {/* Sidebar - Always available on mobile, conditional on desktop */}
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} showOnDesktop={showSidebar} />
        <main className={`flex-grow w-full lg:w-auto overflow-x-hidden max-w-full ${isHomePage || isContactPage ? 'bg-white' : 'bg-[#F5F7FA]'}`}>
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
