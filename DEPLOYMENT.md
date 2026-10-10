# TRUSTORA — Deployment guide

## Prerequisites

- Node 20+, npm 9+
- (Production) Supabase URL + anon key; service-role key in server env only
- Vercel account (recommended) or any Node host

## Build & run

```bash
npm install
npm run test:trust
npm run build
npm start            # or deploy the `.next` output
```

## Vercel

1. Import the `trustora/` folder as the project root.
2. Set env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   (and `SUPABASE_SERVICE_ROLE_KEY` only if you add Route Handlers/Edge Functions).
3. Deploy. No image-domain config needed beyond `images.unsplash.com`
   (already in `next.config.js`).

## Pre-launch checklist (acceptance criteria)

- [ ] Every nav link + CTA resolves (crawl `/` → all footer links)
- [ ] Discovery: search, category/price/rating/verified filters, all 4 sorts, empty state
- [ ] Rankings recompute from data (edit a review → score changes)
- [ ] Review submit → moderation queue → approve → visible + score updates
- [ ] Auth gates: `/dashboard` customer-only, `/provider` provider/admin, `/admin` admin-only
- [ ] RLS verified in Supabase (anon cannot read pending reviews, others' enquiries)
- [ ] Mobile 360px / tablet 768px / desktop 1440px, no horizontal overflow
- [ ] Zero console errors; images have alt text; keyboard + focus states OK
- [ ] Demo badges present wherever synthetic data appears
- [ ] `.env.local` filled; no secrets in client bundle (`grep -r SERVICE_ROLE .next/static` empty)

## Known demo limitations

- Auth is local (email-pattern roles); replace with Supabase Auth.
- Persistence is `localStorage`; replace with Supabase queries + RLS.
- Review moderation approvals don't yet mutate provider scores (pending → approved
  flow is UI-complete; wire `reviews.status` → nightly recompute in production).
- Billing buttons show setup guidance; connect Stripe for production.
