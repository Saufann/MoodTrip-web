// Artikel blog (statis). Tambah artikel baru cukup tambah objek di sini.

import { unsplash as u } from "@/lib/images";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readMinutes: number;
  cover: string;
  body: string[]; // paragraf
};

export const POSTS: Post[] = [
  {
    slug: "3-hari-di-lombok",
    title: "3 Hari di Lombok: Itinerary Anti-Buru-buru",
    excerpt:
      "Rute teruji untuk merasakan pantai, bukit, dan kuliner Lombok tanpa merasa dikejar jadwal.",
    date: "28 Juni 2026",
    readMinutes: 5,
    cover: "/images/merese.jpeg",
    body: [
      "Tiga hari sebenarnya cukup untuk jatuh cinta pada Lombok — asal kamu tidak mencoba melihat semuanya. Kuncinya: pilih satu kawasan per hari, dan sisakan ruang untuk kebetulan-kebetulan kecil yang biasanya jadi kenangan terbaik.",
      "Hari pertama, mulai dari Mataram. Sarapan Nasi Balap Puyung, lanjut Islamic Center NTB saat pagi masih sejuk, lalu sore ke Kota Tua Ampenan untuk sunset di pelabuhan lama. Malamnya, uji nyali di Warung Ayam Taliwang — pesan level pedas sedang dulu, percayalah.",
      "Hari kedua, bergerak ke selatan. Pantai Kuta Mandalika jadi basis: pagi ke Bukit Merese (naik cuma 15 menit, view-nya kelas dunia), siang berenang di Tanjung Aan yang pasirnya bulat seperti merica, sore kembali ke Merese untuk sunset — ya, dua kali, karena beda cahaya beda cerita.",
      "Hari ketiga, pilih sesuai kepribadianmu: penyuka budaya ke Desa Sade dan Sukarara, pemburu ketenangan menyeberang ke Gili Nanggu, pencari adrenalin ke air terjun Senaru. Tidak yakin yang mana? Ikuti tes kepribadian MoodTrip — itinerary-mu akan memilih dirinya sendiri.",
    ],
  },
  {
    slug: "kuliner-wajib-lombok",
    title: "7 Kuliner Lombok yang Wajib Dicoba (dan Level Pedasnya)",
    excerpt:
      "Dari Ayam Taliwang sampai Sate Rembiga — panduan jujur untuk lidah yang belum terlatih pedas.",
    date: "20 Juni 2026",
    readMinutes: 4,
    cover: "/images/ayam_taliwang.jpeg",
    body: [
      "Orang Lombok punya hubungan serius dengan cabai — nama pulaunya saja konon dari 'lombok' yang berarti cabai. Jadi anggap daftar ini sebagai peta sekaligus peringatan.",
      "Ayam Taliwang (pedas: 4/5) adalah rajanya: ayam kampung muda dibakar dengan bumbu yang meresap sampai tulang. Pasangannya wajib Plecing Kangkung (3/5) — kangkung segar, sambal tomat mentah, kacang goreng. Kombinasi ini bukan saran, ini hukum.",
      "Nasi Balap Puyung (4/5) terlihat sederhana: nasi, ayam suwir, kering kentang. Tapi suwiran ayamnya menyimpan cabai rawit yang tidak main-main. Sate Rembiga (2/5) justru manis-pedas ramah pemula — sate sapi yang bumbunya seperti dendeng manis dengan tendangan kecil di akhir.",
      "Sisanya: Beberuk Terong (3/5) untuk teman makan, Sate Bulayak (2/5) dengan lontong spiralnya yang unik, dan Es Kelapa Muda (0/5) — bukan kuliner istimewa, tapi kamu akan membutuhkannya. Percayalah.",
    ],
  },
  {
    slug: "tips-pertama-kali-ke-lombok",
    title: "Pertama Kali ke Lombok? 8 Hal yang Kami Harap Tahu Lebih Awal",
    excerpt:
      "Soal transport, musim, etika di desa adat, dan kenapa kamu tidak perlu FOMO dengan Bali.",
    date: "12 Juni 2026",
    readMinutes: 6,
    cover: "/images/pantai_senggigi.jpg",
    body: [
      "Pertama: Lombok bukan 'Bali versi sepi'. Ritmenya beda, budayanya beda, dan justru itu daya tariknya. Datang tanpa membandingkan, pulang dengan cerita sendiri.",
      "Transport: sewa motor (Rp70-100rb/hari) adalah cara terbaik keliling, tapi jarak antar kawasan lumayan — Mataram ke Kuta sekitar 1,5 jam. Kalau rombongan, mobil dengan sopir lokal lebih hemat tenaga; sekalian dapat guide gratis yang tahu warung tersembunyi.",
      "Musim: April–Oktober kering dan ideal. Desember–Februari hujan, tapi justru air terjun Senaru sedang megah-megahnya. Sunscreen bukan opsional — matahari selatan Lombok tidak mengenal ampun.",
      "Etika: di Desa Sade dan desa adat lain, sapa dulu, senyum, dan minta izin sebelum memotret orang. Beli langsung dari penenun kalau suka kainnya — tawar boleh, tapi ingat berapa hari kain itu ditenun.",
      "Terakhir: bawa uang tunai untuk warung dan pantai (banyak yang belum QRIS), unduh peta offline, dan sisakan satu hari tanpa rencana. Lombok paling murah hati justru pada yang tidak terburu-buru.",
    ],
  },
];
