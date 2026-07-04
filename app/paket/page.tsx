"use client";

// Paket wisata dari mitra lokal (contoh data). MoodTrip = kurator/marketplace,
// mitra yang menjalankan trip-nya. Pemesanan diteruskan ke WhatsApp mitra/admin.

import { useState } from "react";
import { paketImage } from "@/lib/images";
import { WHATSAPP } from "@/lib/store";

type Paket = {
  name: string;
  partner: string;
  price: string;
  persona: string;
  desc: string;
};

const PACKAGES: Paket[] = [
  {
    name: "Slow Trip Healing 3 Hari",
    partner: "Lombok Tenang Tour",
    price: "Rp1.250.000",
    persona: "Sang Penenang",
    desc: "Retreat santai: taman kota, sunset Senggigi, dan spot tenang.",
  },
  {
    name: "Food Trail Lombok",
    partner: "Rasa Lombok Trip",
    price: "Rp450.000",
    persona: "Pemburu Rasa",
    desc: "Ayam Taliwang, Nasi Balap Puyung, dan pasar malam dalam 1 hari.",
  },
  {
    name: "Trekking Bukit Merese & Sunrise",
    partner: "Merese Adventure",
    price: "Rp650.000",
    persona: "Sang Petualang",
    desc: "Naik bukit savana, sunrise, dan island hopping ringan.",
  },
  {
    name: "Photo Spot Tour Kota Tua",
    partner: "Ampenan Frame",
    price: "Rp400.000",
    persona: "Pemburu Estetik",
    desc: "Desa Sade, Kafe Ampenan Heritage, dan hidden gem aesthetic.",
  },
  {
    name: "Sunset Dinner Romantis",
    partner: "Senggigi Couple",
    price: "Rp900.000",
    persona: "Sang Romantis",
    desc: "Private beach, candlelight seafood dinner, dan spa pasangan.",
  },
  {
    name: "Family Explore 4 Hari",
    partner: "Lombok Keluarga",
    price: "Rp2.100.000",
    persona: "Penjelajah Keluarga",
    desc: "Edukasi budaya Desa Sade dan pantai ramah anak.",
  },
];

export default function PaketPage() {
  const [selected, setSelected] = useState<Paket | null>(null);

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-3xl font-bold text-ink sm:text-4xl">Paket Wisata</h1>
      <p className="mt-2 text-muted">
        Paket pilihan dari mitra lokal tepercaya. Member Premium dapat diskon
        khusus.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PACKAGES.map((p) => (
          <article
            key={p.name}
            className="group card-hover flex flex-col overflow-hidden"
          >
            <div className="relative h-44 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={paketImage(p.persona)}
                alt={p.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="chip absolute left-3 top-3 bg-white/90 font-semibold text-primary shadow-soft backdrop-blur">
                {p.persona}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-lg font-bold leading-snug text-ink">
                {p.name}
              </h3>
              <p className="mt-1 text-xs text-muted">oleh {p.partner}</p>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {p.desc}
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
                <div>
                  <div className="text-[11px] uppercase tracking-wide text-muted">
                    Mulai dari
                  </div>
                  <span className="text-lg font-bold text-primary">
                    {p.price}
                  </span>
                </div>
                <button
                  onClick={() => setSelected(p)}
                  className="btn-accent px-5 py-2 text-sm"
                >
                  Pesan
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {selected && (
        <BookingModal paket={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

function BookingModal({
  paket,
  onClose,
}: {
  paket: Paket;
  onClose: () => void;
}) {
  const [nama, setNama] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [peserta, setPeserta] = useState(2);

  const valid = nama.trim() !== "" && tanggal !== "";

  const waText = encodeURIComponent(
    `Halo MoodTrip! Saya ingin memesan paket:\n\n` +
      `📦 ${paket.name} (${paket.partner})\n` +
      `💰 ${paket.price}/orang\n` +
      `👤 Nama: ${nama}\n` +
      `📅 Tanggal: ${tanggal}\n` +
      `👥 Jumlah peserta: ${peserta}\n\n` +
      `Mohon info ketersediaannya. Terima kasih!`
  );

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-5"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Pesan ${paket.name}`}
    >
      <div
        className="w-full max-w-md animate-fade-up rounded-t-3xl bg-white p-7 shadow-card sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">
              Pesan paket
            </p>
            <h2 className="mt-1 text-xl font-bold leading-snug text-ink">
              {paket.name}
            </h2>
            <p className="mt-0.5 text-sm text-muted">
              {paket.partner} · {paket.price}/orang
            </p>
          </div>
          <button
            type="button"
            aria-label="Tutup"
            onClick={onClose}
            className="grid h-9 w-9 flex-none place-items-center rounded-full border border-line text-muted hover:text-ink"
          >
            ✕
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="nama"
              className="mb-1.5 block text-sm font-medium text-ink"
            >
              Nama lengkap
            </label>
            <input
              id="nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Nama kamu"
              className="w-full rounded-xl border border-line px-4 py-3 outline-none transition-colors focus:border-primary"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="tanggal"
                className="mb-1.5 block text-sm font-medium text-ink"
              >
                Tanggal trip
              </label>
              <input
                id="tanggal"
                type="date"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                className="w-full rounded-xl border border-line px-4 py-3 outline-none transition-colors focus:border-primary"
              />
            </div>
            <div>
              <label
                htmlFor="peserta"
                className="mb-1.5 block text-sm font-medium text-ink"
              >
                Peserta
              </label>
              <input
                id="peserta"
                type="number"
                min={1}
                max={30}
                value={peserta}
                onChange={(e) => setPeserta(Number(e.target.value))}
                className="w-full rounded-xl border border-line px-4 py-3 outline-none transition-colors focus:border-primary"
              />
            </div>
          </div>

          <a
            href={valid ? `https://wa.me/${WHATSAPP}?text=${waText}` : undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!valid}
            className={`btn w-full ${
              valid
                ? "bg-[#25D366] text-white hover:brightness-105"
                : "cursor-not-allowed bg-line text-muted"
            }`}
            onClick={(e) => {
              if (!valid) e.preventDefault();
            }}
          >
            <svg
              aria-hidden
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.4 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.4-.7-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.5-1.1-2.9s.7-2 .9-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.4l.9 2.1c.1.2.1.4 0 .6l-.4.6-.5.5c-.2.2-.3.3-.1.6.2.3.8 1.4 1.8 2.2 1.2 1.1 2.3 1.4 2.6 1.6.3.1.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.3.1.2.1.7-.2 1.3Z" />
            </svg>
            {valid ? "Lanjut ke WhatsApp" : "Isi nama & tanggal dulu"}
          </a>
          <p className="text-center text-xs text-muted">
            Pesanan diteruskan ke admin MoodTrip via WhatsApp untuk konfirmasi
            ketersediaan.
          </p>
        </div>
      </div>
    </div>
  );
}
