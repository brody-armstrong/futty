import { useState } from 'react'
import { useLeagues } from '../contexts/LeagueContext'
import { useAuth } from '../contexts/AuthContext'
import { Trophy, Users, Calendar, TrendingUp, Plus, Play } from 'lucide-react'
import Matchup from '../components/Matchup'

const Leagues = () => {
  const { leagues, loading, createLeague, joinLeague } = useLeagues()
  const { user } = useAuth()
  const [showCreateLeague, setShowCreateLeague] = useState(false)
  const [showJoinLeague, setShowJoinLeague] = useState(false)

  const mockStandings = [
    {
      id: '1',
      name: 'Haaland\'s Heroes',
      owner: 'testuser',
      points: 245,
      wins: 3,
      draws: 2,
      losses: 1,
      rank: 1
    },
    {
      id: '2',
      name: 'De Bruyne Dynasty',
      owner: 'user2',
      points: 238,
      wins: 3,
      draws: 1,
      losses: 2,
      rank: 2
    },
    {
      id: '3',
      name: 'Van Dijk\'s Vikings',
      owner: 'user3',
      points: 225,
      wins: 2,
      draws: 3,
      losses: 1,
      rank: 3
    }
  ]

  const mockMatchups = [
    {
      id: '1',
      homeTeam: {
        name: 'Haaland\'s Heroes',
        lineup: [
          { id: '1', name: 'Player 1' },
          { id: '2', name: 'Player 2' },
          { id: '3', name: 'Player 3' },
        ],
      },
      awayTeam: {
        name: 'De Bruyne Dynasty',
        lineup: [
          { id: '4', name: 'Player 4' },
          { id: '5', name: 'Player 5' },
          { id: '6', name: 'Player 6' },
        ],
      },
      homeScore: 78,
      awayScore: 65,
      status: 'completed',
      date: '2024-02-03T15:00:00Z'
    },
    {
      id: '2',
      homeTeam: {
        name: 'Van Dijk\'s Vikings',
        lineup: [
          { id: '7', name: 'Player 7' },
          { id: '8', name: 'Player 8' },
          { id: '9', name: 'Player 9' },
        ],
      },
      awayTeam: {
        name: 'Alisson\'s Army',
        lineup: [
          { id: '10', name: 'Player 10' },
          { id: '11', name: 'Player 11' },
          { id: '12', name: 'Player 12' },
        ],
      },
      homeScore: 0,
      awayScore: 0,
      status: 'upcoming',
      date: '2024-02-10T15:00:00Z'
    }
  ]

  const handleCreateLeague = (formData) => {
    createLeague({
      name: formData.name,
      settings: {
        maxTeams: parseInt(formData.maxTeams),
        draftType: formData.draftType,
        scoringType: formData.scoringType,
        transferLimit: parseInt(formData.transferLimit),
        wildcardAvailable: formData.wildcardAvailable
      }
    })
    setShowCreateLeague(false)
  }

  const handleJoinLeague = (leagueId) => {
    joinLeague(leagueId)
    setShowJoinLeague(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading leagues...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Leagues</h1>
            <p className="text-sm text-gray-600">Manage your fantasy leagues</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowJoinLeague(true)}
              className="btn btn-secondary text-sm"
            >
              Join League
            </button>
            <button
              onClick={() => setShowCreateLeague(true)}
              className="btn btn-primary text-sm"
            >
              <Plus size={16} className="mr-1" />
              Create League
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* My Leagues */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">My Leagues</h2>
          
          {leagues.map((league) => (
            <div key={league.id} className="card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{league.name}</h3>
                  <p className="text-sm text-gray-600">
                    {league.teams.length}/{league.settings.maxTeams} teams
                  </p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    league.status === 'draft-pending' 
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {league.status === 'draft-pending' ? 'Draft Pending' : 'Active'}
                  </span>
                </div>
              </div>

              {/* League Info */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Draft Type</p>
                  <p className="font-medium">{league.settings.draftType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Scoring</p>
                  <p className="font-medium">{league.settings.scoringType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Transfer Limit</p>
                  <p className="font-medium">{league.settings.transferLimit}/week</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Draft Date</p>
                  <p className="font-medium">
                    {league.draftDate ? new Date(league.draftDate).toLocaleDateString() : 'TBD'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                {league.status === 'draft-pending' && (
                  <button className="btn btn-primary text-sm flex-1">
                    <Play size={16} className="mr-1" />
                    Enter Draft
                  </button>
                )}
                <button className="btn btn-secondary text-sm">
                  View Standings
                </button>
                <button className="btn btn-secondary text-sm">
                  League Settings
                </button>
              </div>
            </div>
          ))}

          {leagues.length === 0 && (
            <div className="text-center py-8">
              <Trophy className="text-gray-400 mx-auto mb-4" size={48} />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No leagues yet</h3>
              <p className="text-gray-600 mb-4">Create or join a league to get started</p>
              <div className="flex space-x-3 justify-center">
                <button
                  onClick={() => setShowCreateLeague(true)}
                  className="btn btn-primary"
                >
                  Create League
                </button>
                <button
                  onClick={() => setShowJoinLeague(true)}
                  className="btn btn-secondary"
                >
                  Join League
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Current Matchday */}
        {leagues.length > 0 && (
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Current Matchday</h3>
              <Calendar size={16} className="text-gray-500" />
            </div>
            
            <div className="space-y-3">
              {mockMatchups.map((matchup) => (
                <div key={matchup.id} className="p-3 bg-gray-50 rounded-lg">
                  <Matchup homeTeam={matchup.homeTeam} awayTeam={matchup.awayTeam} />
                  <div className="text-right mt-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      matchup.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {matchup.status === 'completed' ? 'Final' : 'Upcoming'}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(matchup.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* League Standings */}
        {leagues.length > 0 && (
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">League Standings</h3>
            <div className="space-y-2">
              {mockStandings.map((team, index) => (
                <div key={team.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 flex items-center justify-center">
                      {index === 0 && <Trophy className="text-yellow-500" size={16} />}
                      {index === 1 && <Trophy className="text-gray-400" size={16} />}
                      {index === 2 && <Trophy className="text-orange-500" size={16} />}
                      {index > 2 && <span className="text-sm font-medium text-gray-500">#{team.rank}</span>}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{team.name}</p>
                      <p className="text-xs text-gray-600">{team.owner}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{team.points} pts</p>
                    <p className="text-xs text-gray-500">
                      {team.wins}W {team.draws}D {team.losses}L
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Create League Modal */}
      {showCreateLeague && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New League</h3>
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              handleCreateLeague({
                name: formData.get('name'),
                maxTeams: formData.get('maxTeams'),
                draftType: formData.get('draftType'),
                scoringType: formData.get('scoringType'),
                transferLimit: formData.get('transferLimit'),
                wildcardAvailable: formData.get('wildcardAvailable') === 'on'
              })
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    League Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="input"
                    placeholder="Enter league name"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Max Teams
                    </label>
                    <select name="maxTeams" className="input" required>
                      <option value="8">8</option>
                      <option value="10">10</option>
                      <option value="12">12</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Draft Type
                    </label>
                    <select name="draftType" className="input" required>
                      <option value="snake">Snake</option>
                      <option value="linear">Linear</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Scoring Type
                    </label>
                    <select name="scoringType" className="input" required>
                      <option value="head-to-head">Head-to-Head</option>
                      <option value="total-points">Total Points</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Transfer Limit
                    </label>
                    <select name="transferLimit" className="input" required>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="wildcardAvailable"
                    id="wildcard"
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="wildcard" className="text-sm text-gray-700">
                    Allow wildcard transfers
                  </label>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowCreateLeague(false)}
                  className="btn btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary flex-1">
                  Create League
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Join League Modal */}
      {showJoinLeague && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Join League</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  League Code
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter league code"
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowJoinLeague(false)}
                  className="btn btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleJoinLeague('mock-league-id')}
                  className="btn btn-primary flex-1"
                >
                  Join League
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Leagues 