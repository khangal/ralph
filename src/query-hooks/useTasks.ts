import { CompletionFront } from '@/contexts/completions'
import { useQuery } from '@tanstack/react-query'
import { startOfDay, endOfDay } from "date-fns"

const fetchDayCompletions = async (date: string) => {
  const startAt = startOfDay(date)
  const endAt = endOfDay(date)
  const urlSearchParams = new URLSearchParams({
    startAt: startAt.toISOString(),
    endAt: endAt.toISOString()
  })
  
  const response = await fetch(`/api/completions?${urlSearchParams.toString()}`)

  return await response.json() as CompletionFront[]
}

const useDayCompletions = (date: string) => {
  return useQuery({
    queryKey: ['day-completions', date],
    queryFn: () => fetchDayCompletions(date)
  })
}

export { useDayCompletions, fetchDayCompletions }
