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
  const [error, setError] = useState(null)

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('futty_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        localStorage.removeItem('futty_user')
      }
    }
    setLoading(false)
  }, [])

  const signup = async (email, username, password) => {
    setError(null)
    setLoading(true)
    
    try {
      // Basic validation
      if (!email || !username || !password) {
        throw new Error('All fields are required')
      }
      
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters')
      }
      
      if (username.length < 3) {
        throw new Error('Username must be at least 3 characters')
      }
      
      // Check if user already exists (simulate API call)
      const existingUsers = JSON.parse(localStorage.getItem('futty_users') || '[]')
      const userExists = existingUsers.find(u => u.email === email || u.username === username)
      
      if (userExists) {
        throw new Error('User with this email or username already exists')
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email,
        username,
        password: btoa(password), // Basic encoding (in real app, use proper hashing)
        createdAt: new Date().toISOString(),
        currentLeagueId: null
      }
      
      // Save user to "database"
      existingUsers.push(newUser)
      localStorage.setItem('futty_users', JSON.stringify(existingUsers))
      
      // Set current user
      const { password: _, ...userWithoutPassword } = newUser
      setUser(userWithoutPassword)
      localStorage.setItem('futty_user', JSON.stringify(userWithoutPassword))
      
      return userWithoutPassword
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const signin = async (emailOrUsername, password) => {
    setError(null)
    setLoading(true)
    
    try {
      // Find user
      const users = JSON.parse(localStorage.getItem('futty_users') || '[]')
      const user = users.find(u => 
        (u.email === emailOrUsername || u.username === emailOrUsername) && 
        u.password === btoa(password)
      )
      
      if (!user) {
        throw new Error('Invalid email/username or password')
      }
      
      // Set current user
      const { password: _, ...userWithoutPassword } = user
      setUser(userWithoutPassword)
      localStorage.setItem('futty_user', JSON.stringify(userWithoutPassword))
      
      return userWithoutPassword
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const signout = () => {
    setUser(null)
    localStorage.removeItem('futty_user')
  }

  const updateUser = (updates) => {
    if (!user) return
    
    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    localStorage.setItem('futty_user', JSON.stringify(updatedUser))
    
    // Update in "database"
    const users = JSON.parse(localStorage.getItem('futty_users') || '[]')
    const userIndex = users.findIndex(u => u.id === user.id)
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updates }
      localStorage.setItem('futty_users', JSON.stringify(users))
    }
  }

  const value = {
    user,
    loading,
    error,
    signup,
    signin,
    signout,
    updateUser,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 