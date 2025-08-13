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
        <div 
            className="min-h-screen flex items-center justify-center"
            style={{ backgroundColor: 'oklch(95% 0 0)' }}
        >
            <div className="text-center">
            <h1 
                className="text-3xl font-bold mb-4"
                style={{ color: 'oklch(20% 0 0)' }}
            >
                Welcome to Futty
            </h1>
            <p 
                className="mb-8"
                style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}
            >
                Please log in to access your account
            </p>
            <button 
                className="px-8 py-4 rounded-xl font-bold transition-all duration-200"
                style={{
                backgroundColor: 'oklch(71.772% 0.133 239.443)',
                color: 'oklch(14.354% 0.026 239.443)',
                boxShadow: '0 4px 6px -1px oklch(21.778% 0 0 / 0.1)'
                }}
            >
                Login
            </button>
            </div>
        </div>
        )
    }

    return (
        <div 
        className="min-h-screen"
        style={{ backgroundColor: 'oklch(95% 0 0)' }}
        >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {/* Header */}
            <section 
            className="rounded-2xl p-8 border shadow-sm"
            style={{ 
                backgroundColor: 'oklch(100% 0 0)',
                borderColor: 'oklch(90% 0 0)',
                boxShadow: '0 1px 3px oklch(21.778% 0 0 / 0.1)'
            }}
            >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: 'oklch(71.772% 0.133 239.443 / 0.1)' }}
                >
                    <User size={20} style={{ color: 'oklch(71.772% 0.133 239.443)' }} />
                </div>
                <div>
                    <h1 
                    className="text-3xl font-bold"
                    style={{ color: 'oklch(20% 0 0)' }}
                    >
                    Account
                    </h1>
                    <p 
                    style={{ color: 'oklch(21.778% 0 0)' }}
                    >
                    Manage your profile and settings
                    </p>
                </div>
                </div>
                <button
                onClick={handleLogout}
                className="p-3 rounded-xl transition-all duration-200"
                style={{ 
                    backgroundColor: 'oklch(62.013% 0.208 28.717 / 0.1)',
                    color: 'oklch(12.402% 0.041 28.717)'
                }}
                onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'oklch(62.013% 0.208 28.717 / 0.2)'
                }}
                onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'oklch(62.013% 0.208 28.717 / 0.1)'
                }}
                >
                <LogOut size={20} />
                </button>
            </div>
            </section>

            <div className="space-y-8">
            {/* Profile Section */}
            <section 
                className="rounded-2xl p-8 border shadow-sm"
                style={{ 
                backgroundColor: 'oklch(100% 0 0)',
                borderColor: 'oklch(90% 0 0)',
                boxShadow: '0 1px 3px oklch(21.778% 0 0 / 0.1)'
                }}
            >
                <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-6">
                    <div 
                    className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-sm"
                    style={{ backgroundColor: 'oklch(71.772% 0.133 239.443 / 0.1)' }}
                    >
                    <User size={32} style={{ color: 'oklch(71.772% 0.133 239.443)' }} />
                    </div>
                    <div>
                    <h2 
                        className="text-2xl font-bold mb-1"
                        style={{ color: 'oklch(20% 0 0)' }}
                    >
                        {user.username}
                    </h2>
                    <p 
                        className="font-medium mb-1"
                        style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}
                    >
                        {user.email}
                    </p>
                    <p 
                        className="text-sm"
                        style={{ color: 'oklch(21.778% 0 0 / 0.5)' }}
                    >
                        Member since {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                    </div>
                </div>
                <button
                    onClick={() => setShowEditProfile(true)}
                    className="p-3 rounded-xl transition-all duration-200"
                    style={{ 
                    backgroundColor: 'oklch(71.772% 0.133 239.443 / 0.1)',
                    color: 'oklch(71.772% 0.133 239.443)'
                    }}
                    onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'oklch(71.772% 0.133 239.443 / 0.2)'
                    }}
                    onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'oklch(71.772% 0.133 239.443 / 0.1)'
                    }}
                >
                    <Edit size={20} />
                </button>
                </div>

                {/* Favorite Teams */}
                <div 
                className="pt-6 border-t"
                style={{ borderColor: 'oklch(90% 0 0)' }}
                >
                <h3 
                    className="text-sm font-bold mb-3"
                    style={{ color: 'oklch(21.778% 0 0)' }}
                >
                    Favorite Teams
                </h3>
                <div className="flex flex-wrap gap-3">
                    {user.favoriteTeams.map((team, index) => (
                    <span
                        key={index}
                        className="px-4 py-2 rounded-xl text-sm font-medium"
                        style={{
                        backgroundColor: 'oklch(71.772% 0.133 239.443 / 0.1)',
                        color: 'oklch(71.772% 0.133 239.443)',
                        border: '1px solid oklch(71.772% 0.133 239.443 / 0.3)'
                        }}
                    >
                        {team}
                    </span>
                    ))}
                </div>
                </div>
            </section>

            {/* Statistics */}
            <section 
                className="rounded-2xl p-8 border shadow-sm"
                style={{ 
                backgroundColor: 'oklch(100% 0 0)',
                borderColor: 'oklch(90% 0 0)',
                boxShadow: '0 1px 3px oklch(21.778% 0 0 / 0.1)'
                }}
            >
                <h3 
                className="text-xl font-bold mb-6"
                style={{ color: 'oklch(20% 0 0)' }}
                >
                Your Statistics
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div 
                    className="text-center p-6 rounded-2xl shadow-sm border transition-all duration-200"
                    style={{ 
                    backgroundColor: 'oklch(46.949% 0.162 321.406 / 0.05)',
                    borderColor: 'oklch(46.949% 0.162 321.406 / 0.2)'
                    }}
                >
                    <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: 'oklch(46.949% 0.162 321.406 / 0.1)' }}
                    >
                    <Trophy size={24} style={{ color: 'oklch(46.949% 0.162 321.406)' }} />
                    </div>
                    <p 
                    className="text-3xl font-bold mb-1"
                    style={{ color: 'oklch(20% 0 0)' }}
                    >
                    {mockStats.totalPoints}
                    </p>
                    <p 
                    className="text-sm font-medium"
                    style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}
                    >
                    Total Points
                    </p>
                </div>
                <div 
                    className="text-center p-6 rounded-2xl shadow-sm border transition-all duration-200"
                    style={{ 
                    backgroundColor: 'oklch(71.772% 0.133 239.443 / 0.05)',
                    borderColor: 'oklch(71.772% 0.133 239.443 / 0.2)'
                    }}
                >
                    <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: 'oklch(71.772% 0.133 239.443 / 0.1)' }}
                    >
                    <TrendingUp size={24} style={{ color: 'oklch(71.772% 0.133 239.443)' }} />
                    </div>
                    <p 
                    className="text-3xl font-bold mb-1"
                    style={{ color: 'oklch(20% 0 0)' }}
                    >
                    {mockStats.currentRank}
                    </p>
                    <p 
                    className="text-sm font-medium"
                    style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}
                    >
                    Current Rank
                    </p>
                </div>
                <div 
                    className="text-center p-6 rounded-2xl shadow-sm border transition-all duration-200"
                    style={{ 
                    backgroundColor: 'oklch(64.476% 0.202 359.339 / 0.05)',
                    borderColor: 'oklch(64.476% 0.202 359.339 / 0.2)'
                    }}
                >
                    <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: 'oklch(64.476% 0.202 359.339 / 0.1)' }}
                    >
                    <User size={24} style={{ color: 'oklch(64.476% 0.202 359.339)' }} />
                    </div>
                    <p 
                    className="text-3xl font-bold mb-1"
                    style={{ color: 'oklch(20% 0 0)' }}
                    >
                    {mockStats.leaguesJoined}
                    </p>
                    <p 
                    className="text-sm font-medium"
                    style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}
                    >
                    Leagues Joined
                    </p>
                </div>
                <div 
                    className="text-center p-6 rounded-2xl shadow-sm border transition-all duration-200"
                    style={{ 
                    backgroundColor: 'oklch(71.236% 0.159 52.023 / 0.05)',
                    borderColor: 'oklch(71.236% 0.159 52.023 / 0.2)'
                    }}
                >
                    <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: 'oklch(71.236% 0.159 52.023 / 0.1)' }}
                    >
                    <Trophy size={24} style={{ color: 'oklch(71.236% 0.159 52.023)' }} />
                    </div>
                    <p 
                    className="text-3xl font-bold mb-1"
                    style={{ color: 'oklch(20% 0 0)' }}
                    >
                    {mockStats.bestFinish}
                    </p>
                    <p 
                    className="text-sm font-medium"
                    style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}
                    >
                    Best Finish
                    </p>
                </div>
                </div>
            </section>

            {/* Achievements */}
            <section 
                className="rounded-2xl p-8 border shadow-sm"
                style={{ 
                backgroundColor: 'oklch(100% 0 0)',
                borderColor: 'oklch(90% 0 0)',
                boxShadow: '0 1px 3px oklch(21.778% 0 0 / 0.1)'
                }}
            >
                <h3 
                className="text-xl font-bold mb-6"
                style={{ color: 'oklch(20% 0 0)' }}
                >
                Achievements
                </h3>
                <div className="space-y-4">
                {mockAchievements.map((achievement) => {
                    const Icon = achievement.icon
                    return (
                    <div
                        key={achievement.id}
                        className="flex items-center space-x-4 p-6 rounded-2xl border transition-all duration-200"
                        style={{
                        backgroundColor: achievement.unlocked
                            ? 'oklch(46.949% 0.162 321.406 / 0.05)'
                            : 'oklch(90% 0 0 / 0.3)',
                        borderColor: achievement.unlocked
                            ? 'oklch(46.949% 0.162 321.406 / 0.2)'
                            : 'oklch(90% 0 0)'
                        }}
                    >
                        <div 
                        className="p-3 rounded-xl"
                        style={{
                            backgroundColor: achievement.unlocked
                            ? 'oklch(46.949% 0.162 321.406 / 0.1)'
                            : 'oklch(90% 0 0)',
                            color: achievement.unlocked
                            ? 'oklch(46.949% 0.162 321.406)'
                            : 'oklch(21.778% 0 0 / 0.4)'
                        }}
                        >
                        <Icon size={20} />
                        </div>
                        <div className="flex-1">
                        <h4 
                            className="font-bold mb-1"
                            style={{ 
                            color: achievement.unlocked ? 'oklch(20% 0 0)' : 'oklch(21.778% 0 0 / 0.5)'
                            }}
                        >
                            {achievement.name}
                        </h4>
                        <p 
                            className="text-sm mb-1"
                            style={{ 
                            color: achievement.unlocked ? 'oklch(21.778% 0 0 / 0.7)' : 'oklch(21.778% 0 0 / 0.4)'
                            }}
                        >
                            {achievement.description}
                        </p>
                        {achievement.unlocked && achievement.date && (
                            <p 
                            className="text-xs"
                            style={{ color: 'oklch(21.778% 0 0 / 0.5)' }}
                            >
                            Unlocked {new Date(achievement.date).toLocaleDateString()}
                            </p>
                        )}
                        </div>
                        {achievement.unlocked && (
                        <span 
                            className="text-lg font-bold"
                            style={{ color: 'oklch(46.949% 0.162 321.406)' }}
                        >
                            ✓
                        </span>
                        )}
                    </div>
                    )
                })}
                </div>
            </section>

            {/* Settings */}
            <section 
                className="rounded-2xl p-8 border shadow-sm"
                style={{ 
                backgroundColor: 'oklch(100% 0 0)',
                borderColor: 'oklch(90% 0 0)',
                boxShadow: '0 1px 3px oklch(21.778% 0 0 / 0.1)'
                }}
            >
                <h3 
                className="text-xl font-bold mb-6"
                style={{ color: 'oklch(20% 0 0)' }}
                >
                Settings
                </h3>
                
                {/* Notifications */}
                <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                    <div 
                        className="p-3 rounded-xl"
                        style={{ backgroundColor: 'oklch(71.236% 0.159 52.023 / 0.1)' }}
                    >
                        <Bell size={20} style={{ color: 'oklch(71.236% 0.159 52.023)' }} />
                    </div>
                    <div>
                        <h4 
                        className="font-bold"
                        style={{ color: 'oklch(20% 0 0)' }}
                        >
                        Notifications
                        </h4>
                        <p 
                        className="text-sm"
                        style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}
                        >
                        Manage your notification preferences
                        </p>
                    </div>
                    </div>
                </div>

                <div className="space-y-4 pl-16">
                    {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                        <label 
                        className="text-sm font-medium capitalize"
                        style={{ color: 'oklch(21.778% 0 0)' }}
                        >
                        {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </label>
                        <button
                        onClick={() => toggleNotification(key)}
                        className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200"
                        style={{
                            backgroundColor: value ? 'oklch(71.772% 0.133 239.443)' : 'oklch(90% 0 0)'
                        }}
                        >
                        <span
                            className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200"
                            style={{
                            transform: value ? 'translateX(6px)' : 'translateX(1px)'
                            }}
                        />
                        </button>
                    </div>
                    ))}
                </div>

                {/* Privacy */}
                <div 
                    className="pt-6 border-t"
                    style={{ borderColor: 'oklch(90% 0 0)' }}
                >
                    <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div 
                        className="p-3 rounded-xl"
                        style={{ backgroundColor: 'oklch(64.476% 0.202 359.339 / 0.1)' }}
                        >
                        <Shield size={20} style={{ color: 'oklch(64.476% 0.202 359.339)' }} />
                        </div>
                        <div>
                        <h4 
                            className="font-bold"
                            style={{ color: 'oklch(20% 0 0)' }}
                        >
                            Privacy
                        </h4>
                        <p 
                            className="text-sm"
                            style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}
                        >
                            Manage your privacy settings
                        </p>
                        </div>
                    </div>
                    <button 
                        className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                        style={{
                        backgroundColor: 'oklch(95% 0 0)',
                        color: 'oklch(21.778% 0 0)',
                        border: '1px solid oklch(90% 0 0)'
                        }}
                        onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'oklch(90% 0 0)'
                        e.target.style.borderColor = 'oklch(71.772% 0.133 239.443)'
                        }}
                        onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'oklch(95% 0 0)'
                        e.target.style.borderColor = 'oklch(90% 0 0)'
                        }}
                    >
                        Manage
                    </button>
                    </div>
                </div>

                {/* App Preferences */}
                <div 
                    className="pt-6 border-t"
                    style={{ borderColor: 'oklch(90% 0 0)' }}
                >
                    <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div 
                        className="p-3 rounded-xl"
                        style={{ backgroundColor: 'oklch(71.772% 0.133 239.443 / 0.1)' }}
                        >
                        <Settings size={20} style={{ color: 'oklch(71.772% 0.133 239.443)' }} />
                        </div>
                        <div>
                        <h4 
                            className="font-bold"
                            style={{ color: 'oklch(20% 0 0)' }}
                        >
                            App Preferences
                        </h4>
                        <p 
                            className="text-sm"
                            style={{ color: 'oklch(21.778% 0 0 / 0.7)' }}
                        >
                            Customize your app experience
                        </p>
                        </div>
                    </div>
                    <button 
                        className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                        style={{
                        backgroundColor: 'oklch(95% 0 0)',
                        color: 'oklch(21.778% 0 0)',
                        border: '1px solid oklch(90% 0 0)'
                        }}
                        onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'oklch(90% 0 0)'
                        e.target.style.borderColor = 'oklch(71.772% 0.133 239.443)'
                        }}
                        onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'oklch(95% 0 0)'
                        e.target.style.borderColor = 'oklch(90% 0 0)'
                        }}
                    >
                        Configure
                    </button>
                    </div>
                </div>
                </div>
            </section>

            {/* Account Actions */}
            <section 
                className="rounded-2xl p-8 border shadow-sm"
                style={{ 
                backgroundColor: 'oklch(100% 0 0)',
                borderColor: 'oklch(90% 0 0)',
                boxShadow: '0 1px 3px oklch(21.778% 0 0 / 0.1)'
                }}
            >
                <h3 
                className="text-xl font-bold mb-6"
                style={{ color: 'oklch(20% 0 0)' }}
                >
                Account Actions
                </h3>
                <div className="space-y-4">
                <button 
                    className="w-full text-left p-4 rounded-xl border transition-all duration-200"
                    style={{
                    backgroundColor: 'oklch(100% 0 0)',
                    borderColor: 'oklch(90% 0 0)'
                    }}
                    onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'oklch(95% 0 0)'
                    e.target.style.borderColor = 'oklch(71.772% 0.133 239.443)'
                    }}
                    onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'oklch(100% 0 0)'
                    e.target.style.borderColor = 'oklch(90% 0 0)'
                    }}
                >
                    <div className="flex items-center justify-between">
                    <span 
                        className="font-medium"
                        style={{ color: 'oklch(21.778% 0 0)' }}
                    >
                        Export Data
                    </span>
                    <span 
                        style={{ color: 'oklch(21.778% 0 0 / 0.4)' }}
                    >
                        →
                    </span>
                    </div>
                </button>
                <button 
                    className="w-full text-left p-4 rounded-xl border transition-all duration-200"
                    style={{
                    backgroundColor: 'oklch(100% 0 0)',
                    borderColor: 'oklch(90% 0 0)'
                    }}
                    onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'oklch(95% 0 0)'
                    e.target.style.borderColor = 'oklch(71.772% 0.133 239.443)'
                    }}
                    onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'oklch(100% 0 0)'
                    e.target.style.borderColor = 'oklch(90% 0 0)'
                    }}
                >
                    <div className="flex items-center justify-between">
                    <span 
                        className="font-medium"
                        style={{ color: 'oklch(21.778% 0 0)' }}
                    >
                        Change Password
                    </span>
                    <span 
                        style={{ color: 'oklch(21.778% 0 0 / 0.4)' }}
                    >
                        →
                    </span>
                    </div>
                </button>
                <button 
                    className="w-full text-left p-4 rounded-xl border transition-all duration-200"
                    style={{
                    backgroundColor: 'oklch(100% 0 0)',
                    borderColor: 'oklch(62.013% 0.208 28.717 / 0.2)'
                    }}
                    onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'oklch(62.013% 0.208 28.717 / 0.05)'
                    e.target.style.borderColor = 'oklch(62.013% 0.208 28.717 / 0.3)'
                    }}
                    onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'oklch(100% 0 0)'
                    e.target.style.borderColor = 'oklch(62.013% 0.208 28.717 / 0.2)'
                    }}
                >
                    <div className="flex items-center justify-between">
                    <span 
                        className="font-medium"
                        style={{ color: 'oklch(12.402% 0.041 28.717)' }}
                    >
                        Delete Account
                    </span>
                    <span 
                        style={{ color: 'oklch(12.402% 0.041 28.717 / 0.4)' }}
                    >
                        →
                    </span>
                    </div>
                </button>
                </div>
            </section>
            </div>
        </div>

        {/* Edit Profile Modal */}
        {showEditProfile && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div 
                className="rounded-2xl p-8 w-full max-w-md shadow-2xl"
                style={{ 
                backgroundColor: 'oklch(100% 0 0)',
                border: '1px solid oklch(90% 0 0)'
                }}
            >
                <h3 
                className="text-xl font-bold mb-6"
                style={{ color: 'oklch(20% 0 0)' }}
                >
                Edit Profile
                </h3>
                <form onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.target)
                handleUpdateProfile(formData)
                }}>
                <div className="space-y-4">
                    <div>
                    <label 
                        className="block text-sm font-bold mb-2"
                        style={{ color: 'oklch(21.778% 0 0)' }}
                    >
                        Username
                    </label>
                    <input
                        name="username"
                        type="text"
                        defaultValue={user.username}
                        required
                        className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all duration-200"
                        style={{
                        backgroundColor: 'oklch(100% 0 0)',
                        borderColor: 'oklch(90% 0 0)',
                        color: 'oklch(20% 0 0)'
                        }}
                        onFocus={(e) => {
                        e.target.style.borderColor = 'oklch(71.772% 0.133 239.443)'
                        e.target.style.boxShadow = '0 0 0 3px oklch(71.772% 0.133 239.443 / 0.1)'
                        }}
                        onBlur={(e) => {
                        e.target.style.borderColor = 'oklch(90% 0 0)'
                        e.target.style.boxShadow = 'none'
                        }}
                    />
                    </div>
                    
                    <div>
                    <label 
                        className="block text-sm font-bold mb-2"
                        style={{ color: 'oklch(21.778% 0 0)' }}
                    >
                        Favorite Teams (comma-separated)
                    </label>
                    <input
                        name="favoriteTeams"
                        type="text"
                        defaultValue={user.favoriteTeams.join(', ')}
                        className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all duration-200"
                        style={{
                        backgroundColor: 'oklch(100% 0 0)',
                        borderColor: 'oklch(90% 0 0)',
                        color: 'oklch(20% 0 0)'
                        }}
                        onFocus={(e) => {
                        e.target.style.borderColor = 'oklch(71.772% 0.133 239.443)'
                        e.target.style.boxShadow = '0 0 0 3px oklch(71.772% 0.133 239.443 / 0.1)'
                        }}
                        onBlur={(e) => {
                        e.target.style.borderColor = 'oklch(90% 0 0)'
                        e.target.style.boxShadow = 'none'
                        }}
                        placeholder="Arsenal, Manchester City"
                    />
                    </div>
                </div>

                <div className="flex space-x-3 mt-8">
                    <button
                    type="button"
                    onClick={() => setShowEditProfile(false)}
                    className="flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-200"
                    style={{
                        backgroundColor: 'oklch(95% 0 0)',
                        color: 'oklch(21.778% 0 0)',
                        border: '1px solid oklch(90% 0 0)'
                    }}
                    >
                    Cancel
                    </button>
                    <button 
                    type="submit" 
                    className="flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-200"
                    style={{
                        backgroundColor: 'oklch(71.772% 0.133 239.443)',
                        color: 'oklch(14.354% 0.026 239.443)',
                        boxShadow: '0 4px 6px -1px oklch(21.778% 0 0 / 0.1)'
                    }}
                    >
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