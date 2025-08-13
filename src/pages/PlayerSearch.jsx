import { useState, useEffect } from 'react'
import { usePlayers } from '../contexts/PlayerContext'
import { Search, Filter, Star, Plus, ChevronRight, ChevronLeft, Shield } from 'lucide-react'
import { getTeamLogo, getTeamDisplayName } from '../utils/teamLogos'

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

  const getFormColor = (form) => {
    if (form >= 8) return 'oklch(46.949% 0.162 321.406)'
    if (form >= 6) return 'oklch(71.236% 0.159 52.023)'
    return 'oklch(62.013% 0.208 28.717)'
  }

  if (loading) {
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
            Loading Players
          </h2>
          <p 
            className="text-lg"
            style={{ color: 'oklch(21.778% 0 0)' }}
          >
            Searching the database...
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header Section */}
        <section 
          className="rounded-2xl p-8 border shadow-sm"
          style={{ 
            backgroundColor: 'oklch(100% 0 0)',
            borderColor: 'oklch(90% 0 0)',
            boxShadow: '0 1px 3px oklch(21.778% 0 0 / 0.1)'
          }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'oklch(71.772% 0.133 239.443 / 0.1)' }}
            >
              <Search size={20} style={{ color: 'oklch(71.772% 0.133 239.443)' }} />
            </div>
            <div>
              <h1 
                className="text-3xl font-bold"
                style={{ color: 'oklch(20% 0 0)' }}
              >
                Player Search
              </h1>
              <p 
                style={{ color: 'oklch(21.778% 0 0)' }}
              >
                Find and analyze players for your fantasy team
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative">
              <Search 
                size={20} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
                style={{ color: 'oklch(21.778% 0 0 / 0.5)' }}
              />
              <input
                type="text"
                placeholder="Search players..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all duration-200"
                style={{
                  backgroundColor: 'oklch(100% 0 0)',
                  borderColor: 'oklch(90% 0 0)',
                  color: 'oklch(20% 0 0)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'oklch(71.772% 0.133 239.443)'
                  e.target.style.boxShadow = '0 0 0 3px oklch(71.772% 0.133 239.443 / 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'oklch(90% 0 0)'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>

            {/* Position Filter */}
            <select
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
              className="px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all duration-200"
              style={{
                backgroundColor: 'oklch(100% 0 0)',
                borderColor: 'oklch(90% 0 0)',
                color: 'oklch(20% 0 0)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'oklch(71.772% 0.133 239.443)'
                e.target.style.boxShadow = '0 0 0 3px oklch(71.772% 0.133 239.443 / 0.1)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'oklch(90% 0 0)'
                e.target.style.boxShadow = 'none'
              }}
            >
              <option value="">All Positions</option>
              {positions.map(position => (
                <option key={position} value={position}>{position}</option>
              ))}
            </select>

            {/* Team Filter */}
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all duration-200"
              style={{
                backgroundColor: 'oklch(100% 0 0)',
                borderColor: 'oklch(90% 0 0)',
                color: 'oklch(20% 0 0)'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'oklch(71.772% 0.133 239.443)'
                e.target.style.boxShadow = '0 0 0 3px oklch(71.772% 0.133 239.443 / 0.1)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'oklch(90% 0 0)'
                e.target.style.boxShadow = 'none'
              }}
            >
              <option value="">All Teams</option>
              {teams.map(team => (
                <option key={team} value={team}>{team}</option>
              ))}
            </select>

            {/* Clear Filters Button */}
            <button
              onClick={handleClearFilters}
              className="px-6 py-3 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-4"
              style={{
                backgroundColor: 'oklch(95% 0 0)',
                color: 'oklch(21.778% 0 0)',
                border: '1px solid oklch(90% 0 0)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'oklch(90% 0 0)'
                e.target.style.borderColor = 'oklch(71.772% 0.133 239.443)'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'oklch(95% 0 0)'
                e.target.style.borderColor = 'oklch(90% 0 0)'
              }}
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
              className="w-4 h-4 rounded"
              style={{
                accentColor: 'oklch(71.772% 0.133 239.443)'
              }}
            />
            <label 
              htmlFor="available-only"
              className="ml-2 text-sm font-medium cursor-pointer"
              style={{ color: 'oklch(21.778% 0 0)' }}
            >
              Show available players only
            </label>
          </div>

          {/* Results Count and Pagination Info */}
          <div className="mt-4 pt-4 border-t flex items-center justify-between" style={{ borderColor: 'oklch(90% 0 0)' }}>
            <p 
              className="text-sm font-medium"
              style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}
            >
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
                  className="p-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: currentPage === 1 ? 'oklch(90% 0 0)' : 'oklch(71.772% 0.133 239.443 / 0.1)',
                    color: currentPage === 1 ? 'oklch(21.778% 0 0 / 0.5)' : 'oklch(71.772% 0.133 239.443)'
                  }}
                >
                  <ChevronLeft size={16} />
                </button>
                
                <span 
                  className="text-sm font-medium px-3 py-1"
                  style={{ color: 'oklch(21.778% 0 0)' }}
                >
                  {currentPage} / {totalPages}
                </span>
                
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: currentPage === totalPages ? 'oklch(90% 0 0)' : 'oklch(71.772% 0.133 239.443 / 0.1)',
                    color: currentPage === totalPages ? 'oklch(21.778% 0 0 / 0.5)' : 'oklch(71.772% 0.133 239.443)'
                  }}
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
            <div 
              className="rounded-2xl border shadow-sm p-12 text-center"
              style={{ 
                backgroundColor: 'oklch(100% 0 0)',
                borderColor: 'oklch(90% 0 0)',
                boxShadow: '0 1px 3px oklch(21.778% 0 0 / 0.1)'
              }}
            >
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: 'oklch(90% 0 0)' }}
              >
                <Search size={24} style={{ color: 'oklch(21.778% 0 0 / 0.5)' }} />
              </div>
              <h3 
                className="text-xl font-bold mb-2"
                style={{ color: 'oklch(20% 0 0)' }}
              >
                No players found
              </h3>
              <p 
                style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}
              >
                Try adjusting your search criteria or clear the filters to see all players.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentPlayers.map((player) => {
                const positionColors = getPositionColor(player.position)
                const playerPoints = calculatePlayerPoints(player)
                const teamLogo = getTeamLogo(player.team)
                const teamDisplayName = getTeamDisplayName(player.team)
                
                return (
                  <div
                    key={player.id}
                    className="rounded-2xl border shadow-sm p-6 transition-all duration-200 group cursor-pointer"
                    style={{ 
                      backgroundColor: 'oklch(100% 0 0)',
                      borderColor: 'oklch(90% 0 0)',
                      boxShadow: '0 1px 3px oklch(21.778% 0 0 / 0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 8px 25px oklch(21.778% 0 0 / 0.15)'
                      e.currentTarget.style.borderColor = 'oklch(71.772% 0.133 239.443 / 0.3)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 1px 3px oklch(21.778% 0 0 / 0.1)'
                      e.currentTarget.style.borderColor = 'oklch(90% 0 0)'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
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
                          <div 
                            className="w-6 h-6 rounded-sm flex items-center justify-center hidden flex-shrink-0"
                            style={{ backgroundColor: 'oklch(90% 0 0)' }}
                          >
                            <Shield size={14} style={{ color: 'oklch(21.778% 0 0 / 0.5)' }} />
                          </div>
                          <h3 
                            className="text-lg font-bold"
                            style={{ color: 'oklch(20% 0 0)' }}
                          >
                            {player.name}
                          </h3>
                        </div>
                        
                        {/* Position and Team Info */}
                        <div className="flex items-center gap-2 mb-2">
                          <span 
                            className="px-2 py-1 text-xs font-medium rounded-md border"
                            style={{ 
                              backgroundColor: positionColors.bg,
                              color: positionColors.text,
                              borderColor: positionColors.border
                            }}
                          >
                            {player.position}
                          </span>
                          <span 
                            className="text-sm font-medium"
                            style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}
                          >
                            {teamDisplayName}
                          </span>
                        </div>
                        
                        {player.injured && (
                          <span 
                            className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-md"
                            style={{ 
                              backgroundColor: 'oklch(62.013% 0.208 28.717 / 0.1)',
                              color: 'oklch(12.402% 0.041 28.717)'
                            }}
                          >
                            Injured
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          className="p-2 rounded-lg transition-all duration-200 hover:scale-105"
                          style={{ backgroundColor: 'oklch(71.236% 0.159 52.023 / 0.1)' }}
                        >
                          <Star size={18} style={{ color: 'oklch(71.236% 0.159 52.023)' }} />
                        </button>
                        <button 
                          className="p-2 rounded-lg transition-all duration-200 hover:scale-105"
                          style={{ backgroundColor: 'oklch(46.949% 0.162 321.406 / 0.1)' }}
                        >
                          <Plus size={18} style={{ color: 'oklch(46.949% 0.162 321.406)' }} />
                        </button>
                        <ChevronRight 
                          size={18} 
                          style={{ color: 'oklch(21.778% 0 0 / 0.4)' }}
                        />
                      </div>
                    </div>

                    {/* Player Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <p 
                          className="text-2xl font-bold"
                          style={{ color: 'oklch(20% 0 0)' }}
                        >
                          {playerPoints}
                        </p>
                        <p 
                          className="text-xs font-medium"
                          style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}
                        >
                          Points
                        </p>
                      </div>
                      <div className="text-center">
                        <p 
                          className="text-2xl font-bold"
                          style={{ color: getFormColor(player.form) }}
                        >
                          {player.form}
                        </p>
                        <p 
                          className="text-xs font-medium"
                          style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}
                        >
                          Form
                        </p>
                      </div>
                      <div className="text-center">
                        <p 
                          className="text-2xl font-bold"
                          style={{ color: 'oklch(20% 0 0)' }}
                        >
                          {player.ownership}%
                        </p>
                        <p 
                          className="text-xs font-medium"
                          style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}
                        >
                          Owned
                        </p>
                      </div>
                    </div>

                    {/* Additional Stats */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t" style={{ borderColor: 'oklch(90% 0 0)' }}>
                      <div className="text-center">
                        <p 
                          className="text-lg font-semibold"
                          style={{ color: 'oklch(20% 0 0)' }}
                        >
                          {player.goals || 0}
                        </p>
                        <p 
                          className="text-xs"
                          style={{ color: 'oklch(21.778% 0 0 / 0.6)' }}
                        >
                          Goals
                        </p>
                      </div>
                      <div className="text-center">
                        <p 
                          className="text-lg font-semibold"
                          style={{ color: 'oklch(20% 0 0)' }}
                        >
                          {player.assists || 0}
                        </p>
                        <p 
                          className="text-xs"
                          style={{ color: 'oklch(21.778% 0 0 / 0.6)' }}
                        >
                          Assists
                        </p>
                      </div>
                      <div className="text-center">
                        <p 
                          className="text-lg font-semibold"
                          style={{ color: 'oklch(20% 0 0)' }}
                        >
                          {player.cleanSheets || 0}
                        </p>
                        <p 
                          className="text-xs"
                          style={{ color: 'oklch(21.778% 0 0 / 0.6)' }}
                        >
                          Clean Sheets
                        </p>
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
              <div 
                className="flex items-center gap-2 p-4 rounded-2xl border shadow-sm"
                style={{ 
                  backgroundColor: 'oklch(100% 0 0)',
                  borderColor: 'oklch(90% 0 0)',
                  boxShadow: '0 1px 3px oklch(21.778% 0 0 / 0.1)'
                }}
              >
                <button
                  onClick={() => goToPage(1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: currentPage === 1 ? 'oklch(90% 0 0)' : 'oklch(95% 0 0)',
                    color: currentPage === 1 ? 'oklch(21.778% 0 0 / 0.5)' : 'oklch(21.778% 0 0)',
                    border: '1px solid oklch(90% 0 0)'
                  }}
                >
                  First
                </button>
                
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: currentPage === 1 ? 'oklch(90% 0 0)' : 'oklch(71.772% 0.133 239.443 / 0.1)',
                    color: currentPage === 1 ? 'oklch(21.778% 0 0 / 0.5)' : 'oklch(71.772% 0.133 239.443)'
                  }}
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

                    return (
                      <button
                        key={pageNumber}
                        onClick={() => goToPage(pageNumber)}
                        className="w-10 h-10 rounded-lg font-medium transition-all duration-200"
                        style={{
                          backgroundColor: currentPage === pageNumber ? 'oklch(71.772% 0.133 239.443)' : 'oklch(95% 0 0)',
                          color: currentPage === pageNumber ? 'oklch(14.354% 0.026 239.443)' : 'oklch(21.778% 0 0)',
                          border: '1px solid oklch(90% 0 0)'
                        }}
                      >
                        {pageNumber}
                      </button>
                    )
                  })}
                </div>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: currentPage === totalPages ? 'oklch(90% 0 0)' : 'oklch(71.772% 0.133 239.443 / 0.1)',
                    color: currentPage === totalPages ? 'oklch(21.778% 0 0 / 0.5)' : 'oklch(71.772% 0.133 239.443)'
                  }}
                >
                  <ChevronRight size={20} />
                </button>
                
                <button
                  onClick={() => goToPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: currentPage === totalPages ? 'oklch(90% 0 0)' : 'oklch(95% 0 0)',
                    color: currentPage === totalPages ? 'oklch(21.778% 0 0 / 0.5)' : 'oklch(21.778% 0 0)',
                    border: '1px solid oklch(90% 0 0)'
                  }}
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