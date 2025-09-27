import { cn } from "@/lib/utils"
import { useUsers } from "@/query-hooks/useUsers"
import Image from "next/image"

export const UserList = ({ className }: { className?: string }) => {
  const { data } = useUsers()

  const users = data || []

  return (
    <div className={ cn("overflow-x-auto", className) }>
      <table className="table bg-base-200">
        <thead>
          <tr className="text-sm">
            <th>User</th>
            {/* <th>Streak</th> */}
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="hover">
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <Image width="30" height="30" src={u.image || ""} alt={u.name} />
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-sm">{u.name}</div>
                    <div className="text-xs opacity-70">Member</div>
                  </div>
                </div>
              </td>
              {/* <td> */}
              {/*   <span className="badge badge-success badge-outline"> */}
              {/*     🔥 {u.streak} days */}
              {/*   </span> */}
              {/* </td> */}
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={2} className="text-center opacity-60 py-6">
                No users match your search.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

