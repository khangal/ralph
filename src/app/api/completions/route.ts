import { dayCompletions } from "@/contexts/completions";
import { completionMapper } from "@/contexts/completions/utils";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const sessionResult = await auth.api.getSession({ headers: request.headers });

  if (!sessionResult) {
    return new Response("Not authenticated", { status: 401 });
  }

  const startAt = request.nextUrl.searchParams.get("startAt");
  const endAt = request.nextUrl.searchParams.get("endAt");

  if (!startAt || !endAt) {
    return new Response("Missing startAt or endAt", { status: 400 });
  }

  // max range 1 day
  if (
    new Date(startAt).getTime() - new Date(endAt).getTime() >
    24 * 60 * 60 * 1000
  ) {
    return new Response("Range too large", { status: 400 });
  }

  const completions = await dayCompletions(
    sessionResult.user.id,
    new Date(startAt),
    new Date(endAt),
  );

  return NextResponse.json(completions.map(completionMapper));
}
