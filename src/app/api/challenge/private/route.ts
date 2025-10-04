import { findPrivateChallenges } from "@/contexts/challenge";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { challengeMapper } from "../utils";

export async function GET(request: Request) {
  const sessionResult = await auth.api.getSession({ headers: request.headers });

  if (!sessionResult) {
    return new Response("Not authenticated", { status: 401 });
  }

  const challenges = await findPrivateChallenges(sessionResult.user.id);

  return NextResponse.json(challenges.map(challengeMapper));
}
