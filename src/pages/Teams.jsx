import { useState, useEffect } from 'react'
import * as RadixSelect from '@radix-ui/react-select'
import {
  Users,
  Trophy,
  Target,
  ChevronDown,
  Star,
  ArrowUpDown,
  MoreVertical,
  X,
  Check
} from 'lucide-react'
import PositionBadge, { POSITION_STYLES } from '../components/PositionBadge'

const Teams = () => {
  // Mock data for demonstration
  const loading = false
  const userTeams = [
    { id: 1, name: 'Thunder Strikers', league: 'Premier Fantasy League', points: 1247, rank: 3 },
    { id: 2, name: 'Goal Diggers', league: 'Champions Cup', points: 982, rank: 7 },
    { id: 3, name: 'Net Busters', league: 'Sunday League Elite', points: 1456, rank: 1 }
  ]

  const [selectedTeam, setSelectedTeam] = useState(null)
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
      <div className="min-h-screen bg-chalk flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-[--border] border-t-pitch mx-auto mb-8"></div>
          <h2 className="font-display text-4xl mb-2 text-ink">Loading Teams</h2>
          <p className="text-lg text-ink-muted">Preparing your fantasy teams...</p>
        </div>
      </div>
    )
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

    const draggedFrom = findPlayerLocation(draggedPlayer.id)

    if (!draggedFrom) {
      setDraggedPlayer(null)
      setDropTarget(null)
      return
    }

    const targetPlayer = getPlayerAtPosition(targetPosition, targetIndex)

    swapPlayers(draggedFrom, { position: targetPosition, index: targetIndex }, targetPlayer)

    setDraggedPlayer(null)
    setDropTarget(null)
  }

  const findPlayerLocation = (playerId) => {
    for (const [position, players] of Object.entries(teamState.startingLineup)) {
      const index = players.findIndex(p => p.id === playerId)
      if (index !== -1) {
        return { position, index, type: 'startingLineup' }
      }
    }

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
    setIsSubstitutionMode(false)
    setIsChangesMode(false)
    setDraggedPlayer(null)
    setDropTarget(null)
  }

  // Empty state when user has no teams
  if (userTeams.length === 0) {
    return (
      <div className="min-h-screen bg-chalk">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-2xl border border-[--border] shadow-sm p-12 text-center">
            <div className="w-24 h-24 rounded-2xl bg-pitch flex items-center justify-center mx-auto mb-6">
              <Trophy size={36} className="text-floodlight" />
            </div>
            <h2 className="font-display text-4xl mb-4 text-ink">No Teams Yet</h2>
            <p className="text-lg text-ink-muted mb-8 max-w-md mx-auto">
              You haven't joined any fantasy leagues yet. Create or join a league to start building your dream team!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-floodlight text-ink rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:brightness-95 active:brightness-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-floodlight/50 focus-visible:ring-offset-2 focus-visible:ring-offset-chalk">
                Create League
              </button>
              <button className="px-8 py-4 bg-white text-pitch border border-pitch rounded-xl font-semibold transition-all duration-200 hover:bg-turf-a active:bg-turf-b focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/40 focus-visible:ring-offset-2 focus-visible:ring-offset-chalk">
                Join League
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const PlayerCard = ({ player, position, index, isDraggable = false, className = "" }) => {
    const style = POSITION_STYLES[player.position] || { bg: 'bg-ink-muted', text: 'text-chalk' }
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
          bg-white rounded-2xl border border-[--border] shadow-lg transition-all duration-300
          ${canDrag ? 'cursor-move hover:scale-105 hover:-translate-y-2 hover:shadow-xl' : ''}
          ${className}
          ${(isSubstitutionMode || isChangesMode) ? 'ring-2 ring-floodlight/30' : ''}
          ${isDropTarget ? 'ring-4 ring-pitch bg-turf-a' : ''}
        `}
        role={canDrag ? "button" : undefined}
        tabIndex={canDrag ? 0 : undefined}
        aria-label={`${player.name} - ${player.position}`}
      >
        <div className={`${style.bg} rounded-t-xl p-3 flex items-center justify-between`}>
          <span className={`inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider ${style.text}`}>
            {player.position}
          </span>
          <div className="px-2 py-1 rounded-full text-xs font-medium bg-white/25 text-current">
            {player.team}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-ink text-sm mb-3 leading-tight">{player.name}</h3>
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center rounded-md bg-ink px-3 py-1 border-t-2 border-floodlight">
              <span className="font-display scoreboard-digits text-2xl leading-none text-floodlight">
                {calculatePlayerPoints(player)}
              </span>
              <span className="text-chalk/70" style={{ fontSize: '0.55rem', letterSpacing: '0.05em' }}>PTS</span>
            </div>
            <div className="flex items-center gap-1">
              <Star size={14} className="text-card-yellow-ink fill-card-yellow-ink" />
              <span className="text-xs font-medium text-ink-muted">
                {(Math.random() * 2 + 3).toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-chalk">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-10">
          {/* Header with Team Dropdown */}
          <section className="bg-white rounded-2xl p-8 border border-[--border] shadow-sm">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-pitch flex items-center justify-center">
                  <Users size={20} className="text-floodlight" />
                </div>
                <div>
                  <h1 className="font-display text-4xl text-ink">
                    {selectedTeam?.name || 'My Team'}
                  </h1>
                  <p className="text-ink-muted">{selectedTeam?.league || 'Fantasy Premier League'}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                {/* Team Stats */}
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center rounded-md bg-ink px-4 py-2 border-t-2 border-floodlight">
                    <span className="font-display scoreboard-digits text-3xl leading-none text-floodlight">
                      {selectedTeam?.points || 1247}
                    </span>
                    <span className="text-chalk/70 text-[0.6rem] tracking-wide">TOTAL POINTS</span>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-display text-pitch">#{selectedTeam?.rank || 3}</div>
                    <div className="text-sm font-medium text-ink-muted">League Rank</div>
                  </div>
                </div>

                {/* Team Dropdown */}
                <RadixSelect.Root
                  value={selectedTeam ? String(selectedTeam.id) : undefined}
                  onValueChange={(val) => {
                    const team = userTeams.find((t) => String(t.id) === val)
                    if (team) setSelectedTeam(team)
                  }}
                >
                  <RadixSelect.Trigger className="flex items-center gap-3 px-6 py-3 bg-white border border-[--border] rounded-xl hover:border-pitch/40 hover:bg-turf-a transition-all duration-200 min-w-[200px] justify-between shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-pitch/20 focus-visible:border-pitch data-[state=open]:border-pitch data-[state=open]:ring-2 data-[state=open]:ring-pitch/20">
                    <RadixSelect.Value>
                      <span className="font-medium text-ink">{selectedTeam?.name || 'Select Team'}</span>
                    </RadixSelect.Value>
                    <RadixSelect.Icon>
                      <ChevronDown size={20} className="text-ink-muted" />
                    </RadixSelect.Icon>
                  </RadixSelect.Trigger>

                  <RadixSelect.Portal>
                    <RadixSelect.Content
                      position="popper"
                      sideOffset={8}
                      className="overflow-hidden rounded-xl border border-[--border] bg-white shadow-xl z-50 min-w-[var(--radix-select-trigger-width)]"
                    >
                      <RadixSelect.Viewport className="p-1">
                        {userTeams.map((team) => (
                          <RadixSelect.Item
                            key={team.id}
                            value={String(team.id)}
                            className="relative flex items-center justify-between gap-3 px-4 py-3 rounded-lg cursor-pointer select-none outline-none data-[highlighted]:bg-turf-a data-[state=checked]:bg-pitch/5"
                          >
                            <RadixSelect.ItemText>
                              <span className="block font-medium text-ink">{team.name}</span>
                              <span className="block text-sm text-ink-muted">{team.league}</span>
                            </RadixSelect.ItemText>
                            <RadixSelect.ItemIndicator>
                              <Trophy size={16} className="text-floodlight flex-shrink-0" />
                            </RadixSelect.ItemIndicator>
                          </RadixSelect.Item>
                        ))}
                      </RadixSelect.Viewport>
                    </RadixSelect.Content>
                  </RadixSelect.Portal>
                </RadixSelect.Root>
              </div>
            </div>
          </section>

          {/* Mode Indicator */}
          {(isSubstitutionMode || isChangesMode) && (
            <section className="bg-floodlight/10 border border-floodlight/40 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-floodlight/20 flex items-center justify-center">
                    <ArrowUpDown size={16} className="text-floodlight" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink">
                      {isSubstitutionMode ? 'Substitution Mode' : 'Changes Mode'}
                    </h3>
                    <p className="text-sm text-ink-muted">
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
                    className="px-4 py-2 bg-floodlight text-ink rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 hover:brightness-95 active:brightness-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-floodlight/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  >
                    <Check size={16} />
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancelMode}
                    className="px-4 py-2 bg-white text-ink border border-[--border] rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 hover:bg-turf-a active:bg-turf-b focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Formation Display */}
          <section className="bg-white rounded-2xl border border-[--border] shadow-sm overflow-hidden">
            <div className="p-6 border-b border-[--border]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-pitch flex items-center justify-center">
                    <Target size={20} className="text-floodlight" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-ink">Formation (4-3-3)</h2>
                    <p className="text-sm text-ink-muted">
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
                    className="px-4 py-2 text-sm font-medium text-pitch hover:bg-turf-a active:bg-turf-b rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  >
                    Make Substitution
                  </button>
                  <button
                    onClick={handleMakeChanges}
                    className="px-4 py-2 text-sm font-medium text-floodlight-ink hover:bg-floodlight/10 active:bg-floodlight/15 rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-floodlight/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  >
                    Make Changes
                  </button>
                </div>
              </div>
            </div>

            {/* Soccer Pitch */}
            <div
              className="relative p-8 min-h-[700px]"
              style={{ background: 'linear-gradient(180deg, #1E4433 0%, #17392C 50%, #153226 100%)' }}
              onDragOver={handleDragOver}
            >
              {/* Pitch Markings */}
              <div className="absolute inset-4 border-2 border-chalk/25 rounded-lg">
                <div className="absolute top-1/2 left-0 right-0 h-0 border-t-2 border-chalk/25"></div>
                <div className="absolute top-1/2 left-1/2 w-20 h-20 border-2 border-chalk/25 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute top-0 left-1/2 w-24 h-12 border-2 border-chalk/25 border-t-0 transform -translate-x-1/2"></div>
                <div className="absolute bottom-0 left-1/2 w-24 h-12 border-2 border-chalk/25 border-b-0 transform -translate-x-1/2"></div>
              </div>

              {/* Formation Grid */}
              <div className="relative z-10 h-full grid grid-rows-4 gap-8">
                {/* Goalkeepers */}
                <div className="flex justify-center items-center">
                  <div className="grid grid-cols-1 gap-4 max-w-[120px]">
                    {teamState.startingLineup.gk.map((player, index) => (
                      <PlayerCard key={player.id} player={player} position="gk" index={index} isDraggable={true} />
                    ))}
                  </div>
                </div>

                {/* Defenders */}
                <div className="flex justify-center items-center">
                  <div className="grid grid-cols-4 gap-4 max-w-[520px]">
                    {teamState.startingLineup.def.map((player, index) => (
                      <PlayerCard key={player.id} player={player} position="def" index={index} isDraggable={true} />
                    ))}
                  </div>
                </div>

                {/* Midfielders */}
                <div className="flex justify-center items-center">
                  <div className="grid grid-cols-3 gap-4 max-w-[400px]">
                    {teamState.startingLineup.mid.map((player, index) => (
                      <PlayerCard key={player.id} player={player} position="mid" index={index} isDraggable={true} />
                    ))}
                  </div>
                </div>

                {/* Forwards */}
                <div className="flex justify-center items-center">
                  <div className="grid grid-cols-3 gap-4 max-w-[400px]">
                    {teamState.startingLineup.fwd.map((player, index) => (
                      <PlayerCard key={player.id} player={player} position="fwd" index={index} isDraggable={true} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Bench Section */}
          <section className="bg-white rounded-2xl border border-[--border] shadow-sm overflow-hidden">
            <div className="p-6 border-b border-[--border]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-turf-b flex items-center justify-center">
                    <Users size={20} className="text-ink-muted" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-ink">Bench</h2>
                    <p className="text-sm text-ink-muted">
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
                    className="px-4 py-2 text-sm font-medium text-pitch hover:bg-turf-a active:bg-turf-b rounded-lg transition-colors duration-200 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  >
                    <ArrowUpDown size={16} />
                    Make Substitution
                  </button>
                  <button
                    onClick={handleMakeChanges}
                    className="px-4 py-2 text-sm font-medium text-floodlight-ink rounded-lg transition-colors duration-200 flex items-center gap-2 hover:bg-floodlight/10 active:bg-floodlight/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-floodlight/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
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
                      bg-turf-a hover:bg-white border border-[--border] rounded-2xl p-4 transition-all duration-300
                      ${(isSubstitutionMode || isChangesMode) ? 'cursor-move hover:shadow-lg hover:-translate-y-1' : ''}
                      ${(isSubstitutionMode || isChangesMode) ? 'ring-2 ring-floodlight/30' : ''}
                      ${dropTarget?.position === 'bench' && dropTarget?.index === index ? 'ring-4 ring-pitch bg-turf-a' : ''}
                      group
                    `}
                    role="button"
                    tabIndex={0}
                    aria-label={`${player.name} - Bench player`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-ink">{player.name}</h3>
                          <PositionBadge position={player.position} />
                        </div>
                        <p className="text-sm text-ink-muted mb-2">{player.team}</p>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <span className="text-lg font-display text-ink">{calculatePlayerPoints(player)}</span>
                            <span className="text-sm text-ink-muted">pts</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star size={12} className="text-card-yellow-ink fill-card-yellow-ink" />
                            <span className="text-xs text-ink-muted">{(Math.random() * 2 + 3).toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                      <ArrowUpDown size={20} className="text-ink-muted/60 group-hover:text-pitch transition-colors duration-200" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Team Actions */}
          <section className="bg-white rounded-2xl border border-[--border] shadow-sm p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-semibold text-ink mb-2">Team Management</h3>
                <p className="text-ink-muted">Make transfers, set your captain, and optimize your lineup</p>
              </div>
              <div className="flex items-center gap-3">
                {(isSubstitutionMode || isChangesMode) ? (
                  <>
                    <button
                      onClick={handleSaveChanges}
                      className="px-6 py-3 bg-floodlight text-ink rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2 hover:brightness-95 active:brightness-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-floodlight/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    >
                      <Check size={16} />
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancelMode}
                      className="px-6 py-3 bg-white text-ink border border-[--border] rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 hover:bg-turf-a active:bg-turf-b focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    >
                      <X size={16} />
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button className="px-6 py-3 bg-floodlight text-ink rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md hover:brightness-95 active:brightness-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-floodlight/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white">
                      Save Changes
                    </button>
                    <button className="px-6 py-3 bg-white text-ink border border-[--border] rounded-xl font-semibold transition-all duration-200 hover:bg-turf-a active:bg-turf-b focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white">
                      Reset Team
                    </button>
                  </>
                )}
                <button className="p-3 bg-white text-ink-muted border border-[--border] rounded-xl transition-all duration-200 hover:bg-turf-a active:bg-turf-b focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white">
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
