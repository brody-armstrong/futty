import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useState, useEffect } from 'react'
import AuthModal from './AuthModal'

const ProtectedRoute = ({ children, requireAuth = true }) => {
  const { isAuthenticated, loading } = useAuth()
  const navigate = useNavigate()
  const [showAuthModal, setShowAuthModal] = useState(true)

  useEffect(() => {
    // Show auth modal if user is not authenticated and we're not loading
    if (!loading && requireAuth && !isAuthenticated) {
      setShowAuthModal(true)
    }
  }, [loading, requireAuth, isAuthenticated])

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-chalk">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pitch"></div>
      </div>
    )
  }

  // If authentication is not required, render children
  if (!requireAuth) {
    return children
  }

  // If user is not authenticated, show the sign-in modal in place (staying on
  // the clicked route) instead of navigating away — a Navigate here would
  // unmount this component before the modal ever had a chance to render.
  // Only bounce to home if they dismiss the modal without signing in.
  if (!isAuthenticated) {
    return (
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => {
          setShowAuthModal(false)
          navigate('/')
        }}
        initialMode="signin"
      />
    )
  }

  // User is authenticated, render protected content
  return children
}

export default ProtectedRoute
