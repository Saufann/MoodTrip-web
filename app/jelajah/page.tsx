"use client";

import { useState } from "react";
import SpotCard from "@/components/SpotCard";
import { SPOTS, MOOD_TAGS, spotMatches } from "@/lib/spots";

export default function JelajahPage() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("");

  const visible = SPOTS.filter((s) => spotMatches(s, query, tag));

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-3xl font-bold text-ink sm:text-4xl">Jelajah Lombok</h1>
      <p className="mt-2 text-muted">
        Cari tempat berdasarkan mood, tag, atau kata kunci.
      </p>

      {/* Pencarian */}
      <div className="relative mt-6">
        <svg
          aria-hidden
          className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-muted"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.5" y2="16.5" />
        </svg>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari: healing, makanan pedas, Senggigi, hidden gem..."
          className="w-full rounded-2xl border border-line bg-white py-3.5 pl-12 pr-12 shadow-soft outline-none transition-colors placeholder:text-muted/70 focus:border-primary"
        />
        {query && (
          <button
            type="button"
            aria-label="Hapus pencarian"
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted hover:text-ink"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filter tag */}
      <div className="mt-4 flex flex-wrap gap-2">
        <TagChip label="Semua" active={tag === ""} onClick={() => setTag("")} />
        {MOOD_TAGS.map((t) => (
          <TagChip
            key={t}
            label={t}
            active={tag === t}
            onClick={() => setTag(tag === t ? "" : t)}
          />
        ))}
      </div>

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        <span className="font-semibold text-ink">{visible.length}</span> tempat
        ditemukan
        {tag && (
          <>
            {" "}
            untuk tag <span className="font-semibold text-primary">{tag}</span>
          </>
        )}
      </p>

      <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((spot) => (
          <SpotCard key={spot.id} spot={spot} />
        ))}
      </div>

      {visible.length === 0 && (
        <div className="mt-10 rounded-3xl border border-dashed border-line bg-white/60 px-6 py-14 text-center">
          <div className="text-4xl">🔍</div>
          <p className="mt-3 font-semibold text-ink">Belum ada yang cocok</p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-muted">
            Coba kata kunci atau tag lain seperti healing, pedas, atau
            aesthetic.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setTag("");
            }}
            className="btn-outline mt-5"
          >
            Reset pencarian
          </button>
        </div>
      )}
    </div>
  );
}

function TagChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-1.5 text-sm transition-all ${
        active
          ? "border-primary bg-primary font-semibold text-white shadow-glow"
          : "border-line bg-white text-ink hover:border-primary hover:text-primary"
      }`}
    >
      {label}
    </button>
  );
}
