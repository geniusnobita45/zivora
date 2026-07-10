# Security Deployment Notes

## Required Vercel Environment Variables

Set these in Vercel Project Settings > Environment Variables for Production. Use separate values for Preview and Development.

- DATABASE_URL
- ADMIN_PASSWORD_HASH
- SESSION_SECRET
- RATE_LIMIT_SECRET

Optional:

- ALLOWED_ORIGINS
- UPSTASH_REDIS_REST_URL
- UPSTASH_REDIS_REST_TOKEN

`DATABASE_URL` is required for durable production lead storage. Production rate limiting uses Upstash Redis when configured, otherwise it uses `DATABASE_URL`. In-memory rate limiting is allowed only outside production.

## Generate Admin Password Hash

Run locally:

```bash
node scripts/generate-admin-password-hash.mjs
```

Then place only the generated hash in `ADMIN_PASSWORD_HASH`. Do not commit the password or the generated production hash.

## Secret Rotation

If any real credential was ever committed to Git history or exposed in logs, rotate it in the upstream provider and replace it in Vercel. This repository now avoids committed fallback credentials, but history should still be reviewed by the owner.

## Vercel Account Hardening

- Enable multi-factor authentication.
- Use least-privilege team access.
- Review connected Git providers and integrations.
- Remove unused environment variables.
- Keep Production, Preview, and Development environment variables separate.
