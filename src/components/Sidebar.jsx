import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Sidebar = ({ isOpen, onClose, showOnDesktop = true }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [categoriesOpen, setCategoriesOpen] = useState(false)

  const handleLogout = () => {
    // Clear all session storage
    sessionStorage.removeItem('isAuthenticated')
    sessionStorage.removeItem('userId')
    sessionStorage.removeItem('userDisplayName')
    // Also clear localStorage if any exists
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userId')
    localStorage.removeItem('userDisplayName')
    navigate('/login', { replace: true })
    onClose()
  }

  const leadCategories = [
    {
      title: 'Vendors / Suppliers',
      path: '/vendor'
    },
    {
      title: 'Partners',
      path: '/partners'
    },
    {
      title: 'Job Seekers',
      path: '/jobseeker'
    },
    {
      title: 'Internship Applicants',
      path: '/student-internship'
    },
    {
      title: 'Course Enquiry / Registration',
      path: '/training-session'
    },
    {
      title: 'Career Guidance',
      path: '/career-guidance'
    }
  ]


  const menuItems = [
    {
      title: 'Home',
      path: '/',
      icon: null
    }
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:fixed top-0 left-0 h-screen flex flex-col shadow-lg z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${!showOnDesktop ? 'lg:hidden' : ''}
          w-64 lg:w-56 xl:w-64
        `}
        style={{
          background: '#FFFFFF',
          borderRight: '1px solid rgba(64, 152, 145, 0.15)',
          overflowY: 'auto',
          overflowX: 'hidden'
        }}
      >
        {/* Mobile Close Button */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold" style={{ color: '#409891' }}>Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ color: '#409891' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 flex-grow overflow-y-auto" style={{ maxHeight: 'calc(100vh - 140px)' }}>
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center px-4 lg:px-5 py-3.5 rounded-xl text-sm sm:text-base lg:text-lg font-medium transition-all duration-200 ${isActive
                      ? 'text-white shadow-md font-semibold'
                      : 'hover:text-white hover:shadow-sm border border-transparent'
                    }`}
                  style={isActive ? {
                    background: 'linear-gradient(135deg, #409891 0%, #48ADB7 100%)',
                    border: '1px solid rgba(64, 152, 145, 0.3)',
                    boxShadow: '0 4px 12px rgba(64, 152, 145, 0.25)',
                    color: '#FFFFFF'
                  } : {
                    border: '1px solid transparent',
                    color: '#1F2937',
                    background: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(64, 152, 145, 0.15) 0%, rgba(72, 173, 183, 0.15) 100%)'
                      e.currentTarget.style.borderColor = 'rgba(64, 152, 145, 0.3)'
                      e.currentTarget.style.color = '#409891'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.borderColor = 'transparent'
                      e.currentTarget.style.color = '#1F2937'
                    }
                  }}
                >
                  <span className="truncate">{item.title}</span>
                </Link>
              )
            })}

            {/* Lead Categories Expandable Section */}
            <div>
              <button
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className={`w-full flex items-center justify-between px-4 lg:px-5 py-3.5 rounded-xl text-sm sm:text-base lg:text-lg font-medium transition-all duration-200 ${categoriesOpen
                    ? 'text-white shadow-md font-semibold'
                    : 'hover:text-white hover:shadow-sm border border-transparent'
                  }`}
                style={categoriesOpen ? {
                  background: 'linear-gradient(135deg, #409891 0%, #48ADB7 100%)',
                  border: '1px solid rgba(64, 152, 145, 0.3)',
                  boxShadow: '0 4px 12px rgba(64, 152, 145, 0.25)',
                  color: '#FFFFFF'
                } : {
                  border: '1px solid transparent',
                  color: '#1F2937',
                  background: 'transparent'
                }}
                onMouseEnter={(e) => {
                  if (!categoriesOpen) {
                    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(64, 152, 145, 0.15) 0%, rgba(72, 173, 183, 0.15) 100%)'
                    e.currentTarget.style.borderColor = 'rgba(64, 152, 145, 0.3)'
                    e.currentTarget.style.color = '#409891'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!categoriesOpen) {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.borderColor = 'transparent'
                    e.currentTarget.style.color = '#1F2937'
                  }
                }}
              >
                <span className="truncate">Lead Categories</span>
                <svg
                  className={`w-5 h-5 transition-transform duration-200 ${categoriesOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Categories List */}
              {categoriesOpen && (
                <div className="mt-2 ml-4 space-y-1 border-l-2 pl-4" style={{ borderColor: 'rgba(64, 152, 145, 0.2)' }}>
                  {leadCategories.map((category) => {
                    const isActive = location.pathname === category.path
                    return (
                      <Link
                        key={category.path}
                        to={category.path}
                        onClick={onClose}
                        className={`block px-4 py-2.5 rounded-lg text-sm lg:text-base font-medium transition-all duration-200 ${isActive
                            ? 'text-white shadow-md'
                            : 'hover:shadow-sm'
                          }`}
                        style={isActive ? {
                          background: 'linear-gradient(135deg, #409891 0%, #48ADB7 100%)',
                          boxShadow: '0 2px 8px rgba(64, 152, 145, 0.25)',
                          color: '#FFFFFF'
                        } : {
                          color: '#1F2937',
                          background: 'transparent'
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(64, 152, 145, 0.1) 0%, rgba(72, 173, 183, 0.1) 100%)'
                            e.currentTarget.style.color = '#409891'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.background = 'transparent'
                            e.currentTarget.style.color = '#1F2937'
                          }
                        }}
                      >
                        {category.title}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Report */}
            <Link
              to="/reports"
              onClick={onClose}
              className={`flex items-center px-4 lg:px-5 py-3.5 rounded-xl text-sm sm:text-base lg:text-lg font-medium transition-all duration-200 ${location.pathname === '/reports'
                  ? 'text-white shadow-md font-semibold'
                  : 'hover:text-white hover:shadow-sm border border-transparent'
                }`}
              style={location.pathname === '/reports' ? {
                background: 'linear-gradient(135deg, #409891 0%, #48ADB7 100%)',
                border: '1px solid rgba(64, 152, 145, 0.3)',
                boxShadow: '0 4px 12px rgba(64, 152, 145, 0.25)',
                color: '#FFFFFF'
              } : {
                border: '1px solid transparent',
                color: '#1F2937',
                background: 'transparent'
              }}
              onMouseEnter={(e) => {
                if (location.pathname !== '/reports') {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(64, 152, 145, 0.15) 0%, rgba(72, 173, 183, 0.15) 100%)'
                  e.currentTarget.style.borderColor = 'rgba(64, 152, 145, 0.3)'
                  e.currentTarget.style.color = '#409891'
                }
              }}
              onMouseLeave={(e) => {
                if (location.pathname !== '/reports') {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.borderColor = 'transparent'
                  e.currentTarget.style.color = '#1F2937'
                }
              }}
            >
              <span className="truncate">Report</span>
            </Link>
          </nav>
        </div>

        {/* Logout Button and Copyright Section at Bottom */}
        <div className="mt-auto" style={{
          borderTop: '1px solid rgba(64, 152, 145, 0.15)'
        }}>
          {/* Logout Button */}
          <div className="p-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 lg:px-5 py-3.5 rounded-xl text-sm sm:text-base lg:text-lg font-medium transition-all duration-200 text-white shadow-md hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                border: '1px solid rgba(220, 38, 38, 0.3)',
                boxShadow: '0 4px 12px rgba(220, 38, 38, 0.25)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)'
                e.currentTarget.style.transform = 'scale(1.02)'
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(220, 38, 38, 0.35)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)'
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.25)'
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>

          {/* Copyright Section */}
          <div className="p-4 pt-0" style={{
            borderTop: '1px solid rgba(64, 152, 145, 0.1)'
          }}>
            <p className="text-xs text-center" style={{ color: '#666' }}>
              © {new Date().getFullYear()} Lead Centre. All rights reserved.
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar

