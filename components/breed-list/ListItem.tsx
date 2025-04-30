import { router } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'

import { Favorite } from '@/components/Favorite'
import { useFavorites } from '@/contexts/favorites'
import type { Breed } from '@/data/dog-breeds'

interface Props {
  breed: Breed
}

export function ListItem({ breed }: Props) {
  const { toggleFavorite } = useFavorites()

  return (
    <TouchableOpacity
      className="border-b-hairline border-b-gray-300 p-4"
      onPress={() => {
        router.push({
          pathname: '/(modal)/breed/[id]',
          params: {
            id: breed.id.toString(),
            breedJSON: JSON.stringify(breed),
          },
        })
      }}
      onLongPress={() => toggleFavorite(breed.id.toString())}
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
