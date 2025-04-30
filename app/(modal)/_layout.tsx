import { Stack } from 'expo-router'

export default function BreedModalLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="breed/[id]" />
    </Stack>
  )
}
