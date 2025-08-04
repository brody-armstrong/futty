import { useState } from 'react'
import { useLeagues } from '../contexts/LeagueContext'
import { usePlayers } from '../contexts/PlayerContext'
import { Users, Trophy, TrendingUp, Settings, Plus } from 'lucide-react'

const Teams = () => {
  const { userTeams, loading } = useLeagues()
  const { calculatePlayerPoints, players } = usePlayers()
  const [selectedTeam, setSelectedTeam] = useState(null)

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
          <p className="mt-4 text-gray-600">Loading teams...</p>
        </div>
      </div>
    )
  }

  const currentTeam = selectedTeam || userTeams[0]

  // Get a sample of players for the team roster (first 14 players)
  const teamPlayers = players.slice(0, 14)

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">My Teams</h1>
            <p className="text-sm text-gray-600">Manage your fantasy teams</p>
          </div>
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <Settings size={20} />
          </button>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Team Selector */}
        {userTeams.length > 1 && (
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Team</h2>
            <div className="grid grid-cols-1 gap-2">
              {userTeams.map((team) => (
                <button
                  key={team.id}
                  onClick={() => setSelectedTeam(team)}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    currentTeam?.id === team.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{team.name}</h3>
                      <p className="text-sm text-gray-600">League: {team.leagueID}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{team.totalPoints} pts</p>
                      <p className="text-xs text-gray-500">Rank #{team.rank}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {currentTeam && (
          <>
            {/* Team Overview */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{currentTeam.name}</h2>
                  <p className="text-sm text-gray-600">League: Premier League Fantasy</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{currentTeam.totalPoints}</p>
                  <p className="text-sm text-gray-600">Total Points</p>
                </div>
              </div>

              {/* Team Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{teamPlayers.length}</p>
                  <p className="text-sm text-gray-600">Players</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">9</p>
                  <p className="text-sm text-gray-600">Starters</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">5</p>
                  <p className="text-sm text-gray-600">Bench</p>
                </div>
              </div>
            </div>

            {/* Starting Lineup */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Starting Lineup (9)</h3>
                <button className="btn btn-primary text-sm">
                  Edit Lineup
                </button>
              </div>

              <div className="space-y-3">
                {/* Formation Display */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-center text-sm text-gray-600 mb-2">Formation: 4-3-2</div>
                  <div className="grid grid-cols-9 gap-1">
                    {/* GK */}
                    <div className="col-span-1">
                      <div className="bg-yellow-200 rounded p-2 text-center text-xs">
                        <div className="font-medium">GK</div>
                        <div className="text-gray-600">{teamPlayers.find(p => p.position === 'GK')?.name || 'Empty'}</div>
                      </div>
                    </div>
                    {/* DEF */}
                    {teamPlayers.filter(p => p.position === 'DEF').slice(0, 4).map((player, i) => (
                      <div key={i} className="col-span-1">
                        <div className="bg-blue-200 rounded p-2 text-center text-xs">
                          <div className="font-medium">DEF</div>
                          <div className="text-gray-600">{player.name}</div>
                        </div>
                      </div>
                    ))}
                    {/* MID */}
                    {teamPlayers.filter(p => p.position === 'MID').slice(0, 3).map((player, i) => (
                      <div key={i} className="col-span-1">
                        <div className="bg-green-200 rounded p-2 text-center text-xs">
                          <div className="font-medium">MID</div>
                          <div className="text-gray-600">{player.name}</div>
                        </div>
                      </div>
                    ))}
                    {/* FWD */}
                    {teamPlayers.filter(p => p.position === 'FWD').slice(0, 2).map((player, i) => (
                      <div key={i} className="col-span-1">
                        <div className="bg-red-200 rounded p-2 text-center text-xs">
                          <div className="font-medium">FWD</div>
                          <div className="text-gray-600">{player.name}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Roster */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Full Roster</h3>
                <button className="btn btn-secondary text-sm">
                  <Plus size={16} className="mr-1" />
                  Add Player
                </button>
              </div>

              <div className="space-y-3">
                {teamPlayers.map((player) => {
                  const points = calculatePlayerPoints(player)
                  
                  return (
                    <div key={player.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getPositionColor(player.position)}`}>
                          {player.position}
                        </span>
                        <div>
                          <h4 className="font-medium text-gray-900">{player.name}</h4>
                          <p className="text-sm text-gray-600">{player.realTeam}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{points} pts</p>
                        <p className={`text-xs ${getFormColor(player.form)}`}>
                          Form: {player.form}/10
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Team Performance */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Trophy className="text-green-600 mx-auto mb-2" size={24} />
                  <p className="text-2xl font-bold text-gray-900">3</p>
                  <p className="text-sm text-gray-600">Wins</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <TrendingUp className="text-blue-600 mx-auto mb-2" size={24} />
                  <p className="text-2xl font-bold text-gray-900">2</p>
                  <p className="text-sm text-gray-600">Draws</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <Users className="text-red-600 mx-auto mb-2" size={24} />
                  <p className="text-2xl font-bold text-gray-900">1</p>
                  <p className="text-sm text-gray-600">Losses</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Trophy className="text-purple-600 mx-auto mb-2" size={24} />
                  <p className="text-2xl font-bold text-gray-900">11</p>
                  <p className="text-sm text-gray-600">Points</p>
                </div>
              </div>
            </div>
          </>
        )}

        {userTeams.length === 0 && (
          <div className="text-center py-8">
            <Users className="text-gray-400 mx-auto mb-4" size={48} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No teams yet</h3>
            <p className="text-gray-600 mb-4">Join a league to create your first team</p>
            <button className="btn btn-primary">Join League</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Teams 