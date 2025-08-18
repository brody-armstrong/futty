import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import ErrorBoundary from './components/ErrorBoundary'
import DebugInfo from './components/DebugInfo'
import Home from './pages/Home'
import PlayerSearch from './pages/PlayerSearch'
import Teams from './pages/Teams'
import Leagues from './pages/Leagues'
import Draft from './pages/Draft'
import Account from './pages/Account'
import Trades from './pages/Trades'
import { AuthProvider } from './contexts/AuthContext'
import { LeagueProvider } from './contexts/LeagueContext'
import { PlayerProvider } from './contexts/PlayerContext'
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <PlayerProvider>
            <LeagueProvider>
              <div 
                className="flex h-screen min-h-screen"
                style={{ backgroundColor: 'oklch(95% 0 0)' }}
              >
                <Sidebar />
                <main 
                  className="flex-1 ml-60 min-h-screen"
                  style={{ backgroundColor: 'oklch(95% 0 0)' }}
                >
                  <DebugInfo />
                  <div 
                    className="min-h-full"
                    style={{ backgroundColor: 'oklch(95% 0 0)' }}
                  >
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/players" element={<PlayerSearch />} />
                      <Route path="/teams" element={<Teams />} />
                      <Route path="/leagues" element={<Leagues />} />
                      <Route path="/draft/:leagueId" element={<Draft />} />
                      <Route path="/trades" element={<Trades />} />
                      <Route path="/account" element={<Account />} />
                    </Routes>
                  </div>
                </main>
              </div>
            </LeagueProvider>
          </PlayerProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App 