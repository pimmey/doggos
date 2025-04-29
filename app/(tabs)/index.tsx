import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { useDogBreeds } from '@/data/dog-breeds'

export default function HomeScreen() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useDogBreeds()

  const flatData = data?.pages.flat() ?? []

  if (isError) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text>Something went wrong while loading breeds</Text>
      </SafeAreaView>
    )
  }

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 justify-center">
      <View className="p-4">
        <Text className="text-4xl font-bold">Dog breeds 🐕</Text>
      </View>
      <FlatList
        data={flatData}
        keyExtractor={item => item.id.toString()}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
          }
        }}
        contentContainerStyle={{
          paddingBottom: 16,
          flexGrow: 1,
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? (
            <View className="p-4">
              <ActivityIndicator size="small" />
            </View>
          ) : null
        }
        ListEmptyComponent={() => (
          <View className="flex-1 items-center justify-center">
            <Text className="text-2xl text-gray-400">
              No breeds found 🐶
            </Text>
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="border-b border-b-gray-300 p-4"
            onPress={() => {
              // TODO: Navigate to Details screen
            }}
          >
            <Text className="text-xl">{item.name}</Text>
            <Text className="text-gray-500">
              {item.breed_group || 'Unknown'}
            </Text>
          </TouchableOpacity>
        )}
        refreshing={isFetchingNextPage}
        onRefresh={() => refetch()}
      />
    </SafeAreaView>
  )
}
