import { randomBytes, scrypt as scryptCallback } from "node:crypto";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);
const keyLength = 64;
const N = 16384;
const r = 8;
const p = 1;

async function readPassword() {
  if (process.env.ADMIN_PASSWORD_TO_HASH) return process.env.ADMIN_PASSWORD_TO_HASH;

  const rl = createInterface({ input, output });
  try {
    return await rl.question("Admin password to hash (input may be visible in this terminal): ");
  } finally {
    rl.close();
  }
}

const password = await readPassword();
if (password.length < 12) {
  console.error("Admin password must be at least 12 characters.");
  process.exit(1);
}

const salt = randomBytes(16);
const derived = await scrypt(password, salt, keyLength, { N, r, p });
const encoded = ["scrypt", String(N), String(r), String(p), salt.toString("base64url"), Buffer.from(derived).toString("base64url")].join("$");

console.log("ADMIN_PASSWORD_HASH=");
console.log(encoded);
