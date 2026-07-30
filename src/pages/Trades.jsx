import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useLeagues } from '../contexts/LeagueContext'
import { ArrowLeft, Clock, Check, X, AlertCircle, TrendingUp, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const STATUS_STYLES = {
  pending: { bg: 'bg-card-yellow/20', text: 'text-card-yellow-ink' },
  accepted: { bg: 'bg-pitch/10', text: 'text-pitch' },
  rejected: { bg: 'bg-card-red/10', text: 'text-card-red' },
}

const Trades = () => {
  const { user } = useAuth()
  const { currentTeam } = useLeagues()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('pending')

  // Mock trade data
  const mockTrades = {
    pending: [
      {
        id: '1',
        type: 'proposed',
        status: 'pending',
        fromTeam: 'Haaland\'s Heroes',
        toTeam: 'De Bruyne Dynasty',
        fromPlayer: 'Erling Haaland',
        toPlayer: 'Kevin De Bruyne',
        timestamp: '2024-02-08T10:30:00Z',
        expires: '2024-02-10T10:30:00Z'
      },
      {
        id: '2',
        type: 'received',
        status: 'pending',
        fromTeam: 'City Legends',
        toTeam: 'Haaland\'s Heroes',
        fromPlayer: 'Phil Foden',
        toPlayer: 'Julian Alvarez',
        timestamp: '2024-02-07T15:45:00Z',
        expires: '2024-02-09T15:45:00Z'
      }
    ],
    completed: [
      {
        id: '3',
        type: 'proposed',
        status: 'accepted',
        fromTeam: 'Haaland\'s Heroes',
        toTeam: 'Premier Stars',
        fromPlayer: 'Riyad Mahrez',
        toPlayer: 'Jack Grealish',
        timestamp: '2024-02-05T14:20:00Z',
        completedAt: '2024-02-06T09:15:00Z'
      }
    ],
    rejected: [
      {
        id: '4',
        type: 'received',
        status: 'rejected',
        fromTeam: 'United Elite',
        toTeam: 'Haaland\'s Heroes',
        fromPlayer: 'Marcus Rashford',
        toPlayer: 'Cole Palmer',
        timestamp: '2024-02-03T11:10:00Z',
        rejectedAt: '2024-02-04T16:30:00Z'
      }
    ]
  }

  const handleTradeAction = (tradeId, action) => {
    // In a real app, this would make an API call
    console.log(`${action} trade ${tradeId}`)
  }

  const formatTimeAgo = (timestamp) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInHours = Math.floor((now - time) / (1000 * 60 * 60))

    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock size={16} />
      case 'accepted': return <Check size={16} />
      case 'rejected': return <X size={16} />
      default: return <AlertCircle size={16} />
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-chalk">
        <div className="text-center">
          <h1 className="font-display text-4xl text-ink mb-4">Please log in to view trades</h1>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'pending', label: 'Pending', count: mockTrades.pending.length },
    { id: 'completed', label: 'Completed', count: mockTrades.completed.length },
    { id: 'rejected', label: 'Rejected', count: mockTrades.rejected.length }
  ]

  return (
    <div className="min-h-screen bg-chalk">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg bg-white border border-[--border] hover:bg-turf-a active:bg-turf-b transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/40 focus-visible:ring-offset-2 focus-visible:ring-offset-chalk"
          >
            <ArrowLeft size={20} className="text-ink-muted" />
          </button>
          <div>
            <h1 className="font-display text-4xl text-ink">Trades</h1>
            <p className="text-ink-muted">
              {currentTeam ? `Managing ${currentTeam.name}` : 'Select a team'}
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div role="tablist" className="flex gap-1 bg-white rounded-xl p-1 border border-[--border]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                activeTab === tab.id
                  ? 'bg-pitch text-chalk shadow-sm'
                  : 'text-ink-muted hover:bg-turf-a'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    activeTab === tab.id ? 'bg-white/20 text-chalk' : 'bg-turf-b text-ink-muted'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Trade List */}
        <div className="space-y-4">
          {mockTrades[activeTab].length === 0 ? (
            <div className="text-center py-16 rounded-2xl border border-[--border] bg-white shadow-sm">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 bg-turf-b">
                <AlertCircle size={28} className="text-ink-muted" />
              </div>
              <h3 className="text-xl font-bold text-ink mb-2">No {activeTab} trades</h3>
              <p className="text-ink-muted">
                {activeTab === 'pending'
                  ? 'You have no pending trade proposals'
                  : `No ${activeTab} trades to display`
                }
              </p>
            </div>
          ) : (
            mockTrades[activeTab].map((trade) => {
              const statusStyle = STATUS_STYLES[trade.status] || STATUS_STYLES.pending
              return (
                <div
                  key={trade.id}
                  className="bg-white border border-[--border] rounded-2xl p-6 shadow-sm transition-all duration-200 hover:shadow-lg hover:border-pitch/30"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${statusStyle.bg} ${statusStyle.text}`}>
                        {getStatusIcon(trade.status)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-ink">
                          {trade.type === 'proposed' ? 'Trade Proposed' : 'Trade Received'}
                        </h3>
                        <p className="text-sm text-ink-muted">{formatTimeAgo(trade.timestamp)}</p>
                      </div>
                    </div>
                    {trade.status === 'pending' && trade.type === 'received' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleTradeAction(trade.id, 'accept')}
                          className="px-4 py-2 bg-pitch text-chalk rounded-lg font-medium transition-colors hover:bg-pitch-light active:brightness-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleTradeAction(trade.id, 'reject')}
                          className="px-4 py-2 bg-card-red/10 text-card-red rounded-lg font-medium transition-colors hover:bg-card-red/20 active:bg-card-red/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-card-red/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* From Team */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-ink-muted" />
                        <span className="font-medium text-ink">{trade.fromTeam}</span>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-chalk rounded-lg">
                        <TrendingUp size={16} className="text-pitch" />
                        <span className="font-medium text-ink">{trade.fromPlayer}</span>
                      </div>
                    </div>

                    {/* To Team */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-ink-muted" />
                        <span className="font-medium text-ink">{trade.toTeam}</span>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-chalk rounded-lg">
                        <TrendingUp size={16} className="text-pitch" />
                        <span className="font-medium text-ink">{trade.toPlayer}</span>
                      </div>
                    </div>
                  </div>

                  {trade.status === 'pending' && trade.expires && (
                    <div className="mt-4 pt-4 border-t border-[--border]">
                      <div className="flex items-center gap-2 text-sm text-ink-muted">
                        <Clock size={14} />
                        <span>Expires {formatTimeAgo(trade.expires)}</span>
                      </div>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

export default Trades
