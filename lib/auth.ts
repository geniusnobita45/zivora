import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "zivora_admin";

function secret() {
  return process.env.SESSION_SECRET || "development-only-change-me";
}

export function sessionToken() {
  return createHmac("sha256", secret()).update("zivora-admin-session").digest("hex");
}

export function validPassword(value: string) {
  const expected = process.env.ADMIN_PASSWORD || "change-this-password";
  const a = Buffer.from(value);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function isAdmin() {
  const store = await cookies();
  return store.get(SESSION_COOKIE)?.value === sessionToken();
}
