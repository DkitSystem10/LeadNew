import { useNavigate } from 'react-router-dom'

const Card = ({ title, icon, image, link, description, index }) => {
  const navigate = useNavigate()

  const handleButtonClick = (e) => {
    e.preventDefault()
    navigate(link)
  }

  return (
    <div className="service-card h-full flex flex-col group relative overflow-hidden bg-white rounded-2xl transition-all duration-500" style={{
      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.04)',
      transform: 'perspective(1000px) translateZ(0)',
      transformStyle: 'preserve-3d'
    }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'perspective(1000px) translateZ(20px) rotateX(2deg) rotateY(-2deg)'
        e.currentTarget.style.boxShadow = '0 20px 60px rgba(64, 152, 145, 0.4), 0 10px 30px rgba(72, 173, 183, 0.3), 0 0 0 1px rgba(64, 152, 145, 0.2)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'perspective(1000px) translateZ(0)'
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.04)'
      }}>

      <div className="flex flex-col h-full relative z-10 p-5 sm:p-8">
        {image ? (
          <>
            {/* Image Container */}
            <div className="w-full h-48 sm:h-[220px] flex items-center justify-center mb-6 overflow-hidden rounded-xl bg-gray-50 transition-all duration-500 sm:group-hover:shadow-md" style={{
              border: '1px solid rgba(0, 0, 0, 0.05)'
            }}>
              <div className="relative w-full h-full overflow-hidden p-4">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center'
                  }}
                />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-[17px] sm:text-2xl font-bold mb-3 transition-all duration-300 leading-tight text-center sm:text-left h-12 sm:h-auto flex items-center justify-center sm:justify-start" style={{
              color: '#1a1a1a',
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '-0.01em',
              wordBreak: 'break-word',
              overflow: 'hidden'
            }}>
              {title}
            </h3>

            {/* Description */}
            {description && (
              <p className="text-sm sm:text-base leading-relaxed mb-6 flex-grow transition-all duration-300" style={{
                color: '#666',
                fontFamily: "'Inter', sans-serif",
                lineHeight: '1.6'
              }}>
                {description}
              </p>
            )}

            {/* Button */}
            <button
              onClick={handleButtonClick}
              className="service-card-btn w-full mt-auto py-2.5 sm:py-3.5 px-3 sm:px-6 rounded-lg text-[11px] sm:text-sm font-bold transition-all duration-300 relative overflow-hidden group/btn flex items-center justify-center text-center"
              style={{
                background: 'linear-gradient(135deg, #409891 0%, #48ADB7 100%)',
                color: '#ffffff',
                boxShadow: '0 2px 8px rgba(64, 152, 145, 0.2)',
                minHeight: '46px'
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = '0 4px 16px rgba(64, 152, 145, 0.35)'
                e.target.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = '0 2px 8px rgba(64, 152, 145, 0.2)'
                e.target.style.transform = 'translateY(0)'
              }}
            >
              <span className="relative z-10 block leading-tight">
                {description || title}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></span>
            </button>
          </>
        ) : (
          <>
            {/* Icon */}
            <div className="mb-6 transition-all duration-500 group-hover:scale-110 flex items-center justify-center" style={{ minHeight: '80px' }}>
              <span className="text-6xl transition-all duration-500">{icon}</span>
            </div>

            {/* Title */}
            <h3 className="text-[17px] sm:text-2xl font-bold mb-3 transition-all duration-300 leading-tight text-center sm:text-left h-12 sm:h-auto flex items-center justify-center sm:justify-start" style={{
              color: '#1a1a1a',
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '-0.01em',
              wordBreak: 'break-word',
              overflow: 'hidden'
            }}>
              {title}
            </h3>

            {/* Description */}
            {description && (
              <p className="text-sm sm:text-base leading-relaxed mb-6 flex-grow transition-all duration-300" style={{
                color: '#666',
                fontFamily: "'Inter', sans-serif",
                lineHeight: '1.6'
              }}>
                {description}
              </p>
            )}

            {/* Button */}
            <button
              onClick={handleButtonClick}
              className="service-card-btn w-full mt-auto py-2.5 sm:py-3.5 px-3 sm:px-6 rounded-lg text-[11px] sm:text-sm font-bold transition-all duration-300 relative overflow-hidden group/btn flex items-center justify-center text-center"
              style={{
                background: 'linear-gradient(135deg, #409891 0%, #48ADB7 100%)',
                color: '#ffffff',
                boxShadow: '0 2px 8px rgba(64, 152, 145, 0.2)',
                minHeight: '46px'
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = '0 4px 16px rgba(64, 152, 145, 0.35)'
                e.target.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = '0 2px 8px rgba(64, 152, 145, 0.2)'
                e.target.style.transform = 'translateY(0)'
              }}
            >
              <span className="relative z-10 block leading-tight">
                {description || title}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></span>
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Card
