// Data lokasi MoodTrip (Mataram/Lombok).
// Untuk tahap berikutnya, ganti ini dengan query ke Supabase (lihat lib/supabase.ts).
// lat/lng dipakai halaman /peta (perkiraan lokasi — koreksi bila perlu).

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
  lat: number;
  lng: number;
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
  "snorkeling",
  "air terjun",
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
    lat: -8.5838,
    lng: 116.1178,
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
    lat: -8.5852,
    lng: 116.1119,
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
    lat: -8.4923,
    lng: 116.0429,
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
    lat: -8.9012,
    lng: 116.3078,
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
    lat: -8.8395,
    lng: 116.2924,
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
    lat: -8.5908,
    lng: 116.1203,
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
    lat: -8.7221,
    lng: 116.2702,
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
    lat: -8.5679,
    lng: 116.0729,
  },
  {
    id: 9,
    name: "Gili Trawangan",
    category: "Pulau & Snorkeling",
    location: "Lombok Utara",
    description:
      "Pulau paling populer di Lombok: snorkeling, sepeda keliling pulau, dan kehidupan malam santai tanpa kendaraan bermotor.",
    uniqueness:
      "Kombinasi langka: laut jernih untuk snorkeling siang, sunset swing sore, live music malam.",
    price: "Boat mulai Rp50.000",
    hours: "24 jam",
    rating: 4.8,
    tags: ["snorkeling", "pantai", "sunset", "populer", "adventurous", "romantis"],
    lat: -8.3506,
    lng: 116.0392,
  },
  {
    id: 10,
    name: "Air Terjun Sendang Gile",
    category: "Wisata Alam",
    location: "Senaru, Lombok Utara",
    description:
      "Air terjun dua tingkat di kaki Rinjani dengan trek tangga yang mudah diikuti.",
    uniqueness:
      "Air terjun paling mudah diakses di Senaru — cocok untuk pemanasan sebelum Tiu Kelep.",
    price: "Rp20.000",
    hours: "07.00 - 17.00",
    rating: 4.6,
    tags: ["air terjun", "nature", "healing", "keluarga", "foto-foto"],
    lat: -8.3055,
    lng: 116.4043,
  },
  {
    id: 11,
    name: "Bukit Selong",
    category: "Wisata Alam",
    location: "Sembalun, Lombok Timur",
    description:
      "Bukit pendek dengan panorama petak sawah warna-warni khas Sembalun.",
    uniqueness:
      "Naik 10 menit, dapat view yang biasa muncul di kalender — terbaik saat pagi berkabut.",
    price: "Rp10.000",
    hours: "06.00 - 18.00",
    rating: 4.7,
    tags: ["aesthetic", "foto-foto", "hidden gem", "nature", "murah", "tenang"],
    lat: -8.3621,
    lng: 116.5352,
  },
  {
    id: 12,
    name: "Pantai Tanjung Aan",
    category: "Wisata Pantai",
    location: "Kuta, Lombok Tengah",
    description:
      "Pantai pasir merica dengan air dangkal tenang dan ayunan foto ikonik.",
    uniqueness:
      "Pasirnya bulat seperti merica — unik di dunia. Bukit Merese persis di sebelahnya.",
    price: "Rp10.000 - Rp25.000",
    hours: "06.00 - 18.30",
    rating: 4.7,
    tags: ["pantai", "keluarga", "aesthetic", "foto-foto", "populer"],
    lat: -8.9086,
    lng: 116.3233,
  },
  {
    id: 13,
    name: "Pink Beach (Tangsi)",
    category: "Wisata Pantai",
    location: "Lombok Timur",
    description:
      "Pantai berpasir merah muda alami — satu dari sedikit di dunia.",
    uniqueness:
      "Warna pink dari serpihan koral merah. Datang saat matahari tinggi agar warna maksimal.",
    price: "Rp10.000",
    hours: "07.00 - 17.00",
    rating: 4.5,
    tags: ["pantai", "hidden gem", "aesthetic", "foto-foto", "adventurous"],
    lat: -8.8683,
    lng: 116.5478,
  },
  {
    id: 14,
    name: "Gili Nanggu",
    category: "Pulau & Snorkeling",
    location: "Sekotong, Lombok Barat",
    description:
      "Pulau kecil tenang di barat daya Lombok dengan terumbu dangkal penuh ikan.",
    uniqueness:
      "Versi sepi dari Gili — snorkeling langsung dari pantai, serasa pulau pribadi.",
    price: "Boat mulai Rp300.000/perahu",
    hours: "07.00 - 17.00",
    rating: 4.7,
    tags: ["snorkeling", "hidden gem", "tenang", "romantis", "healing"],
    lat: -8.7364,
    lng: 115.9371,
  },
  {
    id: 15,
    name: "Air Terjun Tiu Kelep",
    category: "Wisata Alam",
    location: "Senaru, Lombok Utara",
    description:
      "Air terjun megah dengan kolam alami — trek 45 menit menembus hutan dan sungai.",
    uniqueness:
      "Berdiri di bawah tirai airnya adalah pengalaman paling menyegarkan di Lombok.",
    price: "Rp20.000 + guide lokal",
    hours: "07.00 - 16.30",
    rating: 4.8,
    tags: ["air terjun", "adventurous", "nature", "healing", "hidden gem"],
    lat: -8.3033,
    lng: 116.4098,
  },
  {
    id: 16,
    name: "Sembalun Lawang",
    category: "Wisata Alam",
    location: "Kaki Rinjani, Lombok Timur",
    description:
      "Desa di lembah kaki Rinjani: udara sejuk, kebun stroberi, dan titik awal pendakian.",
    uniqueness:
      "Suasana pegunungan 1.100 mdpl — sisi Lombok yang jarang dilihat wisatawan pantai.",
    price: "Gratis - Rp10.000",
    hours: "24 jam",
    rating: 4.6,
    tags: ["nature", "tenang", "healing", "adventurous", "keluarga"],
    lat: -8.3482,
    lng: 116.5257,
  },
  {
    id: 17,
    name: "Kota Tua Ampenan",
    category: "Wisata Budaya",
    location: "Ampenan, Mataram",
    description:
      "Kawasan pelabuhan lama dengan bangunan art-deco, kampung multietnis, dan sunset pantai.",
    uniqueness:
      "Lapisan sejarah Tionghoa-Arab-Melayu dalam satu kawasan yang fotogenik.",
    price: "Gratis",
    hours: "24 jam (terbaik sore)",
    rating: 4.4,
    tags: ["budaya", "aesthetic", "foto-foto", "sunset", "murah", "hidden gem"],
    lat: -8.5672,
    lng: 116.0721,
  },
  {
    id: 18,
    name: "Pantai Kuta Mandalika",
    category: "Wisata Pantai",
    location: "Kuta, Lombok Tengah",
    description:
      "Pantai utama kawasan Mandalika dengan fasilitas lengkap dan akses mudah.",
    uniqueness:
      "Basis terbaik untuk eksplor pantai selatan — dekat sirkuit MotoGP Mandalika.",
    price: "Gratis - Rp10.000",
    hours: "06.00 - 19.00",
    rating: 4.5,
    tags: ["pantai", "keluarga", "populer", "sunset", "murah"],
    lat: -8.8945,
    lng: 116.2833,
  },
  {
    id: 19,
    name: "Desa Tenun Sukarara",
    category: "Wisata Budaya",
    location: "Lombok Tengah",
    description:
      "Sentra tenun songket Sasak — lihat proses menenun dan coba pakaian adat.",
    uniqueness:
      "Beli kain langsung dari penenunnya, plus foto berbusana adat Sasak gratis.",
    price: "Gratis (donasi)",
    hours: "08.00 - 17.00",
    rating: 4.5,
    tags: ["budaya", "belajar budaya", "lokal banget", "keluarga", "foto-foto"],
    lat: -8.7152,
    lng: 116.2531,
  },
  {
    id: 20,
    name: "Sate Rembiga Ibu Sinnaseh",
    category: "Kuliner",
    location: "Rembiga, Mataram",
    description:
      "Sate sapi manis-pedas legendaris khas kampung Rembiga sejak puluhan tahun.",
    uniqueness:
      "Bumbu manis-pedas yang meresap sampai serat daging — banyak yang bilang sate terenak di Lombok.",
    price: "Rp20.000 - Rp50.000",
    hours: "09.00 - 22.00",
    rating: 4.7,
    tags: ["kuliner lokal", "pedas", "halal", "populer", "food hunter", "murah"],
    lat: -8.5754,
    lng: 116.1052,
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
