// Data lokasi awal MoodTrip (Mataram/Lombok).
// Untuk tahap berikutnya, ganti ini dengan query ke Supabase (lihat lib/supabase.ts).

export type Spot = {
  id: number;
  name: string;
  category: string;
  location: string;
  description: string;
  uniqueness: string;
  price: string;
  hours: string;
  rating: number;
  tags: string[];
};

export const MOOD_TAGS = [
  "healing",
  "tenang",
  "pedas",
  "romantis",
  "aesthetic",
  "hidden gem",
  "murah",
  "keluarga",
];

export const SPOTS: Spot[] = [
  {
    id: 1,
    name: "Islamic Center NTB",
    category: "Landmark Kota",
    location: "Mataram",
    description:
      "Landmark ikonik Mataram dengan area luas dan arsitektur megah.",
    uniqueness:
      "Cocok untuk wisata religi, foto arsitektur, dan mengenal identitas kota.",
    price: "Gratis",
    hours: "08.00 - 21.00",
    rating: 4.7,
    tags: ["landmark", "aesthetic", "budaya", "keluarga", "murah", "foto-foto"],
  },
  {
    id: 2,
    name: "Taman Sangkareang",
    category: "Ruang Publik",
    location: "Pusat Kota Mataram",
    description:
      "Taman kota untuk jalan santai, olahraga ringan, dan berkumpul sore hari.",
    uniqueness:
      "Tempat murah dan mudah dijangkau untuk healing singkat di tengah kota.",
    price: "Gratis",
    hours: "05.30 - 22.00",
    rating: 4.3,
    tags: ["healing", "tenang", "keluarga", "murah", "jalan santai", "kota"],
  },
  {
    id: 3,
    name: "Pantai Senggigi",
    category: "Wisata Pantai",
    location: "Lombok Barat",
    description:
      "Pantai populer dengan garis pantai panjang, sunset, dan pilihan kuliner sekitar.",
    uniqueness:
      "Spot sunset klasik Lombok yang cocok untuk pasangan dan keluarga.",
    price: "Rp10.000 - Rp30.000",
    hours: "06.00 - 19.00",
    rating: 4.6,
    tags: ["sunset", "romantis", "pantai", "keluarga", "foto-foto", "populer"],
  },
  {
    id: 4,
    name: "Bukit Merese",
    category: "Wisata Alam",
    location: "Kuta Lombok",
    description:
      "Bukit savana dengan pemandangan laut dan jalur naik yang relatif ringan.",
    uniqueness: "View luas untuk healing, foto, dan menikmati angin pantai.",
    price: "Rp10.000 - Rp25.000",
    hours: "05.30 - 18.30",
    rating: 4.8,
    tags: ["healing", "sunset", "aesthetic", "adventurous", "foto-foto", "nature"],
  },
  {
    id: 5,
    name: "Desa Sade",
    category: "Wisata Budaya",
    location: "Lombok Tengah",
    description:
      "Desa adat Sasak yang menampilkan rumah tradisional, kain tenun, dan budaya lokal.",
    uniqueness:
      "Tempat belajar budaya Sasak dan melihat speciality lokal Lombok.",
    price: "Donasi / paket lokal",
    hours: "08.00 - 17.00",
    rating: 4.4,
    tags: ["budaya", "lokal banget", "keluarga", "aesthetic", "belajar budaya", "hidden gem"],
  },
  {
    id: 6,
    name: "Warung Ayam Taliwang",
    category: "Kuliner",
    location: "Mataram",
    description:
      "Kuliner khas Lombok dengan ayam bakar berbumbu kuat dan pilihan level pedas.",
    uniqueness: "Speciality pedas lokal yang wajib diuji untuk food hunter.",
    price: "Rp25.000 - Rp75.000",
    hours: "10.00 - 22.00",
    rating: 4.6,
    tags: ["pedas", "kuliner lokal", "halal", "food hunter", "populer", "malam"],
  },
  {
    id: 7,
    name: "Nasi Balap Puyung",
    category: "Kuliner",
    location: "Mataram / Lombok Tengah",
    description:
      "Nasi khas Lombok dengan lauk ayam suwir pedas dan bumbu gurih.",
    uniqueness:
      "Cocok untuk pencarian makanan pedas, cepat, dan lokal banget.",
    price: "Rp15.000 - Rp35.000",
    hours: "08.00 - 21.00",
    rating: 4.5,
    tags: ["pedas", "murah", "kuliner lokal", "halal", "cepat", "hidden gem"],
  },
  {
    id: 8,
    name: "Kafe Ampenan Heritage",
    category: "Kafe",
    location: "Kota Tua Ampenan",
    description:
      "Kafe bernuansa heritage di kawasan tua dekat pesisir Ampenan.",
    uniqueness:
      "Cocok untuk nongkrong tenang, foto, dan eksplor suasana kota lama.",
    price: "Rp25.000 - Rp75.000",
    hours: "10.00 - 22.00",
    rating: 4.2,
    tags: ["aesthetic", "cozy", "tenang", "hidden gem", "nongkrong", "foto-foto"],
  },
];

export function spotMatches(spot: Spot, query: string, activeTag: string) {
  const q = query.trim().toLowerCase();
  const t = activeTag.trim().toLowerCase();
  const tagMatch =
    t === "" || spot.tags.some((tag) => tag.toLowerCase().includes(t));
  if (q === "") return tagMatch;
  const haystack = [
    spot.name,
    spot.category,
    spot.location,
    spot.description,
    spot.uniqueness,
    spot.tags.join(" "),
  ]
    .join(" ")
    .toLowerCase();
  return tagMatch && haystack.includes(q);
}
