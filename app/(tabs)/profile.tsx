import { router } from 'expo-router'
import { Button, View } from 'react-native'

import { ThemedText } from '@/components/ThemedText'
import { useAuth } from '@/contexts/auth'

export default function ProfileScreen() {
  const { user, logout } = useAuth()

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ThemedText style={{ textAlign: 'center', fontSize: 24 }}>
          {user?.username}
        </ThemedText>
        <View
          style={{
            margin: 32,
          }}
        >
          <Button onPress={logout} title="Logout" />
        </View>
      </View>
    </View>
  )
}
