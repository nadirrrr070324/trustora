-- TRUSTORA · migration 02 — reviews, scores, disputes, billing, RLS

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses (id) on delete cascade,
  author_id uuid references public.profiles (id),
  author_name text not null,
  rating smallint not null check (rating between 1 and 5),
  dim_satisfaction smallint not null default 70,
  dim_quality smallint not null default 70,
  dim_reliability smallint not null default 70,
  dim_value smallint not null default 70,
  dim_resolution smallint not null default 70,
  title text not null,
  body text not null,
  service_used text not null default '',
  verified_job boolean not null default false,
  job_id uuid references public.jobs (id),
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  helpful integer not null default 0,
  flagged boolean not null default false,
  created_at timestamptz not null default now()
);
create index reviews_business_idx on public.reviews (business_id, status);

create table public.review_verifications (
  review_id uuid primary key references public.reviews (id) on delete cascade,
  verified_by uuid references public.profiles (id),
  method text not null default 'completed_job',
  note text not null default '',
  created_at timestamptz not null default now()
);

create table public.review_responses (
  review_id uuid primary key references public.reviews (id) on delete cascade,
  responder_id uuid references public.profiles (id),
  body text not null,
  created_at timestamptz not null default now()
);

create table public.trust_score_snapshots (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses (id) on delete cascade,
  score smallint,
  provisional boolean not null default true,
  confidence text not null default 'Insufficient',
  dims jsonb not null default '{}',
  review_count integer not null default 0,
  verified_count integer not null default 0,
  weights_version integer not null default 1,
  created_at timestamptz not null default now()
);
create index snapshots_business_idx
  on public.trust_score_snapshots (business_id, created_at desc);

create table public.ranking_config_versions (
  version integer primary key generated always as identity,
  weights jsonb not null,
  prior_mean numeric not null default 72,
  prior_strength numeric not null default 10,
  verified_multiplier numeric not null default 1.6,
  half_life_days integer not null default 365,
  created_by uuid references public.profiles (id),
  created_at timestamptz not null default now()
);

create table public.complaints (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses (id) on delete cascade,
  reporter_id uuid references public.profiles (id),
  kind text not null default 'Service complaint',
  detail text not null,
  status text not null default 'open'
    check (status in ('open', 'investigating', 'resolved', 'dismissed')),
  created_at timestamptz not null default now()
);

create table public.subscriptions (
  business_id uuid primary key references public.businesses (id) on delete cascade,
  plan text not null default 'free',
  status text not null default 'active',
  renews_at timestamptz,
  updated_at timestamptz not null default now()
);

create table public.sponsored_placements (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses (id) on delete cascade,
  slot text not null default 'discover_top',
  starts_at timestamptz not null default now(),
  ends_at timestamptz,
  created_by uuid references public.profiles (id)
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  kind text not null,
  title text not null,
  body text not null default '',
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles (id),
  action text not null,
  target text not null default '',
  meta jsonb not null default '{}',
  created_at timestamptz not null default now()
);
