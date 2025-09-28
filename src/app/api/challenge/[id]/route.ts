import { findChallenge, updateChallenge } from "@/contexts/challenge";
import { auth } from "@/lib/auth";
import { parseIntUlat } from "@/lib/time";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const updateChallengeSchema = z.object({
  title: z.string(),
  description: z.string(),
  startAt: z.string(),
  endAt: z.string(),
});

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

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const sessionResult = await auth.api.getSession({ headers: request.headers });

  if (!sessionResult) {
    return new Response("Not authenticated", { status: 401 });
  }
  const challengeId = parseInt((await params).id)

  const body = await request.json();

  const parsed = updateChallengeSchema.parse(body);

  const startAt = parseIntUlat(parsed.startAt);
  const endAt = parseIntUlat(parsed.endAt);

  const result = await updateChallenge(challengeId, { ...parsed, tenantId: "default", startAt, endAt });

  if (!result) {
    return new Response("Challenge not found", { status: 404 });
  }

  return Response.json(result);
}

