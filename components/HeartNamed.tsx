"use client";

// Tombol hati untuk item berbasis nama (paket & produk).
import { useEffect, useState } from "react";
import {
  getPaketWishlist,
  togglePaketWishlist,
  getProdukWishlist,
  toggleProdukWishlist,
  STORE_EVENT,
} from "@/lib/store";

export default function HeartNamed({
  kind,
  name,
  className = "",
}: {
  kind: "paket" | "produk";
  name: string;
  className?: string;
}) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const get = kind === "paket" ? getPaketWishlist : getProdukWishlist;
    const update = () => setSaved(get().includes(name));
    update();
    window.addEventListener(STORE_EVENT, update);
    return () => window.removeEventListener(STORE_EVENT, update);
  }, [kind, name]);

  return (
    <button
      type="button"
      aria-label={saved ? `Hapus ${name} dari wishlist` : `Simpan ${name} ke wishlist`}
      aria-pressed={saved}
      onClick={(e) => {
        e.stopPropagation();
        (kind === "paket" ? togglePaketWishlist : toggleProdukWishlist)(name);
      }}
      className={`z-20 grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow-soft backdrop-blur transition-all hover:scale-110 ${
        saved ? "text-accent" : "text-ink/60 hover:text-accent"
      } ${className}`}
    >
      <svg
        aria-hidden
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3.4 1-4.5 2.5C10.9 4 9.3 3 7.5 3A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7 7-7Z" />
      </svg>
    </button>
  );
}
