-- ════════════════════════════════════════════════════════════
--  FIA EUROPE NETWORK — Supabase Database Schema
--  Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- ════════════════════════════════════════════════════════════

-- ── 1. PROFILES (extends Supabase auth.users) ──────────────────
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text,
  phone       text,
  nationality text,
  role        text default 'applicant',   -- applicant | staff | admin
  created_at  timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select using (auth.uid() = id);
create policy "Users can update their own profile"
  on public.profiles for update using (auth.uid() = id);
create policy "Users can insert their own profile"
  on public.profiles for insert with check (auth.uid() = id);

-- Auto-create a profile row whenever a new auth user signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''));
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── 2. SERVICES (catalog — public, read-only) ──────────────────
create table if not exists public.services (
  id          bigint generated always as identity primary key,
  name        text not null,
  description text,
  category    text,
  icon        text,
  sort_order  int default 0,
  created_at  timestamptz default now()
);

alter table public.services enable row level security;
create policy "Anyone can read services"
  on public.services for select using (true);

-- ── 3. APPLICATIONS (a user's visa applications) ───────────────
create table if not exists public.applications (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references auth.users(id) on delete cascade not null,
  reference     text unique not null default ('FIA-' || to_char(now(),'YYYY') || '-' || lpad(floor(random()*100000)::text, 5, '0')),
  visa_type     text not null,
  destination   text,
  status        text default 'submitted',   -- submitted | documents | review | biometrics | decision | collected
  current_step  int  default 1,             -- 1..6
  notes         text,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

alter table public.applications enable row level security;

create policy "Users manage their own applications"
  on public.applications for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ── 4. APPOINTMENTS (consultations) ────────────────────────────
create table if not exists public.appointments (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete cascade,
  full_name   text,
  email       text,
  phone       text,
  service     text,
  preferred   timestamptz,
  message     text,
  status      text default 'requested',
  created_at  timestamptz default now()
);

alter table public.appointments enable row level security;
create policy "Anyone can request an appointment"
  on public.appointments for insert with check (true);
create policy "Users see their own appointments"
  on public.appointments for select
  using (auth.uid() = user_id or user_id is null);

-- ── 5. SEED THE SERVICES CATALOG ───────────────────────────────
insert into public.services (name, description, category, icon, sort_order) values
('Work Permit Visa','Full EU work authorization processing with employer liaison and documentation.','Visa & Immigration','🛂',1),
('Student Visa','University placement assistance, student visa processing, and dormitory arrangements.','Visa & Immigration','🎓',2),
('Business Visa','Short and long-term business visas with multi-entry permits for entrepreneurs.','Visa & Immigration','🤝',3),
('Investor / Property Visa','Golden Visa applications and long-term residency through investment.','Visa & Immigration','📊',4),
('Family Reunification','Complete support for bringing your family members to Europe.','Residency & PR','👨‍👩‍👧',5),
('TRC Extension','Temporary Residence Card extensions handled end-to-end.','Residency & PR','🔄',6),
('Permanent Residency','PR application support and pathways to long-term settlement.','Residency & PR','🏠',7),
('Citizenship by Investment','Investment migration and citizenship pathways for qualified investors.','Residency & PR','💎',8),
('Romania Golden Visa','Investment-based residency through property, bonds, or business.','Investment','🌍',9),
('Property Buy & Sell','Real estate acquisition assistance, legal checks, and transaction management.','Investment','🏘️',10),
('Non-EU Investment Service','Investment structuring for non-EU nationals seeking European entry.','Investment','🌐',11),
('B2B EU Marketing','Business-to-business connections and EU market entry strategy.','Investment','📈',12),
('Company Formation','End-to-end EU company registration with all legal documentation.','Business & Legal','🏢',13),
('Legal Aid & Lawyers','Access to immigration lawyers, employment law, and contract specialists.','Business & Legal','⚖️',14),
('Employer Transfer','Smooth employer company transfers and compliance handling.','Business & Legal','🔁',15),
('Accounting & Bookkeeping','EU company accounting, VAT registration, and financial reporting.','Accounting & Finance','📊',16),
('Payroll Management','Employee payroll processing and salary compliance across EU.','Accounting & Finance','💵',17),
('Tax Compliance','EU tax filing, advisory, and full regulatory compliance.','Accounting & Finance','🧾',18),
('Money Transfer','Fast, secure remittance to home countries with low fees.','Accounting & Finance','🏦',19),
('Tourism Packages','International and national tour packages and group travel.','Travel & Services','🌍',20),
('Air Ticketing','Flights, bus, train, and ship bookings across Europe.','Travel & Services','✈️',21),
('Airport Pickup & Drop','Reliable 24/7 airport transfer service with professional drivers.','Travel & Services','🚗',22),
('Hotel Reservation','Hotel booking across all EU cities with best-rate guarantees.','Travel & Services','🏨',23),
('Accommodation','Apartment and housing support for individuals and families.','Facilities','🏠',24),
('Job Placement','Direct employer connections and job matching services.','Facilities','💼',25),
('Real-Time Tracking','Track your visa application status live at every step.','Digital Tools','📍',26),
('Applicant Dashboard','Personal dashboard for applications, documents, and appointments.','Digital Tools','📊',27),
('Live Chat Support','Instant support through live chat 24/7.','Digital Tools','💬',28)
on conflict do nothing;
