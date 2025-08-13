import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useLeagues } from '../contexts/LeagueContext'
import { ArrowLeft, Clock, Check, X, AlertCircle, TrendingUp, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'accepted': return 'text-green-600 bg-green-100'
      case 'rejected': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in to view trades</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Trades</h1>
            <p className="text-gray-600">
              {currentTeam ? `Managing ${currentTeam.name}` : 'Select a team'}
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-white rounded-lg p-1">
        {[
          { id: 'pending', label: 'Pending', count: mockTrades.pending.length },
          { id: 'completed', label: 'Completed', count: mockTrades.completed.length },
          { id: 'rejected', label: 'Rejected', count: mockTrades.rejected.length }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors duration-200 ${
              activeTab === tab.id
                ? 'bg-gray-100 shadow-sm'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count > 0 && (
              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Trade List */}
      <div className="space-y-4">
        {mockTrades[activeTab].length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              No {activeTab} trades
            </h3>
            <p className="text-gray-500">
              {activeTab === 'pending' 
                ? 'You have no pending trade proposals'
                : `No ${activeTab} trades to display`
              }
            </p>
          </div>
        ) : (
          mockTrades[activeTab].map((trade) => (
            <div
              key={trade.id}
              className="bg-white border-2 rounded-lg p-6 transition-all duration-200 hover:shadow-md"
              style={{ borderColor: 'var(--border)' }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${getStatusColor(trade.status)}`}>
                    {getStatusIcon(trade.status)}
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      {trade.type === 'proposed' ? 'Trade Proposed' : 'Trade Received'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {formatTimeAgo(trade.timestamp)}
                    </p>
                  </div>
                </div>
                {trade.status === 'pending' && trade.type === 'received' && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleTradeAction(trade.id, 'accept')}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleTradeAction(trade.id, 'reject')}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* From Team */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Users size={16} className="text-gray-500" />
                    <span className="font-medium">{trade.fromTeam}</span>
                  </div>
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                    <TrendingUp size={16} className="text-green-500" />
                    <span className="font-medium">{trade.fromPlayer}</span>
                  </div>
                </div>

                {/* To Team */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Users size={16} className="text-gray-500" />
                    <span className="font-medium">{trade.toTeam}</span>
                  </div>
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                    <TrendingUp size={16} className="text-green-500" />
                    <span className="font-medium">{trade.toPlayer}</span>
                  </div>
                </div>
              </div>

              {trade.status === 'pending' && trade.expires && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock size={14} />
                    <span>Expires {formatTimeAgo(trade.expires)}</span>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Trades 