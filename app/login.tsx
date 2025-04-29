import { router } from 'expo-router'
import { ActivityIndicator, Button, View } from 'react-native'

import { ThemedText } from '@/components/ThemedText'
import { useAuth } from '@/contexts/auth'
import { useAuthentication } from '@/hooks/useAuthentication'

export default function LoginScreen() {
  const { login, isLoading } = useAuth()

  async function handleLogin() {
    const credentials = await useAuthentication()
    await login(credentials)
    router.replace('/(tabs)')
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
        {/* TODO: make sure isLoading is changing on login to show indicator */}
        {isLoading ? <ActivityIndicator /> : null}
        <Button
          title="Login"
          onPress={handleLogin}
          disabled={isLoading}
        />
      </View>
    </View>
  )
}
