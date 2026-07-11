"use client";

// Toko aksesoris travel (contoh data). Nanti dari Supabase / Wix Stores.

import { useState } from "react";
import { productImage } from "@/lib/images";
import { addToCart } from "@/lib/store";
import { Product, TRAVEL_GEAR, KHAS_LOMBOK } from "@/lib/products";
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
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
          Langsung dari perajin & UMKM lokal — setiap pembelian mendukung
          komunitas.
        </p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`Lihat detail ${p.name}`}
      onClick={onOpen}
      onKeyDown={(e) => e.key === "Enter" && onOpen()}
      className="group card-hover cursor-pointer overflow-hidden"
    >
      <div className="relative h-44 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={productImage(p.name)}
          alt={p.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <HeartNamed kind="produk" name={p.name} className="absolute right-3 top-3" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold leading-snug text-ink transition-colors group-hover:text-primary">
          {p.name}
        </h3>
        <p className="mt-0.5 text-xs leading-relaxed text-muted">{p.desc}</p>
        <p className="mt-2 font-bold text-primary">{p.price}</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAdd(p.name, p.price);
          }}
          className={`btn mt-3 w-full py-2 text-sm ${
            added === p.name
              ? "bg-primary-dark text-white"
              : "bg-primary text-white hover:bg-primary-dark"
          }`}
        >
          {added === p.name ? "✓ Masuk keranjang" : "+ Keranjang"}
        </button>
      </div>
    </article>
  );
}

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

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-5"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Detail ${p.name}`}
    >
      <div
        className="w-full max-w-md animate-fade-up overflow-hidden rounded-t-3xl bg-white shadow-card sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-56">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={productImage(p.name)}
            alt={p.name}
            className="h-full w-full object-cover"
          />
          <button
            type="button"
            aria-label="Tutup"
            onClick={onClose}
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink shadow-soft backdrop-blur"
          >
            ✕
          </button>
        </div>

        <div className="p-7">
          <h2 className="text-xl font-extrabold text-ink">{p.name}</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.desc}</p>
          <p className="mt-3 text-2xl font-extrabold text-primary">{p.price}</p>

          <div className="mt-5 flex items-center justify-between gap-4">
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
                onClick={() => setQty(Math.min(99, qty + 1))}
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
              + Keranjang ({qty})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
