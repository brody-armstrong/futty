import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { usePlayers } from '../contexts/PlayerContext'
import { 
  Clock, Users, Target, Search, Filter, Star, Plus, ChevronLeft, ChevronRight,
  Crown, Shield, Timer, Shuffle, AlertCircle, Check, X, Eye, User, Trophy,
  TrendingUp, TrendingDown, Zap, Calendar, Settings, Volume2, VolumeX, Play,
  ArrowRight, ArrowLeft, Minus, Maximize2, Minimize2
} from 'lucide-react'
import { getTeamLogo, getTeamDisplayName } from '../utils/teamLogos'

const Draft = () => {
  const { leagueId } = useParams()
  const navigate = useNavigate()
  const { players, loading: playersLoading, calculatePlayerPoints } = usePlayers()
  
  // Draft state
  const [draftPlayers, setDraftPlayers] = useState([])
  const [draftSearchTerm, setDraftSearchTerm] = useState('')
  const [draftSelectedPosition, setDraftSelectedPosition] = useState('')
  const [draftSelectedTeam, setDraftSelectedTeam] = useState('')
  const [draftCurrentPage, setDraftCurrentPage] = useState(1)
  const [draftOrder, setDraftOrder] = useState([])
  const [currentDraftPick, setCurrentDraftPick] = useState(0)
  const [draftedPlayers, setDraftedPlayers] = useState([])
  const [draftTimeRemaining, setDraftTimeRemaining] = useState(60)
  const [isDraftPaused, setIsDraftPaused] = useState(false)
  const [isAutoDraft, setIsAutoDraft] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showDraftOrder, setShowDraftOrder] = useState(true)
  const [showRecentPicks, setShowRecentPicks] = useState(true)
  
  // Mock league data
  const [league] = useState({
    id: leagueId,
    name: 'Premier Elite',
    type: 'Premier League',
    size: 8,
    currentMembers: 8,
    status: 'draft-active',
    draftDate: '2024-08-15T19:00:00Z',
    settings: {
      draftType: 'snake',
      scoringType: 'head-to-head',
      transferLimit: 2,
      pickTime: 60,
      wildcardAvailable: true
    }
  })

  const [draftTeams] = useState([
    { id: 1, name: 'City Legends', owner: 'testuser', isCurrentUser: true, color: 'oklch(71.772% 0.133 239.443)' },
    { id: 2, name: 'United Elite', owner: 'rival_manager', isCurrentUser: false, color: 'oklch(46.949% 0.162 321.406)' },
    { id: 3, name: 'Liverpool Reds', owner: 'liverpool_fan', isCurrentUser: false, color: 'oklch(62.013% 0.208 28.717)' },
    { id: 4, name: 'Arsenal Gunners', owner: 'arsenal_supporter', isCurrentUser: false, color: 'oklch(71.236% 0.159 52.023)' },
    { id: 5, name: 'Chelsea Blues', owner: 'chelsea_loyal', isCurrentUser: false, color: 'oklch(64.476% 0.202 359.339)' },
    { id: 6, name: 'Tottenham Spurs', owner: 'spurs_fanatic', isCurrentUser: false, color: 'oklch(89.389% 0.032 321.406)' },
    { id: 7, name: 'Newcastle Toon', owner: 'toon_army', isCurrentUser: false, color: 'oklch(20% 0 0)' },
    { id: 8, name: 'Aston Villa Lions', owner: 'villa_faithful', isCurrentUser: false, color: 'oklch(14.354% 0.026 239.443)' }
  ])

  const maxLeagues = 5
  const playersPerPage = 50

  // Initialize draft when players are loaded
  useEffect(() => {
    if (players.length > 0 && !draftPlayers.length) {
      setDraftPlayers([...players])
      // Generate snake draft order for 8 teams
      const snakeOrder = []
      for (let round = 1; round <= 15; round++) {
        if (round % 2 === 1) {
          // Forward order: 1, 2, 3, 4, 5, 6, 7, 8
          for (let team = 0; team < 8; team++) {
            snakeOrder.push(team)
          }
        } else {
          // Reverse order: 8, 7, 6, 5, 4, 3, 2, 1
          for (let team = 7; team >= 0; team--) {
            snakeOrder.push(team)
          }
        }
      }
      setDraftOrder(snakeOrder)
    }
  }, [players, draftPlayers.length])

  // Filter draft players
  useEffect(() => {
    if (players.length > 0) {
      const filtered = players.filter(player => {
        const matchesSearch = player.name.toLowerCase().includes(draftSearchTerm.toLowerCase())
        const matchesPosition = !draftSelectedPosition || player.position === draftSelectedPosition
        const matchesTeam = !draftSelectedTeam || player.team === draftSelectedTeam
        const notDrafted = !draftedPlayers.find(dp => dp.player.id === player.id)
        return matchesSearch && matchesPosition && matchesTeam && notDrafted
      })
      setDraftPlayers(filtered)
      setDraftCurrentPage(1)
    }
  }, [players, draftSearchTerm, draftSelectedPosition, draftSelectedTeam, draftedPlayers])

  // Draft timer
  useEffect(() => {
    if (!isDraftPaused && draftTimeRemaining > 0) {
      const timer = setInterval(() => {
        setDraftTimeRemaining(prev => {
          if (prev <= 1) {
            // Auto-draft if time runs out
            if (draftPlayers.length > 0) {
              handleDraftPlayer(draftPlayers[0])
            }
            return 60 // Reset timer for next pick
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [isDraftPaused, draftTimeRemaining, draftPlayers])

  const getPositionColor = (position) => {
    switch (position) {
      case 'GK': return {
        bg: 'oklch(71.236% 0.159 52.023 / 0.1)',
        text: 'oklch(14.247% 0.031 52.023)',
        border: 'oklch(71.236% 0.159 52.023 / 0.3)'
      }
      case 'DEF': return {
        bg: 'oklch(71.772% 0.133 239.443 / 0.1)',
        text: 'oklch(14.354% 0.026 239.443)',
        border: 'oklch(71.772% 0.133 239.443 / 0.3)'
      }
      case 'MID': return {
        bg: 'oklch(46.949% 0.162 321.406 / 0.1)',
        text: 'oklch(14.354% 0.026 239.443)',
        border: 'oklch(46.949% 0.162 321.406 / 0.3)'
      }
      case 'FWD': return {
        bg: 'oklch(62.013% 0.208 28.717 / 0.1)',
        text: 'oklch(14.354% 0.026 239.443)',
        border: 'oklch(62.013% 0.208 28.717 / 0.3)'
      }
      default: return {
        bg: 'oklch(90% 0 0)',
        text: 'oklch(21.778% 0 0)',
        border: 'oklch(90% 0 0)'
      }
    }
  }

  const handleDraftPlayer = (player) => {
    const currentTeam = draftOrder[currentDraftPick]
    const teamName = draftTeams[currentTeam].name
    const pickNumber = currentDraftPick + 1
    const round = Math.floor(currentDraftPick / 8) + 1
    
    const draftedPlayer = {
      player,
      team: teamName,
      teamIndex: currentTeam,
      pickNumber,
      round
    }
    
    setDraftedPlayers(prev => [...prev, draftedPlayer])
    setCurrentDraftPick(prev => prev + 1)
    setDraftTimeRemaining(60) // Reset timer for next pick
  }

  const getCurrentTeam = () => {
    if (currentDraftPick >= draftOrder.length) return null
    return draftTeams[draftOrder[currentDraftPick]]
  }

  const getDraftProgress = () => {
    const totalPicks = 15 * 8 // 15 rounds * 8 teams
    return (currentDraftPick / totalPicks) * 100
  }

  const getTeamNeeds = (teamIndex) => {
    const teamPicks = draftedPlayers.filter(dp => dp.teamIndex === teamIndex)
    const positions = teamPicks.map(dp => dp.player.position)
    
    const needs = {
      GK: 2 - positions.filter(p => p === 'GK').length,
      DEF: 5 - positions.filter(p => p === 'DEF').length,
      MID: 5 - positions.filter(p => p === 'MID').length,
      FWD: 3 - positions.filter(p => p === 'FWD').length
    }
    
    return Object.entries(needs)
      .filter(([_, count]) => count > 0)
      .map(([pos, count]) => ({ position: pos, count }))
  }

  const currentTeam = getCurrentTeam()
  const isUserTurn = currentTeam?.isCurrentUser
  const draftProgress = getDraftProgress()

  if (playersLoading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: 'oklch(95% 0 0)' }}
      >
        <div className="text-center">
          <div 
            className="animate-spin rounded-full h-16 w-16 mx-auto mb-6"
            style={{ 
              border: '4px solid oklch(90% 0 0)',
              borderTop: '4px solid oklch(71.772% 0.133 239.443)'
            }}
          ></div>
          <h2 
            className="text-2xl font-bold mb-2"
            style={{ color: 'oklch(20% 0 0)' }}
          >
            Loading Draft
          </h2>
          <p 
            className="text-lg"
            style={{ color: 'oklch(21.778% 0 0)' }}
          >
            Preparing your draft experience...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: 'oklch(95% 0 0)' }}
    >
      {/* Header */}
      <header 
        className="sticky top-0 z-40 border-b shadow-sm"
        style={{ 
          backgroundColor: 'oklch(100% 0 0)',
          borderColor: 'oklch(90% 0 0)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Left side */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/leagues')}
                className="p-2 rounded-lg transition-all duration-200 hover:bg-gray-100"
                style={{ backgroundColor: 'oklch(95% 0 0)' }}
              >
                <ChevronLeft size={18} style={{ color: 'oklch(21.778% 0 0)' }} />
              </button>
              
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'oklch(71.772% 0.133 239.443 / 0.1)' }}
                >
                  <Target size={16} style={{ color: 'oklch(71.772% 0.133 239.443)' }} />
                </div>
                <div>
                  <h1 
                    className="text-lg font-bold"
                    style={{ color: 'oklch(20% 0 0)' }}
                  >
                    {league.name} Draft
                  </h1>
                  <p 
                    className="text-xs"
                    style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}
                  >
                    Round {Math.floor(currentDraftPick / 8) + 1} • Pick {currentDraftPick + 1}
                  </p>
                </div>
              </div>
            </div>

            {/* Center - Current Pick & Timer */}
            <div className="flex items-center gap-4">
              {currentTeam && (
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ 
                      backgroundColor: currentTeam.color + '20',
                      border: `1px solid ${currentTeam.color}`
                    }}
                  >
                    <User size={16} style={{ color: currentTeam.color }} />
                  </div>
                  <div className="text-center">
                    <p 
                      className="text-sm font-semibold"
                      style={{ color: 'oklch(20% 0 0)' }}
                    >
                      {currentTeam.name}
                    </p>
                    <p 
                      className="text-xs"
                      style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}
                    >
                      {isUserTurn ? 'Your Turn' : 'On the Clock'}
                    </p>
                  </div>
                </div>
              )}

              {/* Compact Timer */}
              <div 
                className={`px-3 py-1 rounded-lg flex items-center gap-2 ${
                  isUserTurn ? 'ring-2' : ''
                }`}
                style={{ 
                  backgroundColor: isUserTurn ? 'oklch(71.772% 0.133 239.443 / 0.1)' : 'oklch(95% 0 0)',
                  border: isUserTurn ? '1px solid oklch(71.772% 0.133 239.443)' : '1px solid oklch(90% 0 0)',
                  ringColor: 'oklch(71.772% 0.133 239.443)'
                }}
              >
                <Clock 
                  size={14} 
                  style={{ 
                    color: isUserTurn ? 'oklch(71.772% 0.133 239.443)' : 'oklch(21.778% 0 0 / 0.7)' 
                  }} 
                />
                <span 
                  className="text-sm font-bold"
                  style={{ 
                    color: isUserTurn ? 'oklch(71.772% 0.133 239.443)' : 'oklch(21.778% 0 0)' 
                  }}
                >
                  {draftTimeRemaining}s
                </span>
              </div>

              {/* Progress */}
              <div className="w-24">
                <div className="flex items-center justify-between mb-1">
                  <span 
                    className="text-xs font-medium"
                    style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}
                  >
                    {Math.round(draftProgress)}%
                  </span>
                </div>
                <div 
                  className="w-full h-1.5 rounded-full"
                  style={{ backgroundColor: 'oklch(90% 0 0)' }}
                >
                  <div 
                    className="h-full rounded-full transition-all duration-300"
                    style={{ 
                      backgroundColor: 'oklch(71.772% 0.133 239.443)',
                      width: `${draftProgress}%`
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsDraftPaused(!isDraftPaused)}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  isDraftPaused ? 'opacity-50' : ''
                }`}
                style={{ backgroundColor: 'oklch(95% 0 0)' }}
              >
                {isDraftPaused ? (
                  <Play size={16} style={{ color: 'oklch(21.778% 0 0)' }} />
                ) : (
                  <Timer size={16} style={{ color: 'oklch(21.778% 0 0)' }} />
                )}
              </button>
              
              <button
                onClick={() => setIsAutoDraft(!isAutoDraft)}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  isAutoDraft ? 'opacity-50' : ''
                }`}
                style={{ backgroundColor: 'oklch(95% 0 0)' }}
              >
                <Zap size={16} style={{ color: 'oklch(21.778% 0 0)' }} />
              </button>
              
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-lg transition-all duration-200"
                style={{ backgroundColor: 'oklch(95% 0 0)' }}
              >
                {isMuted ? (
                  <VolumeX size={16} style={{ color: 'oklch(21.778% 0 0)' }} />
                ) : (
                  <Volume2 size={16} style={{ color: 'oklch(21.778% 0 0)' }} />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-12 gap-4 h-[calc(100vh-80px)]">
          {/* Left Panel - Available Players (9 columns) */}
          <div className="col-span-9 space-y-4">
            {/* Search and Filters */}
            <div 
              className="p-4 rounded-xl border shadow-sm"
              style={{ 
                backgroundColor: 'oklch(100% 0 0)',
                borderColor: 'oklch(90% 0 0)',
                boxShadow: '0 1px 3px oklch(21.778% 0 0 / 0.1)'
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                <div className="relative">
                  <Search 
                    size={16} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2"
                    style={{ color: 'oklch(21.778% 0 0 / 0.5)' }}
                  />
                  <input
                    type="text"
                    placeholder="Search players..."
                    value={draftSearchTerm}
                    onChange={(e) => setDraftSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 text-sm"
                    style={{
                      backgroundColor: 'oklch(100% 0 0)',
                      borderColor: 'oklch(90% 0 0)',
                      color: 'oklch(20% 0 0)'
                    }}
                  />
                </div>

                <select
                  value={draftSelectedPosition}
                  onChange={(e) => setDraftSelectedPosition(e.target.value)}
                  className="px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 text-sm"
                  style={{
                    backgroundColor: 'oklch(100% 0 0)',
                    borderColor: 'oklch(90% 0 0)',
                    color: 'oklch(20% 0 0)'
                  }}
                >
                  <option value="">All Positions</option>
                  <option value="GK">Goalkeepers</option>
                  <option value="DEF">Defenders</option>
                  <option value="MID">Midfielders</option>
                  <option value="FWD">Forwards</option>
                </select>

                <select
                  value={draftSelectedTeam}
                  onChange={(e) => setDraftSelectedTeam(e.target.value)}
                  className="px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 text-sm"
                  style={{
                    backgroundColor: 'oklch(100% 0 0)',
                    borderColor: 'oklch(90% 0 0)',
                    color: 'oklch(20% 0 0)'
                  }}
                >
                  <option value="">All Teams</option>
                  <option value="Manchester City">Manchester City</option>
                  <option value="Liverpool">Liverpool</option>
                  <option value="Arsenal">Arsenal</option>
                  <option value="Chelsea">Chelsea</option>
                  <option value="Manchester United">Manchester United</option>
                  <option value="Tottenham Hotspur">Tottenham Hotspur</option>
                  <option value="Newcastle United">Newcastle United</option>
                  <option value="Aston Villa">Aston Villa</option>
                </select>

                <button
                  onClick={() => {
                    setDraftSearchTerm('')
                    setDraftSelectedPosition('')
                    setDraftSelectedTeam('')
                  }}
                  className="px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm"
                  style={{
                    backgroundColor: 'oklch(95% 0 0)',
                    color: 'oklch(21.778% 0 0)',
                    border: '1px solid oklch(90% 0 0)'
                  }}
                >
                  Clear
                </button>

                <div className="flex items-center justify-end">
                  <p 
                    className="text-sm font-medium"
                    style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}
                  >
                    {draftPlayers.length} available
                  </p>
                </div>
              </div>
            </div>

            {/* Players List - Compact Table Style */}
            <div 
              className="rounded-xl border shadow-sm overflow-hidden"
              style={{ 
                backgroundColor: 'oklch(100% 0 0)',
                borderColor: 'oklch(90% 0 0)',
                boxShadow: '0 1px 3px oklch(21.778% 0 0 / 0.1)'
              }}
            >
              {/* Table Header */}
              <div 
                className="px-4 py-3 border-b grid grid-cols-12 gap-4 text-xs font-semibold"
                style={{ 
                  borderColor: 'oklch(90% 0 0)',
                  backgroundColor: 'oklch(95% 0 0)'
                }}
              >
                <div className="col-span-4">Player</div>
                <div className="col-span-2">Position</div>
                <div className="col-span-2">Team</div>
                <div className="col-span-1">Form</div>
                <div className="col-span-1">Goals</div>
                <div className="col-span-1">Assists</div>
                <div className="col-span-1 text-right">Points</div>
              </div>

              {/* Players List */}
              <div className="overflow-y-auto h-[calc(100vh-280px)]">
                {draftPlayers.slice(0, playersPerPage).map((player, index) => {
                  const positionColors = getPositionColor(player.position)
                  const playerPoints = calculatePlayerPoints ? calculatePlayerPoints(player) : 0
                  const teamLogo = getTeamLogo(player.team)
                  const teamDisplayName = getTeamDisplayName(player.team)
                  
                  return (
                    <div
                      key={player.id}
                      className="px-4 py-3 border-b grid grid-cols-12 gap-4 items-center hover:bg-gray-50 transition-all duration-150 cursor-pointer group"
                      style={{ 
                        borderColor: 'oklch(90% 0 0)',
                        backgroundColor: index % 2 === 0 ? 'oklch(100% 0 0)' : 'oklch(98% 0 0)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'oklch(95% 0 0)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = index % 2 === 0 ? 'oklch(100% 0 0)' : 'oklch(98% 0 0)'
                      }}
                      onClick={() => handleDraftPlayer(player)}
                    >
                      {/* Player Info */}
                      <div className="col-span-4 flex items-center gap-3">
                        {teamLogo && (
                          <img 
                            src={teamLogo}
                            alt={`${teamDisplayName} logo`}
                            className="w-5 h-5 object-contain flex-shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <p 
                            className="font-semibold text-sm truncate"
                            style={{ color: 'oklch(20% 0 0)' }}
                          >
                            {player.name}
                          </p>
                          <p 
                            className="text-xs truncate"
                            style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}
                          >
                            {teamDisplayName}
                          </p>
                        </div>
                      </div>

                      {/* Position */}
                      <div className="col-span-2">
                        <span 
                          className="px-2 py-1 text-xs font-medium rounded border"
                          style={{ 
                            backgroundColor: positionColors.bg,
                            color: positionColors.text,
                            borderColor: positionColors.border
                          }}
                        >
                          {player.position}
                        </span>
                      </div>

                      {/* Team */}
                      <div className="col-span-2">
                        <p 
                          className="text-sm"
                          style={{ color: 'oklch(21.778% 0 0)' }}
                        >
                          {teamDisplayName}
                        </p>
                      </div>

                      {/* Form */}
                      <div className="col-span-1">
                        <p 
                          className="text-sm font-medium"
                          style={{ color: 'oklch(20% 0 0)' }}
                        >
                          {player.form || 0}
                        </p>
                      </div>

                      {/* Goals */}
                      <div className="col-span-1">
                        <p 
                          className="text-sm"
                          style={{ color: 'oklch(21.778% 0 0)' }}
                        >
                          {player.goals || 0}
                        </p>
                      </div>

                      {/* Assists */}
                      <div className="col-span-1">
                        <p 
                          className="text-sm"
                          style={{ color: 'oklch(21.778% 0 0)' }}
                        >
                          {player.assists || 0}
                        </p>
                      </div>

                      {/* Points */}
                      <div className="col-span-1 text-right">
                        <p 
                          className="text-sm font-bold"
                          style={{ color: 'oklch(20% 0 0)' }}
                        >
                          {playerPoints}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Panel - Draft Status (3 columns) */}
          <div className="col-span-3 space-y-4">
            {/* Draft Order - Collapsible */}
            <div 
              className="rounded-xl border shadow-sm overflow-hidden"
              style={{ 
                backgroundColor: 'oklch(100% 0 0)',
                borderColor: 'oklch(90% 0 0)',
                boxShadow: '0 1px 3px oklch(21.778% 0 0 / 0.1)'
              }}
            >
              <div 
                className="px-4 py-3 border-b flex items-center justify-between cursor-pointer"
                style={{ 
                  borderColor: 'oklch(90% 0 0)',
                  backgroundColor: 'oklch(95% 0 0)'
                }}
                onClick={() => setShowDraftOrder(!showDraftOrder)}
              >
                <h3 
                  className="font-semibold text-sm"
                  style={{ color: 'oklch(20% 0 0)' }}
                >
                  Draft Order
                </h3>
                {showDraftOrder ? (
                  <Minimize2 size={16} style={{ color: 'oklch(21.778% 0 0 / 0.7)' }} />
                ) : (
                  <Maximize2 size={16} style={{ color: 'oklch(21.778% 0 0 / 0.7)' }} />
                )}
              </div>
              
              {showDraftOrder && (
                <div className="p-3 space-y-2 max-h-64 overflow-y-auto">
                  {draftTeams.map((team, index) => {
                    const isCurrent = draftOrder[currentDraftPick] === index
                    const teamPicks = draftedPlayers.filter(dp => dp.teamIndex === index)
                    const teamNeeds = getTeamNeeds(index)
                    
                    return (
                      <div 
                        key={index}
                        className={`p-2 rounded-lg transition-all duration-200 ${
                          isCurrent ? 'ring-1' : ''
                        }`}
                        style={{ 
                          backgroundColor: isCurrent ? team.color + '10' : 'oklch(95% 0 0)',
                          border: isCurrent ? `1px solid ${team.color}` : '1px solid oklch(90% 0 0)'
                        }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-5 h-5 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: team.color + '20' }}
                            >
                              <span 
                                className="text-xs font-bold"
                                style={{ color: team.color }}
                              >
                                {index + 1}
                              </span>
                            </div>
                            <span 
                              className="text-xs font-medium truncate"
                              style={{ color: 'oklch(20% 0 0)' }}
                            >
                              {team.name}
                            </span>
                          </div>
                          <span 
                            className="text-xs font-medium"
                            style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}
                          >
                            {teamPicks.length}/15
                          </span>
                        </div>
                        
                        {teamNeeds.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {teamNeeds.slice(0, 2).map((need, idx) => (
                              <span 
                                key={idx}
                                className="px-1.5 py-0.5 text-xs rounded"
                                style={{ 
                                  backgroundColor: 'oklch(90% 0 0)',
                                  color: 'oklch(21.778% 0 0 / 0.7)'
                                }}
                              >
                                {need.position}: {need.count}
                              </span>
                            ))}
                            {teamNeeds.length > 2 && (
                              <span 
                                className="px-1.5 py-0.5 text-xs rounded"
                                style={{ 
                                  backgroundColor: 'oklch(90% 0 0)',
                                  color: 'oklch(21.778% 0 0 / 0.7)'
                                }}
                              >
                                +{teamNeeds.length - 2}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Recent Picks - Collapsible */}
            <div 
              className="rounded-xl border shadow-sm overflow-hidden"
              style={{ 
                backgroundColor: 'oklch(100% 0 0)',
                borderColor: 'oklch(90% 0 0)',
                boxShadow: '0 1px 3px oklch(21.778% 0 0 / 0.1)'
              }}
            >
              <div 
                className="px-4 py-3 border-b flex items-center justify-between cursor-pointer"
                style={{ 
                  borderColor: 'oklch(90% 0 0)',
                  backgroundColor: 'oklch(95% 0 0)'
                }}
                onClick={() => setShowRecentPicks(!showRecentPicks)}
              >
                <h3 
                  className="font-semibold text-sm"
                  style={{ color: 'oklch(20% 0 0)' }}
                >
                  Recent Picks
                </h3>
                {showRecentPicks ? (
                  <Minimize2 size={16} style={{ color: 'oklch(21.778% 0 0 / 0.7)' }} />
                ) : (
                  <Maximize2 size={16} style={{ color: 'oklch(21.778% 0 0 / 0.7)' }} />
                )}
              </div>
              
              {showRecentPicks && (
                <div className="p-3 space-y-2 max-h-64 overflow-y-auto">
                  {draftedPlayers.slice(-6).reverse().map((drafted, index) => {
                    const team = draftTeams[drafted.teamIndex]
                    const positionColors = getPositionColor(drafted.player.position)
                    
                    return (
                      <div 
                        key={index}
                        className="p-2 rounded-lg border"
                        style={{ 
                          backgroundColor: 'oklch(95% 0 0)',
                          borderColor: 'oklch(90% 0 0)'
                        }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-1">
                            <span 
                              className="px-1.5 py-0.5 rounded text-xs font-medium"
                              style={{ 
                                backgroundColor: team.color + '20',
                                color: team.color
                              }}
                            >
                              #{drafted.pickNumber}
                            </span>
                            <span 
                              className="px-1.5 py-0.5 rounded text-xs font-medium border"
                              style={{ 
                                backgroundColor: positionColors.bg,
                                color: positionColors.text,
                                borderColor: positionColors.border
                              }}
                            >
                              {drafted.player.position}
                            </span>
                          </div>
                          <span 
                            className="text-xs"
                            style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}
                          >
                            R{drafted.round}
                          </span>
                        </div>
                        
                        <p 
                          className="font-medium text-xs mb-1 truncate"
                          style={{ color: 'oklch(20% 0 0)' }}
                        >
                          {drafted.player.name}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <p 
                            className="text-xs truncate"
                            style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}
                          >
                            {drafted.team}
                          </p>
                          <p 
                            className="text-xs font-medium"
                            style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}
                          >
                            {drafted.player.team}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Draft
