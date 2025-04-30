import { Button, SafeAreaView, Text, View } from 'react-native'

import { useAuth } from '@/contexts/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
          <View className="rounded-xl bg-green-100 p-4">
            <Text className="text-lg">
              Pro tip: use long tap on the Home screen to favourite a
              breed!
            </Text>
          </View>
          {__DEV__ ? (
            <View className="rounded-xl bg-red-100 p-4">
              <Text className="text-center text-lg">Danger zone</Text>
              <Button
                title="Clear storage"
                color="red"
                onPress={() => AsyncStorage.clear()}
              />
            </View>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  )
}
