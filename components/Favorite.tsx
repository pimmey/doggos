import { memo } from 'react'
import { TouchableOpacity } from 'react-native'

import { IconSymbol } from '@/components/ui/IconSymbol'
import { useFavoritesStore } from '@/stores/favorites'

interface FavoriteProps {
  id: string
  tappable?: boolean
  size?: number
}

function FavoriteComponent({
  id,
  tappable = false,
  size = 24,
}: FavoriteProps) {
  const isFavorite = useFavoritesStore(state => state.isFavorite(id))
  const toggleFavorite = useFavoritesStore(
    state => state.toggleFavorite
  )

  const icon = isFavorite ? 'heart.fill' : 'heart'
  const color = isFavorite ? 'red' : 'lightgray'

  const iconElement = (
    <IconSymbol name={icon} color={color} size={size} />
  )

  if (!tappable) {
    return iconElement
  }

  return (
    <TouchableOpacity
      onPress={() => toggleFavorite(id)}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      {iconElement}
    </TouchableOpacity>
  )
}

export const Favorite = memo(FavoriteComponent)
