"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import SpotCard from "@/components/SpotCard";
import { SPOTS, MOOD_TAGS } from "@/lib/spots";
import { smartSearch } from "@/lib/search";
import { getProfile, Profile } from "@/lib/profile";
import { scoreSpot, hasPreferences, priceMin } from "@/lib/reco";
import { STORE_EVENT } from "@/lib/store";

type Sort = "default" | "cocok" | "rating" | "murah" | "nama";

export default function JelajahPage() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("");
  const [kategori, setKategori] = useState("");
  const [sort, setSort] = useState<Sort>("default");
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const update = () => setProfile(getProfile());
    update();
    window.addEventListener(STORE_EVENT, update);
    // Terima query dari hero search beranda (?q=...)
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) setQuery(q);
    return () => window.removeEventListener(STORE_EVENT, update);
  }, []);

  const categories = useMemo(
    () => Array.from(new Set(SPOTS.map((s) => s.category))),
    []
  );

  // Smart search: pahami bahasa nonformal ("pengen healing n makan pedes")
  const smart = useMemo(() => smartSearch(query), [query]);

  const visible = useMemo(() => {
    let list = smart.results
      .map((r) => r.spot)
      .filter(
        (s) =>
          (tag === "" ||
            s.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase()))) &&
          (kategori === "" || s.category === kategori)
      );
    switch (sort) {
      case "cocok":
        if (profile)
          list = [...list].sort(
            (a, b) => scoreSpot(b, profile) - scoreSpot(a, profile)
          );
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case "murah":
        list = [...list].sort((a, b) => priceMin(a.price) - priceMin(b.price));
        break;
      case "nama":
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    return list;
  }, [smart, tag, kategori, sort, profile]);

  const canPersonal = profile !== null && hasPreferences(profile);

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-ink sm:text-4xl">
            Jelajah Lombok
          </h1>
          <p className="mt-2 text-muted">
            {SPOTS.length} tempat terkurasi — cari berdasarkan mood, tag, atau
            kata kunci.
          </p>
        </div>
        <Link href="/peta" className="btn-outline py-2 text-sm">
          🗺️ Lihat di Peta
        </Link>
      </div>

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

      {/* Filter kategori + sortir */}
      <div className="mt-4 flex flex-wrap items-center gap-2.5">
        <FilterSelect
          label="Filter kategori"
          active={kategori !== ""}
          value={kategori}
          onChange={setKategori}
          icon={
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 5h18l-7 8v5.5l-4 2V13L3 5Z" />
            </svg>
          }
        >
          <option value="">Semua kategori</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </FilterSelect>

        <FilterSelect
          label="Urutkan"
          active={sort !== "default"}
          value={sort}
          onChange={(v) => setSort(v as Sort)}
          icon={
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5h10M11 9h7M11 13h4M3 17l3 3 3-3M6 6v14" />
            </svg>
          }
        >
          <option value="default">Urutan default</option>
          {canPersonal && <option value="cocok">✨ Paling cocok untukku</option>}
          <option value="rating">Rating tertinggi</option>
          <option value="murah">Termurah</option>
          <option value="nama">Nama A-Z</option>
        </FilterSelect>

        {!canPersonal && (
          <Link
            href="/tes-kepribadian"
            className="group inline-flex items-center gap-1.5 rounded-full border border-dashed border-primary/40 bg-primary/5 px-4 py-2 text-xs font-medium text-primary transition-colors hover:border-primary hover:bg-primary/10"
          >
            <span aria-hidden>✨</span>
            Ikuti tes untuk sortir paling cocok
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
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

      {/* Intent yang dipahami dari kalimat bebas */}
      {query.trim() && smart.intents.length > 0 && (
        <p className="mt-4 flex flex-wrap items-center gap-1.5 text-sm text-muted">
          Kami pahami sebagai:
          {smart.intents.map((t) => (
            <span key={t} className="chip bg-primary/10 font-semibold text-primary">
              {t}
            </span>
          ))}
        </p>
      )}

      {/* Query galau / tak terpahami → mode explore */}
      {query.trim() && smart.explore && (
        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl border border-accent/30 bg-accent/5 px-5 py-3.5">
          <p className="flex-1 text-sm text-ink">
            🤷 Kami belum yakin maksudmu — ini <b>favorit se-Lombok</b> dulu.
            Biar hasilnya pas denganmu, jawab 5 pertanyaan ringan saja.
          </p>
          <Link
            href="/tes-kepribadian/wisata"
            className="btn-accent flex-none px-4 py-2 text-sm"
          >
            Ikuti Tes 2 Menit
          </Link>
        </div>
      )}

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
              setKategori("");
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

function FilterSelect({
  label,
  active,
  value,
  onChange,
  icon,
  children,
}: {
  label: string;
  active: boolean;
  value: string;
  onChange: (v: string) => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label
      className={`group relative inline-flex cursor-pointer items-center gap-2 rounded-full border py-2 pl-4 pr-3 text-sm shadow-soft transition-all ${
        active
          ? "border-primary bg-primary/5 font-semibold text-primary"
          : "border-line bg-white text-ink hover:border-primary/50"
      }`}
    >
      <span
        aria-hidden
        className={active ? "text-primary" : "text-muted group-hover:text-primary"}
      >
        {icon}
      </span>
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="cursor-pointer appearance-none bg-transparent pr-6 outline-none"
      >
        {children}
      </select>
      {/* Chevron custom */}
      <svg
        aria-hidden
        className={`pointer-events-none absolute right-3.5 transition-transform group-hover:translate-y-0.5 ${
          active ? "text-primary" : "text-muted"
        }`}
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </label>
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
