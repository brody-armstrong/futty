import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useState, useEffect } from 'react'
import AuthModal from './AuthModal'

const ProtectedRoute = ({ children, requireAuth = true }) => {
  const { user, isAuthenticated, loading } = useAuth()
  const location = useLocation()
  const [showAuthModal, setShowAuthModal] = useState(false)

  useEffect(() => {
    // Show auth modal if user is not authenticated and we're not loading
    if (!loading && requireAuth && !isAuthenticated) {
      setShowAuthModal(true)
    }
  }, [loading, requireAuth, isAuthenticated])

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: 'oklch(71.772% 0.133 239.443)' }}></div>
      </div>
    )
  }

  // If authentication is not required, render children
  if (!requireAuth) {
    return children
  }

  // If user is not authenticated, show auth modal and redirect to home
  if (!isAuthenticated) {
    return (
      <>
        <Navigate to="/" replace />
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)}
          initialMode="signin"
        />
      </>
    )
  }

  // User is authenticated, render protected content
  return children
}

export default ProtectedRoute
