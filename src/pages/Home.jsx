import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useLeagues } from '../contexts/LeagueContext'
import { RefreshCw, ArrowRight, Users, Trophy, Target, Star, Play, LogIn, UserPlus } from 'lucide-react'

// FWP Embed Component
const FWPEmbed = ({ dataUrl, title, description, className = "" }) => {
  const embedRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const loadEmbed = async () => {
      try {
        setIsLoading(true)
        setHasError(false)

        // Load the FWP script if not already loaded
        if (!window.fwpEmbedLoaded) {
          const script = document.createElement('script')
          script.src = 'https://www.footballwebpages.co.uk/embed.js'
          script.defer = true
          document.head.appendChild(script)
          
          await new Promise((resolve, reject) => {
            script.onload = resolve
            script.onerror = reject
          })
          
          window.fwpEmbedLoaded = true
        }

        // Wait a bit for the script to initialize
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Set up the embed div
        if (embedRef.current) {
          embedRef.current.setAttribute('data-url', dataUrl)
          
          // Trigger the embed initialization
          if (window.initEmbeds) {
            window.initEmbeds()
          } else {
            // Fallback: dispatch DOMContentLoaded event
            document.dispatchEvent(new Event('DOMContentLoaded'))
          }
        }

        // Wait for content to load
        setTimeout(() => {
          setIsLoading(false)
        }, 2000)

      } catch (error) {
        console.error('Error loading FWP embed:', error)
        setHasError(true)
        setIsLoading(false)
      }
    }

    loadEmbed()
  }, [dataUrl])

  const handleRefresh = () => {
    setIsLoading(true)
    setHasError(false)
    if (embedRef.current) {
      embedRef.current.innerHTML = ''
      embedRef.current.setAttribute('data-url', dataUrl)
      if (window.initEmbeds) {
        window.initEmbeds()
      }
    }
    setTimeout(() => setIsLoading(false), 2000)
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
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title="Refresh"
          >
            <RefreshCw size={16} className="text-gray-500" />
          </button>
        </div>
      </div>
      <div className="relative min-h-[400px]">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 mb-2">Failed to load content</p>
              <button 
                onClick={handleRefresh}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Retry
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
  const { user, isAuthenticated } = useAuth()
  const { leagues } = useLeagues()

  // Anonymous User - Marketing Content
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen p-8">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6" style={{ color: 'oklch(21.778% 0 0)' }}>
              Welcome to <span style={{ color: 'oklch(71.772% 0.133 239.443)' }}>Futty</span>
            </h1>
            <p className="text-xl mb-8" style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}>
              The ultimate fantasy soccer platform where strategy meets passion
            </p>
            <div className="flex justify-center space-x-4">
              <button className="flex items-center px-6 py-3 rounded-lg font-medium transition-all" style={{ backgroundColor: 'oklch(71.772% 0.133 239.443)', color: 'oklch(14.354% 0.026 239.443)' }}>
                <UserPlus size={20} className="mr-2" />
                Get Started Free
              </button>
              <button className="flex items-center px-6 py-3 rounded-lg border font-medium transition-all" style={{ borderColor: 'oklch(71.772% 0.133 239.443)', color: 'oklch(71.772% 0.133 239.443)' }}>
                <LogIn size={20} className="mr-2" />
                Sign In
              </button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl" style={{ backgroundColor: 'oklch(100% 0 0)' }}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'oklch(95% 0.02 140)' }}>
                <Trophy size={32} style={{ color: 'oklch(45% 0.15 140)' }} />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'oklch(21.778% 0 0)' }}>Create Leagues</h3>
              <p className="text-sm" style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}>
                Start your own league or join existing ones with friends and family
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl" style={{ backgroundColor: 'oklch(100% 0 0)' }}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'oklch(95% 0.02 25)' }}>
                <Target size={32} style={{ color: 'oklch(45% 0.15 25)' }} />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'oklch(21.778% 0 0)' }}>Live Drafts</h3>
              <p className="text-sm" style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}>
                Experience the thrill of live snake drafts with real-time updates
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl" style={{ backgroundColor: 'oklch(100% 0 0)' }}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'oklch(95% 0.02 60)' }}>
                <Star size={32} style={{ color: 'oklch(45% 0.15 60)' }} />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'oklch(21.778% 0 0)' }}>Real-time Stats</h3>
              <p className="text-sm" style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}>
                Track player performance with live statistics and updates
              </p>
            </div>
          </div>
        </div>

        {/* Live Content */}
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            <FWPEmbed 
              dataUrl="premier-league/league-table"
              title="Premier League Table"
              description="Current standings and points"
            />
            <FWPEmbed 
              dataUrl="premier-league/fixtures-results"
              title="Today's Fixtures"
              description="Live matches and results"
            />
            <FWPEmbed 
              dataUrl="news"
              title="Latest News"
              description="Breaking football news and updates"
            />
          </div>
        </div>
      </div>
    )
  }

  // Authenticated User - Personalized Content
  const userLeagueCount = Array.isArray(leagues) ? leagues.length : 0
  const hasLeagues = userLeagueCount > 0

  return (
    <div className="min-h-screen p-8">
      {/* Welcome Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: 'oklch(21.778% 0 0)' }}>
              Welcome back, {user?.username}! 👋
            </h1>
            <p className="text-lg" style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}>
              {hasLeagues 
                ? `You're in ${userLeagueCount} league${userLeagueCount !== 1 ? 's' : ''}`
                : "Ready to start your fantasy soccer journey?"
              }
            </p>
          </div>
          
          {!hasLeagues && (
            <button className="flex items-center px-6 py-3 rounded-lg font-medium transition-all" style={{ backgroundColor: 'oklch(71.772% 0.133 239.443)', color: 'oklch(14.354% 0.026 239.443)' }}>
              <Users size={20} className="mr-2" />
              Join a League
              <ArrowRight size={16} className="ml-2" />
            </button>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      {!hasLeagues && (
        <div className="max-w-7xl mx-auto mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border" style={{ backgroundColor: 'oklch(100% 0 0)', borderColor: 'oklch(90% 0 0)' }}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4" style={{ backgroundColor: 'oklch(95% 0.02 140)' }}>
                  <Users size={24} style={{ color: 'oklch(45% 0.15 140)' }} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold" style={{ color: 'oklch(21.778% 0 0)' }}>Create a League</h3>
                  <p className="text-sm" style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}>Start your own fantasy league</p>
                </div>
              </div>
              <button className="w-full py-2 px-4 rounded-lg border transition-all" style={{ borderColor: 'oklch(71.772% 0.133 239.443)', color: 'oklch(71.772% 0.133 239.443)' }}>
                Create League
              </button>
            </div>
            
            <div className="p-6 rounded-xl border" style={{ backgroundColor: 'oklch(100% 0 0)', borderColor: 'oklch(90% 0 0)' }}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4" style={{ backgroundColor: 'oklch(95% 0.02 25)' }}>
                  <Trophy size={24} style={{ color: 'oklch(45% 0.15 25)' }} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold" style={{ color: 'oklch(21.778% 0 0)' }}>Join a League</h3>
                  <p className="text-sm" style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}>Find and join existing leagues</p>
                </div>
              </div>
              <button className="w-full py-2 px-4 rounded-lg border transition-all" style={{ borderColor: 'oklch(71.772% 0.133 239.443)', color: 'oklch(71.772% 0.133 239.443)' }}>
                Browse Leagues
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Live Content */}
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-6">
          <FWPEmbed 
            dataUrl="premier-league/league-table"
            title="Premier League Table"
            description="Current standings and points"
          />
          <FWPEmbed 
            dataUrl="premier-league/fixtures-results"
            title="Today's Fixtures"
            description="Live matches and results"
          />
          <FWPEmbed 
            dataUrl="news"
            title="Latest News"
            description="Breaking football news and updates"
          />
        </div>
      </div>
    </div>
  )
}

export default Home