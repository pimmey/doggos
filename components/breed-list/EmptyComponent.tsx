import { Text, View } from 'react-native'

export function EmptyComponent() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl text-gray-400">
        No breeds found 🐶
      </Text>
    </View>
  )
}
