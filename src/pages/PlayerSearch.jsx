import { useState, useEffect } from 'react'
import { usePlayers } from '../contexts/PlayerContext'
import { Search, Star, Plus, ChevronRight, ChevronLeft, Shield } from 'lucide-react'
import { getTeamLogo, getTeamDisplayName } from '../utils/teamLogos'
import PositionBadge from '../components/PositionBadge'
import Select from '../components/Select'

const PlayerSearch = () => {
  const { filteredPlayers, loading, calculatePlayerPoints, filterPlayers, teams, positions } = usePlayers()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPosition, setSelectedPosition] = useState('')
  const [selectedTeam, setSelectedTeam] = useState('')
  const [showAvailableOnly, setShowAvailableOnly] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const playersPerPage = 50

  // Auto-search when filters change
  useEffect(() => {
    filterPlayers({
      search: searchTerm,
      position: selectedPosition,
      team: selectedTeam,
      available: showAvailableOnly
    })
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchTerm, selectedPosition, selectedTeam, showAvailableOnly, filterPlayers])

  const handleClearFilters = () => {
    setSearchTerm('')
    setSelectedPosition('')
    setSelectedTeam('')
    setShowAvailableOnly(false)
    setCurrentPage(1)
  }

  // Pagination calculations
  const totalPages = Math.ceil(filteredPlayers.length / playersPerPage)
  const startIndex = (currentPage - 1) * playersPerPage
  const endIndex = startIndex + playersPerPage
  const currentPlayers = filteredPlayers.slice(startIndex, endIndex)

  const goToPage = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getFormColor = (form) => {
    if (form >= 8) return 'text-pitch'
    if (form >= 6) return 'text-floodlight'
    return 'text-card-red'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-chalk">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 mx-auto mb-6 border-4 border-[--border] border-t-pitch"></div>
          <h2 className="font-display text-3xl mb-1 text-ink">Loading Players</h2>
          <p className="text-lg text-ink-muted">Searching the database...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-chalk">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Header Section */}
        <section className="rounded-2xl p-8 border border-[--border] bg-white shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-pitch">
              <Search size={20} className="text-floodlight" />
            </div>
            <div>
              <h1 className="font-display text-4xl text-ink">Player Search</h1>
              <p className="text-ink-muted">Find and analyze players for your fantasy team</p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ink-muted" />
              <input
                type="text"
                placeholder="Search players..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[--border] bg-white text-ink focus:outline-none focus:ring-2 focus:ring-pitch/20 focus:border-pitch transition-all duration-200"
              />
            </div>

            {/* Position Filter */}
            <Select
              ariaLabel="Filter by position"
              value={selectedPosition || 'all'}
              onValueChange={(val) => setSelectedPosition(val === 'all' ? '' : val)}
              placeholder="All Positions"
              options={[
                { value: 'all', label: 'All Positions' },
                ...positions.map((position) => ({ value: position, label: position })),
              ]}
            />

            {/* Team Filter */}
            <Select
              ariaLabel="Filter by team"
              value={selectedTeam || 'all'}
              onValueChange={(val) => setSelectedTeam(val === 'all' ? '' : val)}
              placeholder="All Teams"
              options={[
                { value: 'all', label: 'All Teams' },
                ...teams.map((team) => ({ value: team, label: team })),
              ]}
            />

            {/* Clear Filters Button */}
            <button
              onClick={handleClearFilters}
              className="px-6 py-3 rounded-xl font-medium transition-all duration-200 bg-chalk text-ink border border-[--border] hover:bg-turf-a hover:border-pitch/40 active:bg-turf-b focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/40 focus-visible:ring-offset-2 focus-visible:ring-offset-chalk"
            >
              Clear Filters
            </button>
          </div>

          {/* Available Only Checkbox */}
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="available-only"
              checked={showAvailableOnly}
              onChange={(e) => setShowAvailableOnly(e.target.checked)}
              className="w-4 h-4 rounded accent-pitch focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/40 focus-visible:ring-offset-1"
            />
            <label htmlFor="available-only" className="ml-2 text-sm font-medium cursor-pointer text-ink-muted">
              Show available players only
            </label>
          </div>

          {/* Results Count and Pagination Info */}
          <div className="mt-4 pt-4 border-t border-[--border] flex items-center justify-between">
            <p className="text-sm font-medium text-ink-muted">
              {filteredPlayers.length} players found
              {totalPages > 1 && (
                <span className="ml-2">
                  • Page {currentPage} of {totalPages}
                  • Showing {startIndex + 1}-{Math.min(endIndex, filteredPlayers.length)}
                </span>
              )}
            </p>

            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:bg-pitch/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                    currentPage === 1 ? 'bg-turf-b text-ink-muted' : 'bg-pitch/10 text-pitch'
                  }`}
                >
                  <ChevronLeft size={16} />
                </button>

                <span className="text-sm font-medium px-3 py-1 text-ink">
                  {currentPage} / {totalPages}
                </span>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:bg-pitch/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                    currentPage === totalPages ? 'bg-turf-b text-ink-muted' : 'bg-pitch/10 text-pitch'
                  }`}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Players Grid */}
        <section>
          {currentPlayers.length === 0 ? (
            <div className="rounded-2xl border border-[--border] bg-white shadow-sm p-12 text-center">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 bg-turf-b">
                <Search size={24} className="text-ink-muted" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-ink">No players found</h3>
              <p className="text-ink-muted">
                Try adjusting your search criteria or clear the filters to see all players.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentPlayers.map((player) => {
                const playerPoints = calculatePlayerPoints(player)
                const teamLogo = getTeamLogo(player.team)
                const teamDisplayName = getTeamDisplayName(player.team)

                return (
                  <div
                    key={player.id}
                    className="rounded-2xl border border-[--border] bg-white shadow-sm p-6 transition-all duration-200 group cursor-pointer hover:shadow-xl hover:border-pitch/30 hover:-translate-y-0.5"
                  >
                    {/* Player Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        {/* Player Name with Team Logo */}
                        <div className="flex items-center gap-2 mb-2">
                          {teamLogo ? (
                            <img
                              src={teamLogo}
                              alt={`${teamDisplayName} logo`}
                              className="w-6 h-6 object-contain flex-shrink-0"
                              onError={(e) => {
                                e.target.style.display = 'none'
                                e.target.nextSibling.style.display = 'flex'
                              }}
                            />
                          ) : null}
                          <div className="w-6 h-6 rounded-sm items-center justify-center hidden flex-shrink-0 bg-turf-b">
                            <Shield size={14} className="text-ink-muted" />
                          </div>
                          <h3 className="text-lg font-bold text-ink">{player.name}</h3>
                        </div>

                        {/* Position and Team Info */}
                        <div className="flex items-center gap-2 mb-2">
                          <PositionBadge position={player.position} />
                          <span className="text-sm font-medium text-ink-muted">{teamDisplayName}</span>
                        </div>

                        {player.injured && (
                          <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-md bg-card-red/10 text-card-red">
                            Injured
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 bg-card-yellow/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-card-yellow-ink/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white">
                          <Star size={18} className="text-card-yellow-ink" />
                        </button>
                        <button className="p-2 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 bg-pitch/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white">
                          <Plus size={18} className="text-pitch" />
                        </button>
                        <ChevronRight size={18} className="text-ink-muted/60" />
                      </div>
                    </div>

                    {/* Scoreboard + secondary stats */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex flex-col items-center rounded-md bg-ink px-4 py-2 border-t-2 border-floodlight">
                        <span className="font-display scoreboard-digits text-4xl leading-none text-floodlight">{playerPoints}</span>
                        <span className="caption text-chalk/70 mt-0.5" style={{ fontSize: '0.6rem' }}>Points</span>
                      </div>
                      <div className="flex-1 grid grid-cols-2 gap-3">
                        <div className="text-center">
                          <p className={`text-2xl font-display ${getFormColor(player.form)}`}>{player.form}</p>
                          <p className="caption">Form</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-display text-ink">{player.ownership}%</p>
                          <p className="caption">Owned</p>
                        </div>
                      </div>
                    </div>

                    {/* Additional Stats */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[--border]">
                      <div className="text-center">
                        <p className="text-lg font-semibold text-ink">{player.goals || 0}</p>
                        <p className="text-xs text-ink-muted">Goals</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-ink">{player.assists || 0}</p>
                        <p className="text-xs text-ink-muted">Assists</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-ink">{player.cleanSheets || 0}</p>
                        <p className="text-xs text-ink-muted">Clean Sheets</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center">
              <div className="flex items-center gap-2 p-4 rounded-2xl border border-[--border] bg-white shadow-sm">
                <button
                  onClick={() => goToPage(1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-[--border] active:bg-turf-b focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                    currentPage === 1 ? 'bg-turf-b text-ink-muted' : 'bg-chalk text-ink hover:bg-turf-a'
                  }`}
                >
                  First
                </button>

                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:bg-pitch/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                    currentPage === 1 ? 'bg-turf-b text-ink-muted' : 'bg-pitch/10 text-pitch'
                  }`}
                >
                  <ChevronLeft size={20} />
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNumber
                    if (totalPages <= 5) {
                      pageNumber = i + 1
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i
                    } else {
                      pageNumber = currentPage - 2 + i
                    }

                    const isCurrent = currentPage === pageNumber

                    return (
                      <button
                        key={pageNumber}
                        onClick={() => goToPage(pageNumber)}
                        aria-current={isCurrent ? 'page' : undefined}
                        className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 border border-[--border] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                          isCurrent ? 'bg-pitch text-chalk' : 'bg-chalk text-ink hover:bg-turf-a active:bg-turf-b'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    )
                  })}
                </div>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:bg-pitch/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                    currentPage === totalPages ? 'bg-turf-b text-ink-muted' : 'bg-pitch/10 text-pitch'
                  }`}
                >
                  <ChevronRight size={20} />
                </button>

                <button
                  onClick={() => goToPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-[--border] active:bg-turf-b focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                    currentPage === totalPages ? 'bg-turf-b text-ink-muted' : 'bg-chalk text-ink hover:bg-turf-a'
                  }`}
                >
                  Last
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default PlayerSearch
