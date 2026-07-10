# ZIVORA AI Security Audit Report

Date: 2026-07-10
Branch: security/zivora-production-hardening
Production URL in scope: https://zivoraai.co.in

## 1. Executive Summary

A defensive security hardening pass was performed against the local Next.js production website repository. The most important issues found were weak custom admin authentication, committed fallback credentials, static session cookies, missing production-grade rate-limit enforcement, permissive/absent request integrity checks, incomplete contact-form abuse controls, production lead-storage ambiguity, and missing baseline security headers.

The identified issues within the reviewed local scope were remediated and validated. This does not mean the website is completely secure. Security still requires correct Vercel environment configuration, credential rotation where history exposure is possible, dependency monitoring, production observability, and periodic reassessment.

## 2. Platform Inventory

- Framework: Next.js 16.2.10, App Router.
- React: 19.2.7.
- React DOM: 19.2.7.
- Node used locally: v22.15.0.
- npm used locally: 10.9.2.
- Package manager: npm is represented by `package-lock.json`; `pnpm-lock.yaml` also exists and was used only as a local fallback after npm registry timeouts.
- Public routes: `/`, `/sitemap.xml`, `/robots.txt`.
- Protected route: `/admin`.
- API routes: `POST /api/leads`, `POST /api/admin/login`, `POST /api/admin/logout`.
- Middleware/proxy: `proxy.ts` for security headers and admin/API cache/robots headers.
- Server Actions: none found.
- Lead storage: Postgres via `DATABASE_URL`; local `.data/leads.json` only outside production.
- External resources: Google Fonts, local images, React Three Fiber/Three.js WebGL, `blob:` for worker-compatible CSP scope.

## 3. Findings And Remediation

### Critical

SEC-001: Fallback admin password and session secret
- Affected files: `lib/auth.ts`, `.env.example`.
- Vulnerable behavior: production could authenticate with fallback values if environment variables were missing.
- Impact: admin dashboard compromise.
- Remediation: removed fallback credentials; require `ADMIN_PASSWORD_HASH` and strong `SESSION_SECRET`.
- Validation: `rg` found no fallback patterns; tests verify strong secret requirement.

SEC-002: Static admin session token
- Affected file: `lib/auth.ts`.
- Vulnerable behavior: cookie value was a static HMAC for all sessions with no expiry payload.
- Impact: stolen cookie remained valid until secret rotation.
- Remediation: added signed session payload with subject, role, issued time, expiry, and nonce; cookie renamed to `__Host-zivora_admin`.
- Validation: tests cover valid, tampered, expired, and missing sessions.

### High

SEC-003: Production rate limiting was not durable
- Affected files: `app/api/leads/route.ts`, `app/api/admin/login/route.ts`.
- Vulnerable behavior: no production-grade abuse control on public form or admin login.
- Impact: credential stuffing, spam, resource exhaustion.
- Remediation: added provider abstraction with Upstash Redis or Postgres durable storage; in-memory fallback is development-only and production fails closed without durable config.
- Validation: typecheck/build/tests passed; report documents required production config.

SEC-004: Contact endpoint accepted weak request shapes
- Affected file: `app/api/leads/route.ts`.
- Vulnerable behavior: direct JSON parsing without body limit, content-type enforcement, origin verification, or unknown-field rejection.
- Impact: abuse, malformed requests, unexpected data capture.
- Remediation: added strict Zod schema, body-size cap, content-type checks, origin allowlist, honeypot handling, and minimum completion time.
- Validation: tests cover valid request, invalid email, unknown field, oversized message, fast submission, and honeypot behavior.

SEC-005: Lead storage could silently use ephemeral filesystem in production
- Affected file: `lib/leads.ts`.
- Vulnerable behavior: missing `DATABASE_URL` fell back to `.data/leads.json` even in production.
- Impact: lost production leads on Vercel serverless instances.
- Remediation: production now requires `DATABASE_URL`; local file fallback remains for development only.
- Validation: typecheck/build passed; documented Vercel requirement.

### Medium

SEC-006: Missing CSRF/origin checks on state-changing endpoints
- Affected files: `app/api/leads/route.ts`, `app/api/admin/login/route.ts`, `app/api/admin/logout/route.ts`.
- Vulnerable behavior: state changes did not verify origin.
- Impact: cross-site submission/logout/login attempts.
- Remediation: added explicit allowed origin checks for production origin and development origins only outside production.
- Validation: timed smoke test confirmed wrong-origin contact POST returns 403.

SEC-007: Missing sensitive response cache controls and admin noindex headers
- Affected files: `proxy.ts`, `app/admin/page.tsx`, API routes.
- Vulnerable behavior: admin and API responses lacked consistent `no-store`; admin relied on robots exclusion only.
- Impact: private lead data could be cached or indexed unexpectedly.
- Remediation: added `Cache-Control: no-store` on admin/API, admin metadata noindex, and `X-Robots-Tag: noindex, nofollow, noarchive`.
- Validation: timed smoke test confirmed admin `no-store` and `X-Robots-Tag`.

SEC-008: Security headers were incomplete
- Affected files: `next.config.ts`, `proxy.ts`.
- Vulnerable behavior: no project-specific CSP/security header baseline.
- Impact: weaker browser-side containment.
- Remediation: added CSP, `nosniff`, `DENY` framing, referrer policy, permissions policy, HSTS, COOP, CORP, and disabled `X-Powered-By`.
- Validation: timed smoke test confirmed CSP and security headers on public/admin pages.

### Low

SEC-009: Admin error messaging was too specific
- Affected file: `app/admin/page.tsx`.
- Vulnerable behavior: login UI said incorrect password.
- Impact: unnecessary auth detail exposure.
- Remediation: replaced with generic `Invalid credentials`.
- Validation: build passed.

SEC-010: Admin lead list had no query limit
- Affected file: `lib/leads.ts`.
- Vulnerable behavior: unrestricted bulk read from lead storage.
- Impact: growing response size and avoidable private-data exposure.
- Remediation: added a 100-lead limit for admin reads.
- Validation: typecheck/build passed.

### Informational

SEC-011: JSON-LD uses `dangerouslySetInnerHTML`
- Affected file: `app/layout.tsx`.
- Behavior: structured data is inserted via React's required JSON-LD pattern.
- Risk: low because values are static and serialized with `JSON.stringify`; no user input is included.
- Action: retained and documented.

SEC-012: CSP still allows inline scripts/styles
- Affected file: `proxy.ts`.
- Behavior: CSP includes `script-src 'self' 'unsafe-inline'` and style inline allowance.
- Risk: weaker than nonce-based CSP.
- Reason retained: current Next/static rendering, JSON-LD, and Google font/style behavior were preserved without forcing the public marketing site into dynamic nonce rendering.
- Future action: evaluate nonce-based CSP in a performance-aware follow-up.

## 4. Dependency Results

Dependencies updated: none. No vulnerable dependency required an upgrade during this pass.

Audit results:
- `npm audit`: found 0 vulnerabilities.
- `npm audit --omit=dev`: found 0 vulnerabilities.

Outdated results from live registry check:
- `@types/node`: current/wanted 24.13.3, latest 26.1.1.
- `@types/three`: current 0.185.0, wanted/latest 0.185.1.
- `eslint`: current/wanted 9.39.4, latest 10.6.0.
- `typescript`: current/wanted 5.9.3, latest 7.0.2.

These are development dependencies or type/lint tooling updates. They were not upgraded because the audit found no vulnerabilities and major toolchain jumps can cause unnecessary compatibility churn.

Install caveat:
- `npm ci` failed locally because registry/mirror requests timed out and npm reported `Exit handler never called!` after the dependency tree had been partially disturbed.
- `pnpm install --frozen-lockfile` restored a working local dependency tree from the existing `pnpm-lock.yaml`, but returned nonzero due pnpm's ignored-build-scripts policy for native packages.
- Final validation commands below were run successfully after that restoration.

## 5. Authentication And Session Changes

- Replaced plaintext `ADMIN_PASSWORD` with `ADMIN_PASSWORD_HASH`.
- Added `scripts/generate-admin-password-hash.mjs` for local hash generation.
- Implemented scrypt password hashing with per-password salt.
- Added signed admin session payload with expiry and nonce.
- Set admin cookie attributes: HttpOnly, SameSite=Lax, Path=/, Secure in production, short max age.
- Added secure logout cookie clearing.
- Added generic auth failures and progressive delay on invalid attempts.
- Added durable rate limit check for admin login.

## 6. Contact Form And API Security

- Strict server-side Zod validation.
- Unknown fields rejected.
- Email normalized to lowercase.
- Service and budget constrained to explicit allowlists.
- Message limited to 4,000 characters.
- Body limited to 12,000 bytes before parsing.
- JSON content type required.
- Honeypot retained and handled without storing spam leads.
- Minimum realistic form completion time added.
- API responses use generic public errors and avoid raw exception details.
- Public API does not return lead IDs after submission.

## 7. Rate Limiting

Protected surfaces:
- Contact submissions: 6 requests per IP per 15 minutes.
- Admin login: 5 attempts per IP/account per 15 minutes.

Production provider behavior:
- Uses Upstash Redis when `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are set.
- Otherwise uses Postgres via `DATABASE_URL`.
- Refuses in-memory rate limiting in production.
- Hashes IP/account keys with `RATE_LIMIT_SECRET` or `SESSION_SECRET` to avoid storing raw IP addresses as rate-limit keys.

## 8. CSP And Security Headers

Implemented in `proxy.ts`:
- `Content-Security-Policy`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Frame-Options: DENY`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()`
- `Strict-Transport-Security: max-age=31536000`
- `Cross-Origin-Opener-Policy: same-origin`
- `Cross-Origin-Resource-Policy: same-origin`
- `Cache-Control: no-store` for `/admin` and `/api`
- `X-Robots-Tag: noindex, nofollow, noarchive` for `/admin`

## 9. Database And Lead Data Protections

- Lead data remains outside `public/`.
- Public API cannot list leads.
- Admin page checks server-side authentication before reading leads.
- Postgres writes use tagged template parameterization.
- Production no longer falls back to local files.
- Admin reads are capped at 100 leads.
- Lead responses/admin routes are no-store.
- Admin rendering uses React text escaping for submitted messages.

## 10. Files Created

- `.github/dependabot.yml`
- `.github/workflows/security-ci.yml`
- `SECURITY.md`
- `SECURITY_DEPLOYMENT.md`
- `SECURITY_AUDIT_REPORT.md`
- `lib/contact-validation.ts`
- `lib/errors.ts`
- `lib/password.ts`
- `lib/rate-limit.ts`
- `lib/request-security.ts`
- `lib/session.ts`
- `proxy.ts`
- `scripts/generate-admin-password-hash.mjs`
- `tests/security.test.ts`

Also present from the pre-existing working tree before this hardening pass:
- `app/robots.ts`
- `app/sitemap.ts`

## 11. Files Modified

- `.env.example`
- `.gitignore`
- `app/admin/page.tsx`
- `app/api/admin/login/route.ts`
- `app/api/admin/logout/route.ts`
- `app/api/leads/route.ts`
- `app/layout.tsx`
- `components/AgencySite.tsx`
- `lib/auth.ts`
- `lib/leads.ts`
- `lib/site.ts`
- `next.config.ts`
- `package.json`
- `tsconfig.json`

## 12. Required Environment Variables

Set in Vercel Project Settings > Environment Variables. Variable names only:

- `DATABASE_URL`
- `ADMIN_PASSWORD_HASH`
- `SESSION_SECRET`
- `RATE_LIMIT_SECRET`

Optional:

- `ALLOWED_ORIGINS`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

## 13. Vercel Manual Actions Required

- Add the required Production environment variables.
- Use distinct Preview and Development secrets.
- Generate `ADMIN_PASSWORD_HASH` locally and store only the hash in Vercel.
- Confirm production Postgres is persistent and backed up.
- Rotate any credential that may have appeared in Git history or logs.
- Enable multi-factor authentication on the Vercel account.
- Review team access, connected Git providers, integrations, and unused environment variables.

## 14. GitHub Manual Actions Recommended

- Enable Dependabot alerts and security updates.
- Require the new Security CI workflow before merge.
- Consider CodeQL for JavaScript/TypeScript after the repository remote is confirmed.
- Protect the default branch and require review for production deployments.

## 15. Validation Results

Successful:
- `npm test`: 9 tests passed.
- `npm run typecheck`: passed.
- `npm run lint`: exited 0 with one pre-existing Next font-loading warning in `app/layout.tsx`.
- `npm run build`: passed; routes generated successfully.
- `npm audit`: found 0 vulnerabilities.
- `npm audit --omit=dev`: found 0 vulnerabilities.
- Timed local production smoke test: `/`, `/sitemap.xml`, `/robots.txt`, `/admin` returned 200.
- Timed sensitive-file probes: `/.env`, `/.env.local`, `/.git/config`, `/package.json`, `/tsconfig.json` returned 404.
- Timed wrong-origin `POST /api/leads`: returned 403.
- Header smoke: homepage CSP present, `nosniff` present; admin `no-store`, `X-Robots-Tag`, `DENY`, and permissions policy present.

Caveats:
- `npm ci` could not be completed locally because of registry/mirror timeouts and npm internal exit-handler failure.
- `npm ls --depth=0` is noisy after pnpm restored the dependency tree, because npm sees pnpm's symlinked layout as extraneous packages. This is a local package-manager artifact, not a runtime vulnerability.
- Full browser visual verification of WebGL was not completed in this pass, but the production build and local homepage smoke test succeeded.

## 16. Exact URLs To Test After Vercel Redeployment

- https://zivoraai.co.in/
- https://zivoraai.co.in/sitemap.xml
- https://zivoraai.co.in/robots.txt
- https://zivoraai.co.in/admin
- https://zivoraai.co.in/api/leads
- https://zivoraai.co.in/.env
- https://zivoraai.co.in/.env.local
- https://zivoraai.co.in/.git/config
- https://zivoraai.co.in/package.json
- https://zivoraai.co.in/tsconfig.json

## 17. Remaining Risks

- Production will fail closed for lead submission/admin login until required Vercel variables are configured.
- CSP is enforced but not nonce-based; inline script/style allowance remains for compatibility.
- The local repository history was not rewritten or scrubbed. Rotate credentials if any real secret ever existed in Git history.
- Durable rate limiting depends on correctly configured Upstash Redis or Postgres in production.
- The admin system is now materially stronger, but a full managed identity provider, MFA, and audit logs would improve administrative assurance.

## 18. Honest Security Conclusion

The identified issues within the reviewed scope were remediated and validated. Security requires continued dependency updates, monitoring, credential hygiene, correct Vercel configuration, and periodic reassessment.
