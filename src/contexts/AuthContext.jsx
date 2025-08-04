import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing user session
    const savedUser = localStorage.getItem('futty_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    } else {
      // Create a demo user for immediate functionality
      const demoUser = {
        id: '1',
        username: 'demo_user',
        email: 'demo@futty.com',
        favoriteTeams: ['Arsenal', 'Manchester City'],
        createdAt: new Date().toISOString()
      }
      setUser(demoUser)
      localStorage.setItem('futty_user', JSON.stringify(demoUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      // Mock login - replace with actual API call
      const mockUser = {
        id: '1',
        username: 'testuser',
        email: email,
        favoriteTeams: ['Arsenal', 'Manchester City'],
        createdAt: new Date().toISOString()
      }
      
      setUser(mockUser)
      localStorage.setItem('futty_user', JSON.stringify(mockUser))
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const register = async (username, email, password) => {
    try {
      // Mock registration - replace with actual API call
      const mockUser = {
        id: Date.now().toString(),
        username: username,
        email: email,
        favoriteTeams: [],
        createdAt: new Date().toISOString()
      }
      
      setUser(mockUser)
      localStorage.setItem('futty_user', JSON.stringify(mockUser))
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('futty_user')
  }

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    localStorage.setItem('futty_user', JSON.stringify(updatedUser))
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 