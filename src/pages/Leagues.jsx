import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLeagues } from '../contexts/LeagueContext'
import { useAuth } from '../contexts/AuthContext'
import { usePlayers } from '../contexts/PlayerContext'
import { 
  Trophy, Users, Calendar, TrendingUp, Plus, Play, AlertCircle, Clock, Check, X, 
  ArrowRight, Search, Filter, Star, Lock, Globe, Settings, Edit, Crown, 
  ChevronLeft, ChevronRight, Eye, UserPlus, Shield, Timer, Shuffle, Target
} from 'lucide-react'
import { getTeamLogo, getTeamDisplayName } from '../utils/teamLogos'

const Leagues = () => {
  const navigate = useNavigate()
  const { leagues, loading, createLeague, joinLeague } = useLeagues()
  const { user } = useAuth()
  const { players, loading: playersLoading, calculatePlayerPoints, filterPlayers } = usePlayers()
  
  // Main view states
  const [activeView, setActiveView] = useState('overview')
  const [selectedLeague, setSelectedLeague] = useState(null)
  const [activeTab, setActiveTab] = useState('matchup')
  
  // Modal states
  const [showCreateLeague, setShowCreateLeague] = useState(false)
  const [showJoinLeague, setShowJoinLeague] = useState(false)
  const [joinLeagueTab, setJoinLeagueTab] = useState('public') // 'public' or 'private'
  const [privateLeagueCode, setPrivateLeagueCode] = useState('')
  const [showSuccessNotification, setShowSuccessNotification] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [isErrorNotification, setIsErrorNotification] = useState(false)
  
  // Mock data for user's leagues (limited to 5)
  const mockUserLeagues = [
    {
      id: '1',
      name: 'Premier Elite',
      type: 'Premier League',
      size: 10,
      currentMembers: 8,
      status: 'active',
      isManager: true,
      isPublic: false,
      draftDate: '2024-08-15T19:00:00Z',
      description: 'Competitive league for experienced players',
      settings: {
        draftType: 'snake',
        scoringType: 'head-to-head',
        transferLimit: 2,
        pickTime: 60,
        wildcardAvailable: true
      },
      currentMatchup: {
        week: 3,
        homeTeam: { name: 'City Legends', owner: 'testuser', score: 78 },
        awayTeam: { name: 'United Elite', owner: 'rival_manager', score: 65 }
      }
    }
  ]

  // Mock data for public leagues
  const mockPublicLeagues = [
    {
      id: 'p1',
      name: 'Open Championship',
      type: 'Premier League',
      size: 12,
      currentMembers: 9,
      status: 'draft-pending',
      isPublic: true,
      draftDate: '2024-08-18T18:00:00Z',
      description: 'Open to all skill levels. Competitive but friendly environment.',
      managerName: 'ProManager',
      settings: {
        draftType: 'snake',
        scoringType: 'head-to-head',
        transferLimit: 2,
        pickTime: 60,
        wildcardAvailable: true
      }
    },
    {
      id: 'p2',
      name: 'Beginner Friendly',
      type: 'Premier League',
      size: 8,
      currentMembers: 5,
      status: 'draft-pending',
      isPublic: true,
      draftDate: '2024-08-22T19:30:00Z',
      description: 'Perfect for newcomers to fantasy football. Helpful community.',
      managerName: 'NewbieHelper',
      settings: {
        draftType: 'linear',
        scoringType: 'total-points',
        transferLimit: 3,
        pickTime: 120,
        wildcardAvailable: true
      }
    }
  ]

  const maxLeagues = 5
  const userLeagueCount = Array.isArray(leagues) ? leagues.length : 0



  const handleCreateLeague = async (formData) => {
    if ((leagues?.length ?? 0) >= maxLeagues) {
      alert(`You can only be in ${maxLeagues} leagues maximum`)
      return
    }
    
    const leagueName = formData.get('name')
    const isPublic = formData.get('privacy') === 'public'
    
    try {
      const created = await createLeague({
        name: leagueName,
        type: 'Premier League',
        size: parseInt(formData.get('size')),
        isPublic: isPublic,
        description: formData.get('description') || '',
        draftDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
        settings: {
          draftType: 'snake',
          scoringType: 'head-to-head',
          transferLimit: 2,
          pickTime: 60,
          wildcardAvailable: true
        }
      })
      
      setShowCreateLeague(false)
      setSuccessMessage(`Successfully created "${created?.name || leagueName}" ${isPublic ? 'public' : 'private'} league!`)
      setIsErrorNotification(false)
      setShowSuccessNotification(true)
      
      // Auto-hide notification after 3 seconds
      setTimeout(() => setShowSuccessNotification(false), 3000)
    } catch (error) {
      console.error('Failed to create league:', error)
      setSuccessMessage('Failed to create league. Please try again.')
      setIsErrorNotification(true)
      setShowSuccessNotification(true)
      setTimeout(() => setShowSuccessNotification(false), 3000)
    }
  }

  const handleJoinLeague = async (leagueId) => {
    if ((leagues?.length ?? 0) >= maxLeagues) {
      alert(`You can only be in ${maxLeagues} leagues maximum`)
      return
    }
    
    try {
      const joined = await joinLeague(leagueId)
      setShowJoinLeague(false)
      setPrivateLeagueCode('')
      
      // Get league name for success message
      const league = mockPublicLeagues.find(l => l.id === leagueId) || 
                    { name: leagueId.startsWith('private-') ? 'Private League' : 'Unknown League' }
      
      setSuccessMessage(`Successfully joined "${joined?.name || league.name}"!`)
      setIsErrorNotification(false)
      setShowSuccessNotification(true)
      
      // Auto-hide notification after 3 seconds
      setTimeout(() => setShowSuccessNotification(false), 3000)
    } catch (error) {
      console.error('Failed to join league:', error)
      setSuccessMessage('Failed to join league. Please try again.')
      setIsErrorNotification(true)
      setShowSuccessNotification(true)
      setTimeout(() => setShowSuccessNotification(false), 3000)
    }
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
            Loading Leagues
          </h2>
          <p 
            className="text-lg"
            style={{ color: 'oklch(21.778% 0 0)' }}
          >
            Getting your leagues ready...
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
        {/* Header */}
        <section 
          className="rounded-2xl p-8 border shadow-sm"
          style={{ 
            backgroundColor: 'oklch(100% 0 0)',
            borderColor: 'oklch(90% 0 0)',
            boxShadow: '0 1px 3px oklch(21.778% 0 0 / 0.1)'
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: 'oklch(71.772% 0.133 239.443 / 0.1)' }}
              >
                <Trophy size={20} style={{ color: 'oklch(71.772% 0.133 239.443)' }} />
              </div>
              <div>
                <h1 
                  className="text-3xl font-bold"
                  style={{ color: 'oklch(20% 0 0)' }}
                >
                  My Leagues
                </h1>
                <p 
                  style={{ color: 'oklch(21.778% 0 0)' }}
                >
                  {userLeagueCount}/{maxLeagues} leagues joined
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowJoinLeague(true)}
                disabled={userLeagueCount >= maxLeagues}
                className="px-6 py-3 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-4 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: userLeagueCount >= maxLeagues ? 'oklch(90% 0 0)' : 'oklch(95% 0 0)',
                  color: userLeagueCount >= maxLeagues ? 'oklch(21.778% 0 0 / 0.5)' : 'oklch(21.778% 0 0)',
                  border: '1px solid oklch(90% 0 0)'
                }}
                onMouseEnter={(e) => {
                  if (userLeagueCount < maxLeagues) {
                    e.target.style.backgroundColor = 'oklch(90% 0 0)'
                    e.target.style.borderColor = 'oklch(71.772% 0.133 239.443)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (userLeagueCount < maxLeagues) {
                    e.target.style.backgroundColor = 'oklch(95% 0 0)'
                    e.target.style.borderColor = 'oklch(90% 0 0)'
                  }
                }}
              >
                <UserPlus size={16} />
                {userLeagueCount >= maxLeagues ? 'League Limit Reached' : 'Join League'}
              </button>
              <button
                onClick={() => setShowCreateLeague(true)}
                disabled={userLeagueCount >= maxLeagues}
                className="px-6 py-3 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-4 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: userLeagueCount >= maxLeagues ? 'oklch(90% 0 0)' : 'oklch(71.772% 0.133 239.443)',
                  color: userLeagueCount >= maxLeagues ? 'oklch(21.778% 0 0 / 0.5)' : 'oklch(14.354% 0.026 239.443)',
                  boxShadow: userLeagueCount >= maxLeagues ? 'none' : '0 4px 6px -1px oklch(21.778% 0 0 / 0.1)'
                }}
              >
                <Plus size={16} />
                Create League
              </button>
            </div>
          </div>
        </section>

        {/* User's Leagues */}
        <section className="space-y-6">
          {userLeagueCount === 0 ? (
            <div 
              className="text-center py-16 rounded-2xl border shadow-sm"
              style={{ 
                backgroundColor: 'oklch(100% 0 0)',
                borderColor: 'oklch(90% 0 0)',
                boxShadow: '0 1px 3px oklch(21.778% 0 0 / 0.1)'
              }}
            >
              <div 
                className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: 'oklch(90% 0 0)' }}
              >
                <Trophy size={40} style={{ color: 'oklch(21.778% 0 0 / 0.5)' }} />
              </div>
              <h3 
                className="text-2xl font-bold mb-4"
                style={{ color: 'oklch(20% 0 0)' }}
              >
                No leagues yet
              </h3>
              <p 
                className="text-lg mb-8"
                style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}
              >
                Create your first league or join an existing one to get started
              </p>
              <div className="flex space-x-4 justify-center">
                <button
                  onClick={() => setShowCreateLeague(true)}
                  className="px-8 py-4 rounded-xl font-bold transition-all duration-200 flex items-center gap-2"
                  style={{
                    backgroundColor: 'oklch(71.772% 0.133 239.443)',
                    color: 'oklch(14.354% 0.026 239.443)',
                    boxShadow: '0 4px 6px -1px oklch(21.778% 0 0 / 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-1px)'
                    e.target.style.boxShadow = '0 8px 25px oklch(21.778% 0 0 / 0.15)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = '0 4px 6px -1px oklch(21.778% 0 0 / 0.1)'
                  }}
                >
                  <Plus size={20} />
                  Create League
                </button>
                <button
                  onClick={() => setShowJoinLeague(true)}
                  className="px-8 py-4 rounded-xl font-bold transition-all duration-200 flex items-center gap-2"
                  style={{
                    backgroundColor: 'oklch(95% 0 0)',
                    color: 'oklch(21.778% 0 0)',
                    border: '1px solid oklch(90% 0 0)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'oklch(90% 0 0)'
                    e.target.style.borderColor = 'oklch(71.772% 0.133 239.443)'
                    e.target.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'oklch(95% 0 0)'
                    e.target.style.borderColor = 'oklch(90% 0 0)'
                    e.target.style.transform = 'translateY(0)'
                  }}
                >
                  <UserPlus size={20} />
                  Join League
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {leagues.map((league) => (
                <div
                  key={league.id}
                  className="rounded-2xl p-8 border shadow-sm transition-all duration-200 cursor-pointer group"
                  style={{ 
                    backgroundColor: 'oklch(100% 0 0)',
                    borderColor: 'oklch(90% 0 0)',
                    boxShadow: '0 1px 3px oklch(21.778% 0 0 / 0.1)'
                  }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 
                          className="text-xl font-bold"
                          style={{ color: 'oklch(20% 0 0)' }}
                        >
                          {league.name}
                        </h3>
                        {league.isManager && (
                          <div 
                            className="px-2 py-1 rounded-lg flex items-center gap-1"
                            style={{ backgroundColor: 'oklch(71.236% 0.159 52.023 / 0.1)' }}
                          >
                            <Crown size={12} style={{ color: 'oklch(14.247% 0.031 52.023)' }} />
                            <span 
                              className="text-xs font-bold"
                              style={{ color: 'oklch(14.247% 0.031 52.023)' }}
                            >
                              Manager
                            </span>
                          </div>
                        )}
                      </div>
                      <p 
                        className="text-sm font-medium mb-1"
                        style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}
                      >
                        {league.type} • {league.currentMembers}/{league.size} members
                      </p>
                      <p 
                        className="text-sm"
                        style={{ color: 'oklch(21.778% 0 0 / 0.5)' }}
                      >
                        {league.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <span 
                        className="px-3 py-2 rounded-lg text-sm font-medium border"
                        style={{
                          backgroundColor: league.status === 'draft-pending' 
                            ? 'oklch(71.236% 0.159 52.023 / 0.1)'
                            : 'oklch(46.949% 0.162 321.406 / 0.1)',
                          color: league.status === 'draft-pending'
                            ? 'oklch(14.247% 0.031 52.023)'
                            : 'oklch(14.354% 0.026 239.443)',
                          borderColor: league.status === 'draft-pending'
                            ? 'oklch(71.236% 0.159 52.023 / 0.3)'
                            : 'oklch(46.949% 0.162 321.406 / 0.3)'
                        }}
                      >
                        {league.status === 'draft-pending' ? 'Draft Pending' : 'Active'}
                      </span>
                    </div>
                  </div>

                  {/* Draft Preview Button */}
                  {league.status === 'draft-pending' && (
                    <div className="mt-4">
                      <button
                        onClick={() => navigate(`/draft/${league.id}`)}
                        className="w-full px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2"
                        style={{
                          backgroundColor: 'oklch(71.772% 0.133 239.443 / 0.1)',
                          color: 'oklch(71.772% 0.133 239.443)',
                          border: '1px solid oklch(71.772% 0.133 239.443 / 0.3)'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = 'oklch(71.772% 0.133 239.443 / 0.2)'
                          e.target.style.transform = 'translateY(-1px)'
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'oklch(71.772% 0.133 239.443 / 0.1)'
                          e.target.style.transform = 'translateY(0)'
                        }}
                      >
                        <Target size={16} />
                        Enter Draft
                      </button>
                    </div>
                  )}

                  {league.currentMatchup && (
                    <div 
                      className="p-4 rounded-xl"
                      style={{ backgroundColor: 'oklch(95% 0 0)' }}
                    >
                      <p 
                        className="text-sm font-medium mb-2"
                        style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}
                      >
                        Week {league.currentMatchup.week} Matchup
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="text-center">
                          <p 
                            className="font-bold"
                            style={{ color: 'oklch(20% 0 0)' }}
                          >
                            {league.currentMatchup.homeTeam.name}
                          </p>
                          <p 
                            className="text-sm"
                            style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}
                          >
                            {league.currentMatchup.homeTeam.owner}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span 
                            className="text-2xl font-bold"
                            style={{ color: 'oklch(71.772% 0.133 239.443)' }}
                          >
                            {league.currentMatchup.homeTeam.score}
                          </span>
                          <span 
                            style={{ color: 'oklch(21.778% 0 0 / 0.5)' }}
                          >
                            vs
                          </span>
                          <span 
                            className="text-2xl font-bold"
                            style={{ color: 'oklch(64.476% 0.202 359.339)' }}
                          >
                            {league.currentMatchup.awayTeam.score}
                          </span>
                        </div>
                        <div className="text-center">
                          <p 
                            className="font-bold"
                            style={{ color: 'oklch(20% 0 0)' }}
                          >
                            {league.currentMatchup.awayTeam.name}
                          </p>
                          <p 
                            className="text-sm"
                            style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}
                          >
                            {league.currentMatchup.awayTeam.owner}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Create League Modal */}
      {showCreateLeague && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div 
            className="rounded-2xl p-8 w-full max-w-md shadow-2xl"
            style={{ 
              backgroundColor: 'oklch(100% 0 0)',
              border: '1px solid oklch(90% 0 0)'
            }}
          >
            <h3 
              className="text-xl font-bold mb-6"
              style={{ color: 'oklch(20% 0 0)' }}
            >
              Create New League
            </h3>
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              handleCreateLeague(formData)
            }}>
              <div className="space-y-4">
                <div>
                  <label 
                    className="block text-sm font-bold mb-2"
                    style={{ color: 'oklch(21.778% 0 0)' }}
                  >
                    League Name *
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all duration-200"
                    style={{
                      backgroundColor: 'oklch(100% 0 0)',
                      borderColor: 'oklch(90% 0 0)',
                      color: 'oklch(20% 0 0)'
                    }}
                    placeholder="Enter league name"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label 
                      className="block text-sm font-bold mb-2"
                      style={{ color: 'oklch(21.778% 0 0)' }}
                    >
                      League Size *
                    </label>
                    <select 
                      name="size" 
                      required
                      className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all duration-200"
                      style={{
                        backgroundColor: 'oklch(100% 0 0)',
                        borderColor: 'oklch(90% 0 0)',
                        color: 'oklch(20% 0 0)'
                      }}
                    >
                      <option value="6">6 Teams</option>
                      <option value="8">8 Teams</option>
                      <option value="10">10 Teams</option>
                      <option value="12">12 Teams</option>
                    </select>
                  </div>

                  <div>
                    <label 
                      className="block text-sm font-bold mb-2"
                      style={{ color: 'oklch(21.778% 0 0)' }}
                    >
                      Privacy Setting *
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="privacy"
                          value="public"
                          defaultChecked
                          className="mr-3"
                          style={{ accentColor: 'oklch(71.772% 0.133 239.443)' }}
                        />
                        <Globe size={16} className="mr-2" style={{ color: 'oklch(21.778% 0 0 / 0.7)' }} />
                        <span style={{ color: 'oklch(21.778% 0 0)' }}>Public (Anyone Can Join)</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="privacy"
                          value="private"
                          className="mr-3"
                          style={{ accentColor: 'oklch(71.772% 0.133 239.443)' }}
                        />
                        <Lock size={16} className="mr-2" style={{ color: 'oklch(21.778% 0 0 / 0.7)' }} />
                        <span style={{ color: 'oklch(21.778% 0 0)' }}>Private (Password Required)</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label 
                    className="block text-sm font-bold mb-2"
                    style={{ color: 'oklch(21.778% 0 0)' }}
                  >
                    League Description
                  </label>
                  <textarea
                    name="description"
                    rows="3"
                    className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all duration-200 resize-none"
                    style={{
                      backgroundColor: 'oklch(100% 0 0)',
                      borderColor: 'oklch(90% 0 0)',
                      color: 'oklch(20% 0 0)'
                    }}
                    placeholder="Describe your league and what type of players you're looking for..."
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-8">
                <button
                  type="button"
                  onClick={() => setShowCreateLeague(false)}
                  className="flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-200"
                  style={{
                    backgroundColor: 'oklch(95% 0 0)',
                    color: 'oklch(21.778% 0 0)',
                    border: '1px solid oklch(90% 0 0)'
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-200"
                  style={{
                    backgroundColor: 'oklch(71.772% 0.133 239.443)',
                    color: 'oklch(14.354% 0.026 239.443)',
                    boxShadow: '0 4px 6px -1px oklch(21.778% 0 0 / 0.1)'
                  }}
                >
                  Create League
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Join League Modal */}
      {showJoinLeague && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div 
            className="rounded-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
            style={{ 
              backgroundColor: 'oklch(100% 0 0)',
              border: '1px solid oklch(90% 0 0)'
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 
                className="text-2xl font-bold"
                style={{ color: 'oklch(20% 0 0)' }}
              >
                Join League
              </h3>
              <button
                onClick={() => setShowJoinLeague(false)}
                className="p-2 rounded-lg transition-all duration-200"
                style={{ backgroundColor: 'oklch(95% 0 0)' }}
              >
                <X size={20} style={{ color: 'oklch(21.778% 0 0)' }} />
              </button>
            </div>

            {/* Tab Navigation */}
            <div 
              className="flex space-x-1 rounded-2xl p-2 mb-6 shadow-sm"
              style={{ 
                backgroundColor: 'oklch(95% 0 0)',
                border: '1px solid oklch(90% 0 0)'
              }}
            >
              <button
                onClick={() => setJoinLeagueTab('public')}
                className="flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-200 font-medium"
                style={{
                  backgroundColor: joinLeagueTab === 'public' ? 'oklch(71.772% 0.133 239.443)' : 'transparent',
                  color: joinLeagueTab === 'public' ? 'oklch(14.354% 0.026 239.443)' : 'oklch(21.778% 0 0)',
                  boxShadow: joinLeagueTab === 'public' ? '0 4px 6px -1px oklch(21.778% 0 0 / 0.1)' : 'none'
                }}
              >
                <Globe size={16} />
                <span>Public Leagues</span>
              </button>
              <button
                onClick={() => setJoinLeagueTab('private')}
                className="flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-200 font-medium"
                style={{
                  backgroundColor: joinLeagueTab === 'private' ? 'oklch(71.772% 0.133 239.443)' : 'transparent',
                  color: joinLeagueTab === 'private' ? 'oklch(14.354% 0.026 239.443)' : 'oklch(21.778% 0 0)',
                  boxShadow: joinLeagueTab === 'private' ? '0 4px 6px -1px oklch(21.778% 0 0 / 0.1)' : 'none'
                }}
              >
                <Lock size={16} />
                <span>Private League</span>
              </button>
            </div>

            {/* Public Leagues Tab */}
            {joinLeagueTab === 'public' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {mockPublicLeagues.map((league) => (
                    <div
                      key={league.id}
                      className="rounded-2xl p-6 border shadow-sm transition-all duration-200"
                      style={{ 
                        backgroundColor: 'oklch(100% 0 0)',
                        borderColor: 'oklch(90% 0 0)',
                        boxShadow: '0 1px 3px oklch(21.778% 0 0 / 0.1)'
                      }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 
                              className="text-lg font-bold"
                              style={{ color: 'oklch(20% 0 0)' }}
                            >
                              {league.name}
                            </h4>
                            <Globe size={14} style={{ color: 'oklch(46.949% 0.162 321.406)' }} />
                          </div>
                          <p 
                            className="text-sm font-medium mb-1"
                            style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}
                          >
                            {league.type} • {league.currentMembers}/{league.size} members
                          </p>
                          <p 
                            className="text-sm font-medium mb-2"
                            style={{ color: 'oklch(71.772% 0.133 239.443)' }}
                          >
                            Manager: {league.managerName}
                          </p>
                          <p 
                            className="text-sm"
                            style={{ color: 'oklch(21.778% 0 0 / 0.5)' }}
                          >
                            {league.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <span 
                            className="px-3 py-2 rounded-lg text-sm font-medium border"
                            style={{
                              backgroundColor: 'oklch(71.236% 0.159 52.023 / 0.1)',
                              color: 'oklch(14.247% 0.031 52.023)',
                              borderColor: 'oklch(71.236% 0.159 52.023 / 0.3)'
                            }}
                          >
                            Draft Pending
                          </span>
                        </div>
                      </div>

                      {/* League Settings */}
                      <div 
                        className="p-4 rounded-xl mb-4"
                        style={{ backgroundColor: 'oklch(95% 0 0)' }}
                      >
                        <h5 
                          className="font-bold mb-2"
                          style={{ color: 'oklch(20% 0 0)' }}
                        >
                          League Settings
                        </h5>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}>Draft Type:</span>
                            <span className="ml-2 font-medium" style={{ color: 'oklch(20% 0 0)' }}>
                              {league.settings.draftType}
                            </span>
                          </div>
                          <div>
                            <span style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}>Scoring:</span>
                            <span className="ml-2 font-medium" style={{ color: 'oklch(20% 0 0)' }}>
                              {league.settings.scoringType}
                            </span>
                          </div>
                          <div>
                            <span style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}>Pick Time:</span>
                            <span className="ml-2 font-medium" style={{ color: 'oklch(20% 0 0)' }}>
                              {league.settings.pickTime}s
                            </span>
                          </div>
                          <div>
                            <span style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}>Transfers:</span>
                            <span className="ml-2 font-medium" style={{ color: 'oklch(20% 0 0)' }}>
                              {league.settings.transferLimit}/week
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Draft Info */}
                      <div 
                        className="p-4 rounded-xl border-l-4 mb-4"
                        style={{ 
                          backgroundColor: 'oklch(71.236% 0.159 52.023 / 0.05)',
                          borderColor: 'oklch(71.236% 0.159 52.023)'
                        }}
                      >
                        <p 
                          className="font-bold"
                          style={{ color: 'oklch(20% 0 0)' }}
                        >
                          Draft: {new Date(league.draftDate).toLocaleDateString()} at{' '}
                          {new Date(league.draftDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>

                      {/* Join Button */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Users size={14} style={{ color: 'oklch(21.778% 0 0 / 0.7)' }} />
                            <span 
                              className="text-sm"
                              style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}
                            >
                              {league.size - league.currentMembers} spots left
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleJoinLeague(league.id)}
                          disabled={(leagues?.length ?? 0) >= maxLeagues}
                          className="px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{
                            backgroundColor: (leagues?.length ?? 0) >= maxLeagues ? 'oklch(90% 0 0)' : 'oklch(46.949% 0.162 321.406)',
                            color: (leagues?.length ?? 0) >= maxLeagues ? 'oklch(21.778% 0 0 / 0.5)' : 'oklch(89.389% 0.032 321.406)',
                            boxShadow: (leagues?.length ?? 0) >= maxLeagues ? 'none' : '0 4px 6px -1px oklch(21.778% 0 0 / 0.1)'
                          }}
                        >
                          <UserPlus size={16} />
                          {(leagues?.length ?? 0) >= maxLeagues ? 'League Limit Reached' : 'Join League'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Private League Tab */}
            {joinLeagueTab === 'private' && (
              <div className="space-y-6">
                <div 
                  className="p-6 rounded-xl border"
                  style={{ 
                    backgroundColor: 'oklch(95% 0 0)',
                    borderColor: 'oklch(90% 0 0)'
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="p-3 rounded-xl"
                      style={{ backgroundColor: 'oklch(71.236% 0.159 52.023 / 0.1)' }}
                    >
                      <Lock size={20} style={{ color: 'oklch(71.236% 0.159 52.023)' }} />
                    </div>
                    <div>
                      <h4 
                        className="text-lg font-bold"
                        style={{ color: 'oklch(20% 0 0)' }}
                      >
                        Join Private League
                      </h4>
                      <p 
                        className="text-sm"
                        style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}
                      >
                        Enter the league code provided by the league manager
                      </p>
                    </div>
                  </div>

                  <form onSubmit={(e) => {
                    e.preventDefault()
                    if (privateLeagueCode.trim()) {
                      handleJoinLeague(`private-${privateLeagueCode}`)
                    }
                  }}>
                    <div className="space-y-4">
                      <div>
                        <label 
                          className="block text-sm font-bold mb-2"
                          style={{ color: 'oklch(21.778% 0 0)' }}
                        >
                          League Code *
                        </label>
                        <input
                          type="text"
                          value={privateLeagueCode}
                          onChange={(e) => setPrivateLeagueCode(e.target.value)}
                          required
                          className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all duration-200"
                          style={{
                            backgroundColor: 'oklch(100% 0 0)',
                            borderColor: 'oklch(90% 0 0)',
                            color: 'oklch(20% 0 0)'
                          }}
                          placeholder="Enter league code (e.g., ABC123)"
                        />
                      </div>
                      
                      <div className="flex space-x-3">
                        <button
                          type="button"
                          onClick={() => setShowJoinLeague(false)}
                          className="flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-200"
                          style={{
                            backgroundColor: 'oklch(95% 0 0)',
                            color: 'oklch(21.778% 0 0)',
                            border: '1px solid oklch(90% 0 0)'
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={!privateLeagueCode.trim() || (leagues?.length ?? 0) >= maxLeagues}
                          className="flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{
                            backgroundColor: (leagues?.length ?? 0) >= maxLeagues ? 'oklch(90% 0 0)' : 'oklch(46.949% 0.162 321.406)',
                            color: (leagues?.length ?? 0) >= maxLeagues ? 'oklch(21.778% 0 0 / 0.5)' : 'oklch(89.389% 0.032 321.406)',
                            boxShadow: (leagues?.length ?? 0) >= maxLeagues ? 'none' : '0 4px 6px -1px oklch(21.778% 0 0 / 0.1)'
                          }}
                        >
                          {(leagues?.length ?? 0) >= maxLeagues ? 'League Limit Reached' : 'Join League'}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Success/Error Notification */}
      {showSuccessNotification && (
        <div className="fixed top-4 right-4 z-50">
          <div 
            className="rounded-2xl p-6 shadow-2xl border-l-4 max-w-sm"
            style={{ 
              backgroundColor: 'oklch(100% 0 0)',
              borderColor: isErrorNotification ? 'oklch(62.013% 0.208 28.717)' : 'oklch(46.949% 0.162 321.406)',
              boxShadow: '0 8px 25px oklch(21.778% 0 0 / 0.15)'
            }}
          >
            <div className="flex items-start gap-3">
              <div 
                className="p-2 rounded-xl"
                style={{ 
                  backgroundColor: isErrorNotification 
                    ? 'oklch(62.013% 0.208 28.717 / 0.1)' 
                    : 'oklch(46.949% 0.162 321.406 / 0.1)' 
                }}
              >
                {isErrorNotification ? (
                  <AlertCircle size={20} style={{ color: 'oklch(62.013% 0.208 28.717)' }} />
                ) : (
                  <Check size={20} style={{ color: 'oklch(46.949% 0.162 321.406)' }} />
                )}
              </div>
              <div className="flex-1">
                <h4 
                  className="font-bold mb-1"
                  style={{ color: 'oklch(20% 0 0)' }}
                >
                  {isErrorNotification ? 'Error' : 'Success!'}
                </h4>
                <p 
                  className="text-sm"
                  style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}
                >
                  {successMessage}
                </p>
              </div>
              <button
                onClick={() => setShowSuccessNotification(false)}
                className="p-1 rounded-lg transition-all duration-200"
                style={{ backgroundColor: 'oklch(95% 0 0)' }}
              >
                <X size={16} style={{ color: 'oklch(21.778% 0 0 / 0.7)' }} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Leagues 