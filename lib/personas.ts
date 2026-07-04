// Mesin personalisasi MoodTrip: persona + kuis + rekomendasi.
// Ini fitur inti yang sulit dibuat di Wix (butuh kode) — di sini jadi mudah.

export type PersonaId =
  | "penenang"
  | "pemburu_rasa"
  | "petualang"
  | "pemburu_estetik"
  | "romantis"
  | "keluarga";

export type Persona = {
  id: PersonaId;
  name: string;
  emoji: string;
  tagline: string;
  tags: string[];
  recommendations: {
    paket: string[];
    aksesoris: string[];
    makanan: string[];
  };
};

export const PERSONAS: Record<PersonaId, Persona> = {
  penenang: {
    id: "penenang",
    name: "Sang Penenang",
    emoji: "🌿",
    tagline: "Kamu mencari ketenangan dan waktu untuk diri sendiri.",
    tags: ["healing", "tenang", "hidden gem"],
    recommendations: {
      paket: ["Slow Trip 3 hari", "Retreat & yoga pantai", "Sunset tenang Senggigi"],
      aksesoris: ["Tumbler", "Eye mask", "Hammock", "Jurnal perjalanan"],
      makanan: ["Teh herbal", "Kelapa muda", "Makanan sehat"],
    },
  },
  pemburu_rasa: {
    id: "pemburu_rasa",
    name: "Pemburu Rasa",
    emoji: "🌶️",
    tagline: "Lidahmu petualang — kuliner pedas & lokal adalah tujuanmu.",
    tags: ["pedas", "kuliner lokal", "street food"],
    recommendations: {
      paket: ["Food Trail Lombok (Ayam Taliwang, Nasi Balap, pasar malam)"],
      aksesoris: ["Cooler bag", "Sambal kit", "Apron"],
      makanan: ["Sambal & Ayam Taliwang", "Kopi Lombok", "Kerupuk"],
    },
  },
  petualang: {
    id: "petualang",
    name: "Sang Petualang",
    emoji: "⛰️",
    tagline: "Alam, bukit, dan tantangan memanggilmu.",
    tags: ["adventurous", "nature", "sunset"],
    recommendations: {
      paket: ["Trekking Bukit Merese/Rinjani", "Island hopping", "Sunrise tour"],
      aksesoris: ["Daypack", "Dry bag", "Botol minum", "Power bank", "Sunscreen"],
      makanan: ["Energy bar", "Granola lokal", "Dendeng"],
    },
  },
  pemburu_estetik: {
    id: "pemburu_estetik",
    name: "Pemburu Estetik",
    emoji: "📸",
    tagline: "Kamu memburu spot foto, kafe, dan suasana aesthetic.",
    tags: ["aesthetic", "foto-foto", "cozy"],
    recommendations: {
      paket: ["Photo Spot Tour (Desa Sade, Kafe Ampenan Heritage)"],
      aksesoris: ["Tripod mini", "Clip lens HP", "Scarf tenun lokal"],
      makanan: ["Kopi specialty", "Dessert", "Pastry"],
    },
  },
  romantis: {
    id: "romantis",
    name: "Sang Romantis",
    emoji: "🌅",
    tagline: "Momen berdua dan sunset adalah bahasamu.",
    tags: ["romantis", "sunset", "pasangan"],
    recommendations: {
      paket: ["Honeymoon/sunset dinner", "Private beach", "Couple spa"],
      aksesoris: ["Couple tumbler", "Selimut piknik", "Polaroid"],
      makanan: ["Seafood dinner", "Cokelat", "Mocktail"],
    },
  },
  keluarga: {
    id: "keluarga",
    name: "Penjelajah Keluarga",
    emoji: "👨‍👩‍👧",
    tagline: "Liburan seru dan ramah anak jadi prioritasmu.",
    tags: ["keluarga", "edukasi", "aman"],
    recommendations: {
      paket: ["Paket family 4 hari", "Edukasi budaya Desa Sade", "Pantai aman"],
      aksesoris: ["Kids backpack", "Sunhat", "Mainan pantai", "P3K mini"],
      makanan: ["Resto halal keluarga", "Camilan", "Jus"],
    },
  },
};

export type QuizOption = { label: string; persona: PersonaId };
export type QuizQuestion = { question: string; options: QuizOption[] };

export const QUIZ: QuizQuestion[] = [
  {
    question: "Liburan idealmu?",
    options: [
      { label: "Tempat sepi buat tenang", persona: "penenang" },
      { label: "Berburu makanan enak", persona: "pemburu_rasa" },
      { label: "Naik bukit / laut", persona: "petualang" },
      { label: "Hunting spot foto", persona: "pemburu_estetik" },
      { label: "Momen romantis berdua", persona: "romantis" },
      { label: "Seru bareng keluarga", persona: "keluarga" },
    ],
  },
  {
    question: "Hal pertama yang kamu cari di kota baru?",
    options: [
      { label: "Tempat healing", persona: "penenang" },
      { label: "Kuliner khas", persona: "pemburu_rasa" },
      { label: "View alam", persona: "petualang" },
      { label: "Kafe aesthetic", persona: "pemburu_estetik" },
      { label: "Sunset romantis", persona: "romantis" },
      { label: "Tempat ramah anak", persona: "keluarga" },
    ],
  },
  {
    question: "Suasana yang bikin nyaman?",
    options: [
      { label: "Tenang & sepi", persona: "penenang" },
      { label: "Ramai & hidup", persona: "pemburu_rasa" },
      { label: "Menantang", persona: "petualang" },
      { label: "Instagramable", persona: "pemburu_estetik" },
      { label: "Intim", persona: "romantis" },
      { label: "Kekeluargaan", persona: "keluarga" },
    ],
  },
  {
    question: "Oleh-oleh impianmu?",
    options: [
      { label: "Barang self-care", persona: "penenang" },
      { label: "Makanan lokal", persona: "pemburu_rasa" },
      { label: "Gear outdoor", persona: "petualang" },
      { label: "Aksesoris foto", persona: "pemburu_estetik" },
      { label: "Hadiah pasangan", persona: "romantis" },
      { label: "Camilan keluarga", persona: "keluarga" },
    ],
  },
  {
    question: "Waktu favorit jalan-jalan?",
    options: [
      { label: "Pagi yang tenang", persona: "penenang" },
      { label: "Malam kuliner", persona: "pemburu_rasa" },
      { label: "Sunrise / sunset", persona: "petualang" },
      { label: "Golden hour", persona: "pemburu_estetik" },
      { label: "Malam romantis", persona: "romantis" },
      { label: "Siang bareng anak", persona: "keluarga" },
    ],
  },
];

// Hitung persona dari jawaban kuis (array persona id per pertanyaan).
export function scorePersona(answers: PersonaId[]): Persona {
  const counts: Record<string, number> = {};
  for (const a of answers) counts[a] = (counts[a] || 0) + 1;
  let best: PersonaId = "penenang";
  let bestScore = -1;
  for (const id of Object.keys(PERSONAS) as PersonaId[]) {
    const score = counts[id] || 0;
    if (score > bestScore) {
      bestScore = score;
      best = id;
    }
  }
  return PERSONAS[best];
}
