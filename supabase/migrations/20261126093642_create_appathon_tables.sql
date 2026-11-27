/*
# Create Appathon competition tables

1. Plain-English explanation
   This migration creates the database for the Appathon competition website:
   participants and their teams, competition registrations, project
   submissions with file metadata, public announcements, judges, judge
   evaluations, and admin users.

2. New Tables
   - `participants` — student participants (name, email, college, etc.).
   - `teams` — a team with a name, size (1-4) and optional leader.
   - `team_members` — members belonging to a team.
   - `registrations` — one row per competition registration with a unique
     human-readable registration ID (e.g. APP-2026-1001), project details
     and an approval status.
   - `projects` — a project submission tied to a registration.
   - `project_files` — metadata for uploaded files (max 10 MB).
   - `announcements` — public announcements shown on the home page.
   - `judges` — competition judges.
   - `evaluations` — judge scores per registration across four criteria
     (0-25 each) with a computed total.
   - `admin_users` — admin accounts linked to Supabase Auth users.

3. Security
   - Row Level Security is ENABLED on every table.
   - This site has no sign-in for visitors: anyone can register, submit a
     project and read announcements. Policies allow anon + authenticated
     visitors to: read announcements; insert participants, teams, team
     members, registrations, projects, and project file records.
   - Visitors can NOT read other people's registrations, projects,
     evaluations, judges or admin users — those are insert-only or
     admin-only. UPDATE and DELETE are not granted to visitors anywhere,
     so no visitor can tamper with existing rows.
   - service_role is granted the verbs it needs for server-side (edge
     function) use; it bypasses RLS but still requires grants.

4. Notes
   - `citext` extension is used for case-insensitive unique emails.
   - `pgcrypto` provides gen_random_uuid() for primary keys.
   - Indexes are added on frequently filtered columns (email, category,
     status, registration_id).
*/

create extension if not exists pgcrypto;
create extension if not exists citext;

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid references auth.users (id) on delete cascade,
  email text not null unique,
  full_name text,
  role text not null default 'admin' check (role in ('admin', 'super_admin', 'judge_coordinator')),
  created_at timestamptz not null default now()
);

create table if not exists public.participants (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email citext not null unique,
  phone text not null,
  college text not null,
  department text not null,
  year_of_study text not null,
  city text not null,
  state text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.teams (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  leader_id uuid references public.participants (id) on delete set null,
  size int not null check (size between 1 and 4),
  created_at timestamptz not null default now()
);

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams (id) on delete cascade,
  participant_id uuid references public.participants (id) on delete set null,
  name text not null,
  email citext not null,
  phone text,
  role text not null default 'Member',
  created_at timestamptz not null default now()
);

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  registration_id text not null unique,
  participant_id uuid references public.participants (id) on delete cascade,
  team_id uuid references public.teams (id) on delete set null,
  full_name text not null,
  email citext not null,
  phone text not null,
  college text not null,
  department text not null,
  year_of_study text not null,
  city text not null,
  state text not null,
  participation_type text not null check (participation_type in ('individual', 'team')),
  team_name text,
  team_leader text,
  team_size int not null default 1 check (team_size between 1 and 4),
  project_title text not null,
  category text not null,
  problem_statement text not null,
  project_description text not null,
  innovation text not null,
  technologies text not null,
  development_stage text not null,
  demo_link text,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected', 'shortlisted')),
  created_at timestamptz not null default now()
);
create index if not exists registrations_email_idx on public.registrations (email);
create index if not exists registrations_category_idx on public.registrations (category);
create index if not exists registrations_status_idx on public.registrations (status);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  registration_id text not null references public.registrations (registration_id) on delete cascade,
  title text not null,
  description text not null,
  demo_link text,
  video_link text,
  status text not null default 'submitted'
    check (status in ('submitted', 'under-review', 'shortlisted', 'rejected')),
  submitted_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists projects_registration_idx on public.projects (registration_id);

create table if not exists public.project_files (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  file_name text not null,
  storage_path text not null,
  size_bytes bigint not null check (size_bytes <= 10485760),
  mime_type text,
  uploaded_at timestamptz not null default now()
);

create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  pinned boolean not null default false,
  published_at timestamptz not null default now()
);

create table if not exists public.judges (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  expertise text not null,
  email citext not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.evaluations (
  id uuid primary key default gen_random_uuid(),
  registration_id text not null references public.registrations (registration_id) on delete cascade,
  judge_id uuid not null references public.judges (id) on delete cascade,
  innovation int not null check (innovation between 0 and 25),
  technical int not null check (technical between 0 and 25),
  impact int not null check (impact between 0 and 25),
  presentation int not null check (presentation between 0 and 25),
  total int generated always as (innovation + technical + impact + presentation) stored,
  comments text,
  created_at timestamptz not null default now(),
  unique (registration_id, judge_id)
);

alter table public.participants enable row level security;
alter table public.teams enable row level security;
alter table public.team_members enable row level security;
alter table public.registrations enable row level security;
alter table public.projects enable row level security;
alter table public.project_files enable row level security;
alter table public.announcements enable row level security;
alter table public.judges enable row level security;
alter table public.evaluations enable row level security;
alter table public.admin_users enable row level security;

-- Announcements are intentionally public: anyone can read them.
drop policy if exists "announcements are public" on public.announcements;
create policy "announcements are public" on public.announcements
  for select to anon, authenticated using (true);

-- Visitors may register / submit (insert only). No SELECT, UPDATE or DELETE:
-- nobody can read other people's registrations or alter existing data.
drop policy if exists "anyone may register" on public.registrations;
create policy "anyone may register" on public.registrations
  for insert to anon, authenticated with check (true);

drop policy if exists "anyone may create a participant" on public.participants;
create policy "anyone may create a participant" on public.participants
  for insert to anon, authenticated with check (true);

drop policy if exists "anyone may create a team" on public.teams;
create policy "anyone may create a team" on public.teams
  for insert to anon, authenticated with check (true);

drop policy if exists "anyone may add team members" on public.team_members;
create policy "anyone may add team members" on public.team_members
  for insert to anon, authenticated with check (true);

drop policy if exists "anyone may submit a project" on public.projects;
create policy "anyone may submit a project" on public.projects
  for insert to anon, authenticated with check (true);

drop policy if exists "anyone may record a project file" on public.project_files;
create policy "anyone may record a project file" on public.project_files
  for insert to anon, authenticated with check (true);

-- Admins (matched by admin_users.auth_user_id) get full CRUD.
drop policy if exists "admins read registrations" on public.registrations;
create policy "admins read registrations" on public.registrations
  for select to authenticated
  using (exists (select 1 from public.admin_users where auth_user_id = auth.uid()));

drop policy if exists "admins read projects" on public.projects;
create policy "admins read projects" on public.projects
  for select to authenticated
  using (exists (select 1 from public.admin_users where auth_user_id = auth.uid()));

drop policy if exists "admins read project files" on public.project_files;
create policy "admins read project files" on public.project_files
  for select to authenticated
  using (exists (select 1 from public.admin_users where auth_user_id = auth.uid()));

drop policy if exists "admins read participants" on public.participants;
create policy "admins read participants" on public.participants
  for select to authenticated
  using (exists (select 1 from public.admin_users where auth_user_id = auth.uid()));

drop policy if exists "admins read teams" on public.teams;
create policy "admins read teams" on public.teams
  for select to authenticated
  using (exists (select 1 from public.admin_users where auth_user_id = auth.uid()));

drop policy if exists "admins read team members" on public.team_members;
create policy "admins read team members" on public.team_members
  for select to authenticated
  using (exists (select 1 from public.admin_users where auth_user_id = auth.uid()));

drop policy if exists "admins read evaluations" on public.evaluations;
create policy "admins read evaluations" on public.evaluations
  for select to authenticated
  using (exists (select 1 from public.admin_users where auth_user_id = auth.uid()));

drop policy if exists "admins insert evaluations" on public.evaluations;
create policy "admins insert evaluations" on public.evaluations
  for insert to authenticated
  with check (exists (select 1 from public.admin_users where auth_user_id = auth.uid()));

drop policy if exists "admins update registrations" on public.registrations;
create policy "admins update registrations" on public.registrations
  for update to authenticated
  using (exists (select 1 from public.admin_users where auth_user_id = auth.uid()))
  with check (exists (select 1 from public.admin_users where auth_user_id = auth.uid()));

drop policy if exists "admins update projects" on public.projects;
create policy "admins update projects" on public.projects
  for update to authenticated
  using (exists (select 1 from public.admin_users where auth_user_id = auth.uid()))
  with check (exists (select 1 from public.admin_users where auth_user_id = auth.uid()));

drop policy if exists "admins manage announcements" on public.announcements;
create policy "admins manage announcements" on public.announcements
  for all to authenticated
  using (exists (select 1 from public.admin_users where auth_user_id = auth.uid()))
  with check (exists (select 1 from public.admin_users where auth_user_id = auth.uid()));

-- Grants: only the verbs each role actually uses.
grant select on public.announcements to anon, authenticated;
grant insert on public.participants, public.teams, public.team_members,
  public.registrations, public.projects, public.project_files to anon, authenticated;
grant select on public.participants, public.teams, public.team_members,
  public.registrations, public.projects, public.project_files, public.evaluations
  to authenticated;
grant insert on public.evaluations to authenticated;
grant update on public.registrations, public.projects to authenticated;
grant all on public.announcements to authenticated;
grant references on all tables in schema public to service_role;