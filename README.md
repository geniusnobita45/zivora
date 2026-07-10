# ZIVORA AI - 3D AI Automation Agency Website

Production website: https://zivoraai.co.in

Business contact:

- Email: aryansharma@zivoraai.co.in
- Phone: +91 95690 65509, +91 80547 85509
- Location: Kanpur Nagar, Uttar Pradesh, India
- Instagram: https://www.instagram.com/zivoraagency01?igsh=MWJ6b3c2dDE2YzhwMA==
- GitHub: https://github.com/geniusnobita45

## What Is Included

- Cinematic WebGL hero built with React Three Fiber and Drei
- Scroll, hover, and entrance animation with Motion
- Responsive dark-futuristic glass interface
- Services for AI automation, websites, custom AI tools, AdSense, social media, and paid growth
- Interactive business operating system section
- Business-first process and industry positioning
- Real project brief form with server-side Zod validation
- Honeypot spam protection
- Lead persistence through PostgreSQL when `DATABASE_URL` is configured
- Local JSON lead storage only outside production
- Password-protected lead dashboard at `/admin`
- SEO metadata, sitemap, robots, JSON-LD, and reduced-motion support

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- React Three Fiber + Drei + Three.js
- Motion for React
- PostgreSQL via `postgres`
- Zod validation

## Run Locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000` for local development.

Generate an admin password hash before using `/admin`:

```bash
node scripts/generate-admin-password-hash.mjs
```

Place the generated hash in `.env.local` as `ADMIN_PASSWORD_HASH`. Do not commit the plain password or generated production hash.

## Brand Details

Production brand and contact details are centralized in `lib/site.ts`:

- Brand name
- Descriptor
- Email
- Phone numbers
- Location
- Social links
- Services and service copy
- Process copy

## Production Environment Variables

Set these in Vercel Project Settings > Environment Variables:

```env
DATABASE_URL=
ADMIN_PASSWORD_HASH=
SESSION_SECRET=
RATE_LIMIT_SECRET=
```

Optional, when using Upstash Redis for rate limiting:

```env
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

Production requires persistent database storage. Do not rely on local JSON storage in a serverless deployment.

## Commands

```bash
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
npm run start
```
