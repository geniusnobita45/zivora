import { createHmac, randomUUID, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import postgres from "postgres";

const KEY_LENGTH = 64;

function loadDotEnvFile(file) {
  if (!existsSync(file)) return;

  const lines = readFileSync(file, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const equals = trimmed.indexOf("=");
    if (equals === -1) continue;

    const key = trimmed.slice(0, equals).trim();
    let value = trimmed.slice(equals + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) process.env[key] = value;
  }
}

function pass(message) {
  console.log(`[PASS] ${message}`);
}

function fail(message) {
  console.error(`[FAIL] ${message}`);
}

function warn(message) {
  console.warn(`[WARN] ${message}`);
}

function hasStrongSecret(name) {
  const value = process.env[name] || "";
  if (Buffer.byteLength(value, "utf8") < 32) {
    fail(`${name} is missing or shorter than 32 bytes.`);
    return false;
  }
  pass(`${name} is set and strong enough.`);
  return true;
}

function validateAdminHashFormat() {
  const hash = process.env.ADMIN_PASSWORD_HASH || "";
  const parts = hash.split("$");

  if (parts.length !== 6 || parts[0] !== "scrypt") {
    fail("ADMIN_PASSWORD_HASH is not in the expected scrypt$N$r$p$salt$hash format.");
    return false;
  }

  const [, nValue, rValue, pValue, saltValue, hashValue] = parts;
  const n = Number(nValue);
  const r = Number(rValue);
  const p = Number(pValue);
  const salt = Buffer.from(saltValue, "base64url");
  const expected = Buffer.from(hashValue, "base64url");

  if (!Number.isInteger(n) || !Number.isInteger(r) || !Number.isInteger(p)) {
    fail("ADMIN_PASSWORD_HASH has invalid scrypt parameters.");
    return false;
  }

  if (salt.length < 16 || expected.length !== KEY_LENGTH) {
    fail("ADMIN_PASSWORD_HASH has an invalid salt or hash length.");
    return false;
  }

  pass("ADMIN_PASSWORD_HASH format is valid.");
  return true;
}

function scrypt(password, salt, keyLength, options) {
  return new Promise((resolve, reject) => {
    scryptCallback(password, salt, keyLength, options, (error, derivedKey) => {
      if (error) reject(error);
      else resolve(derivedKey);
    });
  });
}

async function verifyAdminPasswordIfProvided() {
  const password = process.env.ADMIN_PASSWORD_TO_VERIFY;
  if (!password) {
    warn("Set ADMIN_PASSWORD_TO_VERIFY to confirm the live admin password matches ADMIN_PASSWORD_HASH.");
    return true;
  }

  const [, nValue, rValue, pValue, saltValue, hashValue] = process.env.ADMIN_PASSWORD_HASH.split("$");
  const actual = await scrypt(password, Buffer.from(saltValue, "base64url"), KEY_LENGTH, {
    N: Number(nValue),
    r: Number(rValue),
    p: Number(pValue),
  });
  const expected = Buffer.from(hashValue, "base64url");

  if (actual.length === expected.length && timingSafeEqual(actual, expected)) {
    pass("ADMIN_PASSWORD_TO_VERIFY matches ADMIN_PASSWORD_HASH.");
    return true;
  }

  fail("ADMIN_PASSWORD_TO_VERIFY does not match ADMIN_PASSWORD_HASH.");
  return false;
}

function validateDatabaseUrlFormat() {
  const value = process.env.DATABASE_URL || "";
  if (!value) {
    fail("DATABASE_URL is missing.");
    return false;
  }

  try {
    const url = new URL(value);
    if (!["postgres:", "postgresql:"].includes(url.protocol)) {
      fail("DATABASE_URL must start with postgres:// or postgresql://.");
      return false;
    }
    if (!url.hostname || !url.username || !url.password || !url.pathname.slice(1)) {
      fail("DATABASE_URL must include username, password, host, and database name.");
      return false;
    }
    pass(`DATABASE_URL format is valid for host ${url.hostname}.`);
    return true;
  } catch {
    fail("DATABASE_URL is not a valid URL. If the password has @, #, %, /, ?, or :, use the URI-encoded connection string from Supabase.");
    return false;
  }
}

async function verifyDatabaseConnection() {
  const sql = postgres(process.env.DATABASE_URL, { max: 1, prepare: false, connect_timeout: 10 });
  const leadId = `config-test-${randomUUID()}`;
  const rateLimitKey = `config-test-${randomUUID()}`;

  try {
    await sql`SELECT 1`;
    pass("PostgreSQL connection works.");

    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        company TEXT,
        service TEXT NOT NULL,
        budget TEXT,
        message TEXT NOT NULL,
        source TEXT NOT NULL DEFAULT 'website',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS rate_limits (
        key TEXT PRIMARY KEY,
        count INTEGER NOT NULL,
        reset_at TIMESTAMPTZ NOT NULL
      )
    `;
    pass("Required tables can be created.");

    await sql`
      INSERT INTO leads (id, name, email, service, message, source)
      VALUES (${leadId}, 'Config Test', 'config-test@example.com', 'AI Automation', 'Temporary production config test lead.', 'config-test')
    `;
    await sql`DELETE FROM leads WHERE id = ${leadId}`;
    pass("Lead insert/delete works.");

    await sql`
      INSERT INTO rate_limits (key, count, reset_at)
      VALUES (${rateLimitKey}, 1, NOW() + INTERVAL '60 seconds')
    `;
    await sql`DELETE FROM rate_limits WHERE key = ${rateLimitKey}`;
    pass("Rate-limit insert/delete works.");
    return true;
  } catch (error) {
    fail(`PostgreSQL check failed: ${error?.message || String(error)}`);
    return false;
  } finally {
    await sql.end({ timeout: 5 }).catch(() => {});
  }
}

function verifyRateLimitHashing() {
  const secret = process.env.RATE_LIMIT_SECRET || process.env.SESSION_SECRET || "";
  if (Buffer.byteLength(secret, "utf8") < 32) {
    fail("Rate-limit hashing cannot run without RATE_LIMIT_SECRET or SESSION_SECRET of at least 32 bytes.");
    return false;
  }

  try {
    createHmac("sha256", secret).update("127.0.0.1").digest("base64url");
    pass("Rate-limit hashing works.");
    return true;
  } catch (error) {
    fail(`Rate-limit hashing failed: ${error?.message || String(error)}`);
    return false;
  }
}

async function main() {
  loadDotEnvFile(".env.local");
  loadDotEnvFile(".env");

  console.log("Checking production config values from environment, .env.local, or .env...\n");

  const checks = [];
  checks.push(hasStrongSecret("SESSION_SECRET"));
  checks.push(hasStrongSecret("RATE_LIMIT_SECRET"));
  checks.push(validateAdminHashFormat());
  if (checks.at(-1)) checks.push(await verifyAdminPasswordIfProvided());
  checks.push(validateDatabaseUrlFormat());
  if (checks.at(-1)) checks.push(await verifyDatabaseConnection());
  checks.push(verifyRateLimitHashing());

  const ok = checks.every(Boolean);
  console.log(ok ? "\nAll required production checks passed." : "\nOne or more production checks failed.");
  process.exit(ok ? 0 : 1);
}

main().catch((error) => {
  fail(error?.message || String(error));
  process.exit(1);
});
