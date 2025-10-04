import { ChallengeFront } from '@/contexts/challenge/types'
import { useQuery } from '@tanstack/react-query'

const fetchPrivateChallenges = async () => {
  const response = await fetch(`/api/challenge/private`)

  return await response.json() as ChallengeFront[]
}

const usePrivateChallenges = () => {
  return useQuery({
    queryKey: ['private-challenges'],
    queryFn: () => fetchPrivateChallenges()
  })
}

export { usePrivateChallenges, fetchPrivateChallenges }
