import { Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import ErrorBoundary from './components/ErrorBoundary'
import DebugInfo from './components/DebugInfo'
import Home from './pages/Home'
import PlayerSearch from './pages/PlayerSearch'
import Teams from './pages/Teams'
import Leagues from './pages/Leagues'
import Account from './pages/Account'
import { AuthProvider } from './contexts/AuthContext'
import { LeagueProvider } from './contexts/LeagueContext'
import { PlayerProvider } from './contexts/PlayerContext'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const location = useLocation()

  // Sync activeTab with current route
  useEffect(() => {
    const pathToTab = {
      '/': 'home',
      '/players': 'players',
      '/teams': 'teams',
      '/leagues': 'leagues',
      '/account': 'account'
    }
    
    const currentTab = pathToTab[location.pathname] || 'home'
    setActiveTab(currentTab)
  }, [location.pathname])

  return (
    <ErrorBoundary>
      <AuthProvider>
        <PlayerProvider>
          <LeagueProvider>
            <div className="min-h-screen bg-gray-50">
              <DebugInfo />
              <div className="max-w-7xl mx-auto">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/players" element={<PlayerSearch />} />
                  <Route path="/teams" element={<Teams />} />
                  <Route path="/leagues" element={<Leagues />} />
                  <Route path="/account" element={<Account />} />
                </Routes>
              </div>
              <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
          </LeagueProvider>
        </PlayerProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App 