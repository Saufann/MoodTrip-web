# MoodTrip Web (Next.js)

Situs web MoodTrip dibangun dengan **Next.js + Tailwind CSS**, siap deploy ke **Vercel** dan terhubung ke **Supabase**. Fokusnya memuat fitur yang sulit dibuat di Wix:

- **Tes kepribadian → rekomendasi personal** (persona → paket/aksesoris/kuliner) — sepenuhnya interaktif.
- **Membership 2 tier** (Free & Premium).
- **Jelajah** dengan pencarian + filter tag.
- **Kuliner** dengan status ketersediaan menu (Ready/Habis), tanpa pemesanan.
- **Paket Wisata** & **Aksesoris** (struktur marketplace).

Semua berjalan langsung dengan **data lokal** (tanpa backend). Supabase disiapkan untuk tahap berikutnya.

## Menjalankan di komputer

Butuh **Node.js 18+**. Lalu:

```bash
cd moodtrip-web
npm install
npm run dev
```

Buka http://localhost:3000

> Tidak perlu Supabase untuk menjalankan versi ini — datanya lokal.

## Struktur

```
app/
├── layout.tsx            # Navbar + Footer + tema
├── page.tsx              # Beranda (hero bersih + featured + membership)
├── tes-kepribadian/      # Kuis persona → rekomendasi (fitur inti)
├── jelajah/              # Cari + filter tag + daftar tempat
├── paket/                # Paket wisata dari mitra
├── aksesoris/            # Toko aksesoris
├── kuliner/              # Menu + status Ready/Habis
├── membership/           # Tier Free & Premium
├── tentang/              # Tentang
└── masuk/                # Login (stub, untuk Supabase Auth)
components/               # Navbar, Footer, SpotCard
lib/
├── spots.ts              # 8 lokasi Lombok + logika pencarian
├── personas.ts           # 6 persona + kuis + rekomendasi
└── supabase.ts           # Klien Supabase (opsional)
```

## Deploy ke Vercel

1. Push proyek ini ke GitHub (repo baru).
2. Buka https://vercel.com → **Add New → Project** → import repo GitHub tadi.
3. Vercel mendeteksi Next.js otomatis → klik **Deploy**.
4. Selesai — situs langsung online. Tiap `git push` akan otomatis deploy ulang.

```bash
# contoh push ke GitHub
git init
git add .
git commit -m "MoodTrip web awal"
git branch -M main
git remote add origin https://github.com/USERNAME/moodtrip-web.git
git push -u origin main
```

## Menyambungkan Supabase (nanti)

1. Buat proyek gratis di https://supabase.com
2. Salin `.env.example` → `.env.local`, isi `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` (dari Project Settings → API).
3. Buat tabel (mis. `spots`, `plans`, `reviews`) — skema ada di dokumen PRD MoodTrip.
4. Ganti pemakaian data lokal (`lib/spots.ts`) dengan query Supabase di `lib/supabase.ts`.
5. Di Vercel, tambahkan env var yang sama di **Project → Settings → Environment Variables**, lalu redeploy.

## Langkah berikutnya

- Foto asli Lombok (ganti banner emoji di `components/SpotCard.tsx`).
- Supabase Auth untuk halaman `/masuk`.
- Pembayaran (Midtrans/Stripe) untuk paket & membership.
- Peta interaktif (Google Maps / Mapbox) di halaman Jelajah.
