// Halaman Masuk (stub). Nanti sambungkan ke Supabase Auth
// (email/password atau Google) memakai lib/supabase.ts.

export default function MasukPage() {
  return (
    <div className="mx-auto max-w-md px-5 py-20">
      <div className="rounded-3xl border border-line bg-white p-8 shadow-soft">
        <div className="text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-xl font-extrabold text-white">
            M
          </div>
          <h1 className="mt-4 text-2xl font-bold text-ink">
            Masuk ke MoodTrip
          </h1>
          <p className="mt-1 text-sm text-muted">
            Simpan wishlist, persona, dan pesananmu.
          </p>
        </div>

        <form className="mt-7 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-ink"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="kamu@email.com"
              className="w-full rounded-xl border border-line px-4 py-3 outline-none transition-colors placeholder:text-muted/60 focus:border-primary"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-ink"
            >
              Kata sandi
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-line px-4 py-3 outline-none transition-colors placeholder:text-muted/60 focus:border-primary"
            />
          </div>
          <button type="button" className="btn-primary w-full">
            Masuk
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-muted">
          Autentikasi akan aktif setelah Supabase Auth disambungkan.
        </p>
      </div>
    </div>
  );
}
