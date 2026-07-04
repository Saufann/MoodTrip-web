import Link from "next/link";

// Hub tes: pilih antara tes kepribadian diri (Galen/MBTI)
// atau tes rekomendasi wisata (persona travel).

export default function TesHubPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <div className="text-center">
        <span className="chip bg-primary/10 font-semibold text-primary">
          Tes MoodTrip
        </span>
        <h1 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
          Kenali dirimu, temukan trip yang pas
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          Ada dua tes singkat. Hasilnya otomatis tersimpan sebagai tag di
          profilmu dan dipakai untuk mempersonalisasi rekomendasi.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Link href="/tes-kepribadian/diri" className="group card-hover p-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
            </svg>
          </div>
          <h2 className="mt-5 text-xl font-bold text-ink transition-colors group-hover:text-primary">
            Tes Kepribadian Diri
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            Cari tahu temperamen Galen (Sanguinis, Koleris, Melankolis,
            Plegmatis) atau tipe MBTI-mu. 20 pertanyaan per mode, ±3 menit.
          </p>
          <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
            Mulai tes <span aria-hidden>→</span>
          </span>
        </Link>

        <Link href="/tes-kepribadian/wisata" className="group card-hover p-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="m15 9-2 5-4 1 2-5 4-1Z" />
            </svg>
          </div>
          <h2 className="mt-5 text-xl font-bold text-ink transition-colors group-hover:text-primary">
            Bingung Mau ke Mana?
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            Jawab 5 pertanyaan ringan dan dapatkan persona travel-mu beserta
            rekomendasi paket, kuliner, dan aksesoris yang cocok.
          </p>
          <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
            Mulai tes <span aria-hidden>→</span>
          </span>
        </Link>
      </div>

      <p className="mt-8 text-center text-sm text-muted">
        Sudah tahu tipemu?{" "}
        <Link href="/profil" className="font-semibold text-primary hover:underline">
          Isi langsung di profil
        </Link>
      </p>
    </div>
  );
}
