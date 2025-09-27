import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request); // Get session cookie

  if (sessionCookie) {
    if (
      request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/2fa"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else if (
    request.nextUrl.pathname !== "/login" &&
    request.nextUrl.pathname !== "/2fa"
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/application",
    "/login",
    "/2fa",
    "/account",
    "/application",
    "/contact",
    "/setup-password",
    "/subscriptions",
    "/admin/:path*",
  ], // Specify the routes the middleware applies to
};
