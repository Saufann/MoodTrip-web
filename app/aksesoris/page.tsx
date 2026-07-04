"use client";

// Toko aksesoris travel (contoh data). Nanti dari Supabase / Wix Stores.

import { useState } from "react";
import { productImage } from "@/lib/images";
import { addToCart } from "@/lib/store";

type Product = { name: string; price: string; desc: string };

// Perlengkapan perjalanan
const TRAVEL_GEAR: Product[] = [
  { name: "Tumbler MoodTrip", price: "Rp89.000", desc: "Botol minum 750ml, tahan dingin 12 jam" },
  { name: "Dry Bag 10L", price: "Rp120.000", desc: "Anti air — aman untuk island hopping" },
  { name: "Daypack Lipat 20L", price: "Rp135.000", desc: "Ringan, bisa dilipat sekepal tangan" },
  { name: "Tripod Mini HP", price: "Rp95.000", desc: "Buat konten sunset tanpa minta tolong" },
  { name: "Power Bank 10.000mAh", price: "Rp180.000", desc: "Dua port, fast charging" },
  { name: "Topi Pantai", price: "Rp75.000", desc: "Anyaman ringan, siap golden hour" },
];

// Oleh-oleh & kerajinan khas Lombok
const KHAS_LOMBOK: Product[] = [
  { name: "Kain Tenun Sasak", price: "Rp250.000", desc: "Tenun ikat asli Desa Sukarara" },
  { name: "Scarf Tenun Sasak", price: "Rp150.000", desc: "Motif tradisional, cocok buat OOTD" },
  { name: "Gelang Mutiara Sekarbela", price: "Rp175.000", desc: "Mutiara asli sentra Sekarbela, Mataram" },
  { name: "Anyaman Ketak Lombok", price: "Rp95.000", desc: "Tas/keranjang anyaman tangan khas Lombok" },
  { name: "Sambal Kit Lombok", price: "Rp65.000", desc: "Paket sambal khas — level pedas pilihan" },
  { name: "Kopi Sembalun", price: "Rp55.000", desc: "Robusta kaki Rinjani, sangrai medium" },
];

export default function AksesorisPage() {
  const [added, setAdded] = useState<string | null>(null);

  function handleAdd(name: string, price: string) {
    addToCart(name, price);
    setAdded(name);
    setTimeout(() => setAdded((cur) => (cur === name ? null : cur)), 1400);
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-3xl font-bold text-ink sm:text-4xl">
        Aksesoris & Oleh-oleh
      </h1>
      <p className="mt-2 text-muted">
        Travel gear untuk tripmu dan kerajinan khas Lombok untuk dibawa pulang.
      </p>

      <section className="mt-10">
        <p className="text-sm font-bold uppercase tracking-widest text-accent">
          Perlengkapan
        </p>
        <h2 className="mt-1 text-2xl font-extrabold text-ink">Travel Gear</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TRAVEL_GEAR.map((p) => (
            <ProductCard key={p.name} p={p} added={added} onAdd={handleAdd} />
          ))}
        </div>
      </section>

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
          {KHAS_LOMBOK.map((p) => (
            <ProductCard key={p.name} p={p} added={added} onAdd={handleAdd} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ProductCard({
  p,
  added,
  onAdd,
}: {
  p: Product;
  added: string | null;
  onAdd: (name: string, price: string) => void;
}) {
  return (
    <article className="group card-hover overflow-hidden">
      <div className="h-44 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={productImage(p.name)}
          alt={p.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold leading-snug text-ink">{p.name}</h3>
        <p className="mt-0.5 text-xs leading-relaxed text-muted">{p.desc}</p>
        <p className="mt-2 font-bold text-primary">{p.price}</p>
        <button
          onClick={() => onAdd(p.name, p.price)}
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
