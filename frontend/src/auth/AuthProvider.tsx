import { useState } from 'react'
import { AuthContext } from './AuthContext'
import { getToken, setToken, removeToken } from './authStorage'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!getToken()
  })

  const login = (token: string) => {
    setToken(token)
    setIsAuthenticated(true)
  }

  const logout = () => {
    removeToken()
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
