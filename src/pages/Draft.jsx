import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import * as Collapsible from '@radix-ui/react-collapsible'
import { usePlayers } from '../contexts/PlayerContext'
import {
  Clock, Target, Search, User, Timer, Zap, Volume2, VolumeX, Play,
  ChevronLeft, Minimize2, Maximize2
} from 'lucide-react'
import { getTeamLogo, getTeamDisplayName } from '../utils/teamLogos'
import PositionBadge from '../components/PositionBadge'
import Select from '../components/Select'

const TEAM_COLORS = ['#F5A623', '#A6337A', '#D62839', '#D97B29', '#1F4E8C', '#2F6F6B', '#0E1B16', '#6B1E3B']

const Draft = () => {
  const { leagueId } = useParams()
  const navigate = useNavigate()
  const { players, loading: playersLoading, calculatePlayerPoints } = usePlayers()

  // Draft state
  const [draftPlayers, setDraftPlayers] = useState([])
  const [draftSearchTerm, setDraftSearchTerm] = useState('')
  const [draftSelectedPosition, setDraftSelectedPosition] = useState('')
  const [draftSelectedTeam, setDraftSelectedTeam] = useState('')
  const [draftOrder, setDraftOrder] = useState([])
  const [currentDraftPick, setCurrentDraftPick] = useState(0)
  const [draftedPlayers, setDraftedPlayers] = useState([])
  const [draftTimeRemaining, setDraftTimeRemaining] = useState(60)
  const [isDraftPaused, setIsDraftPaused] = useState(false)
  const [isAutoDraft, setIsAutoDraft] = useState(false)
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
    { id: 1, name: 'City Legends', owner: 'testuser', isCurrentUser: true, color: TEAM_COLORS[0] },
    { id: 2, name: 'United Elite', owner: 'rival_manager', isCurrentUser: false, color: TEAM_COLORS[1] },
    { id: 3, name: 'Liverpool Reds', owner: 'liverpool_fan', isCurrentUser: false, color: TEAM_COLORS[2] },
    { id: 4, name: 'Arsenal Gunners', owner: 'arsenal_supporter', isCurrentUser: false, color: TEAM_COLORS[3] },
    { id: 5, name: 'Chelsea Blues', owner: 'chelsea_loyal', isCurrentUser: false, color: TEAM_COLORS[4] },
    { id: 6, name: 'Tottenham Spurs', owner: 'spurs_fanatic', isCurrentUser: false, color: TEAM_COLORS[5] },
    { id: 7, name: 'Newcastle Toon', owner: 'toon_army', isCurrentUser: false, color: TEAM_COLORS[6] },
    { id: 8, name: 'Aston Villa Lions', owner: 'villa_faithful', isCurrentUser: false, color: TEAM_COLORS[7] }
  ])

  const playersPerPage = 50

  // Initialize draft when players are loaded
  useEffect(() => {
    if (players.length > 0 && !draftPlayers.length) {
      setDraftPlayers([...players])
      // Generate snake draft order for 8 teams
      const snakeOrder = []
      for (let round = 1; round <= 15; round++) {
        if (round % 2 === 1) {
          for (let team = 0; team < 8; team++) {
            snakeOrder.push(team)
          }
        } else {
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
    }
  }, [players, draftSearchTerm, draftSelectedPosition, draftSelectedTeam, draftedPlayers])

  // Draft timer
  useEffect(() => {
    if (!isDraftPaused && draftTimeRemaining > 0) {
      const timer = setInterval(() => {
        setDraftTimeRemaining(prev => {
          if (prev <= 1) {
            if (draftPlayers.length > 0) {
              handleDraftPlayer(draftPlayers[0])
            }
            return 60
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [isDraftPaused, draftTimeRemaining, draftPlayers])

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
    setDraftTimeRemaining(60)
  }

  const getCurrentTeam = () => {
    if (currentDraftPick >= draftOrder.length) return null
    return draftTeams[draftOrder[currentDraftPick]]
  }

  const getDraftProgress = () => {
    const totalPicks = 15 * 8
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
      <div className="min-h-screen flex items-center justify-center bg-chalk">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 mx-auto mb-6 border-4 border-[--border] border-t-pitch"></div>
          <h2 className="font-display text-3xl mb-1 text-ink">Loading Draft</h2>
          <p className="text-lg text-ink-muted">Preparing your draft experience...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-chalk">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[--border] bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Left side */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/leagues')}
                className="p-2 rounded-lg transition-all duration-200 bg-chalk hover:bg-turf-a active:bg-turf-b focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                <ChevronLeft size={18} className="text-ink-muted" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-pitch/10">
                  <Target size={16} className="text-pitch" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-ink">{league.name} Draft</h1>
                  <p className="text-xs text-ink-muted">
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
                    <p className="text-sm font-semibold text-ink">{currentTeam.name}</p>
                    <p className="text-xs text-ink-muted">{isUserTurn ? 'Your Turn' : 'On the Clock'}</p>
                  </div>
                </div>
              )}

              {/* Compact Timer */}
              <div
                className={`px-3 py-1 rounded-lg flex items-center gap-2 border ${
                  isUserTurn ? 'bg-floodlight/10 border-floodlight' : 'bg-chalk border-[--border]'
                }`}
              >
                <Clock size={14} className={isUserTurn ? 'text-floodlight' : 'text-ink-muted'} />
                <span className={`font-display text-lg leading-none ${isUserTurn ? 'text-floodlight' : 'text-ink'}`}>
                  {draftTimeRemaining}s
                </span>
              </div>

              {/* Progress */}
              <div className="w-24">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-ink-muted">{Math.round(draftProgress)}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-turf-b">
                  <div
                    className="h-full rounded-full transition-all duration-300 bg-floodlight"
                    style={{ width: `${draftProgress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsDraftPaused(!isDraftPaused)}
                aria-pressed={isDraftPaused}
                className={`p-2 rounded-lg transition-all duration-200 hover:bg-turf-a active:bg-turf-b focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                  isDraftPaused ? 'bg-floodlight/10' : 'bg-chalk'
                }`}
              >
                {isDraftPaused ? <Play size={16} className="text-floodlight" /> : <Timer size={16} className="text-ink-muted" />}
              </button>

              <button
                onClick={() => setIsAutoDraft(!isAutoDraft)}
                aria-pressed={isAutoDraft}
                className={`p-2 rounded-lg transition-all duration-200 hover:bg-turf-a active:bg-turf-b focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                  isAutoDraft ? 'bg-floodlight/10' : 'bg-chalk'
                }`}
              >
                <Zap size={16} className={isAutoDraft ? 'text-floodlight' : 'text-ink-muted'} />
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                aria-pressed={isMuted}
                className="p-2 rounded-lg transition-all duration-200 bg-chalk hover:bg-turf-a active:bg-turf-b focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                {isMuted ? <VolumeX size={16} className="text-ink-muted" /> : <Volume2 size={16} className="text-ink-muted" />}
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
            <div className="p-4 rounded-xl border border-[--border] bg-white shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ink-muted" />
                  <input
                    type="text"
                    placeholder="Search players..."
                    value={draftSearchTerm}
                    onChange={(e) => setDraftSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-lg border border-[--border] bg-white text-ink focus:outline-none focus:ring-2 focus:ring-pitch/20 transition-all duration-200 text-sm"
                  />
                </div>

                <Select
                  ariaLabel="Filter by position"
                  value={draftSelectedPosition || 'all'}
                  onValueChange={(val) => setDraftSelectedPosition(val === 'all' ? '' : val)}
                  placeholder="All Positions"
                  size="sm"
                  options={[
                    { value: 'all', label: 'All Positions' },
                    { value: 'GK', label: 'Goalkeepers' },
                    { value: 'DEF', label: 'Defenders' },
                    { value: 'MID', label: 'Midfielders' },
                    { value: 'FWD', label: 'Forwards' },
                  ]}
                />

                <Select
                  ariaLabel="Filter by team"
                  value={draftSelectedTeam || 'all'}
                  onValueChange={(val) => setDraftSelectedTeam(val === 'all' ? '' : val)}
                  placeholder="All Teams"
                  size="sm"
                  options={[
                    { value: 'all', label: 'All Teams' },
                    { value: 'Manchester City', label: 'Manchester City' },
                    { value: 'Liverpool', label: 'Liverpool' },
                    { value: 'Arsenal', label: 'Arsenal' },
                    { value: 'Chelsea', label: 'Chelsea' },
                    { value: 'Manchester United', label: 'Manchester United' },
                    { value: 'Tottenham Hotspur', label: 'Tottenham Hotspur' },
                    { value: 'Newcastle United', label: 'Newcastle United' },
                    { value: 'Aston Villa', label: 'Aston Villa' },
                  ]}
                />

                <button
                  onClick={() => {
                    setDraftSearchTerm('')
                    setDraftSelectedPosition('')
                    setDraftSelectedTeam('')
                  }}
                  className="px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm bg-chalk text-ink-muted border border-[--border] hover:bg-turf-a active:bg-turf-b focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  Clear
                </button>

                <div className="flex items-center justify-end">
                  <p className="text-sm font-medium text-ink-muted">{draftPlayers.length} available</p>
                </div>
              </div>
            </div>

            {/* Players List - Scoreboard Table Style */}
            <div className="rounded-xl border border-[--border] bg-white shadow-sm overflow-hidden">
              {/* Table Header */}
              <div className="px-4 py-3 grid grid-cols-12 gap-4 text-xs font-semibold uppercase tracking-wide bg-ink text-chalk/80">
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
                  const playerPoints = calculatePlayerPoints ? calculatePlayerPoints(player) : 0
                  const teamLogo = getTeamLogo(player.team)
                  const teamDisplayName = getTeamDisplayName(player.team)

                  return (
                    <div
                      key={player.id}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draft ${player.name}`}
                      className={`px-4 py-3 border-b border-[--border] grid grid-cols-12 gap-4 items-center hover:bg-turf-b transition-all duration-150 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/40 focus-visible:ring-inset ${
                        index % 2 === 0 ? 'bg-white' : 'bg-turf-a'
                      }`}
                      onClick={() => handleDraftPlayer(player)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          handleDraftPlayer(player)
                        }
                      }}
                    >
                      {/* Player Info */}
                      <div className="col-span-4 flex items-center gap-3">
                        {teamLogo && (
                          <img src={teamLogo} alt={`${teamDisplayName} logo`} className="w-5 h-5 object-contain flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate text-ink">{player.name}</p>
                          <p className="text-xs truncate text-ink-muted">{teamDisplayName}</p>
                        </div>
                      </div>

                      {/* Position */}
                      <div className="col-span-2">
                        <PositionBadge position={player.position} />
                      </div>

                      {/* Team */}
                      <div className="col-span-2">
                        <p className="text-sm text-ink-muted">{teamDisplayName}</p>
                      </div>

                      {/* Form */}
                      <div className="col-span-1">
                        <p className="text-sm font-medium text-ink">{player.form || 0}</p>
                      </div>

                      {/* Goals */}
                      <div className="col-span-1">
                        <p className="text-sm text-ink-muted">{player.goals || 0}</p>
                      </div>

                      {/* Assists */}
                      <div className="col-span-1">
                        <p className="text-sm text-ink-muted">{player.assists || 0}</p>
                      </div>

                      {/* Points */}
                      <div className="col-span-1 text-right">
                        <p className="font-display text-lg text-ink">{playerPoints}</p>
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
            <Collapsible.Root
              open={showDraftOrder}
              onOpenChange={setShowDraftOrder}
              className="rounded-xl border border-[--border] bg-white shadow-sm overflow-hidden"
            >
              <Collapsible.Trigger className="w-full px-4 py-3 border-b border-[--border] flex items-center justify-between bg-chalk hover:bg-turf-a transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/40 focus-visible:ring-inset">
                <h3 className="font-semibold text-sm text-ink">Draft Order</h3>
                {showDraftOrder ? <Minimize2 size={16} className="text-ink-muted" /> : <Maximize2 size={16} className="text-ink-muted" />}
              </Collapsible.Trigger>

              <Collapsible.Content>
                <div className="p-3 space-y-2 max-h-64 overflow-y-auto">
                  {draftTeams.map((team, index) => {
                    const isCurrent = draftOrder[currentDraftPick] === index
                    const teamPicks = draftedPlayers.filter(dp => dp.teamIndex === index)
                    const teamNeeds = getTeamNeeds(index)

                    return (
                      <div
                        key={index}
                        className="p-2 rounded-lg transition-all duration-200"
                        style={{
                          backgroundColor: isCurrent ? team.color + '10' : 'var(--turf-tint-a)',
                          border: isCurrent ? `1px solid ${team.color}` : '1px solid var(--border)'
                        }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: team.color + '20' }}>
                              <span className="text-xs font-bold" style={{ color: team.color }}>{index + 1}</span>
                            </div>
                            <span className="text-xs font-medium truncate text-ink">{team.name}</span>
                          </div>
                          <span className="text-xs font-medium text-ink-muted">{teamPicks.length}/15</span>
                        </div>

                        {teamNeeds.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {teamNeeds.slice(0, 2).map((need, idx) => (
                              <span key={idx} className="px-1.5 py-0.5 text-xs rounded bg-turf-b text-ink-muted">
                                {need.position}: {need.count}
                              </span>
                            ))}
                            {teamNeeds.length > 2 && (
                              <span className="px-1.5 py-0.5 text-xs rounded bg-turf-b text-ink-muted">
                                +{teamNeeds.length - 2}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </Collapsible.Content>
            </Collapsible.Root>

            {/* Recent Picks - Collapsible */}
            <Collapsible.Root
              open={showRecentPicks}
              onOpenChange={setShowRecentPicks}
              className="rounded-xl border border-[--border] bg-white shadow-sm overflow-hidden"
            >
              <Collapsible.Trigger className="w-full px-4 py-3 border-b border-[--border] flex items-center justify-between bg-chalk hover:bg-turf-a transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/40 focus-visible:ring-inset">
                <h3 className="font-semibold text-sm text-ink">Recent Picks</h3>
                {showRecentPicks ? <Minimize2 size={16} className="text-ink-muted" /> : <Maximize2 size={16} className="text-ink-muted" />}
              </Collapsible.Trigger>

              <Collapsible.Content>
                <div className="p-3 space-y-2 max-h-64 overflow-y-auto">
                  {draftedPlayers.slice(-6).reverse().map((drafted, index) => {
                    const team = draftTeams[drafted.teamIndex]

                    return (
                      <div key={index} className="p-2 rounded-lg border border-[--border] bg-chalk">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-1">
                            <span className="px-1.5 py-0.5 rounded text-xs font-medium" style={{ backgroundColor: team.color + '20', color: team.color }}>
                              #{drafted.pickNumber}
                            </span>
                            <PositionBadge position={drafted.player.position} />
                          </div>
                          <span className="text-xs text-ink-muted">R{drafted.round}</span>
                        </div>

                        <p className="font-medium text-xs mb-1 truncate text-ink">{drafted.player.name}</p>

                        <div className="flex items-center justify-between">
                          <p className="text-xs truncate text-ink-muted">{drafted.team}</p>
                          <p className="text-xs font-medium text-ink-muted">{drafted.player.team}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Collapsible.Content>
            </Collapsible.Root>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Draft
