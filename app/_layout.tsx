import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import 'react-native-reanimated'

import '@/assets/global.css'
import { AuthProvider } from '@/contexts/auth'
import { asyncStoragePersister, queryClient } from '@/data/client'
import { useColorScheme } from '@/hooks/useColorScheme'
import { useFavoritesStore } from '@/stores/favorites'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'

export default function RootLayout() {
  const colorScheme = useColorScheme()

  const loadFavorites = useFavoritesStore(
    state => state.loadFavorites
  )

  useEffect(() => {
    loadFavorites()
  }, [loadFavorites])

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncStoragePersister }}
    >
      <AuthProvider>
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen
              name="(modal)"
              options={{
                presentation: 'modal',
                headerShown: false,
              }}
            />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </AuthProvider>
    </PersistQueryClientProvider>
  )
}
