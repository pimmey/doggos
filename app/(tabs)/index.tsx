import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from 'react-native'

import {
  EmptyComponent,
  Footer,
  ListItem,
} from '@/components/breed-list'
import { useFavorites } from '@/contexts/favorites'
import { useDogBreedsInfiniteQuery } from '@/data/dog-breeds'
import NetInfo from '@react-native-community/netinfo'

export default function HomeScreen() {
  const [isOffline, setIsOffline] = useState(false)

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected)
    })

    return () => unsubscribe()
  }, [])

  console.log({ isOffline })

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useDogBreedsInfiniteQuery()

  const flatData = data?.pages.flat() ?? []

  const { isFavorite } = useFavorites()
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)

  const filteredData = showOnlyFavorites
    ? flatData.filter(breed => isFavorite(breed.id.toString()))
    : flatData

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
    <SafeAreaView className="flex-1 justify-center bg-white">
      <View className="flex-row items-center justify-between p-4">
        <Text className="text-4xl font-bold">Dog breeds 🐕</Text>
        <Button
          title={showOnlyFavorites ? 'All' : 'Favorites'}
          onPress={() => setShowOnlyFavorites(prev => !prev)}
        />
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
        onEndReached={
          showOnlyFavorites || isOffline
            ? undefined
            : () => {
                if (hasNextPage && !isFetchingNextPage) {
                  fetchNextPage()
                }
              }
        }
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetchingNextPage ? <Footer /> : null}
        ListEmptyComponent={<EmptyComponent />}
        renderItem={({ item }) => <ListItem breed={item} />}
        refreshing={isFetchingNextPage}
        onRefresh={() => {
          if (isOffline) {
            Alert.alert(
              'Offline',
              'You are offline. Please connect to the internet to refresh.'
            )
            return
          }
          refetch()
        }}
      />
    </SafeAreaView>
  )
}
