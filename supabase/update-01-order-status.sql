-- Update 01: kolom status pada orders.
-- Jalankan di SQL Editor Supabase (sekali saja).
-- Admin mengubah status dari Table Editor: menunggu → dikonfirmasi → selesai.

alter table public.orders
  add column if not exists status text not null default 'menunggu'
  check (status in ('menunggu', 'dikonfirmasi', 'selesai', 'dibatalkan'));
