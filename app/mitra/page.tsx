import type { Metadata } from "next";
import Link from "next/link";
import { PACKAGES, PARTNERS } from "@/lib/paket";
import { paketImage } from "@/lib/images";
import { WHATSAPP } from "@/lib/store";

export const metadata: Metadata = {
  title: "Mitra Lokal",
  description:
    "Kenalan dengan operator tur lokal Lombok yang menjalankan setiap paket MoodTrip.",
};

export default function MitraPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <div className="max-w-2xl">
        <span className="chip bg-primary/10 font-semibold text-primary">
          Mitra Lokal
        </span>
        <h1 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
          Orang-orang di balik setiap trip
        </h1>
        <p className="mt-3 leading-relaxed text-muted">
          MoodTrip adalah kurator — semua paket dijalankan oleh operator lokal
          tepercaya ini. Setiap pemesananmu langsung mendukung usaha mereka.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {PARTNERS.map((m) => {
          const pakets = PACKAGES.filter((p) => p.partner === m.name);
          return (
            <section key={m.name} className="card p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-ink">{m.name}</h2>
                  <p className="mt-0.5 text-sm text-muted">
                    📍 {m.base} · sejak {m.since}
                  </p>
                </div>
                <span className="chip flex-none bg-accent/10 font-semibold text-accent">
                  {m.spesialis}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/85">
                {m.desc}
              </p>

              {pakets.length > 0 && (
                <div className="mt-5 border-t border-line pt-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                    Paket dari mitra ini
                  </div>
                  <ul className="mt-3 space-y-2">
                    {pakets.map((p) => (
                      <li key={p.name}>
                        <Link
                          href="/paket"
                          className="flex items-center gap-3 rounded-xl bg-cream px-3 py-2.5 transition-colors hover:bg-primary/10"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={paketImage(p.persona)}
                            alt=""
                            className="h-10 w-14 flex-none rounded-lg object-cover"
                          />
                          <span className="flex-1 text-sm font-medium text-ink">
                            {p.name}
                          </span>
                          <span className="text-sm font-bold text-primary">
                            {p.price}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          );
        })}
      </div>

      <div className="mt-12 rounded-[2rem] bg-primary-dark px-8 py-12 text-center text-white">
        <h2 className="text-2xl font-bold">Punya usaha tur di Lombok?</h2>
        <p className="mx-auto mt-2 max-w-md text-white/85">
          Gabung jadi mitra MoodTrip dan jangkau wisatawan yang benar-benar
          cocok dengan pengalamanmu.
        </p>
        <a
          href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
            "Halo, saya tertarik jadi mitra MoodTrip"
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-accent mt-6"
        >
          Daftar Jadi Mitra
        </a>
      </div>
    </div>
  );
}
