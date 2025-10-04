import { CompletionFront } from '@/contexts/completions'
import { useQuery } from '@tanstack/react-query'

const fetchCompletions = async (challengeId: string) => {
  const response = await fetch(`/api/challenge/${challengeId}/completions`)

  return await response.json() as CompletionFront[]
}

const useCompletions = (challengeId: string) => {
  return useQuery({
    queryKey: ['completions', challengeId],
    queryFn: () => fetchCompletions(challengeId)
  })
}

export { useCompletions, fetchCompletions }
