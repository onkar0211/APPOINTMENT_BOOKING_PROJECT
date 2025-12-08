import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../services/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ name: 'Guest', email: 'guest@example.com' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // No authentication required - set loading to false immediately
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      setError(null)
      const response = await authService.login(email, password)
      const { token, refreshToken, user } = response
      
      localStorage.setItem('token', token)
      localStorage.setItem('refreshToken', refreshToken)
      setUser(user)
      
      return { success: true }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const register = async (userData) => {
    try {
      setError(null)
      const response = await authService.register(userData)
      const { token, refreshToken, user } = response
      
      localStorage.setItem('token', token)
      localStorage.setItem('refreshToken', refreshToken)
      setUser(user)
      
      return { success: true }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    setUser(null)
  }

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: true // Always authenticated for demo purposes
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

