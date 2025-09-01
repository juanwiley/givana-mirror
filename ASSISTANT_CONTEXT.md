# ASSISTANT_CONTEXT.md — Givana Development Assistant

## Project
**Name:** Givana  
**Tagline:** **Give. Thrive. Activate.**  
**Primary Domains**
- **Production:** https://givana.us (Vercel / `givana-prod`)
- **Staging:** https://staging.givana.us (Vercel / `givana-dev`)
- **Redirect:** https://givana.co → https://givana.us (308)

## Tech Stack
- **Framework:** Next.js (App Router) + React
- **Styling:** Global CSS (`global.css`) + custom class rules (no Tailwind)
- **Language:** JavaScript
- **Database:** Supabase (Postgres + RLS; separate **staging** and **production** projects)
- **Deployment:** GitHub → Vercel
- **Dev Environment:** Chromebook (Linux/Crostini), VS Code
- **Legacy Form (MVP):** Tally form `woLyex` (not used going forward)
- **Path Alias:** `@/*` → `src/*`

## Database Structure (current)
- **loops**: `id`, `slug` (unique), `name`, `geography`, `created_at`, `description`
- **listings**: `id`, `title`, `description`, `loop_slug` (FK → `loops.slug`), `category`, `images[]` (URLs), `status` (`open`/`rehomed`/etc.), `created_by`, `created_at`

### Suggested Indexes
```sql
create index if not exists idx_loops_slug on loops(slug);
create index if not exists idx_listings_loop_slug on listings(loop_slug);
create index if not exists idx_listings_status_created on listings(status, created_at desc);
```

## RLS Intentions (future when auth is enabled)
- Public read access for **public loops** (or loops the user belongs to)
- Users can create listings only in loops they belong to
- Owners can update/close their own listings
- Loop admins/mods can moderate listings & interests

## Routing Conventions
- `/` — Landing (hero + pillars: **Give, Thrive, Activate**)
- `/loops` — Loop directory (grid)
- `/loops/[slug]` — Loop page (header, actions bar, listings grid, charity & impact panels)
- `/listings` — All listings
- `/listings/[id]` — Listing details (planned)
- `/new-listing` — Create listing (write-gated; auth-gated later)
- `/new-request` — Request help (planned)
- `/account` — Profile/settings (future)
- `/splash` — Splash video → redirect to landing

## API Endpoints
- **`/api/listings`**
  - `GET`: Public listings feed (supports `loop`, `q`, `limit`, `offset`)
  - `POST`: Disabled in Production; allowed only in Preview/Dev when:
    - header `x-givana-secret` = `ADMIN_SHARED_SECRET`, and
    - `NEXT_PUBLIC_WRITE_GATE` present (Preview/Dev only)
- **`/api/debug`**
  - Returns environment info (`NEXT_PUBLIC_SITE_ENV`, Supabase URL, `VERCEL_ENV`)  
  - For diagnostics only. **Guard/disable in Production** (see “Debug & Health”).
- **`/api/health`** (planned)
  - Quick “ok” + optional lightweight DB ping for uptime checks

## Environment / Secrets
> Never commit real secrets. Use `.env.local` locally and **Vercel → Project → Environment Variables** in the cloud.

### Variable Matrix
| Project | Domain | Vars |
|---|---|---|
| **givana-dev** (staging) | `staging.givana.us` | `NEXT_PUBLIC_SUPABASE_URL` = staging URL, `NEXT_PUBLIC_SUPABASE_ANON_KEY` = staging anon, *(optional server)* `SUPABASE_SERVICE_ROLE_KEY` = staging role, `NEXT_PUBLIC_SITE_ENV=staging`, *(optional)* `GIVANA_ENABLE_STAGING_GATE=true`, `STAGING_SECRET=<strong-random>` |
| **givana-prod** (production) | `givana.us` | `NEXT_PUBLIC_SUPABASE_URL` = prod URL, `NEXT_PUBLIC_SUPABASE_ANON_KEY` = prod anon, *(optional server)* `SUPABASE_SERVICE_ROLE_KEY` = prod role, *(no staging gate here)* |

### Notes
- Keep **service role keys server-only** (never `NEXT_PUBLIC_`).
- If schema changes, refresh PostgREST:  
  `NOTIFY pgrst, 'reload schema';`

## DNS
- **Root (`givana.us`)**: `A` → `76.76.21.21` (Vercel)
- **`www`**: `CNAME` → `cname.vercel-dns.com`
- **`staging`**: managed by Vercel DNS (CNAME auto-managed when you add the domain to `givana-dev`)

## UI / UX Principles
- Calm, minimal, mobile-first, fast
- Clear copy, big touch targets, accessible labels/roles/focus
- “Loop” awareness everywhere (filters, visibility)
- No leaderboard; show collective impact & gratitude (e.g., items rehomed, hours logged, funds raised)
- **Logotype:** horizontal, ~80px tall; preserve aspect ratio
- **Brand**
  - Text/logo: `#384b5a`
  - Accents: `#bb6f37`, `#c59547`
- **Images/videos**
  - Lazy-load where possible
  - Respect centered page, no overflow
  - White bg should extend to edges
- **Mobile menu**
  - Overlay; don’t hide the logo; show active links
- **Splash**
  - White bg during “Loading Givana”
  - Video scaled to fit desktop height; header hidden
- **Landing**
  - Center hero (`/toys.png`)
  - Pillars grid (Give / Thrive / Activate)

### Pillars Grid (CSS)
Use CSS Grid to align cards **top** and keep columns balanced.
```css
/* global.css additions */
.pillars-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(220px, 1fr));
  gap: 1.25rem;
  align-items: start; /* top-align */
}
.section-box {
  max-width: 100%;
  text-align: center;
}
@media (max-width: 820px) {
  .pillars-grid { grid-template-columns: 1fr; }
}
```

## Components (current/planned)
- **Header** — responsive nav + active link handling
- **LoopHeader** — loop avatar/name/meta
- **LoopActionsBar** — offer/request CTAs with loop slug propagation
- **LoopListingGrid** — fetches `/api/listings?loop=<slug>` → renders **ListingCard**
- **ListingCard** — image, title, excerpt, loop tag
- **CharityPanel**, **ImpactPanel**
- **Footer**, **PageShell**
- **LoopFilter** (planned), **ListingGrid** (planned)

## Performance
- Prefer **server components** for data-heavy pages
- Lazy-load images; consider `next/image` in production
- Keep bundles lean; avoid heavy deps

## Workflows

### Local Dev
```bash
npm run dev
# http://localhost:3000
```

### Lint/Format
```bash
npm run lint -- --fix
```

### Deploy (new model)
- **Staging (`givana-dev`)**
  - Push to private dev repo/branch → **auto-deploys to `staging.givana.us`**
  - Optional staging gate via middleware (see below)
- **Mirror → Production (`givana-prod`)**
  - GitHub Action mirrors the **frontend-only** code to `juanwiley/givana-mirror`
  - `givana-prod` builds from `juanwiley/givana-mirror`
  - **Auto-assign custom prod domains is disabled**; Vercel shows “Production: Staged”
  - When ready, **Promote to Production** (Vercel UI) or:
    ```bash
    vercel --prod
    ```
  - `givana.us` updates to that build

### Mirror Workflow Notes (critical)
- Ensure **API routes and utils are preserved** in the mirror:
  - **Do not delete** `mirror/src/app/api` in the workflow
  - If needed, explicitly copy:
    ```bash
    mkdir -p mirror/src/app/api && rsync -a src/app/api/ mirror/src/app/api/
    mkdir -p mirror/src/utils    && rsync -a src/utils/    mirror/src/utils/
    ```
- Keep secrets out of the mirror (no `.env*`, no service role keys in client code)

## Staging Privacy (optional, recommended)
Add a middleware guard (enabled only on `givana-dev`).

**`src/middleware.js`**
```js
import { NextResponse } from 'next/server';
const COOKIE = 'staging_ok';
const MAX_AGE = 60 * 60 * 8; // 8h

export function middleware(req) {
  if (process.env.GIVANA_ENABLE_STAGING_GATE !== 'true') return NextResponse.next();

  const { pathname, searchParams } = new URL(req.url);
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/robots') ||
    pathname.startsWith('/sitemap') ||
    pathname.startsWith('/public/')
  ) return NextResponse.next();

  if (req.cookies.get(COOKIE)?.value === '1') return NextResponse.next();

  const provided = searchParams.get('secret') || req.headers.get('x-staging-secret');
  const expected = process.env.STAGING_SECRET || '';
  if (expected && provided === expected) {
    const url = new URL(req.url);
    url.searchParams.delete('secret');
    const res = NextResponse.redirect(url);
    res.cookies.set(COOKIE, '1', { path: '/', httpOnly: true, sameSite: 'Lax', secure: true, maxAge: MAX_AGE });
    return res;
  }
  return new NextResponse('Unauthorized staging site', { status: 401 });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|public).*)'],
};
```

**Vercel env (staging only):**
- `GIVANA_ENABLE_STAGING_GATE=true`
- `STAGING_SECRET=<strong-random>` (URL-safe; generate with `openssl rand -base64 32 | tr -d '=+/' | cut -c1-32`)

Visit once with `?secret=<STAGING_SECRET>` to set the cookie.

## Debug & Health
- **`/api/debug`** exists in both envs to verify wiring.  
  In production, either:
  - remove the route, or
  - require header `x-debug-secret=<value>` and return 404 otherwise.
- **`/api/health`** (planned) for uptime monitors; ping Supabase briefly.

## Assistant Guidance
When working in this project:
- **Always pull latest files or GitHub diff** before editing (avoid stale changes)
- Maintain UX consistency (nav, responsiveness, white background, centered content)
- Keep Supabase integration secure (no client exposure of service role)
- For feature builds: prioritize mobile-first and accessibility
- For infra: keep mirror step from removing `src/app/api/**` or `src/utils/**`

## Git / Source of Truth
- **Staging (givana-dev):** private dev repo (auto-deploy on push)
- **Production (givana-prod):** **public mirror repo** `juanwiley/givana-mirror`
  - Mirror job copies frontend-only code from private repo → mirror
  - Production builds pull from the mirror
- Preview builds are used for inspection; **promotion** is manual

## Troubleshooting Notes
- Supabase schema changes → `NOTIFY pgrst, 'reload schema';`
- Next.js schema-sensitive pages → `export const dynamic = 'force-dynamic';`
- Non-JSON/404 API in Prod → ensure `src/app/api/**` + `src/utils/**` preserved in mirror.
- Vercel “Production: Staged” → promote manually.
- Check env → hit `/api/debug`.

## CHANGELOG
### 2025-09-01
- Renamed production feeder branch from `prod-teaser` → `release`
- Clarified Git model:
  - `main` (private repo) → staging (`givana-dev` → staging.givana.us)
  - `release` (private repo) → mirrored to `mirror/main` (feeds `givana-prod` → givana.us)
  - `mirror/private-main` may still exist but is ignored by prod
- Vercel configuration:
  - **givana-dev** builds from private `main` (staging)
  - **givana-prod** builds from `mirror/main` (production), with previews created from pushes to `release`
  - Ignored Build Step added in **givana-prod** so non-`main` branches (like `private-main`) are skipped
- Middleware staging gate confirmed: only accessible with `STAGING_SECRET`
- Safe to re-enable form submissions in staging since access is gated
- Updated assistant guidance: clarify commit and push process for staging (`git push origin main`) vs prod candidate (`git push origin release`)

### 2025-08-31
- Split deployments: staging vs prod
- Mirror workflow: preserve `src/app/api/**` and `src/utils/**`
- Updated `/loops` and `/loops/[slug]`
- Landing pillars grid in CSS
- Updated docs to include **correct middleware.js**

### 2025-08-09
- Prod env live at https://givana.us
- DNS + redirect setup
- Locked down POST in prod
- Splash page fixes
- Nav + listings grid responsiveness
- Added **ASSISTANT_CONTEXT.md**
