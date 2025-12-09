import { Navigate, useLocation } from 'react-router-dom'

const RouteGuard = ({ children }) => {
  const location = useLocation()
  const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true'

  // If not authenticated and trying to access protected route, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}

export default RouteGuard
