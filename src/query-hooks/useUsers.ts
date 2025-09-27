import { authClient } from '@/lib/auth-client'
import { PaginationParam } from '@/utils/types'
import { useQuery } from '@tanstack/react-query'
import { UserWithRole } from 'better-auth/plugins'

// export type User = {
//   id: number
//   email: string
//   name: string
// }

export type User = UserWithRole

const fetchUsers = async ({ limit, page }: PaginationParam) => {
  // const response = await fetch(`/api/users?limit=${limit}&page=${page}`)
  // const data = await response.json()
  //
  // if (!response.ok) throw new Error(data.message)
  // return data
  //
  const result = await authClient.admin.listUsers({
    query: {
        // searchField: "email",
        // searchOperator: "contains",
        // searchValue: "",
        limit,
        offset: (page - 1) * limit,
        sortBy: "createdAt",
        sortDirection: "desc"
        // filterField: "role",
        // filterOperator: "eq",
        // filterValue: "admin"
    }
  });

  if (result.error) {
    throw new Error(result.error.message)
  }

  return result.data.users
}

const useUsers = (pagination: PaginationParam) => {
  return useQuery({
    queryKey: ['users', pagination],
    queryFn: () => fetchUsers(pagination)
  })
}

export { useUsers, fetchUsers }
