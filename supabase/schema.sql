-- ============================================================
-- MoodTrip — Skema database v1
-- Jalankan di Supabase: SQL Editor → New query → paste → Run
-- Setelah ini jalankan seed.sql untuk mengisi data awal.
-- ============================================================

-- ---------- KONTEN (baca publik, tulis admin via dashboard) ----------

create table public.spots (
  id           bigint primary key,
  name         text not null,
  category     text not null,
  location     text not null,
  description  text not null,
  uniqueness   text not null,
  price_min    integer not null default 0,   -- untuk sortir "termurah"
  price_label  text not null,                -- teks tampilan, mis. "Donasi / paket lokal"
  hours        text not null,
  rating       numeric(2,1) not null default 0,
  lat          double precision not null,
  lng          double precision not null,
  gallery      text[] not null default '{}',
  fasilitas    text[] not null default '{}',
  created_at   timestamptz not null default now()
);

create table public.tags (
  id    bigint generated always as identity primary key,
  name  text not null unique,
  kind  text not null default 'mood' check (kind in ('mood','minat'))
);

create table public.spot_tags (
  spot_id bigint not null references public.spots(id) on delete cascade,
  tag_id  bigint not null references public.tags(id) on delete cascade,
  primary key (spot_id, tag_id)
);

create table public.partners (
  id        bigint generated always as identity primary key,
  name      text not null unique,
  base      text not null,
  since     text not null,
  descr     text not null,
  spesialis text not null
);

create table public.packages (
  id         bigint generated always as identity primary key,
  partner_id bigint not null references public.partners(id) on delete cascade,
  name       text not null,
  persona    text not null,
  descr      text not null,
  durasi     text not null,
  price      integer not null,
  include    text[] not null default '{}'
);

create table public.products (
  id       bigint generated always as identity primary key,
  name     text not null unique,
  descr    text not null,
  price    integer not null,
  kategori text not null check (kategori in ('gear','khas_lombok')),
  image    text not null default ''
);

-- Resto mitra: tampil di peta, dengan kondisi buka/tutup REAL
-- yang diubah manual oleh admin/mitra (bukan dihitung dari jadwal).
create table public.restos (
  id                 bigint generated always as identity primary key,
  name               text not null unique,
  location           text not null,
  hours              text not null,           -- jadwal tertulis, mis. "10.00 - 22.00"
  about              text not null,
  image              text not null default '',
  lat                double precision not null,
  lng                double precision not null,
  is_open            boolean not null default true,   -- kondisi real saat ini
  is_open_updated_at timestamptz not null default now()
);

-- catat kapan status buka/tutup terakhir diubah
create or replace function public.touch_resto_status()
returns trigger language plpgsql as $$
begin
  if new.is_open is distinct from old.is_open then
    new.is_open_updated_at = now();
  end if;
  return new;
end $$;

create trigger trg_resto_status
  before update on public.restos
  for each row execute function public.touch_resto_status();

create table public.menu_items (
  id       bigint generated always as identity primary key,
  resto_id bigint not null references public.restos(id) on delete cascade,
  name     text not null,
  price    integer not null,
  ready    boolean not null default true
);

-- ---------- USER (butuh login; RLS per-pemilik) ----------

create table public.profiles (
  id      uuid primary key references auth.users(id) on delete cascade,
  name    text not null default '',
  galen   text,
  mbti    text,
  persona text,
  created_at timestamptz not null default now()
);

-- profil otomatis dibuat saat user daftar
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, name)
  values (new.id, coalesce(new.raw_user_meta_data->>'name',''));
  return new;
end $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create table public.profile_tags (
  user_id uuid   not null references public.profiles(id) on delete cascade,
  tag_id  bigint not null references public.tags(id) on delete cascade,
  primary key (user_id, tag_id)
);

create table public.wishlists (
  user_id uuid   not null references public.profiles(id) on delete cascade,
  spot_id bigint not null references public.spots(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, spot_id)
);

-- Review WAJIB login; 1 user maksimal 1 review per spot.
create table public.spot_reviews (
  id         bigint generated always as identity primary key,
  spot_id    bigint not null references public.spots(id) on delete cascade,
  user_id    uuid   not null references public.profiles(id) on delete cascade,
  rating     integer not null check (rating between 1 and 5),
  body       text not null,
  created_at timestamptz not null default now(),
  unique (spot_id, user_id)
);

create table public.orders (
  id         bigint generated always as identity primary key,
  user_id    uuid references public.profiles(id) on delete set null,
  type       text not null check (type in ('paket','belanja')),
  title      text not null,
  detail     text not null,
  created_at timestamptz not null default now()
);

-- ---------- ROW LEVEL SECURITY ----------

-- Konten: publik boleh baca; tulis hanya lewat dashboard/service role.
alter table public.spots      enable row level security;
alter table public.tags       enable row level security;
alter table public.spot_tags  enable row level security;
alter table public.partners   enable row level security;
alter table public.packages   enable row level security;
alter table public.products   enable row level security;
alter table public.restos     enable row level security;
alter table public.menu_items enable row level security;

create policy "baca publik" on public.spots      for select using (true);
create policy "baca publik" on public.tags       for select using (true);
create policy "baca publik" on public.spot_tags  for select using (true);
create policy "baca publik" on public.partners   for select using (true);
create policy "baca publik" on public.packages   for select using (true);
create policy "baca publik" on public.products   for select using (true);
create policy "baca publik" on public.restos     for select using (true);
create policy "baca publik" on public.menu_items for select using (true);

-- Data user
alter table public.profiles     enable row level security;
alter table public.profile_tags enable row level security;
alter table public.wishlists    enable row level security;
alter table public.spot_reviews enable row level security;
alter table public.orders       enable row level security;

-- profiles: nama publik (untuk byline review), edit hanya milik sendiri
create policy "baca publik"   on public.profiles for select using (true);
create policy "update sendiri" on public.profiles for update using (auth.uid() = id);

create policy "kelola sendiri" on public.profile_tags
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "kelola sendiri" on public.wishlists
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- review: semua boleh baca; tulis/ubah/hapus hanya pemilik & harus login
create policy "baca publik" on public.spot_reviews for select using (true);
create policy "tulis sendiri" on public.spot_reviews
  for insert with check (auth.uid() = user_id);
create policy "ubah sendiri" on public.spot_reviews
  for update using (auth.uid() = user_id);
create policy "hapus sendiri" on public.spot_reviews
  for delete using (auth.uid() = user_id);

-- orders: hanya pemilik yang bisa lihat & buat
create policy "lihat sendiri" on public.orders for select using (auth.uid() = user_id);
create policy "buat sendiri"  on public.orders for insert with check (auth.uid() = user_id);

-- CATATAN untuk akses mitra (update status resto & menu):
-- untuk tahap awal, admin mengubah is_open / ready lewat Table Editor Supabase.
-- Nanti bila mitra punya akun sendiri, tambahkan tabel partner_users(user_id, resto_id)
-- lalu policy update pada restos & menu_items yang mengecek keanggotaan tabel itu.
