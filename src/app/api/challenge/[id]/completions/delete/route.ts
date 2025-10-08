import {
  deleteCompletion,
} from "@/contexts/completions";
import { auth } from "@/lib/auth";
import { z } from "zod";

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

  await deleteCompletion({
    tenantId: "default",
    challengeId,
    userId: sessionResult.user.id,
    completedAt: new Date(parsed.date),
  });

  return Response.json({
    success: true,
  });
}
