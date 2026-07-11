"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getOrders, Order, STORE_EVENT } from "@/lib/store";

export default function PesananPage() {
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    const update = () => setOrders(getOrders());
    update();
    window.addEventListener(STORE_EVENT, update);
    return () => window.removeEventListener(STORE_EVENT, update);
  }, []);

  if (!orders) return <div className="min-h-[50vh]" />;

  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <h1 className="text-3xl font-bold text-ink sm:text-4xl">
        Riwayat Pesanan
      </h1>
      <p className="mt-2 text-muted">
        Pesanan yang kamu teruskan ke WhatsApp tercatat di sini.
      </p>

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
          {orders.map((o, i) => (
            <li key={i} className="card flex items-start gap-4 p-5">
              <div
                className={`grid h-11 w-11 flex-none place-items-center rounded-2xl text-xl ${
                  o.type === "paket"
                    ? "bg-primary/10"
                    : "bg-accent/10"
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
                <p className="mt-2 text-xs text-muted">
                  {new Date(o.date).toLocaleDateString("id-ID", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-8 text-center text-xs text-muted">
        Status konfirmasi pesanan ada di percakapan WhatsApp-mu dengan admin.
      </p>
    </div>
  );
}
