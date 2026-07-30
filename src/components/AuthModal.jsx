import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
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

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => { if (!open) onClose() }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/60" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-xl overflow-hidden bg-white focus:outline-none"
          onOpenAutoFocus={(e) => {
            // Let the email field take focus instead of Radix's default first-tabbable-element
            e.preventDefault()
            document.getElementById('auth-email')?.focus()
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[--border] bg-pitch">
            <Dialog.Title className="text-2xl font-bold text-chalk">
              {mode === 'signin' ? 'Sign In' : 'Create Account'}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="p-2 rounded-lg transition-colors hover:bg-white/10 active:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-floodlight/50 focus-visible:ring-offset-2 focus-visible:ring-offset-pitch">
                <X size={20} className="text-chalk" />
              </button>
            </Dialog.Close>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Error/Success Messages */}
            {(formError || authError) && (
              <div className="flex items-center p-3 rounded-lg bg-card-red/10">
                <AlertCircle size={16} className="text-card-red" />
                <span className="ml-2 text-sm text-card-red">{formError || authError}</span>
              </div>
            )}

            {formSuccess && (
              <div className="flex items-center p-3 rounded-lg bg-pitch/10">
                <CheckCircle size={16} className="text-pitch" />
                <span className="ml-2 text-sm text-pitch">{formSuccess}</span>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-ink">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ink-muted" />
                <input
                  id="auth-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-[--border] rounded-lg bg-white text-ink focus:outline-none focus:ring-2 focus:ring-pitch/20 focus:border-pitch transition-all"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Username Field (Signup only) */}
            {mode === 'signup' && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-ink">Username</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ink-muted" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-[--border] rounded-lg bg-white text-ink focus:outline-none focus:ring-2 focus:ring-pitch/20 focus:border-pitch transition-all"
                    placeholder="Choose a username"
                  />
                </div>
              </div>
            )}

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-ink">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ink-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-[--border] rounded-lg bg-white text-ink focus:outline-none focus:ring-2 focus:ring-pitch/20 focus:border-pitch transition-all"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded text-ink-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/30 focus-visible:ring-offset-1"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field (Signup only) */}
            {mode === 'signup' && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-ink">Confirm Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ink-muted" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 border border-[--border] rounded-lg bg-white text-ink focus:outline-none focus:ring-2 focus:ring-pitch/20 focus:border-pitch transition-all"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded text-ink-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/30 focus-visible:ring-offset-1"
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
              className="w-full py-3 px-4 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-floodlight text-ink hover:brightness-95 active:brightness-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-floodlight/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              {isSubmitting ? 'Loading...' : (mode === 'signin' ? 'Sign In' : 'Create Account')}
            </button>

            {/* Mode Switch */}
            <div className="text-center">
              <button
                type="button"
                onClick={switchMode}
                className="text-sm hover:underline transition-colors text-pitch focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitch/30 focus-visible:ring-offset-1 rounded"
              >
                {mode === 'signin'
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"
                }
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default AuthModal
