import { ChallengeFront } from '@/contexts/challenge/types'
import { useQuery } from '@tanstack/react-query'

const fetchChallenge = async (id: string) => {
  const response = await fetch(`/api/challenge/${id}`)

  return await response.json() as ChallengeFront
}

const useChallenge = (id: string) => {
  return useQuery({
    queryKey: ['challenge', String(id)],
    queryFn: () => fetchChallenge(id)
  })
}

export { fetchChallenge, useChallenge }
