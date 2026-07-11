# Database Setup

This project stores production leads and durable rate-limit counters in PostgreSQL. Supabase PostgreSQL is compatible with the current `postgres` client configuration.

## Required Environment Variable

Set this in Vercel Production, Preview, and Development as appropriate:

- `DATABASE_URL`

Do not expose this value in client code. Do not prefix it with `NEXT_PUBLIC_`.

## Supabase Connection Notes

The application uses the `postgres` package with:

```ts
postgres(url, { max: 1, prepare: false })
```

`prepare: false` is compatible with Supabase pooler-style connections where prepared statements can be problematic.

## Required Tables

The application can create these tables automatically at runtime with `CREATE TABLE IF NOT EXISTS`, but production teams may prefer creating them explicitly in the Supabase SQL Editor before launch.

```sql
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
);

CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);

CREATE TABLE IF NOT EXISTS rate_limits (
  key TEXT PRIMARY KEY,
  count INTEGER NOT NULL,
  reset_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS rate_limits_reset_at_idx ON rate_limits (reset_at);
```

## Supabase SQL Editor Steps

1. Open the Supabase project for Zivora AI.
2. Go to SQL Editor.
3. Run the SQL above.
4. Confirm the `leads` and `rate_limits` tables exist.
5. Confirm `DATABASE_URL` is configured in Vercel and is not committed to Git.
6. Submit one non-production test enquiry from a preview/local deployment using a test database or approved production test plan.
7. Verify the lead appears in the admin dashboard.

## Backup Guidance

- Enable Supabase automated backups for the production project.
- Export the `leads` table before destructive schema changes.
- Test restore/export procedures before relying on them for incident response.
- Do not store admin passwords, password hashes, session secrets, or API tokens in this database unless a future migration explicitly designs for it.

## Operational Notes

- Production must not rely on `.data/leads.json` or temporary Vercel filesystem storage.
- Local development may use `.data/leads.json` only when `DATABASE_URL` is absent and `NODE_ENV` is not production.
- Rate-limit keys are HMAC hashes and should not contain raw IP addresses.