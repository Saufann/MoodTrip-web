// Detail tambahan per spot: galeri, fasilitas, dan review awal (seed).
// Galeri: tambahkan foto sendiri ke public/images lalu daftarkan path-nya di sini.
// Review user tersimpan di localStorage (lib/store.ts) dan digabung dengan seed.

import { spotImage, unsplash as u } from "@/lib/images";

export type SeedReview = {
  name: string;
  rating: number; // 1-5
  date: string; // "Mei 2026"
  text: string;
};

type SpotDetail = {
  gallery: string[];
  fasilitas: string[];
  reviews: SeedReview[];
};

const DETAILS: Record<number, SpotDetail> = {
  1: {
    gallery: [
      "/images/Islamic_center_ntb.jpg",
      u("photo-1518548419970-58e3b4079ab2"),
      u("photo-1519817650390-64a93db51149"),
    ],
    fasilitas: ["Parkir luas", "Toilet", "Musala", "Area foto", "Ramah difabel"],
    reviews: [
      {
        name: "Rina A.",
        rating: 5,
        date: "Juni 2026",
        text: "Megah banget, apalagi pas maghrib lampunya nyala. Naik ke menara wajib coba — view kota Mataram 360°.",
      },
      {
        name: "Dedi P.",
        rating: 4,
        date: "Mei 2026",
        text: "Arsitekturnya luar biasa untuk foto. Datang pagi biar tidak terlalu ramai.",
      },
    ],
  },
  2: {
    gallery: [
      "/images/Sangkareang.jpg",
      u("photo-1441974231531-c6227db76b6e"),
      u("photo-1506744038136-46273834b3fb"),
    ],
    fasilitas: ["Gratis masuk", "Jogging track", "Playground", "Kursi taman", "PKL sekitar"],
    reviews: [
      {
        name: "Maya S.",
        rating: 4,
        date: "Juni 2026",
        text: "Sore hari enak banget buat jalan santai. Banyak jajanan di sekitar taman.",
      },
      {
        name: "Fajar H.",
        rating: 4,
        date: "April 2026",
        text: "Tempat healing murah meriah di tengah kota. Bersih dan teduh.",
      },
    ],
  },
  3: {
    gallery: [
      "/images/pantai_senggigi.jpg",
      u("photo-1507525428034-b723cf961d3e"),
      u("photo-1519046904884-53103b34b206"),
    ],
    fasilitas: ["Parkir", "Warung & kafe", "Sewa kano", "Toilet & bilas", "Spot sunset"],
    reviews: [
      {
        name: "Andre W.",
        rating: 5,
        date: "Juni 2026",
        text: "Sunset-nya juara. Datang jam 5 sore, ambil spot di sisi selatan pantai.",
      },
      {
        name: "Sari L.",
        rating: 4,
        date: "Mei 2026",
        text: "Pantai klasik Lombok yang tidak pernah mengecewakan. Ombak tenang, aman buat anak.",
      },
      {
        name: "Bagus R.",
        rating: 5,
        date: "Maret 2026",
        text: "Banyak pilihan seafood di sepanjang jalan. Romantis buat dinner.",
      },
    ],
  },
  4: {
    gallery: [
      "/images/merese.jpeg",
      "/images/trek_merese.jpg",
      u("photo-1470071459604-3b5ec3a7fe05"),
    ],
    fasilitas: ["Parkir bawah bukit", "Warung kecil", "Jalur trekking ringan", "Spot sunrise & sunset"],
    reviews: [
      {
        name: "Nadia K.",
        rating: 5,
        date: "Juni 2026",
        text: "Naiknya cuma 15-20 menit tapi view-nya kelas dunia. Sunrise di sini tidak ada lawan.",
      },
      {
        name: "Yoga T.",
        rating: 5,
        date: "Mei 2026",
        text: "Savana + laut biru = foto tanpa filter. Bawa air minum, di atas panas.",
      },
    ],
  },
  5: {
    gallery: [
      "/images/desa_sade.jpeg",
      u("photo-1537996194471-e657df975ab4"),
      u("photo-1544441893-675973e31985"),
    ],
    fasilitas: ["Guide lokal", "Toko tenun", "Pertunjukan budaya", "Parkir"],
    reviews: [
      {
        name: "Putri M.",
        rating: 5,
        date: "Juni 2026",
        text: "Belajar tenun langsung dari ibu-ibu Sasak. Pengalaman budaya paling berkesan di Lombok.",
      },
      {
        name: "Hendra G.",
        rating: 4,
        date: "April 2026",
        text: "Ambil guide lokal biar dapat cerita lengkap rumah adatnya. Worth it.",
      },
    ],
  },
  6: {
    gallery: [
      "/images/ayam_taliwang.jpeg",
      u("photo-1555939594-58d7cb561ad1"),
      u("photo-1504674900247-0877df9cc836"),
    ],
    fasilitas: ["Halal", "Parkir", "Level pedas custom", "Buka malam"],
    reviews: [
      {
        name: "Ilham F.",
        rating: 5,
        date: "Juni 2026",
        text: "Pedasnya nampol tapi nagih. Plecing kangkungnya juga segar banget.",
      },
      {
        name: "Vina O.",
        rating: 4,
        date: "Mei 2026",
        text: "Ayam kampungnya empuk, bumbu meresap. Minta level pedas sedang saja kalau tidak kuat.",
      },
    ],
  },
  7: {
    gallery: [
      "/images/nasi_puyung.jpeg",
      u("photo-1512058564366-18510be2db19"),
      u("photo-1504674900247-0877df9cc836"),
    ],
    fasilitas: ["Halal", "Murah meriah", "Cepat saji", "Bungkus tersedia"],
    reviews: [
      {
        name: "Rudi S.",
        rating: 5,
        date: "Juni 2026",
        text: "Rp25 ribu kenyang dan pedasnya otentik. Wajib coba yang komplit.",
      },
      {
        name: "Lia N.",
        rating: 4,
        date: "Maret 2026",
        text: "Sederhana tapi rasanya juara. Ini baru nasi bungkus level dewa.",
      },
    ],
  },
  8: {
    gallery: [
      "/images/ampenan_heritage.jpeg",
      "/images/foto_ampenan.jpeg",
      u("photo-1495474472287-4d71bcdd2085"),
    ],
    fasilitas: ["WiFi", "Colokan banyak", "Indoor & outdoor", "Spot foto vintage"],
    reviews: [
      {
        name: "Tasya E.",
        rating: 5,
        date: "Juni 2026",
        text: "Vibes kota tuanya dapet banget. Kopi Lombok-nya harus dicoba.",
      },
      {
        name: "Bimo A.",
        rating: 4,
        date: "Mei 2026",
        text: "Cozy buat kerja atau nongkrong sore. Golden hour di sekitar gedung tua = foto estetik gratis.",
      },
    ],
  },
};

export function spotDetail(id: number): SpotDetail {
  return (
    DETAILS[id] ?? {
      gallery: [spotImage(id)],
      fasilitas: ["Parkir", "Toilet"],
      reviews: [],
    }
  );
}
