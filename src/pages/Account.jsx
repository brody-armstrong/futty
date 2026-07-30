import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { User, Bell, LogOut, Edit, Trophy, TrendingUp, ChevronRight, Download, Key, Trash2, Check, X, Camera } from 'lucide-react'

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
      <div className="min-h-screen flex items-center justify-center bg-chalk">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-pitch flex items-center justify-center">
            <User size={32} className="text-floodlight" />
          </div>
          <h1 className="font-display text-4xl text-ink mb-4">Welcome to futty</h1>
          <p className="text-ink-muted mb-8">Please log in to access your account</p>
          <button className="px-8 py-4 bg-floodlight text-ink font-semibold rounded-xl hover:brightness-95 transition-colors">
            Login
          </button>
        </div>
      </div>
    )
  }

  const statBlocks = [
    { label: 'Total Points', value: mockStats.totalPoints.toLocaleString(), icon: Trophy, bg: 'bg-pitch', text: 'text-floodlight' },
    { label: 'Current Rank', value: `#${mockStats.currentRank}`, icon: TrendingUp, bg: 'bg-ink', text: 'text-floodlight' },
    { label: 'Leagues Joined', value: mockStats.leaguesJoined, icon: User, bg: 'bg-card-yellow', text: 'text-ink' },
    { label: 'Best Finish', value: `#${mockStats.bestFinish}`, icon: Trophy, bg: 'bg-card-red', text: 'text-chalk' },
  ]

  return (
    <div className="min-h-screen bg-chalk">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-[--border] p-8 mb-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-4xl text-ink">Account Settings</h1>
              <p className="text-ink-muted">Manage your profile and preferences</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-3 rounded-xl bg-card-red/10 text-card-red hover:bg-card-red/20 active:bg-card-red/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-card-red/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        <div className="space-y-10">
          {/* Profile Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-[--border] p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-6">
                <label htmlFor="profile-image-input" className="relative block cursor-pointer group">
                  <div className="w-20 h-20 rounded-2xl bg-pitch flex items-center justify-center overflow-hidden transition-opacity group-hover:opacity-90 group-focus-within:ring-2 group-focus-within:ring-floodlight/50 group-focus-within:ring-offset-2 group-focus-within:ring-offset-white">
                    {profileImageUrl ? (
                      <img src={profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User size={32} className="text-floodlight" />
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-floodlight rounded-full flex items-center justify-center transition-colors group-hover:brightness-95">
                    <Camera size={12} className="text-ink" />
                  </div>
                  <input
                    id="profile-image-input"
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageUpload}
                    className="sr-only"
                  />
                </label>
                <div>
                  <h2 className="text-xl font-bold text-ink mb-1">{user.username}</h2>
                  <p className="text-ink-muted mb-2">{user.email}</p>
                  <p className="text-sm text-ink-muted/80">
                    Member since {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long'
                    })}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowEditProfile(true)}
                className="p-3 rounded-xl bg-chalk text-ink-muted hover:bg-turf-b active:bg-turf-b/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                title="Edit Profile"
              >
                <Edit size={20} />
              </button>
            </div>

            {/* Favorite Teams */}
            <div className="pt-6 border-t border-[--border]">
              <h3 className="text-sm font-semibold text-ink mb-3">Favorite Teams</h3>
              <div className="flex flex-wrap gap-2">
                {user.favoriteTeams.map((team, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-pitch/10 text-pitch rounded-lg text-sm font-medium border border-pitch/20"
                  >
                    {team}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-white rounded-2xl shadow-sm border border-[--border] p-6">
            <h3 className="text-lg font-bold text-ink mb-6">Your Statistics</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {statBlocks.map((stat) => (
                <div key={stat.label} className={`${stat.bg} p-5 rounded-2xl border-t-2 border-floodlight`}>
                  <div className="flex items-center gap-2 mb-3">
                    <stat.icon size={18} className={stat.text} />
                  </div>
                  <p className={`font-display scoreboard-digits text-3xl leading-none mb-1 ${stat.text}`}>{stat.value}</p>
                  <p className={`text-xs font-medium ${stat.text} opacity-80`}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-2xl shadow-sm border border-[--border] p-6">
            <h3 className="text-lg font-bold text-ink mb-6">Achievements</h3>
            <div className="space-y-3">
              {mockAchievements.map((achievement) => {
                const Icon = achievement.icon
                return (
                  <div
                    key={achievement.id}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                      achievement.unlocked
                        ? 'bg-turf-a border-pitch/20'
                        : 'bg-chalk border-[--border]'
                    }`}
                  >
                    <div
                      className={`p-2.5 rounded-lg ${
                        achievement.unlocked
                          ? 'bg-pitch text-floodlight'
                          : 'bg-turf-b text-ink-muted'
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-semibold ${achievement.unlocked ? 'text-ink' : 'text-ink-muted'}`}>
                        {achievement.name}
                      </h4>
                      <p className={`text-sm ${achievement.unlocked ? 'text-ink-muted' : 'text-ink-muted/60'}`}>
                        {achievement.description}
                      </p>
                      {achievement.unlocked && achievement.date && (
                        <p className="text-xs text-ink-muted/70 mt-1">
                          Unlocked {new Date(achievement.date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    {achievement.unlocked && (
                      <div className="w-6 h-6 bg-pitch rounded-full flex items-center justify-center">
                        <Check size={14} className="text-floodlight" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-2xl shadow-sm border border-[--border] p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-card-yellow/20 rounded-xl flex items-center justify-center">
                <Bell size={20} className="text-card-yellow-ink" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-ink">Notifications</h3>
                <p className="text-sm text-ink-muted">Manage your notification preferences</p>
              </div>
            </div>

            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between py-2">
                  <label className="text-sm font-medium text-ink cursor-pointer">
                    {formatNotificationLabel(key)}
                  </label>
                  <button
                    onClick={() => toggleNotification(key)}
                    role="switch"
                    aria-checked={value}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                      value ? 'bg-floodlight hover:brightness-95' : 'bg-turf-b hover:bg-turf-b/70'
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
          <div className="bg-white rounded-2xl shadow-sm border border-[--border] p-6">
            <h3 className="text-lg font-bold text-ink mb-6">Account Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 rounded-xl border border-[--border] hover:border-pitch/40 hover:bg-turf-a active:bg-turf-b transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-chalk rounded-lg flex items-center justify-center group-hover:bg-pitch/10">
                    <Download size={16} className="text-ink-muted group-hover:text-pitch" />
                  </div>
                  <span className="font-medium text-ink">Export Data</span>
                </div>
                <ChevronRight size={16} className="text-ink-muted/60 group-hover:text-pitch" />
              </button>

              <button className="w-full flex items-center justify-between p-4 rounded-xl border border-[--border] hover:border-pitch/40 hover:bg-turf-a active:bg-turf-b transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-chalk rounded-lg flex items-center justify-center group-hover:bg-pitch/10">
                    <Key size={16} className="text-ink-muted group-hover:text-pitch" />
                  </div>
                  <span className="font-medium text-ink">Change Password</span>
                </div>
                <ChevronRight size={16} className="text-ink-muted/60 group-hover:text-pitch" />
              </button>

              <button className="w-full flex items-center justify-between p-4 rounded-xl border border-card-red/20 hover:border-card-red/40 hover:bg-card-red/5 active:bg-card-red/10 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-card-red/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-card-red/10 rounded-lg flex items-center justify-center group-hover:bg-card-red/20">
                    <Trash2 size={16} className="text-card-red" />
                  </div>
                  <span className="font-medium text-card-red">Delete Account</span>
                </div>
                <ChevronRight size={16} className="text-card-red/60" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Dialog.Root open={showEditProfile} onOpenChange={setShowEditProfile}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/50" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 shadow-2xl focus:outline-none">
            <div className="flex items-center justify-between mb-6">
              <Dialog.Title className="text-xl font-bold text-ink">Edit Profile</Dialog.Title>
              <Dialog.Close asChild>
                <button
                  className="p-2 rounded-lg text-ink-muted hover:text-ink hover:bg-chalk active:bg-turf-b transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  <X size={20} />
                </button>
              </Dialog.Close>
            </div>

            <div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">Username</label>
                  <input
                    type="text"
                    defaultValue={user.username}
                    className="w-full px-4 py-3 rounded-xl border border-[--border] focus:border-pitch focus:ring-2 focus:ring-pitch/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-ink mb-2">Favorite Teams</label>
                  <input
                    type="text"
                    defaultValue={user.favoriteTeams.join(', ')}
                    className="w-full px-4 py-3 rounded-xl border border-[--border] focus:border-pitch focus:ring-2 focus:ring-pitch/20 transition-all"
                    placeholder="Arsenal, Manchester City, Liverpool"
                  />
                  <p className="text-xs text-ink-muted mt-1">Separate multiple teams with commas</p>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <Dialog.Close asChild>
                  <button
                    className="flex-1 px-6 py-3 rounded-xl font-semibold text-ink bg-chalk hover:bg-turf-b active:bg-turf-b/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  >
                    Cancel
                  </button>
                </Dialog.Close>
                <button
                  onClick={() => handleUpdateProfile({})}
                  className="flex-1 px-6 py-3 rounded-xl font-semibold text-ink bg-floodlight hover:brightness-95 active:brightness-90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-floodlight/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default Account
