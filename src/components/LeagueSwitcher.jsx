import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLeagues } from '../contexts/LeagueContext'
import { ChevronDown, Star } from 'lucide-react'

const LeagueSwitcher = () => {
  const { userTeams, getLeagueById, currentTeam, setCurrentTeamById } = useLeagues()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [favoriteTeam, setFavoriteTeam] = useState(null)

  // Load favorite team from localStorage
  useEffect(() => {
    const storedFavorite = localStorage.getItem('favoriteTeam')
    if (storedFavorite) {
      setFavoriteTeam(storedFavorite)
    }
  }, [])

  const handleTeamSelect = (team) => {
    setCurrentTeamById(team.id)
    setIsOpen(false)
    
    // Navigate to the team's league page
    navigate(`/leagues/${team.leagueID}`)
  }

  const handleFavoriteToggle = (teamId, event) => {
    event.stopPropagation()
    
    if (favoriteTeam === teamId) {
      localStorage.removeItem('favoriteTeam')
      setFavoriteTeam(null)
    } else {
      localStorage.setItem('favoriteTeam', teamId)
      setFavoriteTeam(teamId)
    }
  }

  if (!currentTeam || userTeams.length === 0) {
    return null
  }

  const currentLeague = getLeagueById(currentTeam.leagueID)

  return (
    <div className="relative">
      {/* Current Team Display */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 hover:shadow-md cursor-pointer"
        style={{ 
          backgroundColor: 'var(--background)', 
          borderColor: 'var(--border)',
          color: 'var(--text-primary)'
        }}
      >
        <div className="flex items-center space-x-2">
          <span className="font-semibold">{currentTeam.name}</span>
          <span className="text-sm opacity-70">({currentLeague?.name || 'League'})</span>
        </div>
        <ChevronDown 
          size={16} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          style={{ color: 'var(--text-secondary)' }}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto"
             style={{ borderColor: 'var(--border)' }}>
          {userTeams.map((team) => {
            const league = getLeagueById(team.leagueID)
            const isFavorite = favoriteTeam === team.id
            const isCurrent = currentTeam.id === team.id
            
            return (
              <div
                key={team.id}
                onClick={() => handleTeamSelect(team)}
                className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors duration-200 ${
                  isCurrent 
                    ? 'bg-blue-50 border-l-4 border-blue-500' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{team.name}</span>
                    <span className="text-sm opacity-70">- {league?.name || 'League'}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {isFavorite && (
                    <Star 
                      size={16} 
                      className="text-yellow-500 fill-current"
                      onClick={(e) => handleFavoriteToggle(team.id, e)}
                    />
                  )}
                  {!isFavorite && (
                    <Star 
                      size={16} 
                      className="text-gray-300 hover:text-yellow-500 transition-colors duration-200"
                      onClick={(e) => handleFavoriteToggle(team.id, e)}
                    />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default LeagueSwitcher 