import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";
import { methodNotAllowed, rejectInvalidOrigin } from "@/lib/request-security";

export async function POST(request: Request) {
  const originError = rejectInvalidOrigin(request);
  if (originError) return originError;

  const response = NextResponse.redirect(new URL("/admin", request.url), 303);
  response.headers.set("Cache-Control", "no-store");
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return response;
}

export const GET = methodNotAllowed;
export const PUT = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const DELETE = methodNotAllowed;
