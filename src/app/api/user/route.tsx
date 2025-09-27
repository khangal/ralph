import { createUser, findUsers } from "@/contexts/user";
import { CreateUser } from "@/contexts/user/types";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const sessionResult = await auth.api.getSession({ headers: request.headers });

  if (!sessionResult) {
    return new Response("Not authenticated", { status: 401 });
  }

  const body: CreateUser = await request.json();

  await createUser({ ...body });

  return Response.json({
    success: true
  });
}

export async function GET(request: Request) {
  const sessionResult = await auth.api.getSession({ headers: request.headers });

  if (!sessionResult) {
    return new Response("Not authenticated", { status: 401 });
  }

  const users = await findUsers()

  return NextResponse.json(users);
}
