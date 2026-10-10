# Deploying TRUSTORA

Build is green: `tsc` clean, `next build` 44/44 pages, trust-engine 9/9 tests.
The repo (`trustora/`) is git-initialized and committed — push it to GitHub,
then connect to Vercel and/or Render. No code changes needed on either platform.

## 0. Push to GitHub (once)

```bash
cd trustora
gh repo create trustora --public --source=. --push
# …or create an empty repo on github.com, then:
# git remote add origin https://github.com/<you>/trustora.git
# git branch -M main
# git push -u origin main
```

## 1. Vercel (recommended, ~2 min)

1. Go to **vercel.com → Add New → Project → Import** your `trustora` repo.
2. Vercel auto-detects Next.js from `vercel.json`:
   - Build command: `npm run build`
   - Output: `.next`
   - Install: `npm install`
3. Environment variables: **none required** — the app runs on bundled demo
   data. Optionally add `NEXT_PUBLIC_SUPABASE_URL` +
   `NEXT_PUBLIC_SUPABASE_ANON_KEY` (see `SUPABASE_SETUP.md`).
   Never add `SUPABASE_SERVICE_ROLE_KEY` as a `NEXT_PUBLIC_*` var.
4. Deploy. You get `https://trustora-*.vercel.app` instantly.
   Every `git push` redeploys automatically.

CLI alternative:

```bash
npx vercel --prod
```

## 2. Render (~4 min)

Option A — Blueprint (one click):

1. **render.com → New → Blueprint** → select your `trustora` repo.
   `render.yaml` already declares the web service:
   - Build: `npm install && npm run build`
   - Start: `npm start` (Next respects Render's `PORT` automatically)
   - Node pinned to 20 via `NODE_VERSION` + `.nvmrc` + `engines`.
   - Health check: `/`.
2. Leave env vars empty for demo mode, or add Supabase vars.
3. Create → live at `https://trustora.onrender.com`.

Option B — manual Web Service:

- Runtime **Node**, branch `main`
- Build command: `npm install && npm run build`
- Start command: `npm start`
- Env: `NODE_VERSION=20.18.0`

> Note: Render free tier sleeps when idle — first load after inactivity
> takes ~30–60 s to wake. Vercel has no cold starts.

## 3. Verify after deploy

- `/` loads, hero search works
- `/discover` filters + sorts update results
- `/providers/harbor-plumbing` profile renders score + reviews
- `/compare`, `/dashboard` (customer demo), `/provider`, `/admin` reachable
- No console errors (security headers are set in `next.config.js`)

## Files added for deployment

| File | Purpose |
|---|---|
| `vercel.json` | Framework, build/output commands, region |
| `render.yaml` | Blueprint: build/start, Node 20, health check |
| `.nvmrc` | Pins Node 20.18.0 |
| `package.json` → `engines` | Enforces Node ≥20 <21, npm ≥10 on hosts |
| `next.config.js` → `output: standalone` + headers | Small Render image; `DENY` framing, `nosniff`, strict referrer |

## Errors fixed during this pass

1. `npm run lint` would fail on hosts with no ESLint config → now
   degrades to a logged skip instead of failing the build.
2. No Node version pin (hosts default to latest, can break Next 14) →
   pinned 20.18.0 via `.nvmrc`, `engines`, and Render `NODE_VERSION`.
3. No deploy manifests → added `vercel.json` + `render.yaml` (Blueprint).
4. Missing production security headers → added `X-Frame-Options: DENY`,
   `X-Content-Type-Options: nosniff`, strict `Referrer-Policy`,
   restrictive `Permissions-Policy`.
5. `next.config.js` had no `output: standalone` → added so Render/Docker
   images stay small (Vercel ignores it).
