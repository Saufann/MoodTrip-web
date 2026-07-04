// Klien Supabase untuk MoodTrip.
// Untuk sekarang situs berjalan dengan data lokal (lib/spots.ts).
// Saat kamu siap: isi .env.local dengan kredensial Supabase, buat tabel,
// lalu ganti pemanggilan data lokal dengan query ke Supabase di sini.

import { createClient, SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Hanya buat klien bila kredensial tersedia, agar situs tetap jalan tanpa Supabase.
export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null;

export const isSupabaseReady = Boolean(url && anonKey);

/*
Contoh pemakaian nanti (setelah tabel `spots` dibuat di Supabase):

export async function getSpots() {
  if (!supabase) return SPOTS; // fallback data lokal
  const { data, error } = await supabase.from("spots").select("*");
  if (error) throw error;
  return data;
}
*/
