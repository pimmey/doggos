import { useInfiniteQuery } from '@tanstack/react-query'

const DOG_BREEDS_API_URL = 'https://api.thedogapi.com/v1/breeds'

export interface Breed {
  id: number
  name: string
  description?: string
  weight?: {
    metric: string
  }
  height?: {
    metric: string
  }
  breed_group?: string
  bred_for?: string
  temperament?: string
  life_span?: string
  origin?: string
  reference_image_id?: string
}

async function fetchBreeds({
  pageParam = 0,
}: {
  pageParam?: number
}): Promise<Breed[]> {
  const limit = 15
  const res = await fetch(
    `${DOG_BREEDS_API_URL}?limit=${limit}&page=${pageParam}`
  )
  if (!res.ok) {
    throw new Error('Failed to fetch dog breeds')
  }
  return res.json()
}

export const useDogBreedsInfiniteQuery = () => {
  return useInfiniteQuery({
    queryKey: ['dog-breeds'],
    queryFn: fetchBreeds,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      // If the last page has results, fetch next page
      if (lastPage.length === 0) {
        return undefined // No more pages
      }
      return pages.length // Next page number
    },
    staleTime: 1000 * 60 * 60, // 1 hour — avoid re-fetch on reload
  })
}
