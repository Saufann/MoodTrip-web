"use client";

// Katalog kuliner: lihat menu + status ketersediaan (Ready/Habis).
// Klik kartu untuk detail lengkap + tanya/order via WhatsApp.
// Status diperbarui oleh mitra (nanti dari Supabase).

import { useState } from "react";
import Link from "next/link";
import { restoImage } from "@/lib/images";
import { Resto, MenuItem, spotIdForResto } from "@/lib/kuliner";
import { WHATSAPP } from "@/lib/store";
import { useModal } from "@/components/useModal";
import { useLiveRestos } from "@/components/useLiveRestos";

export default function KulinerPage() {
  const [selected, setSelected] = useState<Resto | null>(null);
  const { restos: RESTOS, live } = useLiveRestos();

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-3xl font-bold text-ink sm:text-4xl">Kuliner Lombok</h1>
      <p className="mt-2 flex items-center gap-2 text-muted">
        Lihat menu dan yang sedang tersedia. Klik kartu untuk detail &amp;
        order.
        {live && (
          <span className="chip bg-green-50 font-semibold text-green-700">
            <span aria-hidden className="mr-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
            Status live
          </span>
        )}
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {RESTOS.map((r) => (
          <section
            key={r.name}
            role="button"
            tabIndex={0}
            aria-label={`Lihat detail ${r.name}`}
            onClick={() => setSelected(r)}
            onKeyDown={(e) => e.key === "Enter" && setSelected(r)}
            className="group card-hover cursor-pointer overflow-hidden"
          >
            <div className="relative h-36 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={restoImage(r.name)}
                alt={r.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"
              />
              <OpenBadge isOpen={r.isOpen} className="absolute right-3 top-3" />
              <div className="absolute bottom-3 left-4 right-4">
                <h3 className="font-bold text-white">{r.name}</h3>
                <p className="text-xs text-white/80">{r.location}</p>
              </div>
            </div>
            <div className="p-5 pt-2">
              <ul className="divide-y divide-line">
                {r.menu.slice(0, 3).map((m) => (
                  <MenuRow key={m.name} m={m} />
                ))}
              </ul>
              <p className="mt-3 text-center text-xs font-semibold text-primary">
                Lihat detail &amp; order →
              </p>
            </div>
          </section>
        ))}
      </div>

      {selected && (
        <RestoModal resto={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

function OpenBadge({
  isOpen,
  className = "",
}: {
  isOpen: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold shadow-soft backdrop-blur ${
        isOpen ? "bg-white/95 text-green-700" : "bg-white/95 text-red-600"
      } ${className}`}
    >
      <span
        aria-hidden
        className={`h-2 w-2 rounded-full ${
          isOpen ? "animate-pulse bg-green-500" : "bg-red-500"
        }`}
      />
      {isOpen ? "Buka" : "Tutup"}
    </span>
  );
}

function MenuRow({ m }: { m: MenuItem }) {
  return (
    <li className="flex items-center justify-between py-2">
      <div className={m.ready ? "" : "opacity-40"}>
        <div className="text-sm font-medium text-ink">{m.name}</div>
        <div className="text-xs text-muted">{m.price}</div>
      </div>
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
          m.ready ? "bg-primary/10 text-primary" : "bg-line text-muted"
        }`}
      >
        <span
          aria-hidden
          className={`h-1.5 w-1.5 rounded-full ${
            m.ready ? "bg-primary" : "bg-muted/60"
          }`}
        />
        {m.ready ? "Ready" : "Habis"}
      </span>
    </li>
  );
}

function RestoModal({ resto, onClose }: { resto: Resto; onClose: () => void }) {
  useModal(onClose);
  const spotId = spotIdForResto(resto);
  const waText = encodeURIComponent(
    `Halo MoodTrip! Saya mau tanya/order dari ${resto.name} (${resto.location}). Apakah bisa dibantu?`
  );

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-5"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Detail ${resto.name}`}
    >
      <div
        className="max-h-[92vh] w-full max-w-lg animate-fade-up overflow-y-auto rounded-t-3xl bg-white shadow-card sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-48">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={restoImage(resto.name)}
            alt={resto.name}
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
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-2xl font-extrabold text-ink">{resto.name}</h2>
            <OpenBadge isOpen={resto.isOpen} className="mt-1 flex-none" />
          </div>
          <p className="mt-1 text-sm text-muted">
            📍 {resto.location} · 🕐 {resto.hours}
          </p>
          {!resto.isOpen && (
            <p className="mt-2 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-600">
              Sedang tutup — kamu tetap bisa lihat menu dan tanya jadwal via
              WhatsApp.
            </p>
          )}
          <p className="mt-3 text-sm leading-relaxed text-ink/85">
            {resto.about}
          </p>

          <h3 className="mt-6 font-bold text-ink">Menu lengkap</h3>
          <ul className="mt-2 divide-y divide-line">
            {resto.menu.map((m) => (
              <MenuRow key={m.name} m={m} />
            ))}
          </ul>

          <a
            href={`https://wa.me/${WHATSAPP}?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn mt-6 w-full bg-[#25D366] text-white hover:brightness-105"
          >
            Tanya / Order via WhatsApp
          </a>
          {spotId && (
            <Link
              href={`/jelajah/${spotId}`}
              className="btn-outline mt-3 w-full"
            >
              Lihat Galeri, Review &amp; Lokasi →
            </Link>
          )}
          <p className="mt-3 text-center text-xs text-muted">
            Status menu diperbarui langsung oleh mitra.
          </p>
        </div>
      </div>
    </div>
  );
}
