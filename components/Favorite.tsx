// components/Favorite.tsx
import { memo } from 'react'
import { TouchableOpacity } from 'react-native'

import { IconSymbol } from '@/components/ui/IconSymbol'
import { useFavorites } from '@/contexts/favorites'

interface FavoriteProps {
  id: string
  tappable?: boolean // optional: control whether it's clickable
  size?: number
}

function FavoriteComponent({
  id,
  tappable = false,
  size = 24,
}: FavoriteProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorited = isFavorite(id)

  const icon = favorited ? 'heart.fill' : 'heart'
  const color = favorited ? 'red' : 'lightgray'

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
