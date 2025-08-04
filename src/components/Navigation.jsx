import { Link, useLocation } from 'react-router-dom'
import { Home, Users, Trophy, Search, User } from 'lucide-react'

const Navigation = ({ activeTab, setActiveTab }) => {
  const location = useLocation()

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      path: '/'
    },
    {
      id: 'players',
      label: 'Players',
      icon: Search,
      path: '/players'
    },
    {
      id: 'teams',
      label: 'Teams',
      icon: Users,
      path: '/teams'
    },
    {
      id: 'leagues',
      label: 'Leagues',
      icon: Trophy,
      path: '/leagues'
    },
    {
      id: 'account',
      label: 'Account',
      icon: User,
      path: '/account'
    }
  ]

  const handleTabClick = (tabId) => {
    setActiveTab(tabId)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            
            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => handleTabClick(item.id)}
                className={`flex flex-col items-center py-2 px-3 transition-colors duration-200 ${
                  isActive
                    ? 'text-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon size={20} />
                <span className="text-xs mt-1 font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default Navigation 