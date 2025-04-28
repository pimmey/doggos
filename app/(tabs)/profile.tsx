import { router } from 'expo-router'
import { Button, View } from 'react-native'

import { ThemedText } from '@/components/ThemedText'

export default function ProfileScreen() {
  const userName = 'Current user' // Would love to show the actual username instead!

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ThemedText style={{ textAlign: 'center', fontSize: 24 }}>
          {userName}
        </ThemedText>
      </View>
      <View
        style={{
          margin: 32,
        }}
      >
        <Button onPress={() => router.dismissAll()} title="Logout" />
      </View>
    </View>
  )
}
