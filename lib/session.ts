import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

class ConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConfigurationError";
  }
}

export const SESSION_COOKIE = "__Host-zivora_admin";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 4;

type SessionPayload = {
  sub: "admin";
  role: "admin";
  iat: number;
  exp: number;
  nonce: string;
};

function encode(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

function decode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

export function requireSessionSecret(secret = process.env.SESSION_SECRET) {
  if (!secret || Buffer.byteLength(secret, "utf8") < 32) {
    throw new ConfigurationError("SESSION_SECRET must be set to at least 32 random bytes.");
  }
  return secret;
}

function signPayload(encodedPayload: string, secret: string) {
  return createHmac("sha256", secret).update(encodedPayload).digest("base64url");
}

export function createAdminSessionToken(now = Date.now(), secret = process.env.SESSION_SECRET) {
  const sessionSecret = requireSessionSecret(secret);
  const issuedAt = Math.floor(now / 1000);
  const payload: SessionPayload = {
    sub: "admin",
    role: "admin",
    iat: issuedAt,
    exp: issuedAt + SESSION_MAX_AGE_SECONDS,
    nonce: randomBytes(16).toString("base64url"),
  };
  const encodedPayload = encode(JSON.stringify(payload));
  const signature = signPayload(encodedPayload, sessionSecret);
  return `v1.${encodedPayload}.${signature}`;
}

export function verifyAdminSessionToken(token: string | undefined, now = Date.now(), secret = process.env.SESSION_SECRET) {
  if (!token) return false;
  const sessionSecret = requireSessionSecret(secret);
  const parts = token.split(".");
  if (parts.length !== 3 || parts[0] !== "v1") return false;

  const [, encodedPayload, signature] = parts;
  const expected = signPayload(encodedPayload, sessionSecret);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (actualBuffer.length !== expectedBuffer.length || !timingSafeEqual(actualBuffer, expectedBuffer)) {
    return false;
  }

  try {
    const payload = JSON.parse(decode(encodedPayload)) as Partial<SessionPayload>;
    const currentTime = Math.floor(now / 1000);
    return (
      payload.sub === "admin" &&
      payload.role === "admin" &&
      typeof payload.iat === "number" &&
      typeof payload.exp === "number" &&
      payload.iat <= currentTime &&
      payload.exp > currentTime
    );
  } catch {
    return false;
  }
}
