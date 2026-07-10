import assert from "node:assert/strict";
import test from "node:test";
import { parseLeadSubmission } from "../lib/contact-validation.ts";
import { hashPassword, verifyPasswordHash } from "../lib/password.ts";
import { createAdminSessionToken, verifyAdminSessionToken } from "../lib/session.ts";

const now = Date.now();
const validSubmission = {
  name: "Aryan Sharma",
  email: "OWNER@EXAMPLE.COM",
  phone: "+91 98765 43210",
  company: "Zivora AI",
  service: "AI Automation",
  budget: "Help me figure it out",
  message: "We need secure workflow automation for inbound leads.",
  website: "",
  formStartedAt: now - 3_000,
};

test("valid contact request is normalized", () => {
  const result = parseLeadSubmission(validSubmission, now);
  assert.equal(result.ok, true);
  assert.equal(result.spam, false);
  assert.equal(result.data.email, "owner@example.com");
});

test("contact validation rejects invalid email", () => {
  const result = parseLeadSubmission({ ...validSubmission, email: "not-email" }, now);
  assert.equal(result.ok, false);
});

test("contact validation rejects unknown fields", () => {
  const result = parseLeadSubmission({ ...validSubmission, admin: true }, now);
  assert.equal(result.ok, false);
});

test("contact validation rejects oversized messages", () => {
  const result = parseLeadSubmission({ ...validSubmission, message: "x".repeat(4_001) }, now);
  assert.equal(result.ok, false);
});

test("contact validation rejects unrealistically fast submissions", () => {
  const result = parseLeadSubmission({ ...validSubmission, formStartedAt: now - 100 }, now);
  assert.equal(result.ok, false);
});

test("honeypot submissions are accepted but flagged as spam", () => {
  const result = parseLeadSubmission({ ...validSubmission, website: "https://spam.example" }, now);
  assert.equal(result.ok, true);
  assert.equal(result.spam, true);
});

test("admin password hashes verify without accepting wrong passwords", async () => {
  const encoded = await hashPassword("correct horse battery staple");
  assert.equal(await verifyPasswordHash("correct horse battery staple", encoded), true);
  assert.equal(await verifyPasswordHash("wrong horse battery staple", encoded), false);
});

test("admin sessions reject tampering and expiry", () => {
  const secret = "0123456789abcdef0123456789abcdef";
  const issuedAt = Date.UTC(2026, 0, 1);
  const token = createAdminSessionToken(issuedAt, secret);
  assert.equal(verifyAdminSessionToken(token, issuedAt + 1_000, secret), true);
  assert.equal(verifyAdminSessionToken(`${token}tampered`, issuedAt + 1_000, secret), false);
  assert.equal(verifyAdminSessionToken(token, issuedAt + 5 * 60 * 60 * 1000, secret), false);
});

test("admin sessions require a strong secret", () => {
  assert.throws(() => createAdminSessionToken(now, "short"), /SESSION_SECRET/);
});
