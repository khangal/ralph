"use client"

import { authClient } from "@/lib/auth-client";

export const UserInfo = () => {
  const { data: session } = authClient.useSession()

  return (
    <div>{ JSON.stringify(session?.user.email) }</div>
  )
}
