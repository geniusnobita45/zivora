import { NextResponse } from "next/server";

export const SITE_ORIGIN = "https://zivoraai.co.in";

export function jsonNoStore(body: unknown, init: ResponseInit = {}) {
  const response = NextResponse.json(body, init);
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export function methodNotAllowed() {
  return jsonNoStore({ ok: false, error: "Method not allowed." }, { status: 405 });
}

export function unsupportedMediaType() {
  return jsonNoStore({ ok: false, error: "Unsupported content type." }, { status: 415 });
}

export function payloadTooLarge() {
  return jsonNoStore({ ok: false, error: "Request body is too large." }, { status: 413 });
}

export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

export function isJsonRequest(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  return contentType.toLowerCase().startsWith("application/json");
}

export function isFormRequest(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  return contentType.toLowerCase().startsWith("application/x-www-form-urlencoded");
}

export function hasOversizedContentLength(request: Request, maxBytes: number) {
  const contentLength = request.headers.get("content-length");
  if (!contentLength) return false;
  const parsed = Number(contentLength);
  return Number.isFinite(parsed) && parsed > maxBytes;
}

export async function readLimitedText(request: Request, maxBytes: number) {
  if (hasOversizedContentLength(request, maxBytes)) {
    return { ok: false as const };
  }
  const text = await request.text();
  if (Buffer.byteLength(text, "utf8") > maxBytes) {
    return { ok: false as const };
  }
  return { ok: true as const, text };
}

function developmentOrigins() {
  return ["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:3001", "http://127.0.0.1:3001"];
}

function allowedOrigins() {
  const configured = (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
  return process.env.NODE_ENV === "production"
    ? new Set([SITE_ORIGIN, ...configured])
    : new Set([SITE_ORIGIN, ...configured, ...developmentOrigins()]);
}

export function isAllowedOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  return allowedOrigins().has(origin);
}

export function rejectInvalidOrigin(request: Request) {
  return isAllowedOrigin(request) ? null : jsonNoStore({ ok: false, error: "Forbidden." }, { status: 403 });
}

