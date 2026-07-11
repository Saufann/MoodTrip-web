"use client";

// Atur ulang / ubah kata sandi.
// Bisa diakses dari: (1) link reset di email, (2) profil (saat sudah login).

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase, isSupabaseReady } from "@/lib/supabase";
import { useUser } from "@/components/useUser";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { user, loading } = useUser();
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ type: "error" | "info"; text: string } | null>(null);

  const valid = pw.length >= 6 && pw === pw2;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase || !valid) return;
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: pw });
    if (error) {
      setMsg({ type: "error", text: error.message });
      setBusy(false);
    } else {
      setMsg({ type: "info", text: "Kata sandi berhasil diubah! Mengalihkan..." });
      setTimeout(() => router.push("/profil"), 1200);
    }
  }

  return (
    <div className="mx-auto max-w-md px-5 py-20">
      <div className="rounded-3xl border border-line bg-white p-8 shadow-soft">
        <div className="text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-2xl">
            🔑
          </div>
          <h1 className="mt-4 text-2xl font-bold text-ink">
            Atur Kata Sandi Baru
          </h1>
        </div>

        {!isSupabaseReady ? (
          <p className="mt-6 rounded-2xl bg-cream p-4 text-center text-sm text-muted">
            Mode demo: fitur ini aktif setelah kredensial Supabase diisi.
          </p>
        ) : loading ? (
          <div className="mt-6 h-24 animate-pulse rounded-2xl bg-cream" />
        ) : !user ? (
          <div className="mt-6 text-center">
            <p className="rounded-2xl bg-red-50 p-4 text-sm text-red-600">
              Sesi tidak ditemukan — link reset mungkin kedaluwarsa atau sudah
              dipakai.
            </p>
            <p className="mt-4 text-sm text-muted">
              Minta link baru lewat tombol &ldquo;Lupa kata sandi?&rdquo; di
              halaman masuk.
            </p>
            <Link href="/masuk" className="btn-primary mt-4">
              Ke Halaman Masuk
            </Link>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-4">
            <p className="rounded-xl bg-cream px-4 py-2.5 text-center text-xs text-muted">
              Akun: <b className="text-ink">{user.email}</b>
            </p>
            <div>
              <label htmlFor="pw" className="mb-1.5 block text-sm font-medium text-ink">
                Kata sandi baru
              </label>
              <input
                id="pw"
                type="password"
                autoComplete="new-password"
                required
                minLength={6}
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="Minimal 6 karakter"
                className="w-full rounded-xl border border-line px-4 py-3 outline-none transition-colors focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="pw2" className="mb-1.5 block text-sm font-medium text-ink">
                Ulangi kata sandi baru
              </label>
              <input
                id="pw2"
                type="password"
                autoComplete="new-password"
                required
                value={pw2}
                onChange={(e) => setPw2(e.target.value)}
                placeholder="Harus sama persis"
                className="w-full rounded-xl border border-line px-4 py-3 outline-none transition-colors focus:border-primary"
              />
              {pw2 && pw !== pw2 && (
                <p className="mt-1 text-xs text-red-600">
                  Kata sandi belum sama.
                </p>
              )}
            </div>

            {msg && (
              <p
                className={`rounded-xl px-4 py-3 text-sm ${
                  msg.type === "error"
                    ? "bg-red-50 text-red-600"
                    : "bg-primary/5 text-primary"
                }`}
              >
                {msg.text}
              </p>
            )}

            <button
              type="submit"
              disabled={!valid || busy}
              className="btn-primary w-full disabled:opacity-60"
            >
              {busy ? "Menyimpan..." : "Simpan Kata Sandi Baru"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
