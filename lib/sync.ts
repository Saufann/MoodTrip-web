// Sinkronisasi data lokal ↔ Supabase saat user login.
// Dipanggil dari halaman masuk (setelah login) dan halaman yang butuh
// data tersinkron (profil, wishlist). Aman dipanggil berulang.

import { supabase } from "@/lib/supabase";
import { loadCloudProfile } from "@/lib/profile";
import {
  getWishlist,
  setWishlistLocal,
  getOrders,
  clearLocalOrders,
} from "@/lib/store";

// Gabungkan wishlist spot: DB ∪ lokal → simpan dua arah.
export async function syncWishlist(userId: string) {
  if (!supabase) return;
  const { data } = await supabase
    .from("wishlists")
    .select("spot_id")
    .eq("user_id", userId);
  const cloud = (data ?? []).map((r) => r.spot_id as number);
  const local = getWishlist();
  const merged = [...new Set([...cloud, ...local])];
  setWishlistLocal(merged);
  const missing = merged.filter((id) => !cloud.includes(id));
  if (missing.length > 0) {
    await supabase
      .from("wishlists")
      .upsert(missing.map((spot_id) => ({ user_id: userId, spot_id })));
  }
}

// Pesanan yang dibuat sebelum login (lokal) diangkat ke DB lalu lokal dikosongkan.
export async function migrateLocalOrders(userId: string) {
  if (!supabase) return;
  const local = getOrders();
  if (local.length === 0) return;
  const { error } = await supabase.from("orders").insert(
    local.map((o) => ({
      user_id: userId,
      type: o.type,
      title: o.title,
      detail: o.detail,
      created_at: o.date,
    }))
  );
  if (!error) clearLocalOrders();
}

export async function syncOnLogin(userId: string) {
  await Promise.all([
    loadCloudProfile(userId),
    syncWishlist(userId),
    migrateLocalOrders(userId),
  ]);
}
