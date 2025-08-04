import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { User, Settings, Bell, Shield, LogOut, Edit, Trophy, TrendingUp } from 'lucide-react'

const Account = () => {
  const { user, logout, updateProfile } = useAuth()
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [notifications, setNotifications] = useState({
    matchAlerts: true,
    transferDeadlines: true,
    draftReminders: true,
    newsUpdates: false
  })

  const mockStats = {
    totalPoints: 1247,
    leaguesJoined: 3,
    bestFinish: 2,
    currentRank: 1,
    transfersUsed: 12,
    wildcardsUsed: 1
  }

  const mockAchievements = [
    {
      id: '1',
      name: 'First Victory',
      description: 'Win your first match',
      icon: Trophy,
      unlocked: true,
      date: '2024-01-15'
    },
    {
      id: '2',
      name: 'Top Scorer',
      description: 'Score 100+ points in a matchweek',
      icon: TrendingUp,
      unlocked: true,
      date: '2024-01-22'
    },
    {
      id: '3',
      name: 'Draft Master',
      description: 'Complete a draft in under 30 minutes',
      icon: Trophy,
      unlocked: false
    }
  ]

  const handleLogout = () => {
    logout()
  }

  const handleUpdateProfile = (formData) => {
    updateProfile({
      username: formData.get('username'),
      favoriteTeams: formData.get('favoriteTeams').split(',').map(team => team.trim())
    })
    setShowEditProfile(false)
  }

  const toggleNotification = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Futty</h1>
          <p className="text-gray-600 mb-6">Please log in to access your account</p>
          <button className="btn btn-primary">Login</button>
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
            <h1 className="text-xl font-bold text-gray-900">Account</h1>
            <p className="text-sm text-gray-600">Manage your profile and settings</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-gray-500 hover:text-red-600 transition-colors"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Profile Section */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="text-primary-600" size={24} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{user.username}</h2>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-xs text-gray-500">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <button
              onClick={() => setShowEditProfile(true)}
              className="p-2 text-gray-500 hover:text-primary-600 transition-colors"
            >
              <Edit size={20} />
            </button>
          </div>

          {/* Favorite Teams */}
          <div className="pt-4 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Favorite Teams</h3>
            <div className="flex flex-wrap gap-2">
              {user.favoriteTeams.map((team, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                >
                  {team}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Trophy className="text-green-600 mx-auto mb-2" size={24} />
              <p className="text-2xl font-bold text-gray-900">{mockStats.totalPoints}</p>
              <p className="text-sm text-gray-600">Total Points</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <TrendingUp className="text-blue-600 mx-auto mb-2" size={24} />
              <p className="text-2xl font-bold text-gray-900">{mockStats.currentRank}</p>
              <p className="text-sm text-gray-600">Current Rank</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <User className="text-purple-600 mx-auto mb-2" size={24} />
              <p className="text-2xl font-bold text-gray-900">{mockStats.leaguesJoined}</p>
              <p className="text-sm text-gray-600">Leagues Joined</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Trophy className="text-orange-600 mx-auto mb-2" size={24} />
              <p className="text-2xl font-bold text-gray-900">{mockStats.bestFinish}</p>
              <p className="text-sm text-gray-600">Best Finish</p>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
          <div className="space-y-3">
            {mockAchievements.map((achievement) => {
              const Icon = achievement.icon
              return (
                <div
                  key={achievement.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                    achievement.unlocked
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className={`p-2 rounded-full ${
                    achievement.unlocked
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    <Icon size={16} />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium ${
                      achievement.unlocked ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {achievement.name}
                    </h4>
                    <p className={`text-sm ${
                      achievement.unlocked ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {achievement.description}
                    </p>
                    {achievement.unlocked && achievement.date && (
                      <p className="text-xs text-gray-500 mt-1">
                        Unlocked {new Date(achievement.date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  {achievement.unlocked && (
                    <span className="text-green-600 text-sm font-medium">✓</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Settings */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings</h3>
          
          {/* Notifications */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="text-gray-500" size={20} />
                <div>
                  <h4 className="font-medium text-gray-900">Notifications</h4>
                  <p className="text-sm text-gray-600">Manage your notification preferences</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 pl-8">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <label className="text-sm text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </label>
                  <button
                    onClick={() => toggleNotification(key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy */}
          <div className="pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="text-gray-500" size={20} />
                <div>
                  <h4 className="font-medium text-gray-900">Privacy</h4>
                  <p className="text-sm text-gray-600">Manage your privacy settings</p>
                </div>
              </div>
              <button className="btn btn-secondary text-sm">
                Manage
              </button>
            </div>
          </div>

          {/* App Preferences */}
          <div className="pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Settings className="text-gray-500" size={20} />
                <div>
                  <h4 className="font-medium text-gray-900">App Preferences</h4>
                  <p className="text-sm text-gray-600">Customize your app experience</p>
                </div>
              </div>
              <button className="btn btn-secondary text-sm">
                Configure
              </button>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Export Data</span>
                <span className="text-gray-400">→</span>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Change Password</span>
                <span className="text-gray-400">→</span>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-red-200 hover:border-red-300 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-red-700">Delete Account</span>
                <span className="text-red-400">→</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Profile</h3>
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              handleUpdateProfile(formData)
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    name="username"
                    type="text"
                    defaultValue={user.username}
                    required
                    className="input"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Favorite Teams (comma-separated)
                  </label>
                  <input
                    name="favoriteTeams"
                    type="text"
                    defaultValue={user.favoriteTeams.join(', ')}
                    className="input"
                    placeholder="Arsenal, Manchester City"
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowEditProfile(false)}
                  className="btn btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary flex-1">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Account 