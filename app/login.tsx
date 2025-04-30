import { router } from 'expo-router'
import { useState } from 'react'
import { ActivityIndicator, Button, View } from 'react-native'

import { ThemedText } from '@/components/ThemedText'
import { useAuth } from '@/contexts/auth'
import { useAuthentication } from '@/hooks/useAuthentication'

export default function LoginScreen() {
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  async function handleLogin() {
    try {
      setIsLoading(true)
      const credentials = await useAuthentication()
      await login(credentials)
      router.replace('/(tabs)')
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ThemedText
          style={{
            fontSize: 24,
            textAlign: 'center',
            marginHorizontal: 32,
            marginTop: 24,
          }}
        >
          Welcome to the Aidn code-case app, login to continue
        </ThemedText>
      </View>
      <View
        style={{
          margin: 32,
        }}
      >
        <View style={{ opacity: isLoading ? 1 : 0 }}>
          <ActivityIndicator />
        </View>
        <Button
          title="Login"
          onPress={handleLogin}
          disabled={isLoading}
        />
      </View>
    </View>
  )
}
