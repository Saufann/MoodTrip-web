"use client";

import { useEffect, useState } from "react";
import { isWishlisted, toggleWishlist, STORE_EVENT } from "@/lib/store";

export default function WishlistButton({
  id,
  size = "sm",
  className = "",
}: {
  id: number;
  size?: "sm" | "lg";
  className?: string;
}) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const update = () => setSaved(isWishlisted(id));
    update();
    window.addEventListener(STORE_EVENT, update);
    return () => window.removeEventListener(STORE_EVENT, update);
  }, [id]);

  if (size === "lg") {
    return (
      <button
        type="button"
        onClick={() => toggleWishlist(id)}
        className={`btn ${
          saved
            ? "bg-accent/10 text-accent ring-1 ring-accent/40"
            : "border border-line bg-white text-ink hover:border-accent hover:text-accent"
        } ${className}`}
      >
        <Heart filled={saved} size={18} />
        {saved ? "Tersimpan di Wishlist" : "Simpan ke Wishlist"}
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-label={saved ? "Hapus dari wishlist" : "Simpan ke wishlist"}
      aria-pressed={saved}
      onClick={() => toggleWishlist(id)}
      className={`grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow-soft backdrop-blur transition-all hover:scale-110 ${
        saved ? "text-accent" : "text-ink/60 hover:text-accent"
      } ${className}`}
    >
      <Heart filled={saved} size={16} />
    </button>
  );
}

function Heart({ filled, size }: { filled: boolean; size: number }) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3.4 1-4.5 2.5C10.9 4 9.3 3 7.5 3A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7 7-7Z" />
    </svg>
  );
}
