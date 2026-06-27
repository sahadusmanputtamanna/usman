-- ================================================
-- USMAN PORTFOLIO – Supabase Database Schema & Migrations
-- ================================================

-- 1. Create portfolio_works table
create table if not exists portfolio_works (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  category text not null,
  description text,
  image_url text not null,
  instagram_url text,
  is_published boolean default true,
  created_at timestamptz default now()
);

-- Enable Row-Level Security for portfolio_works
alter table portfolio_works enable row level security;

-- Drop policies if they already exist
drop policy if exists "Allow public read access on published works" on portfolio_works;
drop policy if exists "Allow auth admin all access on works" on portfolio_works;

-- Create policies for portfolio_works
create policy "Allow public read access on published works"
on portfolio_works for select
using (is_published = true);

create policy "Allow auth admin all access on works"
on portfolio_works for all
using (auth.role() = 'authenticated');

-- 2. Create contact_messages table
create table if not exists contact_messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  subject text,
  message text not null,
  is_read boolean default false,
  created_at timestamptz default now()
);

-- Enable Row-Level Security for contact_messages
alter table contact_messages enable row level security;

-- Drop policies if they already exist
drop policy if exists "Allow public insert messages" on contact_messages;
drop policy if exists "Allow auth admin all access on messages" on contact_messages;

-- Create policies for contact_messages
create policy "Allow public insert messages"
on contact_messages for insert
with check (true);

create policy "Allow auth admin all access on messages"
on contact_messages for all
using (auth.role() = 'authenticated');

-- 3. Storage Bucket Setup (portfolio-images)
-- Note: Create the 'portfolio-images' bucket manually in Supabase Storage with public access enabled.
-- Then execute the following policies to enable uploads:

-- Drop policies if they already exist
drop policy if exists "Public read access on portfolio-images" on storage.objects;
drop policy if exists "Admin upload access on portfolio-images" on storage.objects;
drop policy if exists "Admin delete access on portfolio-images" on storage.objects;

-- Create storage policies
create policy "Public read access on portfolio-images"
on storage.objects for select
using (bucket_id = 'portfolio-images');

create policy "Admin upload access on portfolio-images"
on storage.objects for insert
with check (bucket_id = 'portfolio-images' and auth.role() = 'authenticated');

create policy "Admin delete access on portfolio-images"
on storage.objects for delete
using (bucket_id = 'portfolio-images' and auth.role() = 'authenticated');

-- 4. Create visitor_stats table for visitor analytics
create table if not exists visitor_stats (
  id uuid default gen_random_uuid() primary key,
  ip_hash text,
  created_at timestamptz default now()
);

-- Enable Row-Level Security for visitor_stats
alter table visitor_stats enable row level security;

-- Drop policies if they already exist
drop policy if exists "Allow public insert visitor_stats" on visitor_stats;
drop policy if exists "Allow public select visitor_stats" on visitor_stats;
drop policy if exists "Allow auth admin delete visitor_stats" on visitor_stats;

-- Create policies for visitor_stats
create policy "Allow public insert visitor_stats"
on visitor_stats for insert
with check (true);

create policy "Allow public select visitor_stats"
on visitor_stats for select
using (true);

create policy "Allow auth admin delete visitor_stats"
on visitor_stats for delete
using (auth.role() = 'authenticated');

