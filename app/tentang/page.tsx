export default function TentangPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <span className="chip bg-primary/10 font-semibold text-primary">
        Tentang Kami
      </span>
      <h1 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
        Tentang MoodTrip
      </h1>
      <div className="mt-6 space-y-4 leading-relaxed text-ink/85">
        <p>
          MoodTrip adalah platform smart tourism untuk Mataram &amp; Lombok yang
          membantu pengguna menemukan pengalaman yang sesuai dengan mood dan
          kepribadian mereka.
        </p>
        <p>
          Dengan fitur rekomendasi personal, peta interaktif, dan opsi untuk
          memesan pengalaman lokal, MoodTrip menghubungkan kamu dengan mitra
          lokal tepercaya untuk menjelajahi Lombok dengan cara yang unik dan
          menyenangkan.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="card p-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="m15 9-2 5-4 1 2-5 4-1Z" />
            </svg>
          </div>
          <h2 className="mt-3 font-bold text-ink">Kurator, bukan operator</h2>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            Paket wisata dijalankan oleh mitra lokal; MoodTrip fokus mencocokkan
            wisatawan dengan pengalaman yang pas lewat kepribadian.
          </p>
        </div>
        <div className="card p-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/10 text-accent">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 12a4 4 0 1 1 8 0" />
              <circle cx="12" cy="7" r="3" />
              <path d="M3 21c0-3 2.5-5 5-5M21 21c0-3-2.5-5-5-5" />
            </svg>
          </div>
          <h2 className="mt-3 font-bold text-ink">Bersama mitra lokal</h2>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            Setiap pemesanan mendukung UMKM dan komunitas lokal di Mataram &amp;
            Lombok secara langsung.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-line bg-white p-6 shadow-soft">
        <h2 className="font-bold text-ink">Kontak</h2>
        <p className="mt-2 text-sm text-muted">
          <a href="tel:+6285737736349" className="hover:text-primary">
            0857-3773-6349
          </a>{" "}
          · Mataram, Lombok, NTB
        </p>
      </div>
    </div>
  );
}
