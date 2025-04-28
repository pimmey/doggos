import { View } from 'react-native'

import { ThemedText } from '@/components/ThemedText'

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ThemedText style={{ textAlign: 'center', fontSize: 24 }}>
        Home
      </ThemedText>
    </View>
  )
}
