# Vansh Jain 3D Portfolio

Modern production-ready developer portfolio with a public 3D experience and a protected admin dashboard.

## Stack

- Next.js App Router, TypeScript, Tailwind CSS
- Framer Motion, Three.js, React Three Fiber
- Shadcn-style local UI primitives
- Prisma ORM with PostgreSQL
- NextAuth credentials authentication using one env-only admin
- Cloudinary uploads for images and resume PDFs

## Features

- Futuristic animated landing page with interactive 3D scene, particles, animated cursor, and role rotator
- About, projects, resume, and contact pages
- Project search, category filtering, sorting, animated modal, hover tilt cards
- Admin dashboard for projects, content, skills, and resume upload
- Optional GitHub and demo links with clear public labels for private repos or missing demos
- Contact form with validation, rate limiting, and Resend email support
- SEO metadata, robots, sitemap, responsive layout, accessible controls

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from `.env.example` and set:

```bash
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require
AUTH_SECRET=
AUTH_URL=http://localhost:3000
ADMIN_EMAIL=
ADMIN_PASSWORD=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CONTACT_TO_EMAIL=
RESEND_API_KEY=
```

3. Generate Prisma client and push/seed the database:

```bash
npm run prisma:generate
npx prisma db push
npm run seed
```

Use a hosted PostgreSQL database from Neon, Supabase, Railway, or Render. Do not use a local MongoDB URL.

4. Start development:

```bash
npm run dev
```

Open `http://localhost:3000` and sign in at `/admin/login` with the single admin email/password from `.env.local`.

## Deployment To Vercel

1. Push this repository to GitHub.
2. Create a Vercel project and add all environment variables from `.env.example`.
3. Use Neon, Supabase, Railway, or another hosted PostgreSQL database for `DATABASE_URL`.
4. Add Cloudinary credentials for uploads.
5. Run `npx prisma db push` and `npm run seed` once against production to create content tables and categories.
6. Deploy with the default Next.js build command:

```bash
npm run build
```

After deployment, open `/api/health` on the live site to confirm Vercel can reach PostgreSQL.

## Notes

- Resume content is not extracted automatically. Upload the PDF from the admin panel.
- Only one admin is allowed, controlled by `ADMIN_EMAIL` and `ADMIN_PASSWORD` in environment variables. Signup is disabled.
- Placeholders are intentionally structured and editable, so Vansh can replace them with accurate content.
- On mobile, the 3D scene uses conservative device pixel ratio settings for smoother rendering.
