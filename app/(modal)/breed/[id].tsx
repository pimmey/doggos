import { Image } from 'expo-image'
import { useLocalSearchParams } from 'expo-router'
import { ScrollView, Text, View } from 'react-native'

import { BreedInfoCard } from '@/components/BreedInfoCard'
import { Favorite } from '@/components/Favorite'
import { Breed } from '@/data/dog-breeds'

const IMAGES_BASE_PATH = 'https://cdn2.thedogapi.com/images'

export default function BreedDetailScreen() {
  const { breedJSON } = useLocalSearchParams<{ breedJSON: string }>()
  const breed: Breed = JSON.parse(breedJSON)

  return (
    <ScrollView className="flex-1 bg-white">
      {breed.reference_image_id && (
        <Image
          source={{
            uri: `${IMAGES_BASE_PATH}/${breed.reference_image_id}.jpg`,
          }}
          style={{ width: '100%', height: 300 }}
          contentFit="cover"
          transition={300}
        />
      )}
      <View className="gap-4 p-4">
        <View className="flex-row justify-between gap-4">
          <View className="flex-1">
            <Text className="text-4xl font-bold">{breed.name}</Text>
            {breed.breed_group && (
              <Text className="text-lg text-gray-600">
                {breed.breed_group}
              </Text>
            )}
          </View>
          <Favorite id={breed.id.toString()} tappable />
        </View>

        {breed.description && (
          <Text className="text-lg text-gray-800">
            {breed.description}
          </Text>
        )}

        <View className="mb-8 gap-2">
          <BreedInfoCard
            icon="globe"
            label="Origin"
            value={breed.origin}
          />

          <View className="flex-row place-items-stretch gap-2">
            <BreedInfoCard
              icon="ruler"
              label="Height"
              value={
                breed.height?.metric
                  ? `${breed.height.metric} cm`
                  : undefined
              }
            />

            <BreedInfoCard
              icon="scalemass"
              label="Weight"
              value={
                breed.weight?.metric
                  ? `${breed.weight.metric} kg`
                  : undefined
              }
            />
          </View>

          <BreedInfoCard
            icon="target"
            label="Bred for"
            value={breed.bred_for}
          />

          <BreedInfoCard
            icon="arrow.up.heart"
            label="Life span"
            value={breed.life_span}
          />

          <BreedInfoCard
            icon="dog"
            label="Temperament"
            value={breed.temperament}
          />
        </View>
      </View>
    </ScrollView>
  )
}
