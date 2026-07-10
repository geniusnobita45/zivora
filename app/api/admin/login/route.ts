import { NextResponse } from "next/server";
import { createAdminSession, SESSION_COOKIE, SESSION_MAX_AGE_SECONDS, validPassword } from "@/lib/auth";
import { ConfigurationError } from "@/lib/errors";
import { rateLimit } from "@/lib/rate-limit";
import { isFormRequest, methodNotAllowed, readLimitedText, rejectInvalidOrigin } from "@/lib/request-security";

const LOGIN_MAX_BODY_BYTES = 2_048;

function redirectToAdmin(request: Request, error = false) {
  const url = new URL("/admin", request.url);
  if (error) url.searchParams.set("error", "1");
  const response = NextResponse.redirect(url, 303);
  response.headers.set("Cache-Control", "no-store");
  return response;
}

function invalidCredentials(request: Request) {
  return redirectToAdmin(request, true);
}

async function delayInvalidAttempt() {
  await new Promise((resolve) => setTimeout(resolve, 350 + Math.floor(Math.random() * 450)));
}

export async function POST(request: Request) {
  try {
    const originError = rejectInvalidOrigin(request);
    if (originError) return originError;

    if (!isFormRequest(request)) {
      return new NextResponse("Unsupported content type.", { status: 415, headers: { "Cache-Control": "no-store" } });
    }

    const limitedBody = await readLimitedText(request, LOGIN_MAX_BODY_BYTES);
    if (!limitedBody.ok) {
      return new NextResponse("Request body is too large.", { status: 413, headers: { "Cache-Control": "no-store" } });
    }

    const formData = new URLSearchParams(limitedBody.text);
    const password = String(formData.get("password") || "");

    const limited = await rateLimit({
      request,
      prefix: "admin-login",
      limit: 5,
      windowSeconds: 15 * 60,
      account: "admin",
    });
    if (!limited.allowed) {
      return new NextResponse("Too many requests.", {
        status: 429,
        headers: { "Cache-Control": "no-store", "Retry-After": String(limited.retryAfter) },
      });
    }

    if (!(await validPassword(password))) {
      await delayInvalidAttempt();
      return invalidCredentials(request);
    }

    const response = redirectToAdmin(request);
    response.cookies.set(SESSION_COOKIE, await createAdminSession(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: SESSION_MAX_AGE_SECONDS,
    });
    return response;
  } catch (error) {
    if (error instanceof ConfigurationError || (error instanceof Error && error.name === "ConfigurationError")) {
      console.error("Admin login configuration error:", error.message);
    } else {
      console.error("Admin login failed.");
    }
    return invalidCredentials(request);
  }
}

export const GET = methodNotAllowed;
export const PUT = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const DELETE = methodNotAllowed;

