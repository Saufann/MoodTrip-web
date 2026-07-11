"use client";

// Riwayat pesanan.
// Login + Supabase aktif → baca tabel orders (dengan status yang dikelola admin).
// Belum login → catatan lokal di perangkat.

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { getOrders, Order, STORE_EVENT } from "@/lib/store";
import { supabase, isSupabaseReady } from "@/lib/supabase";
import { useUser } from "@/components/useUser";

const STATUS_STYLE: Record<string, { label: string; cls: string }> = {
  menunggu: { label: "⏳ Menunggu konfirmasi", cls: "bg-amber-50 text-amber-700" },
  dikonfirmasi: { label: "✅ Dikonfirmasi", cls: "bg-primary/10 text-primary" },
  selesai: { label: "🎉 Selesai", cls: "bg-green-50 text-green-700" },
  dibatalkan: { label: "✕ Dibatalkan", cls: "bg-red-50 text-red-600" },
};

export default function PesananPage() {
  const { user, loading } = useUser();
  const [orders, setOrders] = useState<Order[] | null>(null);

  const load = useCallback(async () => {
    // Mode akun: ambil dari DB
    if (user && supabase) {
      const { data } = await supabase
        .from("orders")
        .select("type, title, detail, status, created_at")
        .order("created_at", { ascending: false });
      setOrders(
        (data ?? []).map((o) => ({
          type: o.type,
          title: o.title,
          detail: o.detail,
          status: o.status,
          date: o.created_at,
        }))
      );
      return;
    }
    // Mode perangkat
    setOrders(getOrders());
  }, [user]);

  useEffect(() => {
    if (loading) return;
    load();
    window.addEventListener(STORE_EVENT, load);
    return () => window.removeEventListener(STORE_EVENT, load);
  }, [load, loading]);

  if (orders === null) return <div className="min-h-[50vh]" />;

  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <h1 className="text-3xl font-bold text-ink sm:text-4xl">
        Riwayat Pesanan
      </h1>
      <p className="mt-2 text-muted">
        {user
          ? "Pesanan tersimpan di akunmu — status diperbarui oleh admin."
          : "Pesanan yang kamu teruskan ke WhatsApp tercatat di sini."}
      </p>

      {isSupabaseReady && !user && (
        <div className="mt-5 flex flex-wrap items-center gap-3 rounded-2xl border border-primary/30 bg-primary/5 px-5 py-3">
          <p className="flex-1 text-sm text-ink">
            Masuk agar pesananmu tersimpan di akun &amp; bisa dipantau
            statusnya (menunggu → dikonfirmasi → selesai).
          </p>
          <Link href="/masuk" className="btn-primary flex-none px-4 py-2 text-sm">
            Masuk
          </Link>
        </div>
      )}

      {orders.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-line bg-white/60 px-6 py-16 text-center">
          <div className="text-4xl">🧾</div>
          <p className="mt-3 font-semibold text-ink">Belum ada pesanan</p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-muted">
            Pesan paket wisata atau checkout aksesoris — riwayatnya muncul di
            sini.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/paket" className="btn-primary">
              Lihat Paket
            </Link>
            <Link href="/aksesoris" className="btn-outline">
              Belanja Aksesoris
            </Link>
          </div>
        </div>
      ) : (
        <ul className="mt-8 space-y-4">
          {orders.map((o, i) => {
            const st = STATUS_STYLE[o.status ?? "menunggu"];
            return (
              <li key={i} className="card flex items-start gap-4 p-5">
                <div
                  className={`grid h-11 w-11 flex-none place-items-center rounded-2xl text-xl ${
                    o.type === "paket" ? "bg-primary/10" : "bg-accent/10"
                  }`}
                >
                  {o.type === "paket" ? "🏝️" : "🛍️"}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-bold text-ink">{o.title}</h2>
                    <span
                      className={`chip ${
                        o.type === "paket"
                          ? "bg-primary/10 text-primary"
                          : "bg-accent/10 text-accent"
                      }`}
                    >
                      {o.type === "paket" ? "Paket Wisata" : "Belanja"}
                    </span>
                  </div>
                  <p className="mt-1 whitespace-pre-line text-sm text-muted">
                    {o.detail}
                  </p>
                  <div className="mt-2.5 flex flex-wrap items-center gap-2">
                    {user && st && (
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${st.cls}`}
                      >
                        {st.label}
                      </span>
                    )}
                    <span className="text-xs text-muted">
                      {new Date(o.date).toLocaleDateString("id-ID", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <p className="mt-8 text-center text-xs text-muted">
        Detail konfirmasi ada di percakapan WhatsApp-mu dengan admin.
      </p>
    </div>
  );
}
