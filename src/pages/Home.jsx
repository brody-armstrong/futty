import { useAuth } from '../contexts/AuthContext'
import { useLeagues } from '../contexts/LeagueContext'
import { usePlayers } from '../contexts/PlayerContext'
import { TrendingUp, Calendar, Trophy, Users, Bell } from 'lucide-react'

const Home = () => {
  const { user } = useAuth()
  const { userTeams, loading: leaguesLoading } = useLeagues()
  const { calculatePlayerPoints } = usePlayers()

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Futty</h1>
          <p className="text-gray-600 mb-6">Your ultimate fantasy soccer experience</p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    )
  }

  const mockNews = [
    {
      id: '1',
      title: 'Haaland scores hat-trick in Manchester City victory',
      summary: 'Erling Haaland continued his impressive form with three goals against Arsenal',
      timestamp: '2 hours ago',
      category: 'Match Report'
    },
    {
      id: '2',
      title: 'Transfer window: Latest Premier League moves',
      summary: 'All the latest transfer news and confirmed deals from the Premier League',
      timestamp: '5 hours ago',
      category: 'Transfer News'
    },
    {
      id: '3',
      title: 'Injury update: Key players return to training',
      summary: 'Several star players are back in training ahead of the weekend fixtures',
      timestamp: '1 day ago',
      category: 'Injury News'
    }
  ]

  const mockFixtures = [
    {
      id: '1',
      homeTeam: 'Arsenal',
      awayTeam: 'Manchester City',
      date: '2024-02-10T15:00:00Z',
      status: 'upcoming'
    },
    {
      id: '2',
      homeTeam: 'Liverpool',
      awayTeam: 'Chelsea',
      date: '2024-02-10T17:30:00Z',
      status: 'upcoming'
    }
  ]

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Welcome back, {user.username}!</h1>
            <p className="text-sm text-gray-600">Ready for another matchday?</p>
          </div>
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <Bell size={20} />
          </button>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="card">
            <div className="flex items-center">
              <Trophy className="text-primary-600 mr-3" size={24} />
              <div>
                <p className="text-sm text-gray-600">Active Leagues</p>
                <p className="text-2xl font-bold text-gray-900">{userTeams.length}</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center">
              <TrendingUp className="text-green-600 mr-3" size={24} />
              <div>
                <p className="text-sm text-gray-600">Total Points</p>
                <p className="text-2xl font-bold text-gray-900">
                  {userTeams.reduce((total, team) => total + team.totalPoints, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Fixtures */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Fixtures</h2>
            <Calendar size={16} className="text-gray-500" />
          </div>
          <div className="space-y-3">
            {mockFixtures.map((fixture) => (
              <div key={fixture.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-sm font-medium">{fixture.homeTeam}</div>
                  <div className="text-xs text-gray-500">vs</div>
                  <div className="text-sm font-medium">{fixture.awayTeam}</div>
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(fixture.date).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* News Feed */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Latest News</h2>
          <div className="space-y-4">
            {mockNews.map((news) => (
              <div key={news.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{news.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{news.summary}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                        {news.category}
                      </span>
                      <span className="text-xs text-gray-500">{news.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <button className="btn btn-primary text-sm">
              Set Lineup
            </button>
            <button className="btn btn-secondary text-sm">
              View Standings
            </button>
            <button className="btn btn-secondary text-sm">
              Check Waivers
            </button>
            <button className="btn btn-secondary text-sm">
              Make Transfers
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home 