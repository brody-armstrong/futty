import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Dialog from '@radix-ui/react-dialog'
import { useLeagues } from '../contexts/LeagueContext'
import {
  Trophy, Users, Plus, AlertCircle, Check, X,
  Lock, Globe, Crown, UserPlus, Target
} from 'lucide-react'

const Leagues = () => {
  const navigate = useNavigate()
  const { leagues, loading, createLeague, joinLeague } = useLeagues()

  // Modal states
  const [showCreateLeague, setShowCreateLeague] = useState(false)
  const [showJoinLeague, setShowJoinLeague] = useState(false)
  const [joinLeagueTab, setJoinLeagueTab] = useState('public') // 'public' or 'private'
  const [privateLeagueCode, setPrivateLeagueCode] = useState('')
  const [showSuccessNotification, setShowSuccessNotification] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [isErrorNotification, setIsErrorNotification] = useState(false)

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
  const atLeagueLimit = userLeagueCount >= maxLeagues

  const handleCreateLeague = async (formData) => {
    if (atLeagueLimit) {
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
        draftDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
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
    if (atLeagueLimit) {
      alert(`You can only be in ${maxLeagues} leagues maximum`)
      return
    }

    try {
      const joined = await joinLeague(leagueId)
      setShowJoinLeague(false)
      setPrivateLeagueCode('')

      const league = mockPublicLeagues.find(l => l.id === leagueId) ||
                    { name: leagueId.startsWith('private-') ? 'Private League' : 'Unknown League' }

      setSuccessMessage(`Successfully joined "${joined?.name || league.name}"!`)
      setIsErrorNotification(false)
      setShowSuccessNotification(true)
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
      <div className="min-h-screen flex items-center justify-center bg-chalk">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 mx-auto mb-6 border-4 border-[--border] border-t-pitch"></div>
          <h2 className="font-display text-3xl mb-1 text-ink">Loading Leagues</h2>
          <p className="text-lg text-ink-muted">Getting your leagues ready...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-chalk">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Header */}
        <section className="rounded-2xl p-8 border border-[--border] bg-white shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-pitch">
                <Trophy size={20} className="text-floodlight" />
              </div>
              <div>
                <h1 className="font-display text-4xl text-ink">My Leagues</h1>
                <p className="text-ink-muted">{userLeagueCount}/{maxLeagues} leagues joined</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowJoinLeague(true)}
                disabled={atLeagueLimit}
                className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
              >
                <UserPlus size={16} className="mr-2" />
                {atLeagueLimit ? 'League Limit Reached' : 'Join League'}
              </button>
              <button
                onClick={() => setShowCreateLeague(true)}
                disabled={atLeagueLimit}
                className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
              >
                <Plus size={16} className="mr-2" />
                Create League
              </button>
            </div>
          </div>
        </section>

        {/* User's Leagues */}
        <section>
          {userLeagueCount === 0 ? (
            <div className="text-center py-16 rounded-2xl border border-[--border] bg-white shadow-sm">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-turf-b">
                <Trophy size={40} className="text-ink-muted" />
              </div>
              <h3 className="font-display text-4xl mb-4 text-ink">No leagues yet</h3>
              <p className="text-lg mb-8 text-ink-muted">
                Create your first league or join an existing one to get started
              </p>
              <div className="flex gap-4 justify-center">
                <button onClick={() => setShowCreateLeague(true)} className="btn btn-primary">
                  <Plus size={20} className="mr-2" />
                  Create League
                </button>
                <button onClick={() => setShowJoinLeague(true)} className="btn btn-secondary">
                  <UserPlus size={20} className="mr-2" />
                  Join League
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {leagues.map((league) => (
                <div
                  key={league.id}
                  className="rounded-2xl p-6 border border-[--border] bg-white shadow-sm transition-all duration-200 hover:shadow-xl hover:border-pitch/30"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-ink">{league.name}</h3>
                        {league.isManager && (
                          <div className="px-2 py-1 rounded-lg flex items-center gap-1 bg-card-yellow/20">
                            <Crown size={12} className="text-card-yellow-ink" />
                            <span className="text-xs font-bold text-card-yellow-ink">Manager</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm font-medium mb-1 text-ink-muted">
                        {league.type} • {league.currentMembers}/{league.size} members
                      </p>
                      <p className="text-sm text-ink-muted/70">{league.description}</p>
                    </div>
                    <span
                      className={`px-3 py-2 rounded-lg text-sm font-medium ${
                        league.status === 'draft-pending'
                          ? 'bg-card-yellow/20 text-card-yellow-ink'
                          : 'bg-pitch/10 text-pitch'
                      }`}
                    >
                      {league.status === 'draft-pending' ? 'Draft Pending' : 'Active'}
                    </span>
                  </div>

                  {/* Draft Preview Button */}
                  {league.status === 'draft-pending' && (
                    <div className="mt-4">
                      <button
                        onClick={() => navigate(`/draft/${league.id}`)}
                        className="w-full px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 bg-floodlight/10 text-floodlight-ink hover:bg-floodlight/20 active:bg-floodlight/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-floodlight/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                      >
                        <Target size={16} />
                        Enter Draft
                      </button>
                    </div>
                  )}

                  {league.currentMatchup && (
                    <div className="p-4 rounded-xl bg-chalk mt-4">
                      <p className="text-sm font-medium mb-3 text-ink-muted">
                        Week {league.currentMatchup.week} Matchup
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="text-center flex-1">
                          <p className="font-bold text-ink truncate">{league.currentMatchup.homeTeam.name}</p>
                          <p className="text-sm text-ink-muted">{league.currentMatchup.homeTeam.owner}</p>
                        </div>
                        <div className="flex items-center gap-3 px-4">
                          <div className="flex flex-col items-center rounded-md bg-ink px-3 py-1 border-t-2 border-floodlight">
                            <span className="font-display scoreboard-digits text-xl leading-none text-floodlight">
                              {league.currentMatchup.homeTeam.score}
                            </span>
                          </div>
                          <span className="text-xs text-ink-muted/70">vs</span>
                          <div className="flex flex-col items-center rounded-md bg-ink px-3 py-1 border-t-2 border-floodlight">
                            <span className="font-display scoreboard-digits text-xl leading-none text-floodlight">
                              {league.currentMatchup.awayTeam.score}
                            </span>
                          </div>
                        </div>
                        <div className="text-center flex-1">
                          <p className="font-bold text-ink truncate">{league.currentMatchup.awayTeam.name}</p>
                          <p className="text-sm text-ink-muted">{league.currentMatchup.awayTeam.owner}</p>
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
      <Dialog.Root open={showCreateLeague} onOpenChange={setShowCreateLeague}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/60" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-2xl overflow-hidden bg-white focus:outline-none">
            <div className="flex items-center justify-between p-6 border-b border-[--border] bg-pitch">
              <Dialog.Title className="text-2xl font-bold text-chalk">Create New League</Dialog.Title>
              <Dialog.Close asChild>
                <button className="p-2 rounded-lg hover:bg-white/10 active:bg-white/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-floodlight/50 focus-visible:ring-offset-2 focus-visible:ring-offset-pitch">
                  <X size={20} className="text-chalk" />
                </button>
              </Dialog.Close>
            </div>
            <form
              className="p-6"
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.target)
                handleCreateLeague(formData)
              }}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">League Name *</label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[--border] bg-white text-ink focus:outline-none focus:ring-2 focus:ring-pitch/20 focus:border-pitch transition-all"
                    placeholder="Enter league name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">League Size *</label>
                    <select
                      name="size"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[--border] bg-white text-ink focus:outline-none focus:ring-2 focus:ring-pitch/20 focus:border-pitch transition-all"
                    >
                      <option value="6">6 Teams</option>
                      <option value="8">8 Teams</option>
                      <option value="10">10 Teams</option>
                      <option value="12">12 Teams</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-ink mb-2">Privacy Setting *</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm text-ink">
                        <input type="radio" name="privacy" value="public" defaultChecked className="accent-pitch focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/40 focus-visible:ring-offset-1" />
                        <Globe size={16} className="text-ink-muted" />
                        Public (Anyone Can Join)
                      </label>
                      <label className="flex items-center gap-2 text-sm text-ink">
                        <input type="radio" name="privacy" value="private" className="accent-pitch focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/40 focus-visible:ring-offset-1" />
                        <Lock size={16} className="text-ink-muted" />
                        Private (Password Required)
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">League Description</label>
                  <textarea
                    name="description"
                    rows="3"
                    className="w-full px-4 py-3 rounded-xl border border-[--border] bg-white text-ink focus:outline-none focus:ring-2 focus:ring-pitch/20 focus:border-pitch transition-all resize-none"
                    placeholder="Describe your league and what type of players you're looking for..."
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <Dialog.Close asChild>
                  <button type="button" className="flex-1 btn btn-secondary">
                    Cancel
                  </button>
                </Dialog.Close>
                <button type="submit" className="flex-1 btn btn-primary">
                  Create League
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Join League Modal */}
      <Dialog.Root open={showJoinLeague} onOpenChange={setShowJoinLeague}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/60" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-4xl max-h-[90vh] -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-2xl overflow-hidden bg-white focus:outline-none flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-[--border] bg-pitch flex-shrink-0">
              <Dialog.Title className="text-2xl font-bold text-chalk">Join League</Dialog.Title>
              <Dialog.Close asChild>
                <button className="p-2 rounded-lg hover:bg-white/10 active:bg-white/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-floodlight/50 focus-visible:ring-offset-2 focus-visible:ring-offset-pitch">
                  <X size={20} className="text-chalk" />
                </button>
              </Dialog.Close>
            </div>

            <div className="p-6 overflow-y-auto">
              {/* Tab Navigation */}
              <div role="tablist" className="flex gap-1 rounded-xl p-1 mb-6 bg-chalk border border-[--border]">
                <button
                  role="tab"
                  aria-selected={joinLeagueTab === 'public'}
                  onClick={() => setJoinLeagueTab('public')}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/40 focus-visible:ring-offset-2 focus-visible:ring-offset-chalk ${
                    joinLeagueTab === 'public' ? 'bg-pitch text-chalk shadow-sm' : 'text-ink-muted hover:bg-turf-a'
                  }`}
                >
                  <Globe size={16} />
                  Public Leagues
                </button>
                <button
                  role="tab"
                  aria-selected={joinLeagueTab === 'private'}
                  onClick={() => setJoinLeagueTab('private')}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-all duration-200 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/40 focus-visible:ring-offset-2 focus-visible:ring-offset-chalk ${
                    joinLeagueTab === 'private' ? 'bg-pitch text-chalk shadow-sm' : 'text-ink-muted hover:bg-turf-a'
                  }`}
                >
                  <Lock size={16} />
                  Private League
                </button>
              </div>

              {/* Public Leagues Tab */}
              {joinLeagueTab === 'public' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {mockPublicLeagues.map((league) => (
                    <div key={league.id} className="rounded-2xl p-6 border border-[--border] bg-white shadow-sm">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="text-lg font-bold text-ink">{league.name}</h4>
                            <Globe size={14} className="text-ink-muted" />
                          </div>
                          <p className="text-sm font-medium mb-1 text-ink-muted">
                            {league.type} • {league.currentMembers}/{league.size} members
                          </p>
                          <p className="text-sm font-medium mb-2 text-pitch">Manager: {league.managerName}</p>
                          <p className="text-sm text-ink-muted/70">{league.description}</p>
                        </div>
                        <span className="px-3 py-2 rounded-lg text-sm font-medium bg-card-yellow/20 text-card-yellow-ink">
                          Draft Pending
                        </span>
                      </div>

                      {/* League Settings */}
                      <div className="p-4 rounded-xl bg-chalk mb-4">
                        <h5 className="font-bold mb-2 text-ink">League Settings</h5>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-ink-muted">Draft Type: </span>
                            <span className="font-medium text-ink">{league.settings.draftType}</span>
                          </div>
                          <div>
                            <span className="text-ink-muted">Scoring: </span>
                            <span className="font-medium text-ink">{league.settings.scoringType}</span>
                          </div>
                          <div>
                            <span className="text-ink-muted">Pick Time: </span>
                            <span className="font-medium text-ink">{league.settings.pickTime}s</span>
                          </div>
                          <div>
                            <span className="text-ink-muted">Transfers: </span>
                            <span className="font-medium text-ink">{league.settings.transferLimit}/week</span>
                          </div>
                        </div>
                      </div>

                      {/* Draft Info */}
                      <div className="p-4 rounded-xl border-l-4 border-card-yellow-ink bg-card-yellow/10 mb-4">
                        <p className="font-bold text-ink">
                          Draft: {new Date(league.draftDate).toLocaleDateString()} at{' '}
                          {new Date(league.draftDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>

                      {/* Join Button */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Users size={14} className="text-ink-muted" />
                          <span className="text-sm text-ink-muted">{league.size - league.currentMembers} spots left</span>
                        </div>
                        <button
                          onClick={() => handleJoinLeague(league.id)}
                          disabled={atLeagueLimit}
                          className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
                        >
                          <UserPlus size={16} className="mr-2" />
                          {atLeagueLimit ? 'League Limit Reached' : 'Join League'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Private League Tab */}
              {joinLeagueTab === 'private' && (
                <div className="p-6 rounded-xl border border-[--border] bg-chalk">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-card-yellow/20">
                      <Lock size={20} className="text-card-yellow-ink" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-ink">Join Private League</h4>
                      <p className="text-sm text-ink-muted">Enter the league code provided by the league manager</p>
                    </div>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      if (privateLeagueCode.trim()) {
                        handleJoinLeague(`private-${privateLeagueCode}`)
                      }
                    }}
                  >
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-ink mb-2">League Code *</label>
                        <input
                          type="text"
                          value={privateLeagueCode}
                          onChange={(e) => setPrivateLeagueCode(e.target.value)}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-[--border] bg-white text-ink focus:outline-none focus:ring-2 focus:ring-pitch/20 focus:border-pitch transition-all"
                          placeholder="Enter league code (e.g., ABC123)"
                        />
                      </div>

                      <div className="flex gap-3">
                        <Dialog.Close asChild>
                          <button type="button" className="flex-1 btn btn-secondary">
                            Cancel
                          </button>
                        </Dialog.Close>
                        <button
                          type="submit"
                          disabled={!privateLeagueCode.trim() || atLeagueLimit}
                          className="flex-1 btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
                        >
                          {atLeagueLimit ? 'League Limit Reached' : 'Join League'}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Success/Error Notification */}
      {showSuccessNotification && (
        <div className="fixed top-4 right-4 z-50">
          <div
            className={`rounded-2xl p-6 shadow-2xl border-l-4 max-w-sm bg-white ${
              isErrorNotification ? 'border-card-red' : 'border-pitch'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-xl ${isErrorNotification ? 'bg-card-red/10' : 'bg-pitch/10'}`}>
                {isErrorNotification ? (
                  <AlertCircle size={20} className="text-card-red" />
                ) : (
                  <Check size={20} className="text-pitch" />
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-bold mb-1 text-ink">{isErrorNotification ? 'Error' : 'Success!'}</h4>
                <p className="text-sm text-ink-muted">{successMessage}</p>
              </div>
              <button
                onClick={() => setShowSuccessNotification(false)}
                className="p-1 rounded-lg bg-chalk hover:bg-turf-a active:bg-turf-b transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/40 focus-visible:ring-offset-1"
              >
                <X size={16} className="text-ink-muted" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Leagues
