import { LogFront } from '@/contexts/logs'
import { useQuery } from '@tanstack/react-query'

const fetchLogs = async (challengeId: string) => {
  const response = await fetch(`/api/challenge/${challengeId}/logs`)

  return await response.json() as LogFront[]
}

const useLogs = (challengeId: string) => {
  return useQuery({
    queryKey: ['logs', challengeId],
    queryFn: () => fetchLogs(challengeId)
  })
}

export { useLogs, fetchLogs }
