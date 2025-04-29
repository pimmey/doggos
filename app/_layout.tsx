import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'

import '@/assets/global.css'
import { AuthProvider } from '@/contexts/auth'
import { queryClient } from '@/data/client'
import { useColorScheme } from '@/hooks/useColorScheme'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { QueryClientProvider } from '@tanstack/react-query'

export default function RootLayout() {
  const colorScheme = useColorScheme()

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <Slot />
          <StatusBar style="auto" />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}
