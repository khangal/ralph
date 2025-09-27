import { createChallenge, findChallenges } from "@/contexts/challenge";
import { auth } from "@/lib/auth";
import { parseIntUlat } from "@/lib/time";
import { z } from "zod";
import { NextResponse } from "next/server";

const createChallengeSchema = z.object({
  title: z.string(),
  description: z.string(),
  startAt: z.string(),
  endAt: z.string(),
});

export async function POST(request: Request) {
  const sessionResult = await auth.api.getSession({ headers: request.headers });

  if (!sessionResult) {
    return new Response("Not authenticated", { status: 401 });
  }

  const body = await request.json();

  const parsed = createChallengeSchema.parse(body);

  const startAt = parseIntUlat(parsed.startAt);
  const endAt = parseIntUlat(parsed.endAt);

  await createChallenge({ ...parsed, tenantId: "default", startAt, endAt });

  return Response.json({
    success: true,
  });
}

export async function GET(request: Request) {
  const sessionResult = await auth.api.getSession({ headers: request.headers });

  if (!sessionResult) {
    return new Response("Not authenticated", { status: 401 });
  }

  const challenges = await findChallenges();

  return NextResponse.json(challenges);
}
