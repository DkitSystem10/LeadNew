import { useEffect, useRef, useState } from 'react'
import Card from '../components/Card'
import jobSeekerImage from '../assets/job_seeker_modern.png'
import careerGuidanceImage from '../assets/career_guidance_modern.png'
import studentInternshipImage from '../assets/internship_modern.png'
import enquiryImage from '../assets/enquiry_modern.png'
import vendorImage from '../assets/vendor_modern.png'
import partnerImage from '../assets/partner_modern.png'
import dkitLogo from '../assets/dkit.png'

const LandingPage = () => {
  const svgRef = useRef(null)

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const [showScrollTop, setShowScrollTop] = useState(false)

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

  // Scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  const categories = [
    {
      title: 'Vendors / Suppliers',
      icon: null,
      image: vendorImage,
      link: '/vendor',
      description: ''
    },
    {
      title: 'Partners',
      icon: null,
      image: partnerImage,
      link: '/partners',
      description: ''
    },
    {
      title: 'Job Seekers',
      icon: null,
      image: jobSeekerImage,
      link: '/jobseeker',
      description: ''
    },
    {
      title: 'Internship Applicants',
      icon: null,
      image: studentInternshipImage,
      link: '/student-internship',
      description: ''
    },
    {
      title: 'Course Enquiry / Registration',
      icon: null,
      image: enquiryImage,
      link: '/training-session',
      description: ''
    },
    {
      title: 'Career Guidance',
      icon: null,
      image: careerGuidanceImage,
      link: '/career-guidance',
      description: ''
    }
  ]

  return (
    <div className="min-h-screen relative bg-[#F8FAFC] overflow-x-hidden selection:bg-[#409891] selection:text-white">
      {/* Abstract Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#409891]/5 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[35%] h-[35%] bg-[#48ADB7]/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[30%] h-[30%] bg-[#409891]/5 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Snow Effect - Subtle */}
      <div className="snow-container fixed inset-0 pointer-events-none z-10 opacity-30">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="snowflake" style={{
            '--delay': `${Math.random() * 5}s`,
            '--duration': `${10 + Math.random() * 10}s`,
            '--left': `${Math.random() * 100}%`
          }}></div>
        ))}
      </div>

      <div className="relative z-20">
        {/* Dynamic Hero Section - Reduced Padding */}
        <div className="relative pt-6 pb-2 sm:pt-8 sm:pb-4 overflow-hidden">
          <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

            <div className="text-center max-w-4xl mx-auto">
              {/* Badge - Reduced Margin */}
              <div className="hero-fade-in inline-flex items-center rounded-full px-3 py-1 mb-4 border border-[#409891]/30 bg-white/50 backdrop-blur-sm shadow-sm scale-90">
                <span className="flex h-1.5 w-1.5 rounded-full bg-[#409891] mr-2 animate-pulse"></span>
                <span className="text-xs font-medium text-[#409891] tracking-wide uppercase">Lead Centre Ecosystem</span>
              </div>

              {/* Main Heading - Reduced Margin & Size */}
              <h1 className="hero-fade-in text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4" style={{ animationDelay: '0.1s' }}>
                <span className="font-serif italic text-[#409891] drop-shadow-sm">"Every Lead Is An Accountable"</span>
              </h1>

              {/* Subheading - Reduced Margin */}
              <p className="hero-fade-in mt-2 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed" style={{ animationDelay: '0.2s' }}>
                The central hub connecting vendors, partners, and job seekers with opportunities.
              </p>
            </div>
          </div>
        </div>

        {/* Services Grid Section - Reduced Padding */}
        <div className="relative py-6 bg-white/40 backdrop-blur-[2px] border-t border-white/60">
          <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <div key={index} className="hero-fade-in h-auto" style={{ animationDelay: `${0.3 + (index * 0.1)}s` }}>
                  <Card
                    title={category.title}
                    icon={category.icon}
                    image={category.image}
                    link={category.link}
                    description={category.description}
                    index={index}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>


      </div>

      {/* Footer Section with Wave Design */}
      <footer className="relative overflow-hidden mt-12" style={{
        background: 'linear-gradient(135deg, #409891 0%, #48ADB7 100%)'
      }}>
        {/* Wave SVG Pattern */}
        <div className="absolute top-0 left-0 w-full h-20 overflow-hidden">
          <svg className="absolute top-0 left-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72c05.54,15.88,94.24,29.82,137.65,28.48,54.92-1.68,107.54-20.13,161.35-30.17C1044.37,60.29,1115.33,55.19,1200,52.47V120H0V46.29Z" fill="rgba(255, 255, 255, 0.15)" />
            <path d="M0,66.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,52.43,512.34,73.67,583,92c05.54,15.88,94.24,29.82,137.65,28.48,54.92-1.68,107.54-20.13,161.35-30.17C1044.37,80.29,1115.33,75.19,1200,72.47V120H0V66.29Z" fill="rgba(255, 255, 255, 0.2)" />
            <path d="M0,86.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,72.43,512.34,93.67,583,112c05.54,15.88,94.24,29.82,137.65,28.48,54.92-1.68,107.54-20.13,161.35-30.17C1044.37,100.29,1115.33,95.19,1200,92.47V120H0V86.29Z" fill="rgba(255, 255, 255, 0.25)" />
          </svg>
        </div>

        <div className="relative z-10 pt-8 pb-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center gap-2 lg:gap-3">
              {/* Centered Footer Content */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 lg:gap-4 flex-wrap">
                <p className="text-sm md:text-base font-medium text-white text-center" style={{
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '-0.01em',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}>
                  © {new Date().getFullYear()} Lead Centre — Powered by
                </p>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-lg opacity-20 blur-md bg-white"></div>
                    <img
                      src={dkitLogo}
                      alt="Durkkas Logo"
                      className="relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 object-contain drop-shadow-lg"
                    />
                  </div>
                  <h2 className="text-base sm:text-lg md:text-xl font-bold leading-tight text-white" style={{
                    letterSpacing: '-0.01em',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                  }}>
                    Durkkas Innovations Pvt Ltd
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button - Right Bottom */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-3xl"
          style={{
            background: 'linear-gradient(135deg, #409891 0%, #48ADB7 100%)',
            boxShadow: '0 4px 20px rgba(64, 152, 145, 0.4)'
          }}
          aria-label="Scroll to top"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </div>
  )
}

export default LandingPage
