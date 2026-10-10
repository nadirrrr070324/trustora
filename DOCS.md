# TRUSTORA — Final Documentation

> **Trust earned. Rankings explained.**
> A premium service-provider ranking & discovery platform built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**, featuring a weighted trust-score engine and customer / provider / admin dashboards.
>
> **Demo build:** providers, reviews and scores are synthetic demonstration data. The UI labels this everywhere. Local auth + browser storage stand in for Supabase until you connect credentials.

---

## Table of contents

1. [Overview](#1-overview)
2. [Technology stack](#2-technology-stack)
3. [Getting started](#3-getting-started)
4. [Application routes](#4-application-routes)
5. [Architecture & project map](#5-architecture--project-map)
6. [The trust-score engine](#6-the-trust-score-engine)
7. [Data model & demo dataset](#7-data-model--demo-dataset)
8. [Client state store](#8-client-state-store)
9. [Auto-location / geolocation](#9-auto-location--geolocation)
10. [Design system](#10-design-system)
11. [Roles, auth & route gating](#11-roles-auth--route-gating)
12. [Testing](#12-testing)
13. [Environment variables & secrets](#13-environment-variables--secrets)
14. [Deployment](#14-deployment)
15. [Supabase production path](#15-supabase-production-path)
16. [Security posture](#16-security-posture)
17. [Known demo limitations](#17-known-demo-limitations)
18. [Pre-launch checklist](#18-pre-launch-checklist)
19. [Appendix — file reference](#19-appendix--file-reference)

---

## 1. Overview

TRUSTORA is a discovery and ranking platform for service providers across eight categories (home services, IT, tutoring, business, design, automotive, wellness, professional services). Its core differentiator is a **transparent, evidence-backed trust score** on a 0–100 scale that is fully traceable to the underlying reviews and weighting rules — the opposite of an opaque black-box rating.

Key principles baked into the product:

- **Rankings are explained.** Every score shows its component dimensions, review/verified counts, confidence level, and a plain-language explanation.
- **Small samples stay honest.** Bayesian smoothing blends thin evidence with a neutral prior and marks providers *Provisional* rather than inventing a confident score.
- **Suspicious patterns are flagged, never silently applied.** The engine surfaces flags for investigation instead of auto-adjusting scores.
- **Sponsored placements never boost organic rank.** They are labelled and handled at sort time, completely outside the trust score. This is asserted by tests.
- **Demo data is always labelled.** All synthetic content is marked as demonstration data in the UI.

---

## 2. Technology stack

| Layer | Choice | Version / notes |
|---|---|---|
| Framework | Next.js (App Router) | `14.2.13` |
| Language | TypeScript (strict) | `^5.6.2` |
| UI runtime | React | `^18.3.1` |
| Styling | Tailwind CSS + custom CSS design system | `^3.4.13`, PostCSS, autoprefixer |
| Icons | `lucide-react` | `^0.453.0` |
| Class utility | `clsx` | `^2.1.0` |
| Test runner | `tsx` script runner (trust-engine assertions) | `^4.19.1` |
| Runtime | Node | pinned `20.18.0` via `.nvmrc`; `engines.node = 24.x` in `package.json` |
| Persistence (demo) | Browser `localStorage` | see [§8](#8-client-state-store) |
| Persistence (prod) | Supabase (Postgres + Auth + Storage) | SQL migrations in `supabase/` |

> **Node version note:** `.nvmrc`, `render.yaml`, and `DEPLOY.md` target **Node 20.18.0**, while `package.json` `engines` declares `24.x`. For local development use whatever your `.nvmrc`/host provides; for the Render deployment the service pins `NODE_VERSION=20.18.0`. See [§14](#14-deployment) for the full matrix.

---

## 3. Getting started

```bash
cd trustora
npm install
npm run dev            # http://localhost:3000
npm run build          # production build
npm start              # serve the production build
npm run test:trust     # trust-engine assertions (9 tests)
```

Available npm scripts (`package.json`):

| Script | Command | Purpose |
|---|---|---|
| `dev` | `next dev` | Local dev server with HMR |
| `build` | `next build` | Production build |
| `start` | `next start` | Serve production build |
| `lint` | `node scripts/lint-guard.js` | Cross-platform lint guard (see below) |
| `test:trust` | `tsx scripts/test-trust-engine.ts` | Trust-engine assertions |

The lint guard runs `next lint` only when an ESLint config file exists; otherwise it prints a note and exits `0` so cloud builds (Vercel/Render) never fail on a missing ESLint setup.

---

## 4. Application routes

All routes live under `app/` using the Next.js App Router. The primary navigation (`components/Navbar.tsx`) exposes **Discover · Categories · Rankings · How It Works**; the footer groups the rest into Platform, Trust & Safety, Company, and Legal.

### Public / discovery

| Route | File | Description |
|---|---|---|
| `/` | `app/page.tsx` | Home: hero search, category strip, ranked sections, trust stats |
| `/discover` | `app/discover/page.tsx` | Search + filter + sort provider results (see [Discover filters](#discover-filters)) |
| `/categories` | `app/categories/page.tsx` | Browse all categories |
| `/categories/[slug]` | `app/categories/[slug]/page.tsx` | Providers within one category |
| `/providers/[id]` | `app/providers/[id]/page.tsx` (+ `reviews.tsx`) | Provider profile: score, dimensions, reviews, portfolio |
| `/rankings` | `app/rankings/page.tsx` | Ranked leaderboard |
| `/compare` | `app/compare/page.tsx` (+ `table.tsx`) | Side-by-side provider comparison (up to 3) |
| `/trust` | `app/trust/page.tsx` | Trust & verification explainer |

### Trust & safety / company

| Route | File | Description |
|---|---|---|
| `/how-it-works` | `app/how-it-works/page.tsx` | How the platform works |
| `/methodology` | `app/methodology/page.tsx` | Ranking methodology + sponsored disclosure |
| `/report` | `app/report/page.tsx` | Report a problem |
| `/about` | `app/about/page.tsx` | About |
| `/contact` | `app/contact/page.tsx` | Contact form |
| `/help` | `app/help/page.tsx` | Help center |
| `/join` | `app/join/page.tsx` | Provider onboarding |
| `/provider-guidelines` | `app/provider-guidelines/page.tsx` | Provider guidelines |

### Legal

| Route | File | Description |
|---|---|---|
| `/privacy` | `app/privacy/page.tsx` | Privacy policy |
| `/terms` | `app/terms/page.tsx` | Terms of service |

### Authenticated dashboards

| Route | Gate | File | Description |
|---|---|---|---|
| `/signin` | public | `app/signin/page.tsx` | Sign-in + demo role switcher |
| `/dashboard` | customer | `app/dashboard/page.tsx` (+ `tabs-a.tsx`, `tabs-b.tsx`) | Customer dashboard |
| `/provider` | provider/admin | `app/provider/page.tsx` (+ tabs) | Provider dashboard (Harbor & Vale demo) |
| `/admin` | admin | `app/admin/page.tsx` (+ tabs) | Admin console: overview, providers, reviews, users, disputes, config, rest |

#### Discover filters

`/discover` supports:

- **Text search** across provider name, location, service names, and category label.
- **Filters:** category, minimum star rating, verified-only, price band (`budget` ≤ \$100 anchor, `mid` \$100–800, `premium` > \$800).
- **Sorts (4):** Overall ranking (trust score), Customer rating, Value for money, Review count.
- **Active filter chips** with individual clear buttons, an empty-results state, pagination (6 per page, "load more"), and a mobile bottom-sheet filter drawer.

---

## 5. Architecture & project map

```
trustora/
├── app/                     # Next.js App Router — routes & page compositions
│   ├── globals.css          # Design system: glass, buttons, inputs, tokens
│   ├── layout.tsx           # Root layout + metadata + <Shell>
│   ├── page.tsx             # Home
│   ├── home-sections.tsx    # Hero category strip + ranked home sections
│   ├── legal-doc.tsx        # Shared legal-page scaffold
│   ├── discover/            # page + filters + results
│   ├── categories/          # index + [slug]
│   ├── providers/[id]/      # profile + reviews
│   ├── rankings/ compare/ trust/ methodology/ report/
│   ├── about/ contact/ help/ join/ how-it-works/ provider-guidelines/
│   ├── privacy/ terms/
│   ├── signin/
│   ├── dashboard/           # customer tabs
│   ├── provider/            # provider tabs
│   └── admin/               # admin tabs
├── components/              # Reusable UI (Navbar, Footer, Shell, cards, etc.)
├── lib/                     # Domain logic & data
│   ├── types.ts             # Shared TypeScript domain types
│   ├── trust-engine.ts      # THE scoring engine (weights, Bayesian, flags, ranking)
│   ├── categories.ts        # Category catalogue
│   ├── data.ts              # Provider barrel + seeds (enquiries, pending reviews)
│   ├── p-*.ts               # 13 individual provider records
│   ├── data-helpers.ts      # Demo data factories (image URLs, review builder)
│   ├── store.tsx            # Client state (auth, saved, compare, enquiries, moderation)
│   ├── geo.ts               # Auto-location: geolocation + reverse geocoding
│   └── utils.ts             # cx, price/date formatting, uid
├── scripts/
│   ├── test-trust-engine.ts # Trust-engine assertions
│   └── lint-guard.js        # Cross-platform lint guard
├── supabase/                # Production SQL migrations (01–03)
├── public/                  # Static assets (logo.png)
├── DEPLOY.md                # Deployment runbook + verification proof
├── DEPLOYMENT.md            # Deployment guide + acceptance checklist
└── SUPABASE_SETUP.md        # Supabase production wiring
```

**Data flow (client-side):** Pages read the immutable `PROVIDERS` array (`lib/data.ts`), apply any user/provider overrides from the store (`withOverrides`), then run them through `rankProviders` / `computeTrustScore` (`lib/trust-engine.ts`) to produce scores, ranks, and explanations. The store (`lib/store.tsx`) persists auth, saved providers, compare selections, enquiries, submitted reviews, and the moderation queue to `localStorage`.

---

## 6. The trust-score engine

Implemented in `lib/trust-engine.ts`. Produces a 0–100 score from per-dimension review evidence, with confidence, flags, and a human-readable explanation.

### Weights

| Dimension | Weight |
|---|---|
| Customer satisfaction | 30% |
| Quality of work | 25% |
| Reliability & punctuality | 20% |
| Value for money | 15% |
| Complaint resolution | 10% |

```ts
WEIGHTS = { satisfaction: 0.3, quality: 0.25, reliability: 0.2, value: 0.15, resolution: 0.1 }
```

### How a score is computed

1. **Review weighting** — each review contributes `recencyWeight × verifiedMultiplier`:
   - **Verified completed-job reviews** carry **×1.6** weight.
   - **Recency decay** uses a **365-day half-life**: `0.5^(days / 365)`.
2. **Per-dimension average** — for each dimension, `Σ(weight × dimScore)` is blended with a **neutral prior** via **Bayesian smoothing**:
   - `dimension = (Σ w·d + PRIOR_STRENGTH·PRIOR_MEAN) / (Σ w + PRIOR_STRENGTH)`
   - `PRIOR_MEAN = 72`, `PRIOR_STRENGTH = 4`.
3. **Weighted sum** — the five smoothed dimensions are combined using the weights table above, then clamped to `0–100` and rounded.

### Confidence & provisional logic

| Condition | Result |
|---|---|
| `< 3` reviews | `score = null`, confidence **Insufficient**, "Not enough data" |
| `< 8` reviews **or** `< 3` verified | **Provisional** (blended with prior) |
| `≥ 20` reviews **and** `≥ 10` verified | confidence **High** |
| `≥ 8` reviews **and** `≥ 3` verified | confidence **Medium** |
| otherwise | confidence **Low** |

### Suspicious-pattern flags (investigation only, never auto-applied)

`detectSuspiciousPatterns` raises flags when (all require a minimum sample size):

- **Uniform 5-star + short text:** ≥ 75% five-star reviews with average length < 90 chars (n ≥ 4).
- **Burst pattern:** > 50% of reviews arrived in the last 30 days (n ≥ 6).
- **Mostly unverified:** > 60% unverified reviews (n ≥ 6).
- **Weak resolution:** average resolution dimension < 55 (n ≥ 5).

### Ranking (`rankProviders`)

- Providers **with** a score are sorted by score (desc), then verified count (desc), then review count (desc), and assigned ranks `1..n`.
- Providers **without** a score (Insufficient) are appended with `rank = null` (the unranked tail).
- **Sponsored flag is completely ignored by the score and rank** — sponsored providers are labelled in the UI and sorted separately at display time; the flag never changes the computed score (enforced by test).

### Public API

```ts
computeTrustScore(provider, now?): TrustResult
rankProviders(providers, now?): RankedProvider[]
starAverage(provider): { avg: number; count: number }
recencyWeight(dateISO, now): number
reviewWeight(review, now): number
detectSuspiciousPatterns(provider, now?): string[]
export const WEIGHTS, DIMENSION_LABELS, DIMENSIONS
```

`TrustResult` includes: `score`, `provisional`, `confidence`, `dimensions`, `reviewCount`, `verifiedCount`, `unverifiedCount`, `effectiveWeight`, `flags`, and `explanation[]`.

---

## 7. Data model & demo dataset

### Domain types (`lib/types.ts`)

- **`Provider`** — id, name, category, location, areas[], image, initials, verification (`verified|pending|unverified`), licenseNote, price range, quoteAvailable, availability, yearsInBusiness, completedJobs, responseTime, memberSince, services[], portfolio[], about, email, phone, `sponsored?`, `reviews[]`, `scoreHistory[]`.
- **`Review`** — id, providerId, author, authorLocation, rating (1–5), `dims` (five 0–100 dimension scores), date, title, text, verifiedJob, serviceUsed, helpful, optional providerResponse, optional flagged.
- **`SessionUser`** — name, email, role (`customer|provider|admin`), optional providerId.
- **`Enquiry`** — provider/contact/message/status (`new|replied|closed`).
- **`PendingReview`** — submitted review awaiting moderation (status `pending|approved|rejected`).
- Supporting types: `Category`, `DimensionKey`, `DimensionScores`, `VerificationStatus`, `ScorePoint`, `Role`, `CategorySlug`.

### Demo dataset

- **13 providers** (`lib/p-*.ts` → aggregated in `lib/data.ts`), spanning all 8 categories. Examples: Harbor & Vale Plumbing (`harbor-plumbing`), Northbeam IT (`northbeam-it`, sponsored), Brightpath Tutoring, Ledgerline, Studio Meridian, Apex Auto Care, Greenline Landscaping (< 3 reviews → Insufficient), and more.
- **Seed data:** `SEED_PENDING` (moderation queue) and `SEED_ENQUIRIES` (provider inbox) in `lib/data.ts`.
- **Helpers:** `getProvider(id)`, `withOverrides(base, overrides)` (applies user/provider edits), and the review factory `r(...)` + image helper `U(id)` in `lib/data-helpers.ts` (Unsplash URLs).
- **`starAverage`** provides the simple 1–5 average used for rating sorts and filters, distinct from the weighted trust score.

---

## 8. Client state store

`lib/store.tsx` is a React context (`StoreProvider` + `useStore`) that manages all client-side state and persists it to `localStorage` under namespaced keys (`trustora.user`, `trustora.saved`, `trustora.compare`, `trustora.provider-overrides`, `trustora.enquiries`, `trustora.my-reviews`, `trustora.pending-reviews`, `trustora.notif-prefs`, `trustora.searches`).

It exposes:

- **Auth:** `user`, `signIn`, `signOut`, `updateUser`.
- **Saved providers:** `saved`, `toggleSaved`, `isSaved`.
- **Recent searches:** `searches`, `pushSearch` (dedup, max 8), `clearSearches`.
- **Compare tray:** `compare`, `toggleCompare` (max 3, returns whether it was added), `clearCompare`.
- **Provider overrides:** `providerOverrides`, `setProviderOverride`, `providerProfile`.
- **Enquiries:** `enquiries`, `addEnquiry`, `updateEnquiry`.
- **Review moderation:** `myReviews`, `addMyReview`, `pendingReviews`, `setPendingReviews`.
- **Notification prefs:** `notif`, `setNotif`.

State hydrates from `localStorage` on mount (SSR-safe: reads return fallbacks during server render) and writes back whenever values change after hydration. This is the demo persistence layer; production replaces these reads/writes with Supabase queries guarded by RLS.

---

## 9. Auto-location / geolocation

`lib/geo.ts` + `components/AutoLocate.tsx` power the "Near me" auto-location in the hero and discover search fields.

- Requests the browser position via `navigator.geolocation` (high accuracy off, 10 s timeout, 10 min cache).
- Reverse-geocodes coordinates to a city/label:
  - **Google Maps Geocoding API** when `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is set.
  - **OpenStreetMap Nominatim** (keyless) as a fallback.
- Returns a `GeoPlace { lat, lng, city, label }`; if both lookups fail it falls back to raw coordinates.
- The resolved `city` is written into the location field and used for provider location filtering.

---

## 10. Design system

Defined in `app/globals.css` (custom component classes layered over Tailwind) and `tailwind.config.js`.

- **Theme:** light, green-accented glassmorphism on a soft green radial-gradient background; Inter font; `color-scheme: light`.
- **Glass surfaces:** `.glass`, `.glass-soft`, `.glass-card` — translucent layered backgrounds with `backdrop-filter: blur()`, green-tinted borders, inset highlights, and a subtle hover lift (disabled under `prefers-reduced-motion`).
- **Panels/inputs/buttons:** `.solid-panel`, `.input` (with green focus ring), `.btn-primary` (green), `.btn-ghost`, `.chip`, `.label`, `.h-display`, `.link-muted`.
- **Accents:** `.gradient-text` (green gradient), `.glow-green`, `.glow-emerald`.
- **Accessibility:** visible `:focus-visible` outlines, `prefers-reduced-motion` handling, custom green scrollbar.
- **Layout chrome:** sticky blurred `Navbar` with mobile menu, and a grouped `Footer` with a persistent demo-data disclaimer and a "sponsored listings never boost organic rank" notice.

---

## 11. Roles, auth & route gating

- **Demo auth** (`app/signin/page.tsx`): any valid email + ≥ 6-char password signs in. Role is **inferred from the email**:
  - contains `admin` → **admin**
  - contains `provider` or `harbor` → **provider**
  - otherwise → **customer**
  - One-click buttons switch between Customer / Provider / Admin demos.
- **Route gating** (`components/RequireAuth.tsx`): wraps dashboard routes with a `roles: Role[]` allow-list. If no user → "Sign in to access this area"; if the role doesn't match → "Not permitted" with a back-home link. Post-sign-in redirects to the role-appropriate dashboard (`/dashboard`, `/provider`, or `/admin`).
- The navbar dynamically routes signed-in users to the correct dashboard.

> This is local, browser-only auth for demonstration. Production replaces it with Supabase Auth (see [§15](#15-supabase-production-path)).

---

## 12. Testing

Run `npm run test:trust`. The suite (`scripts/test-trust-engine.ts`) currently asserts **9 checks**, all passing:

1. All providers are ranked (including the unranked tail).
2. Harbor & Vale has a strong score (≥ 80; observed **83**).
3. Harbor has verified evidence (≥ 3 verified).
4. Greenline (< 3 reviews) shows no score.
5. Greenline confidence is **Insufficient**.
6. Rank #1 has a score.
7. Sponsored demo providers exist.
8. & 9. **Sponsored flag does not change the score** for `northbeam-it` and `clearsmile-dental` (both **82**) — the key trust-integrity guarantee.

Additional verification (from `DEPLOY.md`, 2026-10-10): `npx tsc --noEmit` → exit 0; `npm run build` → 44/44 pages; production `npm start` HTTP probes return 200 for `/`, `/discover`, `/rankings`, `/providers/harbor-plumbing`, `/compare`, `/methodology`, `/signin`, with security headers present.

---

## 13. Environment variables & secrets

Copy `.env.example` → `.env.local`.

| Variable | Exposure | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | public | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | public | Supabase anon key (RLS-protected) |
| `SUPABASE_SERVICE_ROLE_KEY` | **server-only** | Bypasses RLS — **never** prefix with `NEXT_PUBLIC_` and never ship to the browser |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | public | Optional — enables Google reverse geocoding; OSM fallback used when empty |

**Golden rule:** only `NEXT_PUBLIC_*` values may appear in client bundles. The service-role key is used exclusively in server contexts (Route Handlers / Edge Functions / the nightly scoring job). Verify with `grep -r SERVICE_ROLE .next/static` (should be empty).

---

## 14. Deployment

The repo ships deploy manifests for both Vercel and Render. No code changes are required on either platform.

### Files added for deployment

| File | Purpose |
|---|---|
| `vercel.json` | Next.js framework detection, build command (`npm run build`), region (`iad1`), service rewrites |
| `render.yaml` | Blueprint: web service, `npm install && npm run build` → `npm start`, health check `/`, `NODE_VERSION=20.18.0` |
| `.nvmrc` | Pins Node `20.18.0` |
| `package.json` → `engines` | Node ≥ 20, npm ≥ 10 |
| `next.config.js` | `output: standalone` (small Render/Docker image) + security headers |
| `push-to-github.bat` | One-click GitHub push helper |

### Vercel (recommended, ~2 min)

1. Import the repo. Vercel auto-detects Next.js from `vercel.json` (build `npm run build`, install `npm install`, output `.next`).
2. Environment variables: **none required** for demo mode. Optionally add the Supabase vars.
3. Deploy → instant `https://trustora-*.vercel.app`; every `git push` auto-redeploys.
4. CLI alternative: `npx vercel --prod`.

### Render (~4 min)

- **Blueprint (one click):** New → Blueprint → select the repo. `render.yaml` declares the service (build/start commands above, health check `/`). Leave env vars empty for demo mode. Live at `https://trustora.onrender.com`.
- **Manual Web Service:** Runtime **Node**, branch `main`, build `npm install && npm run build`, start `npm start`, env `NODE_VERSION=20.18.0`.
- Note: Render free tier sleeps when idle (~30–60 s cold start on first load); Vercel has no cold starts.

### Post-deploy verification

- `/` loads and hero search works; `/discover` filters + sorts update results; `/providers/harbor-plumbing` renders score + reviews; `/compare`, `/dashboard`, `/provider`, `/admin` reachable; no console errors; security headers present.

---

## 15. Supabase production path

To move from the demo (bundled data + localStorage) to production (Auth + Postgres + Storage), follow `SUPABASE_SETUP.md` and the migrations in `supabase/`.

### Migrations (apply with `supabase db push`)

- **`01-tables.sql`** — core schema: `profiles`, `categories`, `businesses`, `services`, `service_areas`, `enquiries`, `jobs` (with `pgcrypto` + `pg_trgm` extensions, FKs, and indexes).
- **`02-reviews-scores.sql`** — `reviews` (five dimension columns, verification, moderation status), `review_verifications`, `review_responses`, `trust_score_snapshots`, `ranking_config_versions` (versioned weights/prior/half-life), `complaints`, `subscriptions`, `sponsored_placements`, `notifications`, `audit_logs`.
- **`03-rls-seed.sql`** — enables Row-Level Security on every table, defines policies (public read of catalogue + approved content only; owner-managed businesses; customer-authored reviews; scoped enquiry visibility; own notifications), and seeds the 8 categories.

### Wiring checklist

1. **Auth:** enable Email auth; insert a `profiles` row on signup (`id = auth.users.id`); promote admins via a server-side allow-list. Replace the demo `signIn` in `lib/store.tsx` with `@supabase/supabase-js` session handling and keep `RequireAuth` role gates + add server-side checks in Route Handlers for every mutation.
2. **Scoring job:** run `computeTrustScore` per business (service role) and insert into `trust_score_snapshots` with the active `ranking_config_versions.version` — suggested as a Supabase Edge Function on a cron schedule. The demo `scoreHistory` becomes a query over snapshots.
3. **Storage:** create a `business-images` bucket (public read, authenticated write, owner-only paths like `businesses/<business_id>/*`); store URLs in `businesses.image_url`.

---

## 16. Security posture

Set globally in `next.config.js` `headers()`:

- `X-Frame-Options: DENY` — clickjacking protection.
- `X-Content-Type-Options: nosniff` — MIME-sniffing protection.
- `Referrer-Policy: strict-origin-when-cross-origin` — limits referrer leakage.
- `Permissions-Policy: camera=(), microphone=(), geolocation=()` — restricts sensitive features.

Additional measures:

- **RLS everywhere** in the Supabase schema; public reads limited to catalogue + approved content.
- **Service-role key** confined to server contexts; never exposed to the client bundle.
- **Trust integrity:** scoring accepts no payment signals; sponsored placements are labelled and excluded from organic rank.

---

## 17. Known demo limitations

Explicitly documented in `DEPLOYMENT.md`:

- **Auth is local** (email-pattern roles) — replace with Supabase Auth for production.
- **Persistence is `localStorage`** — replace with Supabase queries + RLS.
- **Moderation approvals don't yet recompute scores** — the pending → approved flow is UI-complete; in production, wire `reviews.status` → nightly `computeTrustScore` recompute.
- **Billing buttons show setup guidance** — connect Stripe for production.
- **Node version** differs between `.nvmrc`/Render (20.18.0) and `package.json` engines (24.x) — align to your host's supported LTS before a production rollout.

---

## 18. Pre-launch checklist

From `DEPLOYMENT.md` (acceptance criteria):

- [ ] Every nav link + CTA resolves (crawl `/` → all footer links).
- [ ] Discovery: search, category/price/rating/verified filters, all 4 sorts, empty state.
- [ ] Rankings recompute from data (edit a review → score changes).
- [ ] Review submit → moderation queue → approve → visible + score updates.
- [ ] Auth gates: `/dashboard` customer-only, `/provider` provider/admin, `/admin` admin-only.
- [ ] RLS verified in Supabase (anon cannot read pending reviews or others' enquiries).
- [ ] Responsive: mobile 360px / tablet 768px / desktop 1440px, no horizontal overflow.
- [ ] Zero console errors; images have alt text; keyboard + focus states OK.
- [ ] Demo badges present wherever synthetic data appears.
- [ ] `.env.local` filled; no secrets in client bundle (`grep -r SERVICE_ROLE .next/static` empty).

---

## 19. Appendix — file reference

### `lib/` core modules

| File | Role |
|---|---|
| `types.ts` | Shared domain types |
| `trust-engine.ts` | Scoring engine (weights, Bayesian smoothing, flags, ranking) |
| `categories.ts` | 8-category catalogue |
| `data.ts` | Provider barrel, seeds, `getProvider`, `withOverrides` |
| `data-helpers.ts` | Demo factories (image URLs, review builder) |
| `p-*.ts` | 13 individual provider records |
| `store.tsx` | Client state context + localStorage persistence |
| `geo.ts` | Auto-location + reverse geocoding |
| `utils.ts` | `cx`, `formatPrice`, `timeAgo`, `formatDate`, `uid` |

### `components/`

| File | Role |
|---|---|
| `Shell.tsx` | App chrome wrapper (Navbar + Footer + StoreProvider) |
| `Navbar.tsx` / `Footer.tsx` | Header & footer navigation |
| `ProviderCard.tsx` | Provider result card |
| `CompareTray.tsx` | Compare tray + `DemoNotice` |
| `ScoreRing.tsx` / `Stars.tsx` / `Badges.tsx` | Score/rating/badge visuals |
| `AutoLocate.tsx` | "Near me" location button |
| `RequireAuth.tsx` | Role-based route gate |
| `CategoryIcon.tsx` | Category → lucide icon mapping |

### `scripts/`

| File | Role |
|---|---|
| `test-trust-engine.ts` | Trust-engine assertions (9 tests) |
| `lint-guard.js` | Cross-platform lint guard |

### `supabase/`

| File | Role |
|---|---|
| `01-tables.sql` | Core schema |
| `02-reviews-scores.sql` | Reviews, scores, disputes, billing, audit |
| `03-rls-seed.sql` | Row-Level Security + category seed |

---

*© 2026 TRUSTORA. Demonstration build — all providers, reviews and scores are synthetic. Sponsored listings are always labelled and never boost organic rank.*
