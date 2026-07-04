"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SpotCard from "@/components/SpotCard";
import { SPOTS } from "@/lib/spots";
import { getWishlist, STORE_EVENT } from "@/lib/store";

export default function WishlistPage() {
  const [ids, setIds] = useState<number[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const update = () => setIds(getWishlist());
    update();
    setReady(true);
    window.addEventListener(STORE_EVENT, update);
    return () => window.removeEventListener(STORE_EVENT, update);
  }, []);

  const spots = SPOTS.filter((s) => ids.includes(s.id));

  if (!ready) return <div className="min-h-[50vh]" />;

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-3xl font-bold text-ink sm:text-4xl">Wishlist</h1>
      <p className="mt-2 text-muted">
        Tempat-tempat yang kamu simpan untuk trip berikutnya.
      </p>

      {spots.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-line bg-white/60 px-6 py-16 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-cream text-3xl">
            🤍
          </div>
          <p className="mt-4 font-semibold text-ink">Belum ada yang disimpan</p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-muted">
            Tekan ikon hati pada tempat yang kamu suka, nanti muncul di sini.
          </p>
          <Link href="/jelajah" className="btn-primary mt-6">
            Jelajahi Tempat
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {spots.map((s) => (
            <SpotCard key={s.id} spot={s} />
          ))}
        </div>
      )}
    </div>
  );
}
