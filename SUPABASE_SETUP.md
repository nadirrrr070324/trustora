# TRUSTORA — Supabase production setup

The demo runs on bundled data + browser storage. For production, connect
Supabase (Auth + Postgres + Storage) as below. Nothing in `app/` or
`components/` imports the service-role key.

## 1. Create the project

1. Create a project at https://supabase.com → copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (server only!)
2. `cp .env.example .env.local` and fill the values.

## 2. Apply migrations

```bash
supabase link --project-ref <ref>
supabase db push   # applies supabase/01-tables.sql → 03-rls-seed.sql
```

Tables: profiles, categories, businesses, services, service_areas, enquiries,
jobs, reviews, review_verifications, review_responses, trust_score_snapshots,
ranking_config_versions, complaints, subscriptions, sponsored_placements,
notifications, audit_logs. RLS enabled everywhere; public reads limited to
catalogue + approved content.

## 3. Auth wiring

- Enable Email auth in Supabase Auth.
- On signup, insert a `profiles` row (`id = auth.users.id`, role customer/provider).
- Promote admins via a server-side allow-list — never from the client.
- Replace the demo `signIn` in `lib/store.tsx` with `@supabase/supabase-js`
  session handling; keep `RequireAuth` role gates and add server-side checks
  in Route Handlers (`app/api/*`) for every mutation.

## 4. Nightly scoring job

Run `computeTrustScore` per business (service role) and insert into
`trust_score_snapshots` with the active `ranking_config_versions.version`.
Suggested: Supabase Edge Function on a cron schedule. The demo's
`scoreHistory` becomes a query over snapshots.

## 5. Storage

Create a `business-images` bucket (public read, authenticated write, owner-only
paths like `businesses/<business_id>/*`). Store URLs in `businesses.image_url`.
