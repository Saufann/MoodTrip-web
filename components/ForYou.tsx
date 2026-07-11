"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SpotCard from "@/components/SpotCard";
import { SPOTS } from "@/lib/spots";
import { getProfile, Profile } from "@/lib/profile";
import { recommendedSpots, hasPreferences } from "@/lib/reco";
import { STORE_EVENT } from "@/lib/store";
import { PACKAGES } from "@/lib/paket";
import { paketImage } from "@/lib/images";

export default function ForYou() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const update = () => setProfile(getProfile());
    update();
    window.addEventListener(STORE_EVENT, update);
    return () => window.removeEventListener(STORE_EVENT, update);
  }, []);

  if (!profile) return null;

  // Belum ada preferensi → ajak isi profil/tes
  if (!hasPreferences(profile)) {
    return (
      <section className="mx-auto max-w-6xl px-5 pb-4">
        <div className="card flex flex-col items-center gap-5 p-8 text-center sm:flex-row sm:text-left">
          <div className="grid h-14 w-14 flex-none place-items-center rounded-2xl bg-accent/10 text-2xl">
            ✨
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-ink">
              Dapatkan rekomendasi khusus untukmu
            </h2>
            <p className="mt-1 text-sm text-muted">
              Ikuti tes singkat atau pilih tag minat di profil — beranda ini
              akan menyesuaikan diri dengan kepribadianmu.
            </p>
          </div>
          <Link href="/tes-kepribadian" className="btn-accent flex-none">
            Mulai Tes
          </Link>
        </div>
      </section>
    );
  }

  const recos = recommendedSpots(SPOTS, profile, 3);
  if (recos.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-5 pb-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-accent">
            ✨ Untukmu
          </p>
          <h2 className="mt-2 text-2xl font-extrabold text-ink sm:text-3xl">
            {profile.name ? `Pilihan buat ${profile.name}` : "Pilihan buatmu"}
          </h2>
          <p className="mt-1 text-sm text-muted">
            Berdasarkan{" "}
            {[
              profile.persona && `persona ${profile.persona}`,
              profile.interests.length > 0 &&
                `${profile.interests.length} tag minatmu`,
            ]
              .filter(Boolean)
              .join(" dan ")}
            .
          </p>
        </div>
        <Link
          href="/profil"
          className="whitespace-nowrap text-sm font-semibold text-primary hover:underline"
        >
          Atur preferensi →
        </Link>
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recos.map(({ spot }) => (
          <SpotCard key={spot.id} spot={spot} />
        ))}
      </div>

      {/* Paket yang cocok dengan persona */}
      {profile.persona && (
        <PersonaPakets persona={profile.persona} />
      )}
    </section>
  );
}

function PersonaPakets({ persona }: { persona: string }) {
  const pakets = PACKAGES.filter((p) => p.persona === persona);
  if (pakets.length === 0) return null;

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-[1fr,auto]">
      {pakets.slice(0, 1).map((p) => (
        <Link
          key={p.name}
          href={`/paket?persona=${encodeURIComponent(persona)}`}
          className="card-hover flex items-center gap-4 p-4"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={paketImage(p.persona)}
            alt=""
            className="h-16 w-24 flex-none rounded-xl object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold uppercase tracking-wide text-accent">
              Paket untuk {persona}
            </p>
            <p className="truncate font-bold text-ink">{p.name}</p>
            <p className="text-xs text-muted">
              {p.durasi} · mulai {p.price}
            </p>
          </div>
          <span aria-hidden className="flex-none font-bold text-primary">
            →
          </span>
        </Link>
      ))}
      <div className="flex gap-3 sm:flex-col">
        <Link
          href="/kuliner"
          className="btn-outline flex-1 whitespace-nowrap py-2 text-sm"
        >
          🍽️ Kuliner cocok
        </Link>
        <Link
          href="/aksesoris"
          className="btn-outline flex-1 whitespace-nowrap py-2 text-sm"
        >
          🛍️ Gear cocok
        </Link>
      </div>
    </div>
  );
}
