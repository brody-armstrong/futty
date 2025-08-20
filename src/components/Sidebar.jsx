import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useState } from 'react'
import { 
  Home, Users, Target, Search, Filter, Star, Plus, ChevronLeft, ChevronRight,
  Crown, Shield, Timer, Shuffle, AlertCircle, Check, X, Eye, User, Trophy,
  TrendingUp, TrendingDown, Zap, Calendar, Settings, Volume2, VolumeX, Play,
  ArrowRight, ArrowLeft, Minus, Maximize2, Minimize2, LogOut, LogIn, UserPlus
} from 'lucide-react'
import AuthModal from './AuthModal'

const Sidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated, signout } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState('signin')

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/players', label: 'Players', icon: Search },
    { path: '/teams', label: 'Teams', icon: Users },
    { path: '/leagues', label: 'Leagues', icon: Crown },
    { path: '/trades', label: 'Trades', icon: Shuffle },
    { path: '/account', label: 'Account', icon: Settings }
  ]

  const handleAuthClick = (mode) => {
    setAuthMode(mode)
    setShowAuthModal(true)
  }

  const handleSignout = () => {
    signout()
    navigate('/')
  }

  return (
    <>
      <div 
        className="fixed left-0 top-0 h-full w-60 border-r shadow-sm z-30"
        style={{ 
          backgroundColor: 'oklch(95% 0 0)',
          borderColor: 'oklch(90% 0 0)'
        }}
      >
        {/* Header */}
        <div 
          className="p-8 border-b"
          style={{ 
            borderColor: 'oklch(90% 0 0)',
            backgroundColor: 'oklch(95% 0 0)'
          }}
        >
          <div className="flex items-center space-x-4">
            <h1 
              className="text-3xl font-bold"
              style={{ color: 'oklch(71.772% 0.133 239.443)' }}
            >
              futty
            </h1>
            <div 
              className="w-12 h-12 flex items-center justify-center rounded-xl shadow-sm"
              style={{ backgroundColor: 'oklch(100% 0 0)' }}
            >
              <img 
                src="./futty_logo_v2.png" 
                alt="Futty Logo" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              {/* Fallback icon if image fails to load */}
              <div 
                className="w-full h-full rounded-xl flex items-center justify-center shadow-sm hidden"
                style={{ 
                  background: 'linear-gradient(135deg, oklch(71.772% 0.133 239.443), oklch(64.476% 0.202 359.339))'
                }}
              >
                <Trophy size={20} style={{ color: 'oklch(14.354% 0.026 239.443)' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav 
          className="flex flex-col py-6"
          style={{ backgroundColor: 'oklch(95% 0 0)' }}
        >
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            
            return (
              <div
                key={item.path}
                className="flex items-center px-6 py-4 mx-3 rounded-xl cursor-pointer transition-all duration-200 group"
                style={{
                  backgroundColor: isActive ? 'oklch(71.772% 0.133 239.443)' : 'transparent',
                  color: isActive ? 'oklch(14.354% 0.026 239.443)' : 'oklch(21.778% 0 0)',
                  boxShadow: isActive ? '0 4px 6px -1px oklch(21.778% 0 0 / 0.1), 0 2px 4px -1px oklch(21.778% 0 0 / 0.06)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.target.style.backgroundColor = 'oklch(90% 0 0)'
                    e.target.style.transform = 'translateX(4px)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.target.style.backgroundColor = 'transparent'
                    e.target.style.transform = 'translateX(0)'
                  }
                }}
                onClick={() => navigate(item.path)}
              >
                <Icon size={20} className="mr-4" />
                <span className="font-medium">{item.label}</span>
              </div>
            )
          })}
        </nav>

        {/* Footer - Authentication Section */}
        <div 
          className="absolute bottom-0 left-0 right-0 p-6 border-t"
          style={{ 
            borderColor: 'oklch(90% 0 0)',
            backgroundColor: 'oklch(95% 0 0)'
          }}
        >
          {isAuthenticated ? (
            <div className="space-y-4">
              {/* User Profile */}
              <div className="flex items-center space-x-3 p-3 rounded-lg" style={{ backgroundColor: 'oklch(100% 0 0)' }}>
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'oklch(71.772% 0.133 239.443)' }}
                >
                  <User size={20} style={{ color: 'oklch(14.354% 0.026 239.443)' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: 'oklch(21.778% 0 0)' }}>
                    {user?.username}
                  </p>
                  <p className="text-xs truncate" style={{ color: 'oklch(21.778% 0 0 / 0.6)' }}>
                    {user?.email}
                  </p>
                </div>
              </div>
              
              {/* Sign Out Button */}
              <button
                onClick={handleSignout}
                className="w-full flex items-center justify-center px-4 py-2 rounded-lg transition-all hover:bg-gray-100"
                style={{ color: 'oklch(21.778% 0 0)' }}
              >
                <LogOut size={16} className="mr-2" />
                <span className="text-sm font-medium">Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Sign In Button */}
              <button
                onClick={() => handleAuthClick('signin')}
                className="w-full flex items-center justify-center px-4 py-2 rounded-lg transition-all"
                style={{ 
                  backgroundColor: 'oklch(71.772% 0.133 239.443)',
                  color: 'oklch(14.354% 0.026 239.443)'
                }}
              >
                <LogIn size={16} className="mr-2" />
                <span className="text-sm font-medium">Sign In</span>
              </button>
              
              {/* Sign Up Button */}
              <button
                onClick={() => handleAuthClick('signup')}
                className="w-full flex items-center justify-center px-4 py-2 rounded-lg border transition-all hover:bg-gray-50"
                style={{ 
                  borderColor: 'oklch(71.772% 0.133 239.443)',
                  color: 'oklch(71.772% 0.133 239.443)'
                }}
              >
                <UserPlus size={16} className="mr-2" />
                <span className="text-sm font-medium">Sign Up</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </>
  )
}

export default Sidebar 