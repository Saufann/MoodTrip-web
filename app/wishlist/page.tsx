"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SpotCard from "@/components/SpotCard";
import { SPOTS } from "@/lib/spots";
import { PACKAGES } from "@/lib/paket";
import { ALL_PRODUCTS } from "@/lib/products";
import { paketImage, productImage } from "@/lib/images";
import {
  getWishlist,
  getPaketWishlist,
  togglePaketWishlist,
  getProdukWishlist,
  toggleProdukWishlist,
  addToCart,
  STORE_EVENT,
} from "@/lib/store";
import { syncWishlist } from "@/lib/sync";
import { useUser } from "@/components/useUser";

export default function WishlistPage() {
  const { user } = useUser();
  const [ids, setIds] = useState<number[]>([]);
  const [paketNames, setPaketNames] = useState<string[]>([]);
  const [produkNames, setProdukNames] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const update = () => {
      setIds(getWishlist());
      setPaketNames(getPaketWishlist());
      setProdukNames(getProdukWishlist());
    };
    update();
    setReady(true);
    window.addEventListener(STORE_EVENT, update);
    return () => window.removeEventListener(STORE_EVENT, update);
  }, []);

  // Tarik wishlist dari akun saat login terdeteksi
  useEffect(() => {
    if (user) syncWishlist(user.id);
  }, [user]);

  if (!ready) return <div className="min-h-[50vh]" />;

  const spots = SPOTS.filter((s) => ids.includes(s.id));
  const pakets = PACKAGES.filter((p) => paketNames.includes(p.name));
  const products = ALL_PRODUCTS.filter((p) => produkNames.includes(p.name));
  const empty = spots.length + pakets.length + products.length === 0;

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-3xl font-bold text-ink sm:text-4xl">Wishlist</h1>
      <p className="mt-2 text-muted">
        Tempat, paket, dan barang yang kamu simpan untuk trip berikutnya.
      </p>

      {empty ? (
        <div className="mt-10 rounded-3xl border border-dashed border-line bg-white/60 px-6 py-16 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-cream text-3xl">
            🤍
          </div>
          <p className="mt-4 font-semibold text-ink">Belum ada yang disimpan</p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-muted">
            Tekan ikon hati pada tempat, paket, atau produk yang kamu suka.
          </p>
          <Link href="/jelajah" className="btn-primary mt-6">
            Jelajahi Tempat
          </Link>
        </div>
      ) : (
        <>
          {spots.length > 0 && (
            <section className="mt-8">
              <h2 className="text-xl font-extrabold text-ink">
                🏝️ Tempat ({spots.length})
              </h2>
              <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {spots.map((s) => (
                  <SpotCard key={s.id} spot={s} />
                ))}
              </div>
            </section>
          )}

          {pakets.length > 0 && (
            <section className="mt-10">
              <h2 className="text-xl font-extrabold text-ink">
                🎒 Paket Wisata ({pakets.length})
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {pakets.map((p) => (
                  <div key={p.name} className="card flex items-center gap-4 p-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={paketImage(p.persona)}
                      alt=""
                      className="h-16 w-24 flex-none rounded-xl object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/paket?persona=${encodeURIComponent(p.persona)}`}
                        className="font-bold leading-snug text-ink hover:text-primary"
                      >
                        {p.name}
                      </Link>
                      <p className="text-xs text-muted">
                        {p.durasi} · {p.price}
                      </p>
                    </div>
                    <button
                      aria-label={`Hapus ${p.name}`}
                      onClick={() => togglePaketWishlist(p.name)}
                      className="flex-none text-muted hover:text-accent"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {products.length > 0 && (
            <section className="mt-10">
              <h2 className="text-xl font-extrabold text-ink">
                🛍️ Produk ({products.length})
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {products.map((p) => (
                  <div key={p.name} className="card flex items-center gap-4 p-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={productImage(p.name)}
                      alt=""
                      className="h-16 w-24 flex-none rounded-xl object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="font-bold leading-snug text-ink">
                        {p.name}
                      </div>
                      <p className="text-xs text-muted">{p.price}</p>
                    </div>
                    <button
                      onClick={() => addToCart(p.name, p.price)}
                      className="btn-primary flex-none px-3 py-1.5 text-xs"
                    >
                      + Keranjang
                    </button>
                    <button
                      aria-label={`Hapus ${p.name}`}
                      onClick={() => toggleProdukWishlist(p.name)}
                      className="flex-none text-muted hover:text-accent"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
