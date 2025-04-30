import { router } from 'expo-router'
import { memo, useCallback } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import { Favorite } from '@/components/Favorite'
import type { Breed } from '@/data/dog-breeds'
import { useFavoritesStore } from '@/stores/favorites'

interface Props {
  breed: Breed
}

function ListItemComponent({ breed }: Props) {
  const toggleFavorite = useFavoritesStore(
    state => state.toggleFavorite
  )

  const handleLongPress = useCallback(
    () => toggleFavorite(breed.id.toString()),
    [breed.id.toString(), toggleFavorite]
  )

  const handlePress = useCallback(() => {
    router.push({
      pathname: '/(modal)/breed/[id]',
      params: {
        id: breed.id.toString(),
        breedJSON: JSON.stringify(breed),
      },
    })
  }, [breed.id.toString()])

  return (
    <TouchableOpacity
      className="p-4"
      onPress={handlePress}
      onLongPress={handleLongPress}
    >
      <View className="flex-row justify-between">
        <View>
          <Text className="text-xl">{breed.name}</Text>
          <Text className="text-gray-500">
            {breed.breed_group || 'Unknown'}
          </Text>
        </View>
        <Favorite id={breed.id.toString()} />
      </View>
    </TouchableOpacity>
  )
}

export const ListItem = memo(ListItemComponent)
