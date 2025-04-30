import { create } from 'zustand'

import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = 'favorites'

interface FavoritesStore {
  favorites: string[]
  toggleFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
  loadFavorites: () => void
}

export const useFavoritesStore = create<FavoritesStore>(
  (set, get) => ({
    favorites: [],

    toggleFavorite: (id: string) => {
      const prev = get().favorites
      const updated = prev.includes(id)
        ? prev.filter(fav => fav !== id)
        : [...prev, id]

      set({ favorites: updated })
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    },

    isFavorite: (id: string) => get().favorites.includes(id),

    loadFavorites: async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEY)
      if (stored) {
        try {
          set({ favorites: JSON.parse(stored) })
        } catch {
          set({ favorites: [] })
        }
      }
    },
  })
)
