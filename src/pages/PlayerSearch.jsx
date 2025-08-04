import { useState } from 'react'
import { usePlayers } from '../contexts/PlayerContext'
import { Search, Filter, Star, Plus, Minus } from 'lucide-react'

const PlayerSearch = () => {
  const { filteredPlayers, loading, calculatePlayerPoints, filterPlayers, teams, positions } = usePlayers()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPosition, setSelectedPosition] = useState('')
  const [selectedTeam, setSelectedTeam] = useState('')
  const [showAvailableOnly, setShowAvailableOnly] = useState(false)

  const handleSearch = () => {
    filterPlayers({
      search: searchTerm,
      position: selectedPosition,
      team: selectedTeam,
      available: showAvailableOnly
    })
  }

  const handleClearFilters = () => {
    setSearchTerm('')
    setSelectedPosition('')
    setSelectedTeam('')
    setShowAvailableOnly(false)
    filterPlayers({})
  }

  const getPositionColor = (position) => {
    switch (position) {
      case 'GK': return 'bg-yellow-100 text-yellow-800'
      case 'DEF': return 'bg-blue-100 text-blue-800'
      case 'MID': return 'bg-green-100 text-green-800'
      case 'FWD': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getFormColor = (form) => {
    if (form >= 8) return 'text-green-600'
    if (form >= 6) return 'text-yellow-600'
    return 'text-red-600'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading players...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <h1 className="text-xl font-bold text-gray-900">Player Search</h1>
        <p className="text-sm text-gray-600">Find and analyze players</p>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Search and Filters */}
        <div className="card">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search players..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-2 gap-3">
              <select
                value={selectedPosition}
                onChange={(e) => setSelectedPosition(e.target.value)}
                className="input"
              >
                <option value="">All Positions</option>
                {positions.map(position => (
                  <option key={position} value={position}>{position}</option>
                ))}
              </select>

              <select
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="input"
              >
                <option value="">All Teams</option>
                {teams.map(team => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>
            </div>

            {/* Available Only Toggle */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="availableOnly"
                checked={showAvailableOnly}
                onChange={(e) => setShowAvailableOnly(e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="availableOnly" className="text-sm text-gray-700">
                Available players only
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={handleSearch}
                className="btn btn-primary flex-1"
              >
                Search
              </button>
              <button
                onClick={handleClearFilters}
                className="btn btn-secondary"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Players ({filteredPlayers.length})
            </h2>
            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-gray-500" />
              <span className="text-sm text-gray-500">Sort by: Form</span>
            </div>
          </div>

          {/* Player Cards */}
          <div className="space-y-3">
            {filteredPlayers.map((player) => {
              const points = calculatePlayerPoints(player)
              
              return (
                <div key={player.id} className="card">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{player.name}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getPositionColor(player.position)}`}>
                          {player.position}
                        </span>
                        {player.isInjured && (
                          <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800">
                            Injured
                          </span>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Team</p>
                          <p className="font-medium">{player.realTeam}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Form</p>
                          <p className={`font-medium ${getFormColor(player.form)}`}>
                            {player.form}/10
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Price</p>
                          <p className="font-medium">£{player.price}m</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Points</p>
                          <p className="font-medium">{points}</p>
                        </div>
                      </div>

                      {/* Key Stats */}
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="grid grid-cols-4 gap-2 text-xs">
                          <div className="text-center">
                            <p className="text-gray-500">Goals</p>
                            <p className="font-medium">{player.stats.goals}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-gray-500">Assists</p>
                            <p className="font-medium">{player.stats.assists}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-gray-500">Clean Sheets</p>
                            <p className="font-medium">{player.stats.cleanSheets}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-gray-500">Cards</p>
                            <p className="font-medium">{player.stats.yellowCards + player.stats.redCards}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center space-y-2 ml-4">
                      <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                        <Star size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {filteredPlayers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No players found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PlayerSearch 