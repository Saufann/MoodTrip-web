"use client";

// Masuk / daftar via Supabase Auth. Tanpa kredensial Supabase (.env.local),
// halaman menampilkan mode demo dan situs tetap berjalan dengan data lokal.

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase, isSupabaseReady } from "@/lib/supabase";
import { syncOnLogin } from "@/lib/sync";
import { useUser } from "@/components/useUser";

type Mode = "masuk" | "daftar";

export default function MasukPage() {
  const router = useRouter();
  const { user } = useUser();
  const [mode, setMode] = useState<Mode>("masuk");
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ type: "error" | "info"; text: string } | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setMsg(null);

    if (mode === "masuk") {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setMsg({
          type: "error",
          text:
            error.message === "Invalid login credentials"
              ? "Email atau kata sandi salah."
              : error.message,
        });
      } else if (data.user) {
        await syncOnLogin(data.user.id);
        router.push("/profil");
      }
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name: nama.trim() } },
      });
      if (error) {
        setMsg({ type: "error", text: error.message });
      } else if (data.session && data.user) {
        await syncOnLogin(data.user.id);
        router.push("/profil");
      } else {
        setMsg({
          type: "info",
          text: "Cek email-mu untuk tautan konfirmasi, lalu masuk di sini.",
        });
        setMode("masuk");
      }
    }
    setBusy(false);
  }

  async function logout() {
    await supabase?.auth.signOut();
  }

  async function forgotPassword() {
    if (!supabase) return;
    if (!email.trim()) {
      setMsg({ type: "error", text: "Isi email-mu dulu, lalu klik Lupa kata sandi." });
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setMsg(
      error
        ? { type: "error", text: error.message }
        : {
            type: "info",
            text: `Link reset terkirim ke ${email} — cek inbox/spam, lalu ikuti tautannya.`,
          }
    );
    setBusy(false);
  }

  return (
    <div className="mx-auto max-w-md px-5 py-20">
      <div className="rounded-3xl border border-line bg-white p-8 shadow-soft">
        <div className="text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo.svg"
            alt="MoodTrip"
            className="mx-auto h-12 w-12 rounded-2xl"
          />
          <h1 className="mt-4 text-2xl font-bold text-ink">
            {user
              ? "Kamu sudah masuk"
              : mode === "masuk"
              ? "Masuk ke MoodTrip"
              : "Buat akun MoodTrip"}
          </h1>
          {!user && (
            <p className="mt-1 text-sm text-muted">
              Simpan wishlist, tulis review, dan sinkronkan profilmu.
            </p>
          )}
        </div>

        {!isSupabaseReady ? (
          <p className="mt-6 rounded-2xl bg-cream p-4 text-center text-sm text-muted">
            Mode demo: autentikasi belum aktif karena kredensial Supabase belum
            diisi di <code>.env.local</code>. Semua fitur tetap berjalan dengan
            penyimpanan lokal.
          </p>
        ) : user ? (
          <div className="mt-6 text-center">
            <p className="rounded-2xl bg-cream p-4 text-sm text-ink">
              {user.email}
            </p>
            <div className="mt-4 flex gap-3">
              <button onClick={() => router.push("/profil")} className="btn-primary flex-1">
                Buka Profil
              </button>
              <button onClick={logout} className="btn-outline flex-1">
                Keluar
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Toggle mode */}
            <div className="mt-6 grid grid-cols-2 rounded-full border border-line bg-cream p-1 text-sm font-semibold">
              {(["masuk", "daftar"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setMode(m);
                    setMsg(null);
                  }}
                  className={`rounded-full py-2 capitalize transition-all ${
                    mode === m ? "bg-white text-primary shadow-soft" : "text-muted"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            <form onSubmit={submit} className="mt-6 space-y-4">
              {mode === "daftar" && (
                <div>
                  <label htmlFor="nama" className="mb-1.5 block text-sm font-medium text-ink">
                    Nama
                  </label>
                  <input
                    id="nama"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    required
                    placeholder="Nama kamu"
                    className="w-full rounded-xl border border-line px-4 py-3 outline-none transition-colors focus:border-primary"
                  />
                </div>
              )}
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="kamu@email.com"
                  className="w-full rounded-xl border border-line px-4 py-3 outline-none transition-colors focus:border-primary"
                />
              </div>
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-ink">
                    Kata sandi
                  </label>
                  {mode === "masuk" && (
                    <button
                      type="button"
                      onClick={forgotPassword}
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      Lupa kata sandi?
                    </button>
                  )}
                </div>
                <input
                  id="password"
                  type="password"
                  autoComplete={mode === "masuk" ? "current-password" : "new-password"}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full rounded-xl border border-line px-4 py-3 outline-none transition-colors focus:border-primary"
                />
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

              <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">
                {busy ? "Memproses..." : mode === "masuk" ? "Masuk" : "Daftar"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
