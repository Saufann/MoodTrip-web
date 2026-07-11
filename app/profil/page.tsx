"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Profile,
  getProfile,
  saveProfile,
  toggleInterest,
  INTEREST_TAGS,
  GALEN_TYPES,
  MBTI_TYPES,
} from "@/lib/profile";
import { STORE_EVENT } from "@/lib/store";
import { GALEN_INFO, GalenId, MBTI_DESC } from "@/lib/tests";
import { useUser } from "@/components/useUser";
import { supabase, isSupabaseReady } from "@/lib/supabase";
import { loadCloudProfile } from "@/lib/profile";

export default function ProfilPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const { user } = useUser();

  useEffect(() => {
    const update = () => setProfile(getProfile());
    update();
    window.addEventListener(STORE_EVENT, update);
    return () => window.removeEventListener(STORE_EVENT, update);
  }, []);

  // Saat login terdeteksi, tarik profil dari cloud sekali
  useEffect(() => {
    if (user) loadCloudProfile(user.id);
  }, [user]);

  if (!profile) return <div className="min-h-[50vh]" />;

  const initial = profile.name.trim().charAt(0).toUpperCase() || "M";

  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      {/* Header profil */}
      <div className="card flex flex-col items-center gap-5 p-8 sm:flex-row">
        <div className="grid h-20 w-20 flex-none place-items-center rounded-full bg-gradient-to-br from-primary to-primary-dark text-3xl font-extrabold text-white">
          {initial}
        </div>
        <div className="w-full text-center sm:text-left">
          <label htmlFor="nama" className="text-xs font-semibold uppercase tracking-wide text-muted">
            Nama
          </label>
          <input
            id="nama"
            value={profile.name}
            onChange={(e) => saveProfile({ name: e.target.value })}
            placeholder="Tulis namamu..."
            className="mt-1 w-full rounded-xl border border-line px-4 py-2.5 font-semibold text-ink outline-none transition-colors focus:border-primary"
          />
          {/* Ringkasan tag */}
          <div className="mt-3 flex flex-wrap justify-center gap-1.5 sm:justify-start">
            {profile.galen && (
              <span className="chip bg-accent/10 font-semibold text-accent">
                {GALEN_INFO[profile.galen as GalenId]?.emoji} {profile.galen}
              </span>
            )}
            {profile.mbti && (
              <span className="chip bg-primary/10 font-semibold text-primary">
                {profile.mbti}
              </span>
            )}
            {profile.persona && (
              <span className="chip bg-primary-dark/10 font-semibold text-primary-dark">
                {profile.persona}
              </span>
            )}
            {profile.interests.map((t) => (
              <span key={t} className="chip bg-cream text-muted">
                {t}
              </span>
            ))}
            {!profile.galen &&
              !profile.mbti &&
              !profile.persona &&
              profile.interests.length === 0 && (
                <span className="text-sm text-muted">
                  Belum ada tag — pilih di bawah atau ikuti tes.
                </span>
              )}
          </div>
        </div>
      </div>

      {/* Tag kepribadian */}
      <section className="card mt-6 p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-ink">Tag Kepribadian</h2>
            <p className="mt-0.5 text-sm text-muted">
              Isi langsung kalau sudah tahu, atau ikuti tes singkat.
            </p>
          </div>
          <Link href="/tes-kepribadian/diri" className="btn-outline py-2 text-sm">
            Ikuti Tes Kepribadian
          </Link>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="galen" className="mb-1.5 block text-sm font-medium text-ink">
              Temperamen (Galen)
            </label>
            <select
              id="galen"
              value={profile.galen ?? ""}
              onChange={(e) => saveProfile({ galen: e.target.value || null })}
              className="w-full rounded-xl border border-line bg-white px-4 py-3 outline-none transition-colors focus:border-primary"
            >
              <option value="">Belum diisi</option>
              {GALEN_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            {profile.galen && (
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {GALEN_INFO[profile.galen as GalenId]?.travel}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="mbti" className="mb-1.5 block text-sm font-medium text-ink">
              MBTI
            </label>
            <select
              id="mbti"
              value={profile.mbti ?? ""}
              onChange={(e) => saveProfile({ mbti: e.target.value || null })}
              className="w-full rounded-xl border border-line bg-white px-4 py-3 outline-none transition-colors focus:border-primary"
            >
              <option value="">Belum diisi</option>
              {MBTI_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            {profile.mbti && (
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {MBTI_DESC[profile.mbti]}
              </p>
            )}
          </div>
        </div>

        {/* Persona travel */}
        <div className="mt-5 rounded-2xl bg-cream p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-ink">
                Persona Travel
              </div>
              <div className="mt-0.5 text-sm text-muted">
                {profile.persona
                  ? `Kamu: ${profile.persona}`
                  : "Bingung mau wisata apa? Ikuti tes rekomendasi wisata."}
              </div>
            </div>
            <Link
              href="/tes-kepribadian/wisata"
              className="btn-primary py-2 text-sm"
            >
              {profile.persona ? "Ulangi Tes Wisata" : "Ikuti Tes Wisata"}
            </Link>
          </div>
        </div>
      </section>

      {/* Tag minat */}
      <section className="card mt-6 p-7">
        <h2 className="text-lg font-bold text-ink">Tag Minat</h2>
        <p className="mt-0.5 text-sm text-muted">
          Pilih sebanyak yang kamu mau — dipakai untuk mempersonalisasi
          rekomendasi.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {INTEREST_TAGS.map((tag) => {
            const active = profile.interests.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                aria-pressed={active}
                onClick={() => toggleInterest(tag)}
                className={`rounded-full border px-4 py-1.5 text-sm transition-all ${
                  active
                    ? "border-primary bg-primary font-semibold text-white shadow-glow"
                    : "border-line bg-white text-ink hover:border-primary hover:text-primary"
                }`}
              >
                {active ? "✓ " : ""}
                {tag}
              </button>
            );
          })}
        </div>
      </section>

      {/* Status akun */}
      {isSupabaseReady && (
        <div className="card mt-6 flex flex-wrap items-center justify-between gap-3 p-5">
          {user ? (
            <>
              <p className="text-sm text-ink">
                ✅ Masuk sebagai{" "}
                <span className="font-semibold">{user.email}</span> — profil
                tersinkron ke akunmu.
              </p>
              <button
                onClick={() => supabase?.auth.signOut()}
                className="btn-outline py-2 text-sm"
              >
                Keluar
              </button>
            </>
          ) : (
            <>
              <p className="text-sm text-muted">
                Profil ini baru tersimpan di perangkat. Masuk agar tersinkron
                antar perangkat &amp; bisa menulis review.
              </p>
              <Link href="/masuk" className="btn-primary py-2 text-sm">
                Masuk / Daftar
              </Link>
            </>
          )}
        </div>
      )}

      {/* Tautan cepat */}
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Link href="/wishlist" className="card-hover p-4 text-center text-sm font-semibold text-ink">
          ❤️ Wishlist
        </Link>
        <Link href="/itinerary" className="card-hover p-4 text-center text-sm font-semibold text-ink">
          🗓️ Itinerary Saya
        </Link>
        <Link href="/pesanan" className="card-hover p-4 text-center text-sm font-semibold text-ink">
          🧾 Riwayat Pesanan
        </Link>
      </div>

      <p className="mt-6 text-center text-xs text-muted">
        Profil tersimpan di perangkat ini. Setelah login aktif, profil akan
        tersinkron ke akunmu.
      </p>
    </div>
  );
}
