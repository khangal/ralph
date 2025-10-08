import { findChallenge, updateChallenge } from "@/contexts/challenge";
import { auth } from "@/lib/auth";
import { parseIntUtc } from "@/lib/time";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { challengeMapper } from "../utils";

const updateChallengeSchema = z.object({
  title: z.string(),
  description: z.string(),
  startAt: z.string(),
  endAt: z.string(),
  visibility: z.enum(["public", "private"]),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const sessionResult = await auth.api.getSession({ headers: request.headers });

  if (!sessionResult) {
    return new Response("Not authenticated", { status: 401 });
  }

  const challenge = await findChallenge(parseInt((await params).id));

  if (!challenge) {
    return new Response("Challenge not found", { status: 404 });
  }

  return NextResponse.json(challengeMapper(challenge));
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const sessionResult = await auth.api.getSession({ headers: request.headers });

  if (!sessionResult) {
    return new Response("Not authenticated", { status: 401 });
  }
  const challengeId = parseInt((await params).id);

  const body = await request.json();

  const parsed = updateChallengeSchema.parse(body);

  const startAt = parseIntUtc(parsed.startAt);
  const endAt = parseIntUtc(parsed.endAt);

  const result = await updateChallenge(challengeId, {
    ...parsed,
    tenantId: "default",
    startAt,
    endAt,
    visibility: parsed.visibility === "public" ? 1 : 2,
  });

  if (!result) {
    return new Response("Challenge not found", { status: 404 });
  }

  return Response.json(challengeMapper(result));
}
