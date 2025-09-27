import { ChallengeFront } from '@/contexts/challenge/types'
import { useQuery } from '@tanstack/react-query'

const fetchChallenges = async () => {
  const response = await fetch(`/api/challenge`)

  return await response.json() as ChallengeFront[]
}

const useChallenges = () => {
  return useQuery({
    queryKey: ['challenges'],
    queryFn: () => fetchChallenges()
  })
}

export { useChallenges, fetchChallenges }
