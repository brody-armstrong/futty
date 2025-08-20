import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import ErrorBoundary from './components/ErrorBoundary'
import DebugInfo from './components/DebugInfo'
import ProtectedRoute from './components/ProtectedRoute'
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
                      {/* Public Routes */}
                      <Route path="/" element={<Home />} />
                      
                      {/* Protected Routes */}
                      <Route path="/players" element={
                        <ProtectedRoute>
                          <PlayerSearch />
                        </ProtectedRoute>
                      } />
                      <Route path="/teams" element={
                        <ProtectedRoute>
                          <Teams />
                        </ProtectedRoute>
                      } />
                      <Route path="/leagues" element={
                        <ProtectedRoute>
                          <Leagues />
                        </ProtectedRoute>
                      } />
                      <Route path="/draft/:leagueId" element={
                        <ProtectedRoute>
                          <Draft />
                        </ProtectedRoute>
                      } />
                      <Route path="/trades" element={
                        <ProtectedRoute>
                          <Trades />
                        </ProtectedRoute>
                      } />
                      <Route path="/account" element={
                        <ProtectedRoute>
                          <Account />
                        </ProtectedRoute>
                      } />
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