import { findLogsByChallengeId } from "@/contexts/logs";
import { auth } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const sessionResult = await auth.api.getSession({ headers: request.headers });

  if (!sessionResult) {
    return new Response("Not authenticated", { status: 401 });
  }

  const completions = await findLogsByChallengeId((await params).id);

  return Response.json(completions);
}
