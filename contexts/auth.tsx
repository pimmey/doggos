import { createContext, useContext, useEffect, useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'

export type User = {
  username: string
  token: string
}

type AuthContextType = {
  user: User | null
  login: (user: User) => Promise<void>
  logout: () => Promise<void>
  isLoading: boolean
}

const USER_KEY = 'user'

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
)

export function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem(USER_KEY)
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } finally {
        setIsLoading(false)
      }
    }
    loadUser()
  }, [])

  const login = async (newUser: User) => {
    setUser(newUser)
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(newUser))
  }

  const logout = async () => {
    setUser(null)
    await AsyncStorage.removeItem(USER_KEY)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
