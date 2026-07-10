import "server-only";

import { createHmac } from "node:crypto";
import postgres from "postgres";
import { ConfigurationError } from "@/lib/errors";
import { getClientIp } from "@/lib/request-security";

type RateLimitOptions = {
  request: Request;
  prefix: string;
  limit: number;
  windowSeconds: number;
  account?: string;
};

type RateLimitResult = {
  allowed: boolean;
  retryAfter: number;
};

const memoryStore = new Map<string, { count: number; resetAt: number }>();

function requireRateLimitSecret() {
  const secret = process.env.RATE_LIMIT_SECRET || process.env.SESSION_SECRET;
  if (!secret || Buffer.byteLength(secret, "utf8") < 32) {
    throw new ConfigurationError("RATE_LIMIT_SECRET must be set to at least 32 random bytes.");
  }
  return secret;
}

function hashKey(value: string) {
  return createHmac("sha256", requireRateLimitSecret()).update(value).digest("base64url");
}

function keyFor(options: RateLimitOptions) {
  const ipHash = hashKey(getClientIp(options.request));
  const accountHash = options.account ? hashKey(options.account.toLowerCase()) : "none";
  return `rl:${options.prefix}:${ipHash}:${accountHash}`;
}

async function postgresLimit(key: string, limit: number, windowSeconds: number): Promise<RateLimitResult> {
  const sql = postgres(process.env.DATABASE_URL!, { max: 1, prepare: false });
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS rate_limits (
        key TEXT PRIMARY KEY,
        count INTEGER NOT NULL,
        reset_at TIMESTAMPTZ NOT NULL
      )
    `;
    const rows = await sql<{ count: number; resetAt: Date }[]>`
      INSERT INTO rate_limits (key, count, reset_at)
      VALUES (${key}, 1, NOW() + (${windowSeconds} || ' seconds')::INTERVAL)
      ON CONFLICT (key)
      DO UPDATE SET
        count = CASE
          WHEN rate_limits.reset_at <= NOW() THEN 1
          ELSE rate_limits.count + 1
        END,
        reset_at = CASE
          WHEN rate_limits.reset_at <= NOW() THEN NOW() + (${windowSeconds} || ' seconds')::INTERVAL
          ELSE rate_limits.reset_at
        END
      RETURNING count, reset_at AS "resetAt"
    `;
    const row = rows[0];
    const retryAfter = Math.max(1, Math.ceil((new Date(row.resetAt).getTime() - Date.now()) / 1000));
    return { allowed: row.count <= limit, retryAfter };
  } finally {
    await sql.end();
  }
}

async function upstashLimit(key: string, limit: number, windowSeconds: number): Promise<RateLimitResult> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    throw new ConfigurationError("Upstash Redis rate limiter is not configured.");
  }

  const response = await fetch(`${url.replace(/\/$/, "")}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      ["INCR", key],
      ["EXPIRE", key, windowSeconds, "NX"],
      ["TTL", key],
    ]),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Rate limit provider failed.");
  }

  const results = (await response.json()) as { result?: number }[];
  const count = Number(results[0]?.result || 0);
  const ttl = Number(results[2]?.result || windowSeconds);
  return { allowed: count <= limit, retryAfter: Math.max(1, ttl) };
}

function memoryLimit(key: string, limit: number, windowSeconds: number): RateLimitResult {
  const now = Date.now();
  const existing = memoryStore.get(key);
  if (!existing || existing.resetAt <= now) {
    memoryStore.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
    return { allowed: true, retryAfter: windowSeconds };
  }

  existing.count += 1;
  return {
    allowed: existing.count <= limit,
    retryAfter: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
  };
}

export async function rateLimit(options: RateLimitOptions) {
  const key = keyFor(options);

  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    return upstashLimit(key, options.limit, options.windowSeconds);
  }

  if (process.env.DATABASE_URL) {
    return postgresLimit(key, options.limit, options.windowSeconds);
  }

  if (process.env.NODE_ENV === "production") {
    throw new ConfigurationError("A durable production rate-limit provider is required.");
  }

  return memoryLimit(key, options.limit, options.windowSeconds);
}

