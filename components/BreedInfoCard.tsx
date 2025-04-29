import { Text, View } from 'react-native'
import { SFSymbols6_0 } from 'sf-symbols-typescript'

import { IconSymbol } from '@/components/ui/IconSymbol'

interface BreedInfoCardProps {
  icon: SFSymbols6_0
  label: string
  value?: string
}

export function BreedInfoCard({
  icon,
  label,
  value,
}: BreedInfoCardProps) {
  if (!value) return null

  return (
    <View className="flex-1 flex-row gap-4 rounded-2xl bg-gray-100 p-4">
      <IconSymbol name={icon} size={24} color="black" />
      <View className="flex-1 gap-2">
        <Text className="text-sm text-gray-500">{label}</Text>
        <Text className="text-lg font-medium text-gray-900">
          {value}
        </Text>
      </View>
    </View>
  )
}
