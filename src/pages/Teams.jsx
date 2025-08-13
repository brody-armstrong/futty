import { useState, useEffect } from 'react'
import { 
  Users, 
  Trophy, 
  TrendingUp, 
  Settings, 
  Plus, 
  Target, 
  Shield, 
  Zap, 
  ChevronRight, 
  ChevronDown, 
  PlusCircle, 
  Star, 
  ArrowUpDown,
  Activity,
  MoreVertical
} from 'lucide-react'

const Teams = () => {
  // Mock data for demonstration
  const loading = false
  const userTeams = [
    { id: 1, name: 'Thunder Strikers', league: 'Premier Fantasy League', points: 1247, rank: 3 },
    { id: 2, name: 'Goal Diggers', league: 'Champions Cup', points: 982, rank: 7 },
    { id: 3, name: 'Net Busters', league: 'Sunday League Elite', points: 1456, rank: 1 }
  ]
  
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [draggedPlayer, setDraggedPlayer] = useState(null)

  useEffect(() => {
    if (userTeams.length > 0 && !selectedTeam) {
      setSelectedTeam(userTeams[0])
    }
  }, [userTeams, selectedTeam])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.team-dropdown')) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isDropdownOpen])

  // Mock players data
  const mockPlayers = [
    { id: 1, name: 'Alisson', position: 'GK', team: 'Liverpool', points: 89 },
    { id: 2, name: 'Alexander-Arnold', position: 'DEF', team: 'Liverpool', points: 124 },
    { id: 3, name: 'van Dijk', position: 'DEF', team: 'Liverpool', points: 156 },
    { id: 4, name: 'Saliba', position: 'DEF', team: 'Arsenal', points: 142 },
    { id: 5, name: 'Shaw', position: 'DEF', team: 'Man Utd', points: 98 },
    { id: 6, name: 'De Bruyne', position: 'MID', team: 'Man City', points: 187 },
    { id: 7, name: 'Ødegaard', position: 'MID', team: 'Arsenal', points: 165 },
    { id: 8, name: 'Bruno Fernandes', position: 'MID', team: 'Man Utd', points: 149 },
    { id: 9, name: 'Haaland', position: 'FWD', team: 'Man City', points: 234 },
    { id: 10, name: 'Salah', position: 'FWD', team: 'Liverpool', points: 198 },
    { id: 11, name: 'Jesus', position: 'FWD', team: 'Arsenal', points: 134 },
    { id: 12, name: 'Raya', position: 'GK', team: 'Arsenal', points: 67 },
    { id: 13, name: 'Stones', position: 'DEF', team: 'Man City', points: 89 },
    { id: 14, name: 'Rashford', position: 'FWD', team: 'Man Utd', points: 156 }
  ]

  const calculatePlayerPoints = (player) => player.points

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-gray-200 border-t-blue-600 mx-auto mb-8"></div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Loading Teams</h2>
          <p className="text-lg text-gray-600">Preparing your fantasy teams...</p>
        </div>
      </div>
    )
  }

  // Get players by position for formation display
  const getPlayersByPosition = () => {
    const gk = mockPlayers.filter(p => p.position === 'GK').slice(0, 1)
    const def = mockPlayers.filter(p => p.position === 'DEF').slice(0, 4)
    const mid = mockPlayers.filter(p => p.position === 'MID').slice(0, 3)
    const fwd = mockPlayers.filter(p => p.position === 'FWD').slice(0, 3)
    
    return { gk, def, mid, fwd }
  }

  const { gk, def, mid, fwd } = getPlayersByPosition()
  const benchPlayers = mockPlayers.slice(11, 14)

  const getPositionColors = (position) => {
    switch (position) {
      case 'GK': return {
        bg: 'bg-yellow-50',
        border: 'border-yellow-400',
        text: 'text-yellow-700',
        badge: 'bg-yellow-100 text-yellow-800'
      }
      case 'DEF': return {
        bg: 'bg-blue-50',
        border: 'border-blue-400',
        text: 'text-blue-700',
        badge: 'bg-blue-100 text-blue-800'
      }
      case 'MID': return {
        bg: 'bg-green-50',
        border: 'border-green-400',
        text: 'text-green-700',
        badge: 'bg-green-100 text-green-800'
      }
      case 'FWD': return {
        bg: 'bg-red-50',
        border: 'border-red-400',
        text: 'text-red-700',
        badge: 'bg-red-100 text-red-800'
      }
      default: return {
        bg: 'bg-gray-50',
        border: 'border-gray-300',
        text: 'text-gray-700',
        badge: 'bg-gray-100 text-gray-800'
      }
    }
  }

  const handleDragStart = (e, player) => {
    setDraggedPlayer(player)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e) => {
    e.preventDefault()
    console.log('Player dropped:', draggedPlayer)
    setDraggedPlayer(null)
  }

  // Empty state when user has no teams
  if (userTeams.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-12 text-center">
            <div className="w-24 h-24 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-6">
              <Trophy size={36} className="text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">No Teams Yet</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              You haven't joined any fantasy leagues yet. Create or join a league to start building your dream team!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Create League
              </button>
              <button className="px-8 py-4 bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 hover:border-blue-700 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50">
                Join League
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const PlayerCard = ({ player, isDraggable = true, className = "" }) => {
    const colors = getPositionColors(player.position)
    
    return (
      <div
        draggable={isDraggable}
        onDragStart={isDraggable ? (e) => handleDragStart(e, player) : undefined}
        className={`
          bg-white rounded-2xl border-2 shadow-lg transition-all duration-300 
          ${isDraggable ? 'cursor-move hover:scale-105 hover:-translate-y-2 hover:shadow-xl' : ''}
          ${colors.border} ${className}
        `}
        role={isDraggable ? "button" : undefined}
        tabIndex={isDraggable ? 0 : undefined}
        aria-label={`${player.name} - ${player.position}`}
      >
        <div className={`${colors.bg} rounded-t-xl p-3 border-b ${colors.border}`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold ${colors.text} uppercase tracking-wider`}>
              {player.position}
            </span>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${colors.badge}`}>
              {player.team}
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-gray-900 text-sm mb-3 leading-tight">
            {player.name}
          </h3>
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {calculatePlayerPoints(player)}
              </div>
              <div className="text-xs text-gray-500 font-medium">
                points
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Star size={14} className="text-yellow-500 fill-yellow-500" />
              <span className="text-xs font-medium text-gray-600">
                {(Math.random() * 2 + 3).toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header with Team Dropdown */}
          <section className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Users size={20} className="text-blue-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {selectedTeam?.name || 'My Team'}
                  </h1>
                  <p className="text-gray-600">
                    {selectedTeam?.league || 'Fantasy Premier League'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                {/* Team Stats */}
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {selectedTeam?.points || 1247}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      Total Points
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      #{selectedTeam?.rank || 3}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      League Rank
                    </div>
                  </div>
                </div>

                {/* Team Dropdown */}
                <div className="relative team-dropdown">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-gray-50 transition-all duration-200 min-w-[200px] justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm"
                  >
                    <span className="font-medium text-gray-900">{selectedTeam?.name || 'Select Team'}</span>
                    <ChevronDown 
                      size={20} 
                      className={`text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
                      {userTeams.map((team) => (
                        <button
                          key={team.id}
                          onClick={() => {
                            setSelectedTeam(team)
                            setIsDropdownOpen(false)
                          }}
                          className="w-full text-left px-6 py-4 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between border-b border-gray-100 last:border-b-0"
                        >
                          <div>
                            <p className="font-medium text-gray-900">{team.name}</p>
                            <p className="text-sm text-gray-500">{team.league}</p>
                          </div>
                          {team.id === selectedTeam?.id && (
                            <Trophy size={16} className="text-yellow-500" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Formation Display */}
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                    <Target size={20} className="text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Formation (4-3-3)</h2>
                    <p className="text-sm text-gray-500">Drag and drop to reorganize your team</p>
                  </div>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Change Formation
                </button>
              </div>
            </div>

            {/* Soccer Pitch */}
            <div 
              className="relative p-8 min-h-[700px] bg-gradient-to-b from-green-400/20 via-green-300/15 to-green-200/10"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {/* Pitch Markings */}
              <div className="absolute inset-4 border-2 border-white/50 rounded-lg">
                <div className="absolute top-1/2 left-0 right-0 h-0 border-t-2 border-white/50"></div>
                <div className="absolute top-1/2 left-1/2 w-20 h-20 border-2 border-white/50 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute top-0 left-1/2 w-24 h-12 border-2 border-white/50 border-t-0 transform -translate-x-1/2"></div>
                <div className="absolute bottom-0 left-1/2 w-24 h-12 border-2 border-white/50 border-b-0 transform -translate-x-1/2"></div>
              </div>

              {/* Formation Grid */}
              <div className="relative z-10 h-full grid grid-rows-4 gap-8">
                {/* Goalkeepers */}
                <div className="flex justify-center items-center">
                  <div className="grid grid-cols-1 gap-4 max-w-[120px]">
                    {gk.map((player) => (
                      <PlayerCard key={player.id} player={player} />
                    ))}
                  </div>
                </div>

                {/* Defenders */}
                <div className="flex justify-center items-center">
                  <div className="grid grid-cols-4 gap-4 max-w-[520px]">
                    {def.map((player) => (
                      <PlayerCard key={player.id} player={player} />
                    ))}
                  </div>
                </div>

                {/* Midfielders */}
                <div className="flex justify-center items-center">
                  <div className="grid grid-cols-3 gap-4 max-w-[400px]">
                    {mid.map((player) => (
                      <PlayerCard key={player.id} player={player} />
                    ))}
                  </div>
                </div>

                {/* Forwards */}
                <div className="flex justify-center items-center">
                  <div className="grid grid-cols-3 gap-4 max-w-[400px]">
                    {fwd.map((player) => (
                      <PlayerCard key={player.id} player={player} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Bench Section */}
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                    <Users size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Bench</h2>
                    <p className="text-sm text-gray-500">{benchPlayers.length} substitutes ready</p>
                  </div>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2">
                  <ArrowUpDown size={16} />
                  Make Changes
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {benchPlayers.map((player) => (
                  <div
                    key={player.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, player)}
                    className="bg-gray-50 hover:bg-white border border-gray-200 hover:border-gray-300 rounded-2xl p-4 transition-all duration-300 cursor-move hover:shadow-lg hover:-translate-y-1 group"
                    role="button"
                    tabIndex={0}
                    aria-label={`${player.name} - Bench player`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{player.name}</h3>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getPositionColors(player.position).badge}`}>
                            {player.position}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">{player.team}</p>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <span className="text-lg font-bold text-gray-900">{calculatePlayerPoints(player)}</span>
                            <span className="text-sm text-gray-500">pts</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star size={12} className="text-yellow-500 fill-yellow-500" />
                            <span className="text-xs text-gray-600">{(Math.random() * 2 + 3).toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                      <ArrowUpDown size={20} className="text-gray-400 group-hover:text-blue-600 transition-colors duration-200" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Team Actions */}
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Team Management</h3>
                <p className="text-gray-600">Make transfers, set your captain, and optimize your lineup</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm hover:shadow-md">
                  Save Changes
                </button>
                <button className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 hover:border-gray-300 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                  Reset Team
                </button>
                <button className="p-3 bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 hover:border-gray-300 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Teams