import { createContext, useContext, useEffect, useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = 'favorites'

interface FavoritesContextType {
  favorites: string[]
  toggleFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
}

const FavoritesContext = createContext<
  FavoritesContextType | undefined
>(undefined)

export function FavoritesProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    loadFavorites()
  }, [])

  async function loadFavorites() {
    const stored = await AsyncStorage.getItem(STORAGE_KEY)
    if (stored) {
      setFavorites(JSON.parse(stored))
    }
  }

  async function toggleFavorite(id: string) {
    let updated: string[]
    if (favorites.includes(id)) {
      updated = favorites.filter(fav => fav !== id)
    } else {
      updated = [...favorites, id]
    }
    setFavorites(updated)
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  function isFavorite(id: string) {
    return favorites.includes(id)
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error(
      'useFavorites must be used within a FavoritesProvider'
    )
  }
  return context
}
