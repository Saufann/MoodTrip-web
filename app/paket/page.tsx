"use client";

// Paket wisata dari mitra lokal (contoh data). MoodTrip = kurator/marketplace,
// mitra yang menjalankan trip-nya. Pemesanan diteruskan ke WhatsApp mitra/admin.

import { useEffect, useState } from "react";
import { paketImage } from "@/lib/images";
import { WHATSAPP, saveOrder } from "@/lib/store";
import { Paket, PACKAGES } from "@/lib/paket";
import { useModal } from "@/components/useModal";
import HeartNamed from "@/components/HeartNamed";

export default function PaketPage() {
  const [detail, setDetail] = useState<Paket | null>(null);
  const [selected, setSelected] = useState<Paket | null>(null);
  const [persona, setPersona] = useState("");

  // Terima ?persona=... dari hasil tes wisata
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("persona");
    if (p && PACKAGES.some((x) => x.persona === p)) setPersona(p);
  }, []);

  // Paket yang cocok dengan persona tampil paling depan
  const list = persona
    ? [...PACKAGES].sort(
        (a, b) =>
          Number(b.persona === persona) - Number(a.persona === persona)
      )
    : PACKAGES;

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-3xl font-bold text-ink sm:text-4xl">Paket Wisata</h1>
      <p className="mt-2 text-muted">
        Paket pilihan dari mitra lokal tepercaya. Member Premium dapat diskon
        khusus.
      </p>

      {persona && (
        <div className="mt-5 flex flex-wrap items-center gap-3 rounded-2xl border border-primary/30 bg-primary/5 px-5 py-3">
          <p className="text-sm text-ink">
            ✨ Menampilkan rekomendasi untuk persona{" "}
            <span className="font-bold text-primary">{persona}</span> paling
            atas
          </p>
          <button
            onClick={() => setPersona("")}
            className="text-xs font-semibold text-muted hover:text-accent"
          >
            ✕ Hapus filter
          </button>
        </div>
      )}

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <article
            key={p.name}
            role="button"
            tabIndex={0}
            aria-label={`Lihat detail ${p.name}`}
            onClick={() => setDetail(p)}
            onKeyDown={(e) => e.key === "Enter" && setDetail(p)}
            className="group card-hover flex cursor-pointer flex-col overflow-hidden"
          >
            <div className="relative h-44 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={paketImage(p.persona)}
                alt={p.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span
                className={`chip absolute left-3 top-3 font-semibold shadow-soft backdrop-blur ${
                  persona === p.persona
                    ? "bg-accent text-white"
                    : "bg-white/90 text-primary"
                }`}
              >
                {persona === p.persona ? "✨ " : ""}
                {p.persona}
              </span>
              <HeartNamed
                kind="paket"
                name={p.name}
                className="absolute right-3 top-3"
              />
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
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected(p);
                  }}
                  className="btn-accent px-5 py-2 text-sm"
                >
                  Pesan
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {detail && !selected && (
        <DetailModal
          paket={detail}
          onClose={() => setDetail(null)}
          onBook={() => setSelected(detail)}
        />
      )}
      {selected && (
        <BookingModal
          paket={selected}
          onClose={() => {
            setSelected(null);
            setDetail(null);
          }}
        />
      )}
    </div>
  );
}

function DetailModal({
  paket,
  onClose,
  onBook,
}: {
  paket: Paket;
  onClose: () => void;
  onBook: () => void;
}) {
  useModal(onClose);
  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-5"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Detail ${paket.name}`}
    >
      <div
        className="max-h-[92vh] w-full max-w-lg animate-fade-up overflow-y-auto rounded-t-3xl bg-white shadow-card sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-52">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={paketImage(paket.persona)}
            alt={paket.name}
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
          <span className="chip absolute left-4 top-4 bg-white/90 font-semibold text-primary shadow-soft backdrop-blur">
            {paket.persona}
          </span>
        </div>

        <div className="p-7">
          <h2 className="text-2xl font-extrabold text-ink">{paket.name}</h2>
          <p className="mt-1 text-sm text-muted">
            oleh {paket.partner} · {paket.durasi}
          </p>
          <p className="mt-4 leading-relaxed text-ink/85">{paket.desc}</p>

          <h3 className="mt-6 font-bold text-ink">Yang kamu dapat</h3>
          <ul className="mt-3 space-y-2.5 text-sm text-ink">
            {paket.include.map((f) => (
              <li key={f} className="flex items-start gap-2.5">
                <span
                  aria-hidden
                  className="mt-0.5 flex h-[18px] w-[18px] flex-none items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary"
                >
                  ✓
                </span>
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex items-center justify-between gap-4 border-t border-line pt-5">
            <div>
              <div className="text-[11px] uppercase tracking-wide text-muted">
                Mulai dari
              </div>
              <span className="text-2xl font-extrabold text-primary">
                {paket.price}
              </span>
              <span className="text-sm text-muted">/orang</span>
            </div>
            <button onClick={onBook} className="btn-accent">
              Pesan Sekarang
            </button>
          </div>
        </div>
      </div>
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
  useModal(onClose);
  const [nama, setNama] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [peserta, setPeserta] = useState(2);

  // Tidak bisa memilih tanggal yang sudah lewat
  const today = new Date().toISOString().split("T")[0];
  const valid = nama.trim() !== "" && tanggal >= today;

  const waText = encodeURIComponent(
    `Halo MoodTrip! Saya ingin memesan paket:\n\n` +
      `${paket.name} (${paket.partner})\n` +
      `${paket.price}/orang\n` +
      `Nama: ${nama}\n` +
      `Tanggal: ${tanggal}\n` +
      `Jumlah peserta: ${peserta}\n\n` +
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
                min={today}
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
              if (!valid) {
                e.preventDefault();
                return;
              }
              saveOrder({
                type: "paket",
                title: paket.name,
                detail: `${paket.partner} · ${paket.price}/orang\n${nama} · ${tanggal} · ${peserta} peserta`,
                date: new Date().toISOString(),
              });
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
