import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useState } from 'react'
import { User, LogOut, LogIn, UserPlus } from 'lucide-react'
import { BallIcon, TeamSheetIcon, DugoutIcon, CupIcon, ShirtSwapIcon, BootIcon } from './icons'
import AuthModal from './AuthModal'

const Sidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated, signout } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState('signin')

  const navItems = [
    { path: '/', label: 'Home', icon: BallIcon },
    { path: '/players', label: 'Players', icon: TeamSheetIcon },
    { path: '/teams', label: 'Teams', icon: DugoutIcon },
    { path: '/leagues', label: 'Leagues', icon: CupIcon },
    { path: '/trades', label: 'Trades', icon: ShirtSwapIcon },
    { path: '/account', label: 'Account', icon: BootIcon }
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
      <div className="fixed left-0 top-0 h-full w-60 z-30 bg-pitch">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <img src="./crest.svg" alt="Futty crest" className="w-9 h-9 flex-shrink-0" />
            <h1 className="font-display text-3xl text-chalk leading-none">futty</h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col py-6">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path

            return (
              <button
                key={item.path}
                type="button"
                className={`flex items-center w-[calc(100%-1.5rem)] px-5 py-3.5 mx-3 mb-1 rounded-md transition-all duration-200 border-l-[3px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-floodlight/40 focus-visible:ring-offset-2 focus-visible:ring-offset-pitch ${
                  isActive
                    ? 'bg-floodlight/10 border-floodlight text-floodlight'
                    : 'border-transparent text-chalk/80 hover:bg-white/5 hover:text-chalk active:bg-white/10'
                }`}
                onClick={() => navigate(item.path)}
              >
                <Icon size={19} className="mr-3.5 flex-shrink-0" />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Footer - Authentication Section */}
        <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-white/10">
          {isAuthenticated ? (
            <div className="space-y-3">
              {/* User Profile */}
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5">
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10">
                  <User size={18} className="text-chalk" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate text-chalk">{user?.username}</p>
                  <p className="text-xs truncate text-chalk/60">{user?.email}</p>
                </div>
              </div>

              {/* Sign Out Button */}
              <button
                onClick={handleSignout}
                className="w-full flex items-center justify-center px-4 py-2 rounded-lg transition-all text-chalk/80 hover:bg-white/5 hover:text-chalk active:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-pitch"
              >
                <LogOut size={16} className="mr-2" />
                <span className="text-sm font-medium">Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {/* Sign In Button */}
              <button
                onClick={() => handleAuthClick('signin')}
                className="w-full flex items-center justify-center px-4 py-2.5 rounded-lg transition-all bg-floodlight text-ink font-medium hover:brightness-95 active:brightness-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-floodlight/50 focus-visible:ring-offset-2 focus-visible:ring-offset-pitch"
              >
                <LogIn size={16} className="mr-2" />
                <span className="text-sm font-medium">Sign In</span>
              </button>

              {/* Sign Up Button */}
              <button
                onClick={() => handleAuthClick('signup')}
                className="w-full flex items-center justify-center px-4 py-2.5 rounded-lg bg-floodlight/15 text-floodlight font-medium transition-all hover:bg-floodlight/25 active:bg-floodlight/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-floodlight/50 focus-visible:ring-offset-2 focus-visible:ring-offset-pitch"
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
