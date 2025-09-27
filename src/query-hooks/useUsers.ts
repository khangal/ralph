import { User } from '@/contexts/user/types'
import { useQuery } from '@tanstack/react-query'

const fetchUsers = async () => {
  const response = await fetch(`/api/user`)

  return await response.json() as User[]
}

const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => fetchUsers()
  })
}

export { useUsers, fetchUsers }
