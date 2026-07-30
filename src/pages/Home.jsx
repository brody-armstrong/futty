import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useLeagues } from '../contexts/LeagueContext'
import { RefreshCw, ArrowRight, Users, Trophy, Target, Star, LogIn, UserPlus } from 'lucide-react'

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
    <div className={`bg-white rounded-2xl border border-[--border] shadow-sm overflow-hidden ${className}`}>
      <div className="p-6 border-b border-[--border]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-ink">{title}</h2>
            <p className="text-sm text-ink-muted">{description}</p>
          </div>
          <button
            onClick={handleRefresh}
            className="p-2 rounded-lg transition-colors hover:bg-turf-a active:bg-turf-b focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            title="Refresh"
          >
            <RefreshCw size={16} className="text-ink-muted" />
          </button>
        </div>
      </div>
      <div className="relative min-h-[400px]">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pitch"></div>
          </div>
        )}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-ink-muted mb-2">Failed to load content</p>
              <button
                onClick={handleRefresh}
                className="px-4 py-2 bg-pitch text-chalk rounded-lg transition-colors hover:bg-pitch-light active:bg-pitch-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
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
        <div className="max-w-7xl mx-auto mb-10">
          <div className="text-center">
            <h1 className="font-display text-6xl mb-4 text-ink">
              Welcome to <span className="text-pitch">futty</span>
            </h1>
            <p className="text-xl mb-8 text-ink-muted">
              The ultimate fantasy soccer platform where strategy meets passion
            </p>
            <div className="flex justify-center space-x-4">
              <button className="btn btn-primary">
                <UserPlus size={20} className="mr-2" />
                Get Started Free
              </button>
              <button className="btn btn-secondary">
                <LogIn size={20} className="mr-2" />
                Sign In
              </button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto mb-10">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-xl bg-white border border-[--border]">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center bg-pitch">
                <Trophy size={28} className="text-floodlight" />
              </div>
              <h3 className="font-bold text-lg mb-1 text-ink">Create Leagues</h3>
              <p className="text-sm text-ink-muted">
                Start your own league or join existing ones with friends and family
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white border border-[--border]">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center bg-pitch">
                <Target size={28} className="text-floodlight" />
              </div>
              <h3 className="font-bold text-lg mb-1 text-ink">Live Drafts</h3>
              <p className="text-sm text-ink-muted">
                Experience the thrill of live snake drafts with real-time updates
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white border border-[--border]">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center bg-pitch">
                <Star size={28} className="text-floodlight" />
              </div>
              <h3 className="font-bold text-lg mb-1 text-ink">Real-time Stats</h3>
              <p className="text-sm text-ink-muted">
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
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-4xl mb-1 text-ink">
              Welcome back, {user?.username}!
            </h1>
            <p className="text-lg text-ink-muted">
              {hasLeagues
                ? `You're in ${userLeagueCount} league${userLeagueCount !== 1 ? 's' : ''}`
                : "Ready to start your fantasy soccer journey?"
              }
            </p>
          </div>

          {!hasLeagues && (
            <button className="btn btn-primary">
              <Users size={20} className="mr-2" />
              Join a League
              <ArrowRight size={16} className="ml-2" />
            </button>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      {!hasLeagues && (
        <div className="max-w-7xl mx-auto mb-10">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border border-[--border] bg-white">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 bg-pitch">
                  <Users size={22} className="text-floodlight" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-ink">Create a League</h3>
                  <p className="text-sm text-ink-muted">Start your own fantasy league</p>
                </div>
              </div>
              <button className="w-full py-2 px-4 rounded-lg border border-pitch text-pitch transition-all hover:bg-turf-a active:bg-turf-b focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/40 focus-visible:ring-offset-2 focus-visible:ring-offset-chalk">
                Create League
              </button>
            </div>

            <div className="p-6 rounded-xl border border-[--border] bg-white">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 bg-pitch">
                  <Trophy size={22} className="text-floodlight" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-ink">Join a League</h3>
                  <p className="text-sm text-ink-muted">Find and join existing leagues</p>
                </div>
              </div>
              <button className="w-full py-2 px-4 rounded-lg border border-pitch text-pitch transition-all hover:bg-turf-a active:bg-turf-b focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/40 focus-visible:ring-offset-2 focus-visible:ring-offset-chalk">
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
