import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
// Import logo for background
const logoImage = new URL('../assets/LEAD CENTRE.png', import.meta.url).href

// Credentials configuration - Add users here
const VALID_CREDENTIALS = [
  {
    userId: 'Lead_admin',
    password: 'Lead@123',
    displayName: 'Lead Admin'
  }
  // Add more credentials here as needed
]

const LoginPage = () => {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const svgRef = useRef(null)

  // Redirect if already authenticated
  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
      if (isAuthenticated) {
        navigate('/', { replace: true })
      }
    }
    checkAuth()
  }, [navigate])

  // Animation lines update effect
  useEffect(() => {
    const updateLines = () => {
      if (!svgRef.current) return
      
      // Responsive sizing based on screen width
      const isMobile = window.innerWidth < 640 // sm breakpoint
      const isTablet = window.innerWidth < 768 // md breakpoint
      
      let radius, centerX, centerY
      if (isMobile) {
        radius = 90
        centerX = 128
        centerY = 128
      } else if (isTablet) {
        radius = 110
        centerX = 160
        centerY = 160
      } else {
        radius = 140
        centerX = 200
        centerY = 200
      }
      
      const angles = [0, 51.4, 102.8, 154.2, 205.6, 257, 308.4]
      
      const lines = svgRef.current.querySelectorAll('.connecting-line')
      lines.forEach((line, index) => {
        const fromAngle = angles[index]
        const toAngle = angles[(index + 1) % angles.length]
        
        const fromRad = (fromAngle * Math.PI) / 180
        const toRad = (toAngle * Math.PI) / 180
        
        const x1 = centerX + radius * Math.sin(fromRad)
        const y1 = centerY - radius * Math.cos(fromRad)
        const x2 = centerX + radius * Math.sin(toRad)
        const y2 = centerY - radius * Math.cos(toRad)
        
        line.setAttribute('x1', x1)
        line.setAttribute('y1', y1)
        line.setAttribute('x2', x2)
        line.setAttribute('y2', y2)
      })
    }
    
    updateLines()
    // Update lines on window resize
    window.addEventListener('resize', updateLines)
    return () => window.removeEventListener('resize', updateLines)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Check credentials against valid users list
    const trimmedUserId = userId.trim()
    const user = VALID_CREDENTIALS.find(
      cred => cred.userId.toLowerCase() === trimmedUserId.toLowerCase() && cred.password === password
    )

    if (user) {
      // Store authentication in localStorage
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userId', trimmedUserId)
      localStorage.setItem('userDisplayName', user.displayName || trimmedUserId)
      
      // Redirect to index page
      navigate('/')
    } else {
      setError('Invalid User ID or Password')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden login-background">
      {/* Left Side - DURKKAS Animation */}
      <div className="hidden lg:flex lg:w-1/2 relative login-background overflow-hidden items-center justify-center" style={{ borderRight: 'none', marginRight: 0 }}>
        {/* Background Logo Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <img 
            src={logoImage} 
            alt="Lead Centre" 
            className="w-full max-w-2xl h-auto object-contain"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </div>
        
        {/* Professional Grid Pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(64, 152, 145, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(64, 152, 145, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#409891]/30 via-transparent to-[#48ADB7]/30 animate-pulse"></div>
        
        {/* Floating Professional Elements */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-[#409891]/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tl from-[#48ADB7]/20 to-transparent rounded-full blur-3xl"></div>
        
        {/* DURKKAS Animation */}
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center mx-auto max-w-full">
            {/* Outer circle that highlights after all letters zoom in */}
            <div className="outer-highlight-circle" />
            
            {/* Rotating Letter Circles - D U R K K A S */}
            <div className="relative flex items-center justify-center">
              {/* Rotating container */}
              <div className="rotating-letters-container">
                {/* Connecting lines SVG - Hidden */}
                <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible', display: 'none' }}>
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3D98B4" stopOpacity="0.4" />
                      <stop offset="50%" stopColor="#3D98B4" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#3D98B4" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>
                  {/* Lines connecting letters - Hidden */}
                  <line stroke="url(#lineGradient)" strokeWidth="2" className="connecting-line" />
                  <line stroke="url(#lineGradient)" strokeWidth="2" className="connecting-line" />
                  <line stroke="url(#lineGradient)" strokeWidth="2" className="connecting-line" />
                  <line stroke="url(#lineGradient)" strokeWidth="2" className="connecting-line" />
                  <line stroke="url(#lineGradient)" strokeWidth="2" className="connecting-line" />
                  <line stroke="url(#lineGradient)" strokeWidth="2" className="connecting-line" />
                  <line stroke="url(#lineGradient)" strokeWidth="2" className="connecting-line" />
                </svg>
                
                {/* D */}
                <div className="rotating-letter" style={{ '--angle': '0deg', '--delay': '0s' }}>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg" style={{ 
                    background: 'linear-gradient(135deg, #409891 0%, #48ADB7 100%)',
                    boxShadow: '0 4px 15px rgba(64, 152, 145, 0.3), 0 0 20px rgba(72, 173, 183, 0.2)'
                  }}>
                    <span className="text-sm sm:text-base md:text-xl font-bold text-white">D</span>
                  </div>
                </div>

                {/* U */}
                <div className="rotating-letter" style={{ '--angle': '51.4deg', '--delay': '0.3s' }}>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg" style={{ 
                    background: 'linear-gradient(135deg, #409891 0%, #48ADB7 100%)',
                    boxShadow: '0 4px 15px rgba(64, 152, 145, 0.3), 0 0 20px rgba(72, 173, 183, 0.2)'
                  }}>
                    <span className="text-sm sm:text-base md:text-xl font-bold text-white">U</span>
                  </div>
                </div>

                {/* R */}
                <div className="rotating-letter" style={{ '--angle': '102.8deg', '--delay': '0.6s' }}>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg" style={{ 
                    background: 'linear-gradient(135deg, #409891 0%, #48ADB7 100%)',
                    boxShadow: '0 4px 15px rgba(64, 152, 145, 0.3), 0 0 20px rgba(72, 173, 183, 0.2)'
                  }}>
                    <span className="text-sm sm:text-base md:text-xl font-bold text-white">R</span>
                  </div>
                </div>

                {/* K */}
                <div className="rotating-letter" style={{ '--angle': '154.2deg', '--delay': '0.9s' }}>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg" style={{ 
                    background: 'linear-gradient(135deg, #409891 0%, #48ADB7 100%)',
                    boxShadow: '0 4px 15px rgba(64, 152, 145, 0.3), 0 0 20px rgba(72, 173, 183, 0.2)'
                  }}>
                    <span className="text-sm sm:text-base md:text-xl font-bold text-white">K</span>
                  </div>
                </div>

                {/* K */}
                <div className="rotating-letter" style={{ '--angle': '205.6deg', '--delay': '1.2s' }}>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg" style={{ 
                    background: 'linear-gradient(135deg, #409891 0%, #48ADB7 100%)',
                    boxShadow: '0 4px 15px rgba(64, 152, 145, 0.3), 0 0 20px rgba(72, 173, 183, 0.2)'
                  }}>
                    <span className="text-sm sm:text-base md:text-xl font-bold text-white">K</span>
                  </div>
                </div>

                {/* A */}
                <div className="rotating-letter" style={{ '--angle': '257deg', '--delay': '1.5s' }}>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg" style={{ 
                    background: 'linear-gradient(135deg, #409891 0%, #48ADB7 100%)',
                    boxShadow: '0 4px 15px rgba(64, 152, 145, 0.3), 0 0 20px rgba(72, 173, 183, 0.2)'
                  }}>
                    <span className="text-sm sm:text-base md:text-xl font-bold text-white">A</span>
                  </div>
                </div>

                {/* S */}
                <div className="rotating-letter" style={{ '--angle': '308.4deg', '--delay': '1.8s' }}>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg" style={{ 
                    background: 'linear-gradient(135deg, #409891 0%, #48ADB7 100%)',
                    boxShadow: '0 4px 15px rgba(64, 152, 145, 0.3), 0 0 20px rgba(72, 173, 183, 0.2)'
                  }}>
                    <span className="text-sm sm:text-base md:text-xl font-bold text-white">S</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Central Circle with LEAD */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-white border-2 rounded-full w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center shadow-lg" style={{ borderColor: '#3D98B4' }}>
                <h1 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-center tracking-wide" style={{ color: '#3D98B4' }}>
                  LEAD
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center relative py-8 sm:py-12 px-4 sm:px-6 lg:px-12 login-background" style={{ borderLeft: 'none', marginLeft: 0 }}>
        {/* Desktop Background Logo */}
        <div className="hidden lg:block absolute inset-0 flex items-center justify-center opacity-5">
          <img 
            src={logoImage} 
            alt="Lead Centre" 
            className="w-full max-w-xs h-auto object-contain"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </div>
        
        {/* Mobile Background with Gradient */}
        <div className="lg:hidden absolute inset-0 login-background-mobile"></div>
        
        {/* Subtle Pattern for Mobile */}
        <div className="lg:hidden absolute inset-0 opacity-5" style={{
          backgroundImage: `
            linear-gradient(30deg, rgba(64, 152, 145, 0.3) 12%, transparent 12.5%, transparent 87%, rgba(64, 152, 145, 0.3) 87.5%, rgba(64, 152, 145, 0.3)),
            linear-gradient(150deg, rgba(72, 173, 183, 0.3) 12%, transparent 12.5%, transparent 87%, rgba(72, 173, 183, 0.3) 87.5%, rgba(72, 173, 183, 0.3))
          `,
          backgroundSize: '60px 100px'
        }}></div>
        
        {/* Mobile Background Logo */}
        <div className="lg:hidden absolute inset-0 flex items-center justify-center opacity-5">
          <img 
            src={logoImage} 
            alt="Lead Centre" 
            className="w-full max-w-xs h-auto object-contain"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </div>

        <div className="w-full max-w-md space-y-8 relative z-10">
          <div className="bg-white/98 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 border border-white/30" style={{
            boxShadow: '0 25px 70px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.2) inset'
          }}>
            {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-[#409891] to-[#48ADB7] rounded-2xl flex items-center justify-center mb-6 shadow-lg transform transition-transform hover:scale-110 duration-300" style={{
              boxShadow: '0 10px 30px rgba(64, 152, 145, 0.4)'
            }}>
              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">Admin Login</h2>
            <p className="text-sm sm:text-base text-gray-600">Enter your credentials to access the portal</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User ID Field */}
            <div>
              <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-2">
                User ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  id="userId"
                  name="userId"
                  type="text"
                  required
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3.5 text-sm sm:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#409891] focus:border-[#409891] transition-all duration-200 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md"
                  placeholder="Enter your User ID"
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3.5 text-sm sm:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#409891] focus:border-[#409891] transition-all duration-200 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3.5 sm:py-4 px-6 border border-transparent rounded-xl shadow-lg text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-[#409891] to-[#48ADB7] hover:from-[#48ADB7] hover:to-[#409891] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#409891] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              style={{
                boxShadow: loading ? '0 4px 14px rgba(64, 152, 145, 0.3)' : '0 8px 20px rgba(64, 152, 145, 0.4)'
              }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-xs sm:text-sm text-gray-500 font-medium">
                Lead Centre Admin Portal
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Secure Access • Professional Management
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
