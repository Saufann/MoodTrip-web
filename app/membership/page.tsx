const tiers = [
  {
    name: "MoodTrip Free",
    price: "Rp0",
    period: "",
    highlight: false,
    features: [
      "Rekomendasi dasar",
      "Akses peta & jelajah",
      "Simpan wishlist",
      "Ikuti tes kepribadian",
    ],
    cta: "Mulai Gratis",
  },
  {
    name: "MoodTrip Premium",
    price: "Rp49.000",
    period: "/bulan",
    highlight: true,
    features: [
      "Diskon khusus paket wisata mitra",
      "Rekomendasi prioritas sesuai persona",
      "Akses konten & hidden gem eksklusif",
      "Dukungan pelanggan 24/7",
      "14 hari uji coba gratis",
    ],
    cta: "Coba Premium",
  },
];

export default function MembershipPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-ink sm:text-4xl">
          Membership MoodTrip
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          Pilih paket keanggotaan. Upgrade ke Premium untuk diskon paket wisata
          dan pengalaman yang lebih personal.
        </p>
      </div>

      <div className="mt-12 grid items-start gap-6 md:grid-cols-2">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={`relative rounded-3xl border bg-white p-8 transition-all ${
              t.highlight
                ? "border-accent shadow-card ring-1 ring-accent/30 md:-mt-3 md:mb-3"
                : "border-line shadow-soft"
            }`}
          >
            {t.highlight && (
              <span className="absolute -top-3 left-8 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white shadow-soft">
                ⭐ Paling populer
              </span>
            )}
            <h2 className="mt-2 text-xl font-bold text-ink">{t.name}</h2>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-primary">
                {t.price}
              </span>
              <span className="text-muted">{t.period}</span>
            </div>
            <ul className="mt-6 space-y-3 text-sm text-ink">
              {t.features.map((f) => (
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
            <button
              className={`${
                t.highlight ? "btn-accent" : "btn-primary"
              } mt-8 w-full`}
            >
              {t.cta}
            </button>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-muted">
        Catatan: pembayaran akan diaktifkan lewat integrasi (mis. Midtrans/Stripe)
        saat kamu menyambungkan penyedia pembayaran.
      </p>
    </div>
  );
}
