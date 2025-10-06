import { CompletionFront } from '@/contexts/completions'
import { useQuery } from '@tanstack/react-query'
import { startOfDay, endOfDay } from "date-fns"

const fetchDayCompletions = async () => {
  const startAt = startOfDay(new Date())
  const endAt = endOfDay(new Date())
  const urlSearchParams = new URLSearchParams({
    startAt: startAt.toISOString(),
    endAt: endAt.toISOString()
  })
  
  const response = await fetch(`/api/completions?${urlSearchParams.toString()}`)

  return await response.json() as CompletionFront[]
}

const useDayCompletions = () => {
  return useQuery({
    queryKey: ['day-completions'],
    queryFn: () => fetchDayCompletions()
  })
}

export { useDayCompletions, fetchDayCompletions }
