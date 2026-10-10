-- TRUSTORA · migration 03 — row-level security + category seed
-- Service-role key bypasses RLS for server jobs; it must NEVER ship to the browser.

alter table public.profiles enable row level security;
alter table public.businesses enable row level security;
alter table public.services enable row level security;
alter table public.service_areas enable row level security;
alter table public.enquiries enable row level security;
alter table public.jobs enable row level security;
alter table public.reviews enable row level security;
alter table public.review_verifications enable row level security;
alter table public.review_responses enable row level security;
alter table public.trust_score_snapshots enable row level security;
alter table public.ranking_config_versions enable row level security;
alter table public.complaints enable row level security;
alter table public.subscriptions enable row level security;
alter table public.sponsored_placements enable row level security;
alter table public.notifications enable row level security;
alter table public.audit_logs enable row level security;

-- Public read: catalogue + approved content only.
create policy "public read categories"
  on public.categories for select using (true);
create policy "public read businesses"
  on public.businesses for select using (true);
create policy "public read services"
  on public.services for select using (true);
create policy "public read areas"
  on public.service_areas for select using (true);
create policy "public read approved reviews"
  on public.reviews for select using (status = 'approved');
create policy "public read snapshots"
  on public.trust_score_snapshots for select using (true);
create policy "public read ranking config"
  on public.ranking_config_versions for select using (true);
create policy "public read placements"
  on public.sponsored_placements for select using (true);

-- Owners manage their own listings.
create policy "owners update own business"
  on public.businesses for update using (auth.uid() = owner_id);

-- Customers file their own reviews; moderation happens server-side.
create policy "customers insert own reviews"
  on public.reviews for insert with check (auth.uid() = author_id);

-- Enquiries visible to the customer and the owning provider.
create policy "scoped enquiry read"
  on public.enquiries for select using (
    auth.uid() = customer_id
    or auth.uid() in (
      select owner_id from public.businesses where id = business_id
    )
  );

-- Users read only their own notifications.
create policy "own notifications"
  on public.notifications for select using (auth.uid() = profile_id);

-- Seed categories
insert into public.categories (slug, label, tagline, icon) values
  ('home-services', 'Home Services', 'Plumbers, electricians, cleaners & repairs', 'home'),
  ('technology-it', 'Technology & IT', 'Developers, IT support & consultants', 'cpu'),
  ('education-tutoring', 'Education & Tutoring', 'Tutors, coaches & test prep', 'book'),
  ('business-services', 'Business Services', 'Accounting, legal & consulting', 'briefcase'),
  ('design-creative', 'Design & Creative', 'Designers, photographers & video', 'palette'),
  ('automotive', 'Automotive', 'Mechanics, detailers & body shops', 'car'),
  ('health-wellness', 'Health & Wellness', 'Trainers, therapists & nutrition', 'heart'),
  ('professional-services', 'Professional Services', 'Agents, advisors & specialists', 'shield')
on conflict (slug) do nothing;
