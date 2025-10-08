import {
  createCompletion,
  findCompletionsByChallengeId,
} from "@/contexts/completions";
import { auth } from "@/lib/auth";
import { z } from "zod";
import { NextRequest } from "next/server";
import { completionMapper } from "@/contexts/completions/utils";

const createCompletionSchema = z.object({
  date: z.string(),
});

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const sessionResult = await auth.api.getSession({ headers: request.headers });

  if (!sessionResult) {
    return new Response("Not authenticated", { status: 401 });
  }

  const challengeId = (await params).id;

  const body = await request.json();
  const parsed = createCompletionSchema.parse(body);

  await createCompletion({
    tenantId: "default",
    challengeId,
    userId: sessionResult.user.id,
    completedAt: new Date(parsed.date),
  });

  return Response.json({
    success: true,
  });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const sessionResult = await auth.api.getSession({ headers: request.headers });

  if (!sessionResult) {
    return new Response("Not authenticated", { status: 401 });
  }

  const completions = await findCompletionsByChallengeId((await params).id);

  return Response.json(completions.map(completionMapper));
}
