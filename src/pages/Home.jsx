import React, { useState, useEffect, useRef } from 'react'
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
  Clock,
  RefreshCw
} from 'lucide-react'

// Football Web Pages Embed Component
const FWPEmbed = ({ dataUrl, title, description, className = "" }) => {
  const embedRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Load the FWP script if not already loaded
    if (!window.fwpScriptLoaded) {
      const script = document.createElement('script')
      script.src = 'https://www.footballwebpages.co.uk/embed.js'
      script.defer = true
      script.onload = () => {
        window.fwpScriptLoaded = true
        // Wait a bit for the script to initialize
        setTimeout(() => {
          initializeEmbed()
        }, 500)
      }
      script.onerror = () => {
        setHasError(true)
        setIsLoading(false)
      }
      document.head.appendChild(script)
    } else {
      // If script is already loaded, initialize immediately
      setTimeout(() => {
        initializeEmbed()
      }, 100)
    }

    return () => {
      // Cleanup if needed
      if (embedRef.current) {
        embedRef.current.innerHTML = ''
      }
    }
  }, [dataUrl])

  const initializeEmbed = () => {
    if (embedRef.current) {
      // Create the embed div
      const embedDiv = document.createElement('div')
      embedDiv.className = 'fwp-embed'
      embedDiv.setAttribute('data-url', dataUrl)
      
      // Clear and append
      embedRef.current.innerHTML = ''
      embedRef.current.appendChild(embedDiv)
      
      // Trigger the FWP script to process the embed
      if (window.FWP && window.FWP.initEmbeds) {
        window.FWP.initEmbeds()
      } else {
        // Fallback: try to trigger manually
        const event = new Event('DOMContentLoaded')
        document.dispatchEvent(event)
      }
      
      // Set loading to false after a delay to allow iframe to load
      setTimeout(() => {
        setIsLoading(false)
      }, 3000)
    }
  }

  const handleRefresh = () => {
    setIsLoading(true)
    setHasError(false)
    initializeEmbed()
  }

  return (
    <div className={`bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden ${className}`}>
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
          <button 
            onClick={handleRefresh}
            className="text-sm font-medium flex items-center gap-2 px-3 py-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            aria-label="Refresh data"
          >
            <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
        </div>
      </div>
      
      <div className="relative min-h-[400px]">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mx-auto mb-3"></div>
              <p className="text-sm text-gray-600">Loading {title.toLowerCase()}...</p>
            </div>
          </div>
        )}
        
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={24} className="text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Unable to load data</h3>
              <p className="text-sm text-gray-600 mb-4">There was an error loading the {title.toLowerCase()}.</p>
              <button 
                onClick={handleRefresh}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
        
        <div 
          ref={embedRef}
          className={`${isLoading || hasError ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        />
      </div>
    </div>
  )
}

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

          {/* FWP Content Grid */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Latest News */}
            <FWPEmbed 
              dataUrl="news"
              title="Latest News"
              description="Stay updated with latest football news"
            />

            {/* Premier League Table */}
            <FWPEmbed 
              dataUrl="premier-league/league-table"
              title="Premier League Table"
              description="Current standings"
            />

            {/* Today's Fixtures */}
            <FWPEmbed 
              dataUrl="premier-league/fixtures-results"
              title="Today's Fixtures"
              description="All matches scheduled for today"
            />
          </section>
        </div>
      </div>
    </div>
  )
}

export default Home