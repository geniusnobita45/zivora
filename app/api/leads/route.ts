import { CONTACT_MAX_BODY_BYTES, parseLeadSubmission } from "@/lib/contact-validation";
import { ConfigurationError } from "@/lib/errors";
import { saveLead } from "@/lib/leads";
import { rateLimit } from "@/lib/rate-limit";
import {
  isJsonRequest,
  jsonNoStore,
  methodNotAllowed,
  payloadTooLarge,
  readLimitedText,
  rejectInvalidOrigin,
  unsupportedMediaType,
} from "@/lib/request-security";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const originError = rejectInvalidOrigin(request);
    if (originError) return originError;

    if (!isJsonRequest(request)) {
      return unsupportedMediaType();
    }

    const limited = await readLimitedText(request, CONTACT_MAX_BODY_BYTES);
    if (!limited.ok) return payloadTooLarge();

    let body: unknown;
    try {
      body = JSON.parse(limited.text);
    } catch {
      return jsonNoStore({ ok: false, error: "Please check the form and try again." }, { status: 400 });
    }

    const limitedByRate = await rateLimit({
      request,
      prefix: "contact",
      limit: 6,
      windowSeconds: 15 * 60,
    });
    if (!limitedByRate.allowed) {
      return jsonNoStore(
        { ok: false, error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": String(limitedByRate.retryAfter) } },
      );
    }

    const parsed = parseLeadSubmission(body);
    if (!parsed.ok) {
      return jsonNoStore({ ok: false, error: "Please check the form and try again." }, { status: 400 });
    }

    if (parsed.spam) {
      return jsonNoStore({ ok: true });
    }

    await saveLead(parsed.data);
    return jsonNoStore({ ok: true }, { status: 201 });
  } catch (error) {
    if (error instanceof ConfigurationError) {
      console.error("Lead submission configuration error:", error.message);
    } else {
      console.error("Lead submission failed.");
    }
    return jsonNoStore({ ok: false, error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

export const GET = methodNotAllowed;
export const PUT = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const DELETE = methodNotAllowed;

