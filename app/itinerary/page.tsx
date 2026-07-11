"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SPOTS } from "@/lib/spots";
import {
  getItinerary,
  saveItinerary,
  Itinerary,
  getWishlist,
  getItineraryStart,
  setItineraryStart,
} from "@/lib/store";

// Label tanggal per hari dari tanggal mulai (hari ke-i)
function dayLabel(start: string, dayIndex: number): string {
  if (!start) return "";
  const d = new Date(start + "T00:00:00");
  if (isNaN(d.getTime())) return "";
  d.setDate(d.getDate() + dayIndex);
  return d.toLocaleDateString("id-ID", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export default function ItineraryPage() {
  const [plan, setPlan] = useState<Itinerary | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [start, setStart] = useState("");

  useEffect(() => {
    setPlan(getItinerary());
    setWishlist(getWishlist());
    setStart(getItineraryStart());
  }, []);

  if (!plan) return <div className="min-h-[50vh]" />;

  function update(next: Itinerary) {
    setPlan(next);
    saveItinerary(next);
  }

  function addSpot(day: number, id: number) {
    const next = plan!.map((d, i) => (i === day ? [...d, id] : d));
    update(next);
  }

  function removeSpot(day: number, id: number) {
    const next = plan!.map((d, i) =>
      i === day ? d.filter((x) => x !== id) : d
    );
    update(next);
  }

  // Geser urutan tempat dalam satu hari (dir = -1 naik, +1 turun)
  function moveSpot(day: number, idx: number, dir: -1 | 1) {
    const next = plan!.map((d, i) => {
      if (i !== day) return d;
      const arr = [...d];
      const target = idx + dir;
      if (target < 0 || target >= arr.length) return d;
      [arr[idx], arr[target]] = [arr[target], arr[idx]];
      return arr;
    });
    update(next);
  }

  function changeStart(date: string) {
    setStart(date);
    setItineraryStart(date);
  }

  function addDay() {
    if (plan!.length < 7) update([...plan!, []]);
  }

  function removeDay(day: number) {
    update(plan!.filter((_, i) => i !== day));
  }

  const used = new Set(plan.flat());
  const spotById = (id: number) => SPOTS.find((s) => s.id === id);

  const waText = encodeURIComponent(
    `Itinerary Lombok-ku dari MoodTrip:\n\n` +
      plan
        .map((day, i) => {
          const tgl = dayLabel(start, i);
          return (
            `📅 Hari ${i + 1}${tgl ? ` (${tgl})` : ""}:\n` +
            (day.length === 0
              ? "  (kosong)"
              : day
                  .map((id, n) => {
                    const s = spotById(id);
                    return s ? `  ${n + 1}. ${s.name} (${s.location})` : "";
                  })
                  .join("\n"))
          );
        })
        .join("\n\n")
  );

  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <h1 className="text-3xl font-bold text-ink sm:text-4xl">
        Itinerary Saya
      </h1>
      <p className="mt-2 text-muted">
        Susun rencana harianmu dari {SPOTS.length} tempat terkurasi. Tersimpan
        otomatis di perangkat ini.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <label htmlFor="tgl-mulai" className="text-sm font-medium text-ink">
          📅 Tanggal mulai trip:
        </label>
        <input
          id="tgl-mulai"
          type="date"
          value={start}
          onChange={(e) => changeStart(e.target.value)}
          className="rounded-xl border border-line bg-white px-4 py-2 text-sm outline-none transition-colors focus:border-primary"
        />
        {start && (
          <button
            onClick={() => changeStart("")}
            className="text-xs text-muted hover:text-accent"
          >
            ✕ hapus
          </button>
        )}
      </div>

      <div className="mt-6 space-y-6">
        {plan.map((day, i) => (
          <section key={i} className="card p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-ink">
                📅 Hari {i + 1}
                {dayLabel(start, i) && (
                  <span className="ml-2 text-sm font-medium text-muted">
                    {dayLabel(start, i)}
                  </span>
                )}
              </h2>
              {plan.length > 1 && (
                <button
                  onClick={() => removeDay(i)}
                  className="text-xs text-muted hover:text-accent"
                >
                  Hapus hari
                </button>
              )}
            </div>

            {day.length === 0 ? (
              <p className="mt-3 text-sm text-muted">
                Belum ada tempat — tambahkan dari daftar di bawah.
              </p>
            ) : (
              <ol className="mt-4 space-y-2">
                {day.map((id, idx) => {
                  const s = spotById(id);
                  if (!s) return null;
                  return (
                    <li
                      key={id}
                      className="flex items-center gap-3 rounded-xl bg-cream px-4 py-2.5"
                    >
                      <span className="grid h-6 w-6 flex-none place-items-center rounded-full bg-primary text-xs font-bold text-white">
                        {idx + 1}
                      </span>
                      <Link
                        href={`/jelajah/${s.id}`}
                        className="flex-1 text-sm font-medium text-ink hover:text-primary"
                      >
                        {s.name}
                        <span className="ml-2 text-xs text-muted">
                          {s.location}
                        </span>
                      </Link>
                      <div className="flex flex-none items-center gap-1">
                        <button
                          aria-label="Naikkan urutan"
                          disabled={idx === 0}
                          onClick={() => moveSpot(i, idx, -1)}
                          className="grid h-7 w-7 place-items-center rounded-full text-muted transition-colors hover:bg-white hover:text-primary disabled:opacity-25"
                        >
                          ↑
                        </button>
                        <button
                          aria-label="Turunkan urutan"
                          disabled={idx === day.length - 1}
                          onClick={() => moveSpot(i, idx, 1)}
                          className="grid h-7 w-7 place-items-center rounded-full text-muted transition-colors hover:bg-white hover:text-primary disabled:opacity-25"
                        >
                          ↓
                        </button>
                        <button
                          aria-label={`Hapus ${s.name}`}
                          onClick={() => removeSpot(i, id)}
                          className="grid h-7 w-7 place-items-center rounded-full text-muted transition-colors hover:bg-white hover:text-accent"
                        >
                          ✕
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ol>
            )}

            <AddSpotSelect
              onAdd={(id) => addSpot(i, id)}
              exclude={used}
              wishlist={wishlist}
            />
          </section>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {plan.length < 7 && (
          <button onClick={addDay} className="btn-outline">
            + Tambah Hari
          </button>
        )}
        {plan.some((d) => d.length > 0) && (
          <a
            href={`https://wa.me/?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-[#25D366] text-white hover:brightness-105"
          >
            Bagikan via WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}

function AddSpotSelect({
  onAdd,
  exclude,
  wishlist,
}: {
  onAdd: (id: number) => void;
  exclude: Set<number>;
  wishlist: number[];
}) {
  const available = SPOTS.filter((s) => !exclude.has(s.id));
  const fromWishlist = available.filter((s) => wishlist.includes(s.id));
  const others = available.filter((s) => !wishlist.includes(s.id));

  if (available.length === 0) return null;

  return (
    <select
      aria-label="Tambah tempat"
      value=""
      onChange={(e) => {
        if (e.target.value) onAdd(Number(e.target.value));
      }}
      className="mt-4 w-full rounded-xl border border-dashed border-line bg-white px-4 py-2.5 text-sm text-muted outline-none transition-colors focus:border-primary"
    >
      <option value="">+ Tambah tempat...</option>
      {fromWishlist.length > 0 && (
        <optgroup label="❤️ Dari wishlist-mu">
          {fromWishlist.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} — {s.location}
            </option>
          ))}
        </optgroup>
      )}
      <optgroup label="Semua tempat">
        {others.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name} — {s.location}
          </option>
        ))}
      </optgroup>
    </select>
  );
}
