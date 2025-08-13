import React, { useState } from 'react'
import { 
  Trophy, 
  Users, 
  Bell, 
  ChevronRight,
  TrendingUp,
  AlertCircle,
  Activity,
  Newspaper,
  ExternalLink,
  Clock
} from 'lucide-react'

const Home = () => {
  // Mock data for demonstration
  const user = { username: 'John' }
  const userTeams = [1, 2, 3]
  
  const navigate = (path) => {
    console.log(`Navigating to ${path}`)
  }

  // Mock data
  const mockStreak = {
    current: 'W3',
    recent: ['W', 'W', 'W', 'L', 'W'],
    description: '3 wins in a row'
  }

  const mockPendingTrades = 2

  const mockLiveScores = [
    {
      id: '1',
      homeTeam: 'Arsenal',
      awayTeam: 'Manchester City',
      homeScore: 2,
      awayScore: 1,
      status: 'live',
      time: '67\'',
      competition: 'Premier League'
    },
    {
      id: '2',
      homeTeam: 'Liverpool',
      awayTeam: 'Chelsea',
      homeScore: 0,
      awayScore: 0,
      status: 'live',
      time: '23\'',
      competition: 'Premier League'
    },
    {
      id: '3',
      homeTeam: 'Manchester United',
      awayTeam: 'Tottenham',
      homeScore: 1,
      awayScore: 1,
      status: 'live',
      time: '89\'',
      competition: 'Premier League'
    }
  ]

  const mockNews = [
    {
      id: '1',
      title: 'Haaland continues his impressive form with hat-trick',
      summary: 'Erling Haaland scored three goals against Arsenal in a dominant 4-1 victory at the Etihad Stadium.',
      timestamp: '2 hours ago',
      category: 'Match Report',
      readTime: '3 min read'
    },
    {
      id: '2',
      title: 'Transfer window: Latest Premier League moves',
      summary: 'All the latest transfer news and confirmed deals from the Premier League.',
      timestamp: '5 hours ago',
      category: 'Transfer News',
      readTime: '5 min read'
    },
    {
      id: '3',
      title: 'Injury update: Key players return to training',
      summary: 'Several star players are back in training ahead of the weekend fixtures.',
      timestamp: '1 day ago',
      category: 'Injury News',
      readTime: '4 min read'
    }
  ]

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg bg-blue-600">
            <Trophy size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4 text-gray-900">
            Welcome to <span className="text-blue-600">Futty</span>
          </h1>
          <p className="mb-8 leading-relaxed text-gray-600">
            Your ultimate fantasy soccer experience with professional analytics and insights.
          </p>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Get Started
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Welcome Header */}
          <section className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2 leading-tight">
                  Welcome back, <span className='oklch(71.772% 0.133 239.443)'>{user.username}</span>
                </h1>
                <p className="text-gray-600 text-lg">Ready Gaffer?</p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl font-medium bg-yellow-50 text-yellow-800 border border-yellow-200">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <span>2 New Updates</span>
                </div>
                <button 
                  className="p-3 rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 relative"
                  aria-label="View notifications"
                >
                  <Bell size={20} />
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500"></div>
                </button>
              </div>
            </div>
          </section>

          {/* Quick Stats Grid */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Current Teams Card */}
              <div 
                className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-1 hover:border-blue-300 transition-all duration-300 ease-out"
                onClick={() => navigate('/leagues')}
              >
                <div className="p-6 pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                        <Users size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                          Current Teams
                        </h3>
                        <p className="text-sm text-gray-500 mt-0.5">
                          Active leagues
                        </p>
                      </div>
                    </div>
                    <button className="text-sm font-medium flex items-center gap-2 px-3 py-2 rounded-lg text-blue-600 hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-300">
                      <span>View all</span>
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-4xl font-bold text-gray-900 mb-2 leading-none">
                        {userTeams.length}
                      </div>
                      <div className="text-sm font-medium text-gray-600">
                        Teams competing
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Form Card */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                        <TrendingUp size={20} className="text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                          Team Form
                        </h3>
                        <p className="text-sm text-gray-500 mt-0.5">
                          Recent performance
                        </p>
                      </div>
                    </div>
                    <div className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-500 text-white">
                      HOT STREAK
                    </div>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-4xl font-bold text-gray-900 mb-2 leading-none">
                        {mockStreak.current}
                      </div>
                      <div className="text-sm font-medium text-gray-600">
                        {mockStreak.description}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex gap-1.5 mb-2">
                        {mockStreak.recent.map((result, index) => (
                          <div
                            key={index}
                            className={`w-2.5 h-2.5 rounded-full ${
                              result === 'W' ? 'bg-green-500' : 'bg-red-500'
                            }`}
                            title={`${result === 'W' ? 'Win' : 'Loss'}`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-400 font-medium">
                        Last 5 matches
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trades Pending Card */}
              <div 
                className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-1 hover:border-orange-300 transition-all duration-300 ease-out"
                onClick={() => navigate('/trades')}
              >
                <div className="p-6 pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                        <AlertCircle size={20} className="text-orange-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                          Trades Pending
                        </h3>
                        <p className="text-sm text-gray-500 mt-0.5">
                          Awaiting decisions
                        </p>
                      </div>
                    </div>
                    <button className="text-sm font-medium flex items-center gap-2 px-3 py-2 rounded-lg text-orange-600 hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-300">
                      <span>View all</span>
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-4xl font-bold text-gray-900 mb-2 leading-none">
                        {mockPendingTrades}
                      </div>
                      <div className="text-sm font-medium text-gray-600">
                        Active proposals
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Main Content Grid */}
          <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Live Scores */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                      <Activity size={20} className="text-red-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Live Scores</h2>
                      <p className="text-sm text-gray-500">Real-time updates</p>
                    </div>
                  </div>
                  <button 
                    className="text-sm font-medium flex items-center gap-2 px-3 py-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                    aria-label="View all live scores"
                  >
                    <span>View all</span>
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>
              
              <div className="divide-y divide-gray-100">
                {mockLiveScores.map((match) => (
                  <div 
                    key={match.id} 
                    className="p-6 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-6 flex-1">
                        <div className="text-right min-w-0 flex-1">
                          <span className="font-semibold text-gray-900 text-sm truncate block">
                            {match.homeTeam}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className="text-2xl font-bold text-gray-900">
                            {match.homeScore}
                          </span>
                          <span className="text-gray-400 font-medium">-</span>
                          <span className="text-2xl font-bold text-gray-900">
                            {match.awayScore}
                          </span>
                        </div>
                        <div className="text-left min-w-0 flex-1">
                          <span className="font-semibold text-gray-900 text-sm truncate block">
                            {match.awayTeam}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-500 text-white">
                          LIVE
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">
                        {match.competition}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                        <span className="text-sm font-semibold text-red-600">
                          {match.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* News Feed */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                      <Newspaper size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Latest News</h2>
                      <p className="text-sm text-gray-500">Stay updated</p>
                    </div>
                  </div>
                  <button 
                    className="text-sm font-medium flex items-center gap-2 px-3 py-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                    aria-label="View all news"
                  >
                    <span>View all</span>
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>
              
              <div className="divide-y divide-gray-100">
                {mockNews.map((news) => (
                  <article 
                    key={news.id} 
                    className="p-6 hover:bg-gray-50 transition-colors duration-200 cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold leading-snug flex-1 pr-4 text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                        {news.title}
                      </h3>
                      <ChevronRight 
                        size={16} 
                        className="mt-1 flex-shrink-0 text-gray-400 group-hover:text-blue-600 transition-colors duration-200"
                      />
                    </div>
                    
                    <p className="text-sm leading-relaxed mb-4 text-gray-600">
                      {news.summary}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 text-xs font-medium rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                          {news.category}
                        </span>
                        <span className="text-xs text-gray-500 font-medium">
                          {news.readTime}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 font-medium">
                        {news.timestamp}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Home