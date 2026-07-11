"use client";

// Toko aksesoris travel & oleh-oleh — kartu gaya marketplace.
// Nanti data dari Supabase (tabel products).

import { useState } from "react";
import { productImage } from "@/lib/images";
import { addToCart, parsePrice, formatRp } from "@/lib/store";
import {
  Product,
  TRAVEL_GEAR,
  KHAS_LOMBOK,
  discountPct,
  soldLabel,
} from "@/lib/products";
import { useModal } from "@/components/useModal";
import HeartNamed from "@/components/HeartNamed";

export default function AksesorisPage() {
  const [added, setAdded] = useState<string | null>(null);
  const [detail, setDetail] = useState<Product | null>(null);
  const [q, setQ] = useState("");
  const [kat, setKat] = useState<"" | "gear" | "khas_lombok">("");

  function handleAdd(name: string, price: string, qty = 1) {
    addToCart(name, price, qty);
    setAdded(name);
    setTimeout(() => setAdded((cur) => (cur === name ? null : cur)), 1400);
  }

  const match = (p: Product) =>
    (p.name + " " + p.desc).toLowerCase().includes(q.trim().toLowerCase());
  const gear = TRAVEL_GEAR.filter(match);
  const khas = KHAS_LOMBOK.filter(match);
  const total =
    (kat !== "khas_lombok" ? gear.length : 0) +
    (kat !== "gear" ? khas.length : 0);

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-3xl font-bold text-ink sm:text-4xl">
        Aksesoris & Oleh-oleh
      </h1>
      <p className="mt-2 text-muted">
        Travel gear untuk tripmu dan kerajinan khas Lombok untuk dibawa pulang.
      </p>

      {/* Cari & filter kategori */}
      <div className="mt-6 flex flex-wrap items-center gap-2.5">
        <div className="relative">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari produk..."
            aria-label="Cari produk"
            className="w-56 rounded-full border border-line bg-white py-2 pl-4 pr-9 text-sm shadow-soft outline-none transition-colors focus:border-primary"
          />
          {q && (
            <button
              aria-label="Hapus pencarian"
              onClick={() => setQ("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
            >
              ✕
            </button>
          )}
        </div>
        {(
          [
            ["", "Semua"],
            ["gear", "Travel Gear"],
            ["khas_lombok", "Khas Lombok"],
          ] as const
        ).map(([val, label]) => (
          <button
            key={val}
            aria-pressed={kat === val}
            onClick={() => setKat(val)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-all ${
              kat === val
                ? "border-primary bg-primary font-semibold text-white shadow-glow"
                : "border-line bg-white text-ink hover:border-primary hover:text-primary"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {total === 0 && (
        <p className="mt-10 rounded-2xl border border-dashed border-line bg-white/60 p-8 text-center text-sm text-muted">
          Tidak ada produk cocok dengan &ldquo;{q}&rdquo;.
        </p>
      )}

      {kat !== "khas_lombok" && gear.length > 0 && (
        <section className="mt-10">
          <p className="text-sm font-bold uppercase tracking-widest text-accent">
            Perlengkapan
          </p>
          <h2 className="mt-1 text-2xl font-extrabold text-ink">Travel Gear</h2>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {gear.map((p) => (
              <ProductCard
                key={p.name}
                p={p}
                added={added}
                onAdd={handleAdd}
                onOpen={() => setDetail(p)}
              />
            ))}
          </div>
        </section>
      )}

      {kat !== "gear" && khas.length > 0 && (
        <section className="mt-14">
          <p className="text-sm font-bold uppercase tracking-widest text-accent">
            Buah tangan
          </p>
          <h2 className="mt-1 text-2xl font-extrabold text-ink">Khas Lombok</h2>
          <p className="mt-1 text-sm text-muted">
            Langsung dari perajin &amp; UMKM lokal — setiap pembelian mendukung
            komunitas.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {khas.map((p) => (
              <ProductCard
                key={p.name}
                p={p}
                added={added}
                onAdd={handleAdd}
                onOpen={() => setDetail(p)}
              />
            ))}
          </div>
        </section>
      )}

      {detail && (
        <ProductModal
          p={detail}
          onClose={() => setDetail(null)}
          onAdd={handleAdd}
        />
      )}
    </div>
  );
}

// ---------- Kartu produk gaya marketplace ----------
function ProductCard({
  p,
  added,
  onAdd,
  onOpen,
}: {
  p: Product;
  added: string | null;
  onAdd: (name: string, price: string) => void;
  onOpen: () => void;
}) {
  const disc = discountPct(p);

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`Lihat detail ${p.name}`}
      onClick={onOpen}
      onKeyDown={(e) => e.key === "Enter" && onOpen()}
      className="group card-hover cursor-pointer overflow-hidden"
    >
      {/* Foto persegi + badge */}
      <div className="relative aspect-square overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={productImage(p.name)}
          alt={p.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {disc && (
          <span className="absolute left-0 top-2 rounded-r-lg bg-accent px-2 py-0.5 text-xs font-extrabold text-white shadow-soft">
            -{disc}%
          </span>
        )}
        <HeartNamed kind="produk" name={p.name} className="absolute right-2 top-2 h-8 w-8" />
      </div>

      <div className="p-3">
        {/* Nama 2 baris */}
        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-medium leading-snug text-ink">
          {p.name}
        </h3>

        {/* Harga + coret */}
        <div className="mt-1.5 flex flex-wrap items-baseline gap-1.5">
          <span className="text-base font-extrabold text-primary">
            {p.price}
          </span>
          {p.oldPrice && (
            <span className="text-xs text-muted line-through">{p.oldPrice}</span>
          )}
        </div>

        {/* Rating + terjual */}
        <p className="mt-1 flex items-center gap-1 text-xs text-muted">
          <span className="text-accent">★</span>
          <span className="font-semibold text-ink">{p.rating.toFixed(1)}</span>
          <span aria-hidden>·</span>
          {soldLabel(p.sold)}
        </p>

        {/* Toko / asal */}
        <p className="mt-1 flex items-center gap-1 text-xs text-muted">
          {p.official ? (
            <span
              aria-label="Toko resmi"
              className="grid h-3.5 w-3.5 flex-none place-items-center rounded-full bg-primary text-[9px] font-bold text-white"
            >
              ✓
            </span>
          ) : (
            <svg aria-hidden width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-none">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          )}
          <span className="truncate">{p.origin}</span>
        </p>

        {/* Badge ongkir */}
        {p.freeShipping && (
          <span className="mt-1.5 inline-block rounded border border-green-600/40 bg-green-50 px-1.5 py-px text-[10px] font-semibold text-green-700">
            Gratis Ongkir
          </span>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAdd(p.name, p.price);
          }}
          className={`btn mt-2.5 w-full py-1.5 text-xs ${
            added === p.name
              ? "bg-primary-dark text-white"
              : "border border-primary bg-white text-primary hover:bg-primary hover:text-white"
          }`}
        >
          {added === p.name ? "✓ Masuk keranjang" : "+ Keranjang"}
        </button>
      </div>
    </article>
  );
}

// ---------- Modal detail produk ----------
function ProductModal({
  p,
  onClose,
  onAdd,
}: {
  p: Product;
  onClose: () => void;
  onAdd: (name: string, price: string, qty: number) => void;
}) {
  useModal(onClose);
  const [qty, setQty] = useState(1);
  const disc = discountPct(p);
  const subtotal = formatRp(parsePrice(p.price) * qty);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-5"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Detail ${p.name}`}
    >
      <div
        className="max-h-[92vh] w-full max-w-md animate-fade-up overflow-y-auto rounded-t-3xl bg-white shadow-card sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[4/3]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={productImage(p.name)}
            alt={p.name}
            className="h-full w-full object-cover"
          />
          {disc && (
            <span className="absolute left-0 top-4 rounded-r-lg bg-accent px-2.5 py-1 text-sm font-extrabold text-white shadow-soft">
              -{disc}%
            </span>
          )}
          <button
            type="button"
            aria-label="Tutup"
            onClick={onClose}
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink shadow-soft backdrop-blur"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {/* Harga dulu, ala marketplace */}
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-2xl font-extrabold text-primary">
              {p.price}
            </span>
            {p.oldPrice && (
              <span className="text-sm text-muted line-through">
                {p.oldPrice}
              </span>
            )}
          </div>
          <h2 className="mt-1 text-lg font-bold leading-snug text-ink">
            {p.name}
          </h2>

          <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
            <span>
              <span className="text-accent">★</span>{" "}
              <b className="text-ink">{p.rating.toFixed(1)}</b>
            </span>
            <span aria-hidden>·</span>
            <span>{soldLabel(p.sold)}</span>
            <span aria-hidden>·</span>
            <span>Stok: {p.stock}</span>
          </p>

          {/* Toko */}
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-cream px-3 py-2.5 text-sm">
            {p.official ? (
              <span className="grid h-5 w-5 flex-none place-items-center rounded-full bg-primary text-[10px] font-bold text-white">
                ✓
              </span>
            ) : (
              <span aria-hidden>🧵</span>
            )}
            <span className="font-medium text-ink">{p.origin}</span>
            {p.official && (
              <span className="chip ml-auto bg-primary/10 text-[10px] font-bold text-primary">
                Official Store
              </span>
            )}
          </div>

          <p className="mt-3 text-sm leading-relaxed text-muted">{p.desc}</p>

          {/* Info pengiriman */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.freeShipping && (
              <span className="rounded border border-green-600/40 bg-green-50 px-2 py-0.5 text-[11px] font-semibold text-green-700">
                🚚 Gratis Ongkir
              </span>
            )}
            <span className="rounded border border-line bg-white px-2 py-0.5 text-[11px] font-medium text-muted">
              Dikirim dari Lombok
            </span>
            <span className="rounded border border-line bg-white px-2 py-0.5 text-[11px] font-medium text-muted">
              Bisa COD area Mataram
            </span>
          </div>

          {/* Qty + tambah */}
          <div className="mt-5 flex items-center justify-between gap-4 border-t border-line pt-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Kurangi jumlah"
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink transition-colors hover:border-primary hover:text-primary"
              >
                −
              </button>
              <span className="w-8 text-center text-lg font-bold text-ink">
                {qty}
              </span>
              <button
                type="button"
                aria-label="Tambah jumlah"
                onClick={() => setQty(Math.min(p.stock, qty + 1))}
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink transition-colors hover:border-primary hover:text-primary"
              >
                +
              </button>
            </div>
            <button
              onClick={() => {
                onAdd(p.name, p.price, qty);
                onClose();
              }}
              className="btn-primary flex-1"
            >
              + Keranjang · {subtotal}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
