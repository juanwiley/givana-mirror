# ASSISTANT_CONTEXT.md — Givana Development Assistant

## Project
**Name:** Givana  
**Tagline:** Give. Thrive. Revive.  
**Primary Domains:**  
- Production: https://givana.us (Vercel)  
- Redirect: https://givana.co → https://givana.us (308 redirect)

## Tech Stack
- **Framework:** Next.js (App Router) + React
- **Styling:** Tailwind CSS (mixed with inline styles; may consolidate later)
- **Language:** JavaScript
- **Database:** Supabase (Postgres + RLS; initial schema deployed)
- **Deployment:** GitHub → Vercel
- **Development Environment:** Chromebook (Linux/Crostini), VS Code
- **Form (legacy MVP):** Tally form `woLyex` (not used going forward)
- **Alias:** `@/*` → `src/*`

## Database Structure (current)
**loops**: id, slug (unique), name, geography, created_at  
**listings**: id, title, description, loop_slug (FK → loops.slug), category, images[] (URLs), status (active/pending/rehomed), created_by, created_at

### RLS Intentions (once user auth is wired)
- Public read access to listings in loops the user belongs to (or public loops)
- Users can create listings only in loops they belong to
- Owners can update/close their own listings
- Loop admins/mods can moderate listings & interests

## Routing Conventions
- `/` — Landing (featured listings)
- `/loops` — Loop directory
- `/loops/[slug]` — Loop page (filtered feed)
- `/listings` — All listings
- `/listings/[id]` — Listing details
- `/new-listing` — Create listing (write-gated; auth-gated later)
- `/account` — Profile/settings (future)
- `/splash` — Splash video → redirect to landing

## API Endpoints
- `/api/listings`  
  - **GET:** Public listings feed (`limit` param)  
  - **POST:** Requires `x-givana-secret` header matching `ADMIN_SHARED_SECRET` and `NEXT_PUBLIC_WRITE_GATE` flag; disabled in production without these

## Environment / Secrets
Never commit real secrets. Use `.env.local` locally and Vercel project env in prod.

Expected vars (when Supabase is added):
- NEXT_PUBLIC_SITE_URL=https://givana.us  
- NEXT_PUBLIC_SUPABASE_URL=  
- NEXT_PUBLIC_SUPABASE_ANON_KEY=  
- ADMIN_SHARED_SECRET= # server-only  
- NEXT_PUBLIC_WRITE_GATE= # non-empty string to enable writes (Preview/dev only)  
- SUPABASE_SERVICE_ROLE_KEY= # server-only, later

## UI / UX Principles
- Calm, minimal, mobile-first, but reactive. **FAST** load and navigation.
- Clear copy, big touch targets, accessibility-first (labels/roles/focus states).
- “Loop” awareness everywhere (filters, visibility).
- No leaderboard; show collective impact & gratitude.
- Logotype: horizontal **80px tall**, keep aspect ratio.
- Brand colors:  
  - Text/logo: `#384b5a`  
  - Accents: `#bb6f37` and `#c59547`  
- Images/videos:
  - Lazy-load where possible
  - Max width: respect centered page, no overflow
  - White background should extend to page edges
- Mobile menu:
  - Overlays content instead of pushing it
  - Only display active links with href
- Splash page:
  - White background during “Loading Givana”
  - Video scaled so full height visible on desktop without overflow
  - Header hidden on splash page
- Landing:
  - Center hero images (e.g., `toys.png`)

## Components (current/planned)
- **Header** — nav bar with responsive menu and correct active link handling
- **ListingCard** — card for individual listings
- **LoopFilter** (planned) — search/select loop
- **ListingGrid** (planned) — responsive grid wrapper
- **Footer**
- **PageShell** — layout wrapper

## Performance
- Prefer server components for data-heavy pages
- Lazy-load images, migrate to `next/image` for optimization
- Keep JS bundles lean; avoid heavy dependencies

## Workflows
Local dev:
- `npm run dev` → visit http://localhost:3000  

Lint/format:
- `npm run lint -- --fix`  

Deploy:
- Push to `main` on GitHub → triggers Vercel build
- Vercel env vars must match intended environment (prod vs preview)

DNS:
- Root domain (A) → `76.76.21.21` (Vercel)
- www alias (CNAME) → `cname.vercel-dns.com`

## GitHub Integration Workflow
- **Source of Truth:** All code changes live in the GitHub `main` branch; Vercel pulls directly from it for production builds.
- **Preview Builds:** Create feature branches → push to GitHub → Vercel auto-generates preview deployments.
- **Assistant Review:** Before making changes, assistant will:
  1. Pull the latest file(s) from GitHub for full context.
  2. Compare against the last live build on Vercel (via deployment logs and preview URLs).
  3. Confirm that local changes won’t drift from deployed production code.
- **File Updates:** For large changes, assistant will rewrite the **entire** affected file (e.g., `src/app/listings/page.js`) rather than fragments, to avoid merge drift.
- **Changelog Maintenance:** Any code or design change should be documented in the **CHANGELOG** section of this file before merging.

## Assistant Guidance
When working in this project:
- Always request latest file or GitHub diff before editing, to avoid stale code
- Maintain UX consistency across pages (nav, responsiveness, white background, centered content)
- Keep Supabase integration secure: no exposing service role keys client-side
- For feature builds: prioritize responsive/mobile-first design and accessibility

## CHANGELOG

### 2025-08-09
- Established production environment on https://givana.us with Vercel.
- Configured DNS for `givana.us` and `www.givana.us` → Vercel; `givana.co` redirects to `.us`.
- Locked down `POST /api/listings` in production; writes allowed only in preview/dev with secret header.
- Added responsive nav with correct active state handling.
- Fixed splash page background to white, removed header.
- Limited splash video max width to fit desktop height without overflow.
- Centered hero image (`toys.png`) on landing.
- Mobile menu overlay adjusted to not hide logo or block content unnecessarily.
- Listings grid made responsive; max width centered.
- Added **ASSISTANT_CONTEXT.md** for dev continuity across sessions - this will be used for the AI assistant or user to remember.
