"use client";

import { authClient } from "@/lib/auth-client";

export function LoginForm({}: React.ComponentProps<"div">) {
  const onSubmit = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });

    console.log(`-------------data---------------`)
    console.log(data)
    console.log(`----------------------------`)
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button className="btn" onClick={onSubmit}>Login with Google</button>
    </div>
  );
}
