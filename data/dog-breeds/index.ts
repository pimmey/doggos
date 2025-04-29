import { useInfiniteQuery } from '@tanstack/react-query'

const DOG_BREEDS_API_URL = 'https://api.thedogapi.com/v1/breeds'

async function fetchBreeds({
  pageParam = 0,
}: {
  pageParam?: number
}) {
  const limit = 15
  const res = await fetch(
    `${DOG_BREEDS_API_URL}?limit=${limit}&page=${pageParam}`
  )
  if (!res.ok) {
    throw new Error('Failed to fetch dog breeds')
  }
  return res.json() // Array of breeds
}

export const useDogBreeds = () => {
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
  })
}
