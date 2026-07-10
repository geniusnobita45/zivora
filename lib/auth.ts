import "server-only";

import { cookies } from "next/headers";
import { ConfigurationError } from "@/lib/errors";
import { verifyPasswordHash } from "@/lib/password";
import { createAdminSessionToken, SESSION_COOKIE, SESSION_MAX_AGE_SECONDS, verifyAdminSessionToken } from "@/lib/session";

export { SESSION_COOKIE, SESSION_MAX_AGE_SECONDS };

export async function createAdminSession() {
  return createAdminSessionToken();
}

export async function validPassword(value: string) {
  const expectedHash = process.env.ADMIN_PASSWORD_HASH;
  if (!expectedHash) {
    throw new ConfigurationError("ADMIN_PASSWORD_HASH is required.");
  }
  return verifyPasswordHash(value, expectedHash);
}

export async function isAdmin() {
  const store = await cookies();
  return verifyAdminSessionToken(store.get(SESSION_COOKIE)?.value);
}
