import { Button, SafeAreaView, Text, View } from 'react-native'

import { useAuth } from '@/contexts/auth'

export default function ProfileScreen() {
  const { user, logout } = useAuth()

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4">
        <View className="flex-row justify-between">
          <Text className="text-4xl font-bold">Profile 👤</Text>
          <Button onPress={logout} title="Logout" />
        </View>
        <View className="gap-4">
          <Text className="text-xl">
            Hey there, {user?.username}!
          </Text>
          <View className="rounded-xl bg-green-100 p-2">
            <Text className="text-lg">
              Pro tip: use long tap on the Home screen to favourite a
              breed!
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
