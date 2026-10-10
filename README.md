# TRUSTORA — Trust earned. Rankings explained.

Premium service-provider ranking & discovery platform. Next.js + TypeScript +
Tailwind, glassmorphism design system, weighted trust-score engine, customer /
provider / admin dashboards.

> **Demo build:** providers, reviews and scores are synthetic demonstration data.
> The UI labels this everywhere. Local auth + browser storage stand in for
> Supabase until you connect credentials (see SUPABASE_SETUP.md).

## Quick start

```bash
cd trustora
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run test:trust # trust-engine assertions
```

## Demo accounts

Sign in (`/signin`) with any email + 6-char password, or one-click:

- Customer demo → `/dashboard`
- Provider demo → `/provider` (manages Harbor & Vale demo profile)
- Admin demo → `/admin`

Role is inferred from the email in demo mode (`admin@…`, `*provider*`/`harbor`).

## Project map

| Area | Location |
|---|---|
| Design system | `app/globals.css`, `tailwind.config.js` |
| Trust engine | `lib/trust-engine.ts` (weights, Bayesian smoothing, flags, ranking) |
| Demo data | `lib/p-*.ts` + `lib/data.ts` barrel |
| Client store | `lib/store.tsx` (auth, saved, compare, enquiries, moderation queue) |
| Pages | `app/` — home, discover, rankings, categories, providers, compare, dashboards, legal |
| DB schema | `supabase/01-tables.sql`, `02-reviews-scores.sql`, `03-rls-seed.sql` |
| Docs | `SUPABASE_SETUP.md`, `DEPLOYMENT.md` |

## Trust engine (summary)

- Weights: satisfaction 30 · quality 25 · reliability 20 · value 15 · resolution 10
- Verified-job reviews ×1.6; 12-month recency half-life; neutral prior (72) for small samples
- `< 3` reviews → “Not enough data”; `< 8` or `< 3` verified → “Provisional”
- Suspicious patterns flagged for investigation, never silently applied
- Sponsored placements labelled; scoring accepts no payment signals

## Environment

Copy `.env.example` → `.env.local` and fill Supabase values for production.
`SUPABASE_SERVICE_ROLE_KEY` is server-only — never prefix with `NEXT_PUBLIC_`.
