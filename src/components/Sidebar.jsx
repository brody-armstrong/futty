import { Home, Search, Users, Trophy, Settings } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/players', label: 'Player Search', icon: Search },
    { path: '/teams', label: 'Team', icon: Users },
    { path: '/leagues', label: 'Leagues', icon: Trophy },
    { path: '/account', label: 'Settings', icon: Settings }
  ]

  return (
    <div className="sidebar">
      {/* Logo */}
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

      {/* Footer */}
      <div 
        className="absolute bottom-0 left-0 right-0 p-6 border-t"
        style={{ 
          borderColor: 'oklch(90% 0 0)',
          backgroundColor: 'oklch(95% 0 0)'
        }}
      >
        <div className="text-center">
          <p 
            className="text-xs font-medium"
            style={{ color: 'oklch(21.778% 0 0 / 0.6)' }}
          >
            Version 1.0.0
          </p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar 