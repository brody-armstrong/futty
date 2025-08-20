import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { X, Eye, EyeOff, Mail, User, Lock, AlertCircle, CheckCircle } from 'lucide-react'

const AuthModal = ({ isOpen, onClose, initialMode = 'signin' }) => {
  const [mode, setMode] = useState(initialMode) // 'signin' or 'signup'
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const [formSuccess, setFormSuccess] = useState('')

  const { signup, signin, error: authError } = useAuth()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setFormError('')
    setFormSuccess('')
  }

  const validateForm = () => {
    if (mode === 'signup') {
      if (!formData.email || !formData.username || !formData.password || !formData.confirmPassword) {
        setFormError('All fields are required')
        return false
      }
      if (formData.password !== formData.confirmPassword) {
        setFormError('Passwords do not match')
        return false
      }
      if (formData.password.length < 6) {
        setFormError('Password must be at least 6 characters')
        return false
      }
      if (formData.username.length < 3) {
        setFormError('Username must be at least 3 characters')
        return false
      }
    } else {
      if (!formData.email || !formData.password) {
        setFormError('Email and password are required')
        return false
      }
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    setFormError('')
    setFormSuccess('')
    
    try {
      if (mode === 'signup') {
        await signup(formData.email, formData.username, formData.password)
        setFormSuccess('Account created successfully!')
        setTimeout(() => {
          onClose()
          setFormData({ email: '', username: '', password: '', confirmPassword: '' })
        }, 1500)
      } else {
        await signin(formData.email, formData.password)
        setFormSuccess('Signed in successfully!')
        setTimeout(() => {
          onClose()
          setFormData({ email: '', username: '', password: '', confirmPassword: '' })
        }, 1500)
      }
    } catch (err) {
      setFormError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const switchMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin')
    setFormData({ email: '', username: '', password: '', confirmPassword: '' })
    setFormError('')
    setFormSuccess('')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md mx-4">
        <div 
          className="rounded-2xl shadow-xl overflow-hidden"
          style={{ backgroundColor: 'oklch(100% 0 0)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'oklch(90% 0 0)' }}>
            <h2 className="text-xl font-semibold" style={{ color: 'oklch(21.778% 0 0)' }}>
              {mode === 'signin' ? 'Sign In' : 'Create Account'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X size={20} style={{ color: 'oklch(21.778% 0 0)' }} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Error/Success Messages */}
            {(formError || authError) && (
              <div className="flex items-center p-3 rounded-lg" style={{ backgroundColor: 'oklch(95% 0.02 25)' }}>
                <AlertCircle size={16} style={{ color: 'oklch(45% 0.15 25)' }} />
                <span className="ml-2 text-sm" style={{ color: 'oklch(45% 0.15 25)' }}>
                  {formError || authError}
                </span>
              </div>
            )}
            
            {formSuccess && (
              <div className="flex items-center p-3 rounded-lg" style={{ backgroundColor: 'oklch(95% 0.02 140)' }}>
                <CheckCircle size={16} style={{ color: 'oklch(45% 0.15 140)' }} />
                <span className="ml-2 text-sm" style={{ color: 'oklch(45% 0.15 140)' }}>
                  {formSuccess}
                </span>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium" style={{ color: 'oklch(21.778% 0 0)' }}>
                Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: 'oklch(60% 0 0)' }} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                  style={{ 
                    borderColor: 'oklch(90% 0 0)',
                    backgroundColor: 'oklch(100% 0 0)',
                    color: 'oklch(21.778% 0 0)'
                  }}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Username Field (Signup only) */}
            {mode === 'signup' && (
              <div className="space-y-2">
                <label className="block text-sm font-medium" style={{ color: 'oklch(21.778% 0 0)' }}>
                  Username
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: 'oklch(60% 0 0)' }} />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                    style={{ 
                      borderColor: 'oklch(90% 0 0)',
                      backgroundColor: 'oklch(100% 0 0)',
                      color: 'oklch(21.778% 0 0)'
                    }}
                    placeholder="Choose a username"
                  />
                </div>
              </div>
            )}

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium" style={{ color: 'oklch(21.778% 0 0)' }}>
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: 'oklch(60% 0 0)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                  style={{ 
                    borderColor: 'oklch(90% 0 0)',
                    backgroundColor: 'oklch(100% 0 0)',
                    color: 'oklch(21.778% 0 0)'
                  }}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field (Signup only) */}
            {mode === 'signup' && (
              <div className="space-y-2">
                <label className="block text-sm font-medium" style={{ color: 'oklch(21.778% 0 0)' }}>
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: 'oklch(60% 0 0)' }} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                    style={{ 
                      borderColor: 'oklch(90% 0 0)',
                      backgroundColor: 'oklch(100% 0 0)',
                      color: 'oklch(21.778% 0 0)'
                    }}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                backgroundColor: 'oklch(71.772% 0.133 239.443)',
                color: 'oklch(14.354% 0.026 239.443)'
              }}
            >
              {isSubmitting ? 'Loading...' : (mode === 'signin' ? 'Sign In' : 'Create Account')}
            </button>

            {/* Mode Switch */}
            <div className="text-center">
              <button
                type="button"
                onClick={switchMode}
                className="text-sm hover:underline transition-colors"
                style={{ color: 'oklch(71.772% 0.133 239.443)' }}
              >
                {mode === 'signin' 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AuthModal
