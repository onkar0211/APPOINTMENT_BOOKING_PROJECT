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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    // Accept any email and password - no validation needed
    setError(null)
    setLoading(true)
    
    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const userData = {
      name: email.split('@')[0] || 'User',
      email: email,
      id: Date.now()
    }
    
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    setLoading(false)
    
    return { success: true }
  }

  const register = async (userData) => {
    // Accept any registration data - no validation needed
    setError(null)
    setLoading(true)
    
    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const newUser = {
      name: userData.name || 'User',
      email: userData.email,
      id: Date.now()
    }
    
    setUser(newUser)
    localStorage.setItem('user', JSON.stringify(newUser))
    setLoading(false)
    
    return { success: true }
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

