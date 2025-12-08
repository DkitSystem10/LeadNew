import { useEffect, useRef, useState } from 'react'
import Card from '../components/Card'
import jobSeekerImage from '../assets/Job_Seeker.png'
import careerGuidanceImage from '../assets/Career_Guidance.png'
import studentInternshipImage from '../assets/student_Internship.png'
// Import Enquiry.png using Vite-compatible method for files with spaces
const enquiryImage = new URL('../assets/Enquiry.png', import.meta.url).href
import vendorImage from '../assets/vendor.png'
import partnerImage from '../assets/Partner.png'
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
    <div className="min-h-screen relative overflow-x-hidden bg-white w-full max-w-full">
      {/* Main Quote - Top of Page */}
      <div className="relative w-full max-w-full pt-4 pb-0 bg-white z-30 overflow-x-hidden">
        <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center w-full">
            <h1 className="hero-quote text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl hero-fade-in italic break-words" style={{ 
              animationDelay: '0.3s',
              lineHeight: '1.4',
              letterSpacing: '0.02em',
              wordSpacing: '0.1em',
              margin: '0',
              marginBottom: '0',
              paddingTop: '0',
              maxWidth: '100%'
            }}>
              <span style={{ color: '#409891' }}>&quot;Every Lead Is An Accountable&quot;</span>
            </h1>
            <div className="w-24 h-px mx-auto mt-3 mb-4" style={{ 
              background: 'linear-gradient(to right, transparent, #409891, #48ADB7, #409891, transparent)'
            }}></div>
          </div>
        </div>
      </div>

      {/* Snow Effect with Theme Colors */}
      <div className="snow-container fixed inset-0 pointer-events-none z-10 overflow-hidden">
        <div className="snowflake" style={{ '--delay': '0s', '--duration': '10s', '--left': '10%' }}></div>
        <div className="snowflake" style={{ '--delay': '1s', '--duration': '12s', '--left': '20%' }}></div>
        <div className="snowflake" style={{ '--delay': '2s', '--duration': '14s', '--left': '30%' }}></div>
        <div className="snowflake" style={{ '--delay': '0.5s', '--duration': '11s', '--left': '40%' }}></div>
        <div className="snowflake" style={{ '--delay': '1.5s', '--duration': '13s', '--left': '50%' }}></div>
        <div className="snowflake" style={{ '--delay': '2.5s', '--duration': '15s', '--left': '60%' }}></div>
        <div className="snowflake" style={{ '--delay': '0.8s', '--duration': '12s', '--left': '70%' }}></div>
        <div className="snowflake" style={{ '--delay': '1.8s', '--duration': '14s', '--left': '80%' }}></div>
        <div className="snowflake" style={{ '--delay': '2.2s', '--duration': '13s', '--left': '90%' }}></div>
        <div className="snowflake" style={{ '--delay': '0.3s', '--duration': '11s', '--left': '15%' }}></div>
        <div className="snowflake" style={{ '--delay': '1.3s', '--duration': '13s', '--left': '25%' }}></div>
        <div className="snowflake" style={{ '--delay': '2.3s', '--duration': '15s', '--left': '35%' }}></div>
        <div className="snowflake" style={{ '--delay': '0.7s', '--duration': '12s', '--left': '45%' }}></div>
        <div className="snowflake" style={{ '--delay': '1.7s', '--duration': '14s', '--left': '55%' }}></div>
        <div className="snowflake" style={{ '--delay': '2.7s', '--duration': '16s', '--left': '65%' }}></div>
        <div className="snowflake" style={{ '--delay': '0.4s', '--duration': '11s', '--left': '75%' }}></div>
        <div className="snowflake" style={{ '--delay': '1.4s', '--duration': '13s', '--left': '85%' }}></div>
        <div className="snowflake" style={{ '--delay': '2.4s', '--duration': '15s', '--left': '95%' }}></div>
        <div className="snowflake" style={{ '--delay': '0.6s', '--duration': '12s', '--left': '5%' }}></div>
        <div className="snowflake" style={{ '--delay': '1.6s', '--duration': '14s', '--left': '12%' }}></div>
        <div className="snowflake" style={{ '--delay': '2.6s', '--duration': '16s', '--left': '22%' }}></div>
        <div className="snowflake" style={{ '--delay': '0.9s', '--duration': '13s', '--left': '32%' }}></div>
        <div className="snowflake" style={{ '--delay': '1.9s', '--duration': '15s', '--left': '42%' }}></div>
        <div className="snowflake" style={{ '--delay': '2.9s', '--duration': '17s', '--left': '52%' }}></div>
        <div className="snowflake" style={{ '--delay': '0.2s', '--duration': '10s', '--left': '62%' }}></div>
        <div className="snowflake" style={{ '--delay': '1.2s', '--duration': '12s', '--left': '72%' }}></div>
        <div className="snowflake" style={{ '--delay': '2.2s', '--duration': '14s', '--left': '82%' }}></div>
        <div className="snowflake" style={{ '--delay': '0.1s', '--duration': '11s', '--left': '92%' }}></div>
        <div className="snowflake" style={{ '--delay': '1.1s', '--duration': '13s', '--left': '8%' }}></div>
        <div className="snowflake" style={{ '--delay': '2.1s', '--duration': '15s', '--left': '18%' }}></div>
        <div className="snowflake" style={{ '--delay': '0.4s', '--duration': '12s', '--left': '28%' }}></div>
        <div className="snowflake" style={{ '--delay': '1.4s', '--duration': '14s', '--left': '38%' }}></div>
        <div className="snowflake" style={{ '--delay': '2.4s', '--duration': '16s', '--left': '48%' }}></div>
      </div>

      {/* Services Section */}
      <div className="bg-white pb-0 pt-0 relative overflow-x-hidden w-full max-w-full">
        <div className="container-custom relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pt-2 w-full">
        {categories.map((category, index) => (
          <Card
            key={index}
            title={category.title}
            icon={category.icon}
                image={category.image}
            link={category.link}
            description={category.description}
                index={index}
          />
        ))}
          </div>
        </div>
      </div>

      {/* Footer Section with Wave Design */}
      <footer className="relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #409891 0%, #48ADB7 100%)'
      }}>
        {/* Wave SVG Pattern */}
        <div className="absolute top-0 left-0 w-full h-20 overflow-hidden">
          <svg className="absolute top-0 left-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72c05.54,15.88,94.24,29.82,137.65,28.48,54.92-1.68,107.54-20.13,161.35-30.17C1044.37,60.29,1115.33,55.19,1200,52.47V120H0V46.29Z" fill="rgba(255, 255, 255, 0.15)"/>
            <path d="M0,66.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,52.43,512.34,73.67,583,92c05.54,15.88,94.24,29.82,137.65,28.48,54.92-1.68,107.54-20.13,161.35-30.17C1044.37,80.29,1115.33,75.19,1200,72.47V120H0V66.29Z" fill="rgba(255, 255, 255, 0.2)"/>
            <path d="M0,86.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,72.43,512.34,93.67,583,112c05.54,15.88,94.24,29.82,137.65,28.48,54.92-1.68,107.54-20.13,161.35-30.17C1044.37,100.29,1115.33,95.19,1200,92.47V120H0V86.29Z" fill="rgba(255, 255, 255, 0.25)"/>
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
