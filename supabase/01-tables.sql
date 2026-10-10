-- TRUSTORA · migration 01 — core tables (Supabase / PostgreSQL)
-- Apply: supabase db push  (service-role key stays server-side only)

create extension if not exists "pgcrypto";
create extension if not exists "pg_trgm";

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  display_name text not null,
  role text not null default 'customer'
    check (role in ('customer', 'provider', 'admin')),
  created_at timestamptz not null default now()
);

create table public.categories (
  slug text primary key,
  label text not null,
  tagline text not null default '',
  icon text not null default 'briefcase'
);

create table public.businesses (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references public.profiles (id),
  name text not null,
  category_slug text not null references public.categories (slug),
  location text not null default '',
  about text not null default '',
  email text not null default '',
  phone text not null default '',
  image_url text,
  verification text not null default 'unverified'
    check (verification in ('verified', 'pending', 'unverified')),
  license_note text,
  price_min integer,
  price_max integer,
  quote_available boolean not null default true,
  availability text not null default '',
  years_in_business integer not null default 0,
  completed_jobs integer not null default 0,
  response_time text not null default '',
  member_since text not null default '',
  sponsored boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index businesses_category_idx on public.businesses (category_slug);

create table public.services (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses (id) on delete cascade,
  name text not null,
  blurb text not null default '',
  price_from integer
);
create index services_business_idx on public.services (business_id);

create table public.service_areas (
  business_id uuid not null references public.businesses (id) on delete cascade,
  area text not null,
  primary key (business_id, area)
);

create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses (id) on delete cascade,
  customer_id uuid references public.profiles (id),
  name text not null,
  email text not null,
  service text not null default '',
  message text not null,
  status text not null default 'new'
    check (status in ('new', 'replied', 'closed')),
  created_at timestamptz not null default now()
);
create index enquiries_business_idx on public.enquiries (business_id);

create table public.jobs (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses (id) on delete cascade,
  customer_id uuid references public.profiles (id),
  enquiry_id uuid references public.enquiries (id),
  service text not null default '',
  completed_at timestamptz,
  created_at timestamptz not null default now()
);
