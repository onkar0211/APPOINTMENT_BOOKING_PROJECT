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
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    setError(null)
    setLoading(true)

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!data.success) {
        setError(data.error)
        setLoading(false)
        return { success: false }
      }

      const userData = {
        email: email,
        token: data.token,
      }

      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))

      setLoading(false)
      return { success: true }

    } catch (err) {
      setError("Something went wrong")
      setLoading(false)
      return { success: false }
    }
  }

  const register = async (userData) => {
    setError(null)
    setLoading(true)
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
