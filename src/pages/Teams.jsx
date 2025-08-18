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
  MoreVertical,
  X,
  Check
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
  const [isSubstitutionMode, setIsSubstitutionMode] = useState(false)
  const [isChangesMode, setIsChangesMode] = useState(false)
  const [dropTarget, setDropTarget] = useState(null)

  // Team state management
  const [teamState, setTeamState] = useState({
    startingLineup: {
      gk: [],
      def: [],
      mid: [],
      fwd: []
    },
    bench: []
  })

  useEffect(() => {
    if (userTeams.length > 0 && !selectedTeam) {
      setSelectedTeam(userTeams[0])
    }
  }, [userTeams, selectedTeam])

  // Initialize team state with mock data
  useEffect(() => {
    const gk = mockPlayers.filter(p => p.position === 'GK').slice(0, 1)
    const def = mockPlayers.filter(p => p.position === 'DEF').slice(0, 4)
    const mid = mockPlayers.filter(p => p.position === 'MID').slice(0, 3)
    const fwd = mockPlayers.filter(p => p.position === 'FWD').slice(0, 3)
    const bench = mockPlayers.slice(11, 14)
    
    setTeamState({
      startingLineup: { gk, def, mid, fwd },
      bench
    })
  }, [])

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
    if (!isSubstitutionMode && !isChangesMode) return
    setDraggedPlayer(player)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', player.id.toString())
  }

  const handleDragOver = (e) => {
    if (!isSubstitutionMode && !isChangesMode) return
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDragEnter = (e, targetPosition, targetIndex) => {
    if (!isSubstitutionMode && !isChangesMode) return
    e.preventDefault()
    setDropTarget({ position: targetPosition, index: targetIndex })
  }

  const handleDragLeave = (e) => {
    if (!isSubstitutionMode && !isChangesMode) return
    setDropTarget(null)
  }

  const handleDrop = (e, targetPosition, targetIndex) => {
    if (!isSubstitutionMode && !isChangesMode || !draggedPlayer) return
    e.preventDefault()
    
    console.log('Dropping player:', draggedPlayer.name, 'to position:', targetPosition, 'index:', targetIndex)
    
    // Find where the dragged player currently is
    const draggedFrom = findPlayerLocation(draggedPlayer.id)
    
    if (!draggedFrom) {
      console.error('Could not find dragged player location')
      setDraggedPlayer(null)
      setDropTarget(null)
      return
    }

    // Get the target player (if any)
    const targetPlayer = getPlayerAtPosition(targetPosition, targetIndex)
    
    // Perform the swap
    swapPlayers(draggedFrom, { position: targetPosition, index: targetIndex }, targetPlayer)
    
    setDraggedPlayer(null)
    setDropTarget(null)
  }

  const findPlayerLocation = (playerId) => {
    // Check starting lineup
    for (const [position, players] of Object.entries(teamState.startingLineup)) {
      const index = players.findIndex(p => p.id === playerId)
      if (index !== -1) {
        return { position, index, type: 'startingLineup' }
      }
    }
    
    // Check bench
    const benchIndex = teamState.bench.findIndex(p => p.id === playerId)
    if (benchIndex !== -1) {
      return { position: 'bench', index: benchIndex, type: 'bench' }
    }
    
    return null
  }

  const getPlayerAtPosition = (position, index) => {
    if (position === 'bench') {
      return teamState.bench[index] || null
    }
    return teamState.startingLineup[position]?.[index] || null
  }

  const swapPlayers = (from, to, targetPlayer) => {
    setTeamState(prevState => {
      const newState = { ...prevState }
      
      // Remove dragged player from original location
      if (from.type === 'startingLineup') {
        newState.startingLineup[from.position] = [
          ...newState.startingLineup[from.position].slice(0, from.index),
          ...newState.startingLineup[from.position].slice(from.index + 1)
        ]
      } else {
        newState.bench = [
          ...newState.bench.slice(0, from.index),
          ...newState.bench.slice(from.index + 1)
        ]
      }
      
      // Remove target player from target location (if exists)
      if (targetPlayer) {
        if (to.position === 'bench') {
          newState.bench = [
            ...newState.bench.slice(0, to.index),
            ...newState.bench.slice(to.index + 1)
          ]
        } else {
          newState.startingLineup[to.position] = [
            ...newState.startingLineup[to.position].slice(0, to.index),
            ...newState.startingLineup[to.position].slice(to.index + 1)
          ]
        }
      }
      
      // Add dragged player to target location
      if (to.position === 'bench') {
        newState.bench = [
          ...newState.bench.slice(0, to.index),
          draggedPlayer,
          ...newState.bench.slice(to.index)
        ]
      } else {
        newState.startingLineup[to.position] = [
          ...newState.startingLineup[to.position].slice(0, to.index),
          draggedPlayer,
          ...newState.startingLineup[to.position].slice(to.index)
        ]
      }
      
      // Add target player to original location (if exists)
      if (targetPlayer) {
        if (from.type === 'startingLineup') {
          newState.startingLineup[from.position] = [
            ...newState.startingLineup[from.position].slice(0, from.index),
            targetPlayer,
            ...newState.startingLineup[from.position].slice(from.index)
          ]
        } else {
          newState.bench = [
            ...newState.bench.slice(0, from.index),
            targetPlayer,
            ...newState.bench.slice(from.index)
          ]
        }
      }
      
      return newState
    })
  }

  const handleMakeSubstitution = () => {
    setIsSubstitutionMode(true)
    setIsChangesMode(false)
  }

  const handleMakeChanges = () => {
    setIsChangesMode(true)
    setIsSubstitutionMode(false)
  }

  const handleCancelMode = () => {
    setIsSubstitutionMode(false)
    setIsChangesMode(false)
    setDraggedPlayer(null)
    setDropTarget(null)
  }

  const handleSaveChanges = () => {
    // Here you would save the changes to the backend
    console.log('Saving team changes:', teamState)
    setIsSubstitutionMode(false)
    setIsChangesMode(false)
    setDraggedPlayer(null)
    setDropTarget(null)
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

  const PlayerCard = ({ player, position, index, isDraggable = false, className = "" }) => {
    const colors = getPositionColors(player.position)
    const canDrag = (isSubstitutionMode || isChangesMode) && isDraggable
    const isDropTarget = dropTarget?.position === position && dropTarget?.index === index
    
    return (
      <div
        draggable={canDrag}
        onDragStart={canDrag ? (e) => handleDragStart(e, player) : undefined}
        onDragEnter={canDrag ? (e) => handleDragEnter(e, position, index) : undefined}
        onDragLeave={canDrag ? handleDragLeave : undefined}
        onDragOver={canDrag ? handleDragOver : undefined}
        onDrop={canDrag ? (e) => handleDrop(e, position, index) : undefined}
        className={`
          bg-white rounded-2xl border-2 shadow-lg transition-all duration-300 
          ${canDrag ? 'cursor-move hover:scale-105 hover:-translate-y-2 hover:shadow-xl' : ''}
          ${colors.border} ${className}
          ${(isSubstitutionMode || isChangesMode) ? 'ring-2 ring-blue-200' : ''}
          ${isDropTarget ? 'ring-4 ring-green-400 bg-green-50' : ''}
        `}
        role={canDrag ? "button" : undefined}
        tabIndex={canDrag ? 0 : undefined}
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

          {/* Mode Indicator */}
          {(isSubstitutionMode || isChangesMode) && (
            <section className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <ArrowUpDown size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900">
                      {isSubstitutionMode ? 'Substitution Mode' : 'Changes Mode'}
                    </h3>
                    <p className="text-sm text-blue-700">
                      {isSubstitutionMode 
                        ? 'Drag players to make substitutions between starting lineup and bench'
                        : 'Drag players to reorganize your team formation'
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveChanges}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                  >
                    <Check size={16} />
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancelMode}
                    className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              </div>
            </section>
          )}

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
                    <p className="text-sm text-gray-500">
                      {isSubstitutionMode || isChangesMode 
                        ? 'Drag players to reorganize your team'
                        : 'Your current starting lineup'
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleMakeSubstitution}
                    className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Make Substitution
                  </button>
                  <button 
                    onClick={handleMakeChanges}
                    className="px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Make Changes
                  </button>
                </div>
              </div>
            </div>

            {/* Soccer Pitch */}
            <div 
              className="relative p-8 min-h-[700px] bg-gradient-to-b from-green-400/20 via-green-300/15 to-green-200/10"
              onDragOver={handleDragOver}
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
                    {teamState.startingLineup.gk.map((player, index) => (
                      <PlayerCard 
                        key={player.id} 
                        player={player} 
                        position="gk"
                        index={index}
                        isDraggable={true} 
                      />
                    ))}
                  </div>
                </div>

                {/* Defenders */}
                <div className="flex justify-center items-center">
                  <div className="grid grid-cols-4 gap-4 max-w-[520px]">
                    {teamState.startingLineup.def.map((player, index) => (
                      <PlayerCard 
                        key={player.id} 
                        player={player} 
                        position="def"
                        index={index}
                        isDraggable={true} 
                      />
                    ))}
                  </div>
                </div>

                {/* Midfielders */}
                <div className="flex justify-center items-center">
                  <div className="grid grid-cols-3 gap-4 max-w-[400px]">
                    {teamState.startingLineup.mid.map((player, index) => (
                      <PlayerCard 
                        key={player.id} 
                        player={player} 
                        position="mid"
                        index={index}
                        isDraggable={true} 
                      />
                    ))}
                  </div>
                </div>

                {/* Forwards */}
                <div className="flex justify-center items-center">
                  <div className="grid grid-cols-3 gap-4 max-w-[400px]">
                    {teamState.startingLineup.fwd.map((player, index) => (
                      <PlayerCard 
                        key={player.id} 
                        player={player} 
                        position="fwd"
                        index={index}
                        isDraggable={true} 
                      />
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
                    <p className="text-sm text-gray-500">
                      {isSubstitutionMode || isChangesMode 
                        ? 'Drag bench players to make substitutions'
                        : `${teamState.bench.length} substitutes ready`
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleMakeSubstitution}
                    className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
                  >
                    <ArrowUpDown size={16} />
                    Make Substitution
                  </button>
                  <button 
                    onClick={handleMakeChanges}
                    className="px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center gap-2"
                  >
                    <ArrowUpDown size={16} />
                    Make Changes
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {teamState.bench.map((player, index) => (
                  <div
                    key={player.id}
                    draggable={isSubstitutionMode || isChangesMode}
                    onDragStart={(e) => handleDragStart(e, player)}
                    onDragEnter={(e) => handleDragEnter(e, 'bench', index)}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, 'bench', index)}
                    className={`
                      bg-gray-50 hover:bg-white border border-gray-200 hover:border-gray-300 rounded-2xl p-4 transition-all duration-300 
                      ${(isSubstitutionMode || isChangesMode) ? 'cursor-move hover:shadow-lg hover:-translate-y-1' : ''}
                      ${(isSubstitutionMode || isChangesMode) ? 'ring-2 ring-blue-200' : ''}
                      ${dropTarget?.position === 'bench' && dropTarget?.index === index ? 'ring-4 ring-green-400 bg-green-50' : ''}
                      group
                    `}
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
                {(isSubstitutionMode || isChangesMode) ? (
                  <>
                    <button 
                      onClick={handleSaveChanges}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm hover:shadow-md flex items-center gap-2"
                    >
                      <Check size={16} />
                      Save Changes
                    </button>
                    <button 
                      onClick={handleCancelMode}
                      className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 hover:border-gray-300 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center gap-2"
                    >
                      <X size={16} />
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm hover:shadow-md">
                      Save Changes
                    </button>
                    <button className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 hover:border-gray-300 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                      Reset Team
                    </button>
                  </>
                )}
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