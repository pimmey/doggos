import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'

import '@/assets/global.css'
import { AuthProvider } from '@/contexts/auth'
import { FavoritesProvider } from '@/contexts/favorites'
import { asyncStoragePersister, queryClient } from '@/data/client'
import { useColorScheme } from '@/hooks/useColorScheme'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'

export default function RootLayout() {
  const colorScheme = useColorScheme()

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncStoragePersister }}
    >
      <AuthProvider>
        <FavoritesProvider>
          <ThemeProvider
            value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
          >
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen
                name="(modal)"
                options={{
                  presentation: 'modal', // or 'card'
                  headerShown: false,
                }}
              />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </FavoritesProvider>
      </AuthProvider>
    </PersistQueryClientProvider>
  )
}
