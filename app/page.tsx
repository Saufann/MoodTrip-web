import Link from "next/link";
import SpotCard from "@/components/SpotCard";
import AppDownloadButtons from "@/components/AppDownloadButtons";
import { SPOTS } from "@/lib/spots";
import { HERO_IMAGE, CTA_IMAGE } from "@/lib/images";

const STEPS = [
  {
    n: "01",
    t: "Kenali dirimu",
    d: "Ikuti tes kepribadian singkat untuk tahu persona travel-mu.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
      </svg>
    ),
  },
  {
    n: "02",
    t: "Dapat rekomendasi",
    d: "Kami cocokkan paket, kuliner, dan tempat sesuai personamu.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    n: "03",
    t: "Pesan & jelajahi",
    d: "Pesan paket dari mitra lokal dan mulai petualanganmu.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11l18-7-7 18-2.5-7.5L3 11Z" />
      </svg>
    ),
  },
];

export default function HomePage() {
  const featured = SPOTS.slice(0, 6);

  return (
    <div>
      {/* Hero — foto full-bleed */}
      <section className="relative isolate overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_IMAGE}
          alt=""
          aria-hidden
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-r from-black/75 via-black/50 to-black/20"
        />

        <div className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
          <div className="max-w-2xl">
            <span className="chip border border-white/25 bg-white/10 font-semibold tracking-widest text-white/90 backdrop-blur">
              SMART TOURISM · MATARAM &amp; LOMBOK
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] text-white sm:text-6xl">
              Liburan yang terasa{" "}
              <span className="text-accent brightness-125">kamu banget.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">
              Rekomendasi paket wisata, kuliner, dan tempat di Lombok yang
              disesuaikan dengan mood dan kepribadianmu.
            </p>

            {/* Search pill ala marketplace travel */}
            <Link
              href="/jelajah"
              className="mt-8 flex max-w-md items-center gap-3 rounded-full bg-white p-2 pl-5 shadow-card transition-transform hover:scale-[1.01]"
            >
              <svg
                aria-hidden
                className="text-muted"
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
              <span className="flex-1 text-sm text-muted">
                Mau ke mana? Coba &ldquo;healing&rdquo; atau &ldquo;pedas&rdquo;...
              </span>
              <span className="btn-primary px-5 py-2.5 text-sm">Jelajahi</span>
            </Link>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/tes-kepribadian" className="btn-accent">
                Ikuti Tes Kepribadian <span aria-hidden>→</span>
              </Link>
              <Link href="/paket" className="btn-ghost-light">
                Lihat Paket Wisata
              </Link>
            </div>

            <dl className="mt-12 flex gap-10 border-t border-white/15 pt-6">
              {[
                { v: `${SPOTS.length}+`, l: "Tempat terkurasi" },
                { v: "6", l: "Persona travel" },
                { v: "100%", l: "Mitra lokal" },
              ].map((s) => (
                <div key={s.l}>
                  <dd className="text-2xl font-extrabold text-white">{s.v}</dd>
                  <dt className="mt-0.5 text-xs text-white/65">{s.l}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Cara kerja */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="max-w-xl">
          <p className="text-sm font-bold uppercase tracking-widest text-accent">
            Cara kerja
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">
            Tiga langkah menuju trip yang pas
          </h2>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="card-hover p-7">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  {s.icon}
                </div>
                <span className="text-3xl font-extrabold text-line">{s.n}</span>
              </div>
              <h3 className="mt-5 text-lg font-bold text-ink">{s.t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured spots — band tint teal (bagian 30%) */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-accent">
                Destinasi
              </p>
              <h2 className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">
                Rekomendasi Tempat
              </h2>
              <p className="mt-2 text-muted">
                Hidden gem dan favorit lokal pilihan kurator kami.
              </p>
            </div>
            <Link
              href="/jelajah"
              className="btn-outline hidden whitespace-nowrap sm:inline-flex"
            >
              Lihat semua →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((spot) => (
              <SpotCard key={spot.id} spot={spot} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/jelajah" className="btn-outline">
              Lihat semua →
            </Link>
          </div>
        </div>
      </section>

      {/* Unduh aplikasi */}
      <section className="mx-auto max-w-6xl px-5 pb-4">
        <div className="card flex flex-col items-center gap-8 p-10 sm:flex-row sm:justify-between">
          <div className="max-w-md text-center sm:text-left">
            <p className="text-sm font-bold uppercase tracking-widest text-accent">
              Aplikasi MoodTrip
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-ink sm:text-3xl">
              Bawa MoodTrip ke mana saja
            </h2>
            <p className="mt-2 leading-relaxed text-muted">
              Rekomendasi persona, peta offline, dan notifikasi promo mitra —
              langsung dari genggamanmu.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <AppDownloadButtons />
            <p className="text-xs text-muted">Segera hadir untuk Android &amp; iOS</p>
          </div>
        </div>
      </section>

      {/* Membership CTA — foto */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="relative isolate overflow-hidden rounded-[2rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={CTA_IMAGE}
            alt=""
            aria-hidden
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-gradient-to-r from-primary-dark/95 via-primary-dark/80 to-primary-dark/40"
          />
          <div className="max-w-lg px-8 py-16 sm:px-12">
            <h2 className="text-3xl font-extrabold text-white">
              Upgrade ke MoodTrip Premium
            </h2>
            <p className="mt-3 leading-relaxed text-white/85">
              Diskon khusus paket wisata mitra, rekomendasi prioritas, dan
              konten eksklusif mulai Rp49.000/bulan.
            </p>
            <Link href="/membership" className="btn-accent mt-7">
              Lihat Membership
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
