# ZIVORA — 3D AI Automation Agency Website

A premium, full-stack agency website built for an AI automation and digital growth business. The brand name and contact details are intentionally centralized so they can be replaced in one file.

## What is included

- Cinematic WebGL hero built with React Three Fiber and Drei
- Scroll, hover and entrance animation with Motion
- Responsive dark-futuristic glass interface
- Services for AI automation, websites, custom AI tools, AdSense, social media and paid growth
- Interactive “business operating system” section
- Business-first process and industry positioning
- Real project brief form with server-side Zod validation
- Honeypot spam protection
- Lead persistence:
  - Local JSON storage in development
  - PostgreSQL automatically when `DATABASE_URL` is configured
- Password-protected lead dashboard at `/admin`
- SEO metadata and reduced-motion support

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- React Three Fiber + Drei + Three.js
- Motion for React
- PostgreSQL via `postgres`
- Zod validation

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

The default development admin password is `change-this-password`. Change it in `.env.local` before sharing or deploying.

## Brand customization

Edit `lib/site.ts` to change:

- Agency name
- Descriptor
- Email
- Phone
- Location
- Services and service copy
- Process copy

The website is branded as **ZIVORA**, the selected agency identity. Core brand and contact details remain centralized in `lib/site.ts` for easy updates.

## Production database

Set a PostgreSQL connection string:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require
ADMIN_PASSWORD=use-a-strong-password
SESSION_SECRET=use-a-long-random-secret
```

The app creates the `leads` table automatically on the first submission or admin dashboard load.

## Deploy

The project is ready for Vercel or any Node-compatible host. For production, configure the three environment variables above. Do not rely on local JSON storage in a serverless deployment because the filesystem is ephemeral.

## Commands

```bash
npm run dev
npm run build
npm run start
npm run lint
```
