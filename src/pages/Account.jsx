import { useState, useRef } from 'react'
import { User, Settings, Bell, Shield, LogOut, Edit, Trophy, TrendingUp, ChevronRight, Download, Key, Trash2, Check, X, Camera } from 'lucide-react'

const Account = () => {
  // Mock user data with proper structure
  const user = {
    username: 'johnsmith',
    email: 'john@example.com',
    createdAt: '2023-09-15',
    favoriteTeams: ['Arsenal', 'Manchester City', 'Liverpool']
  }

  const [showEditProfile, setShowEditProfile] = useState(false)
  const [profileImage, setProfileImage] = useState(null)
  const [profileImageUrl, setProfileImageUrl] = useState(null)
  const fileInputRef = useRef(null)
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
    console.log('Logout')
  }

  const handleUpdateProfile = (formData) => {
    console.log('Profile updated')
    setShowEditProfile(false)
  }

  const handleProfileImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setProfileImage(file)
      const imageUrl = URL.createObjectURL(file)
      setProfileImageUrl(imageUrl)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const toggleNotification = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const formatNotificationLabel = (key) => {
    return key.replace(/([A-Z])/g, ' $1').toLowerCase().replace(/^\w/, c => c.toUpperCase())
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-blue-100 flex items-center justify-center">
            <User size={32} className="text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Futty</h1>
          <p className="text-gray-600 mb-8">Please log in to access your account</p>
          <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
            Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
              <p className="text-gray-600">Manage your profile and preferences</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {/* Profile Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div 
                    className="w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={triggerFileInput}
                  >
                    {profileImageUrl ? (
                      <img 
                        src={profileImageUrl} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={32} className="text-blue-600" />
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                    <Camera size={12} className="text-white" />
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageUpload}
                    className="hidden"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">{user.username}</h2>
                  <p className="text-gray-600 mb-2">{user.email}</p>
                  <p className="text-sm text-gray-500">
                    Member since {new Date(user.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long' 
                    })}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowEditProfile(true)}
                className="p-3 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                title="Edit Profile"
              >
                <Edit size={20} />
              </button>
            </div>

            {/* Favorite Teams */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Favorite Teams</h3>
              <div className="flex flex-wrap gap-2">
                {user.favoriteTeams.map((team, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-200"
                  >
                    {team}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Your Statistics</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200">
                <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
                  <Trophy size={20} className="text-white" />
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{mockStats.totalPoints.toLocaleString()}</p>
                <p className="text-sm font-medium text-gray-600">Total Points</p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp size={20} className="text-white" />
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">#{mockStats.currentRank}</p>
                <p className="text-sm font-medium text-gray-600">Current Rank</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                  <User size={20} className="text-white" />
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{mockStats.leaguesJoined}</p>
                <p className="text-sm font-medium text-gray-600">Leagues Joined</p>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-200">
                <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center mb-4">
                  <Trophy size={20} className="text-white" />
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">#{mockStats.bestFinish}</p>
                <p className="text-sm font-medium text-gray-600">Best Finish</p>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Achievements</h3>
            <div className="space-y-3">
              {mockAchievements.map((achievement) => {
                const Icon = achievement.icon
                return (
                  <div
                    key={achievement.id}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                      achievement.unlocked
                        ? 'bg-green-50 border-green-200'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div 
                      className={`p-2.5 rounded-lg ${
                        achievement.unlocked
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-300 text-gray-500'
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-semibold ${achievement.unlocked ? 'text-gray-900' : 'text-gray-500'}`}>
                        {achievement.name}
                      </h4>
                      <p className={`text-sm ${achievement.unlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                        {achievement.description}
                      </p>
                      {achievement.unlocked && achievement.date && (
                        <p className="text-xs text-gray-500 mt-1">
                          Unlocked {new Date(achievement.date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    {achievement.unlocked && (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Check size={14} className="text-white" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Bell size={20} className="text-yellow-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
                <p className="text-sm text-gray-600">Manage your notification preferences</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between py-2">
                  <label className="text-sm font-medium text-gray-700 cursor-pointer">
                    {formatNotificationLabel(key)}
                  </label>
                  <button
                    onClick={() => toggleNotification(key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      value ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Account Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Account Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-100">
                    <Download size={16} className="text-gray-600 group-hover:text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-900">Export Data</span>
                </div>
                <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-600" />
              </button>
              
              <button className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-100">
                    <Key size={16} className="text-gray-600 group-hover:text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-900">Change Password</span>
                </div>
                <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-600" />
              </button>
              
              <button className="w-full flex items-center justify-between p-4 rounded-xl border border-red-200 hover:border-red-300 hover:bg-red-50 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200">
                    <Trash2 size={16} className="text-red-600" />
                  </div>
                  <span className="font-medium text-red-600">Delete Account</span>
                </div>
                <ChevronRight size={16} className="text-red-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Edit Profile</h3>
              <button
                onClick={() => setShowEditProfile(false)}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
            
            <div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    defaultValue={user.username}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Favorite Teams
                  </label>
                  <input
                    type="text"
                    defaultValue={user.favoriteTeams.join(', ')}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="Arsenal, Manchester City, Liverpool"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate multiple teams with commas</p>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setShowEditProfile(false)}
                  className="flex-1 px-6 py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleUpdateProfile({})}
                  className="flex-1 px-6 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Account