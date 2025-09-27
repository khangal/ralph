import { findChallenge } from "@/contexts/challenge";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const sessionResult = await auth.api.getSession({ headers: request.headers });

  if (!sessionResult) {
    return new Response("Not authenticated", { status: 401 });
  }

  const challenges = await findChallenge(parseInt((await params).id));

  return NextResponse.json(challenges);
}
