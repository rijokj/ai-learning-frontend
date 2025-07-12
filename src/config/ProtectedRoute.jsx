import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  if (!token) return <Navigate to="/login" replace />

  try {
    const decoded = jwtDecode(token)
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.clear()
      return <Navigate to="/login" replace />
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
      // Redirect to correct dashboard instead of looping
      return <Navigate to={role === 'admin' ? '/admin' : '/'} replace />
    }
  } catch (error) {
    localStorage.clear()
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
