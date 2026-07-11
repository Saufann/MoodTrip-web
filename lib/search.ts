// Smart search: memahami bahasa nonformal ("lagi pengen healing n makan pedes")
// tanpa AI — kamus slang + normalisasi + skor kecocokan + toleransi typo ringan.

import { Spot, SPOTS } from "@/lib/spots";

// Kata yang dibuang (stopword percakapan)
const STOPWORDS = new Set([
  "lagi", "lg", "pengen", "pgn", "pengin", "mau", "pen", "nyari", "cari",
  "carikan", "tempat", "yang", "yg", "banget", "bgt", "n", "dan", "sama",
  "ama", "atau", "buat", "untuk", "kek", "kayak", "kaya", "aku", "gue",
  "gw", "saya", "kita", "ke", "di", "the", "and", "ada", "gak", "ga",
  "nggak", "nda", "dong", "deh", "sih", "nih", "itu", "ini", "aja", "juga",
  "wisata", "liburan", "trip", "jalan",
]);

// Slang / sinonim → istilah kanonik (tag/kata yang ada di data spot)
const SLANG: Record<string, string> = {
  // rasa & kuliner
  pedes: "pedas", pedesan: "pedas", spicy: "pedas", pedas: "pedas",
  makan: "kuliner", makanan: "kuliner", kulineran: "kuliner", jajan: "kuliner",
  laper: "kuliner", lapar: "kuliner", nyemil: "kuliner", seafood: "kuliner",
  ngopi: "kafe", kopi: "kafe", cafe: "kafe", coffee: "kafe",
  nongki: "nongkrong", nongkrong: "nongkrong", nugas: "cozy",
  // suasana
  santuy: "tenang", sante: "tenang", santai: "tenang", chill: "tenang",
  sepi: "tenang", damai: "tenang", healing: "healing", refreshing: "healing",
  tenang: "tenang", galau: "healing", capek: "healing", penat: "healing",
  // visual
  foto: "foto-foto", foto2: "foto-foto", fotoan: "foto-foto",
  selfie: "foto-foto", ootd: "aesthetic", konten: "foto-foto",
  instagramable: "aesthetic", instagramable2: "aesthetic",
  estetik: "aesthetic", aestetik: "aesthetic", aesthetic: "aesthetic",
  vintage: "aesthetic", keren: "aesthetic",
  // alam & aktivitas
  pantai: "pantai", laut: "pantai", beach: "pantai", pasir: "pantai",
  snorkling: "snorkeling", snorkeling: "snorkeling", diving: "snorkeling",
  renang: "snorkeling", berenang: "pantai",
  gunung: "nature", bukit: "nature", alam: "nature", hijau: "nature",
  trekking: "adventurous", hiking: "adventurous", mendaki: "adventurous",
  naik: "adventurous", ekstrem: "adventurous", seru: "adventurous",
  petualang: "adventurous", adrenalin: "adventurous", camping: "adventurous",
  airterjun: "air terjun", curug: "air terjun",
  sunset: "sunset", senja: "sunset", sunrise: "sunset", golden: "sunset",
  // sosial
  keluarga: "keluarga", famtrip: "keluarga", anak: "keluarga", ortu: "keluarga",
  pacar: "romantis", gebetan: "romantis", romantis: "romantis",
  honeymoon: "romantis", bulanmadu: "romantis", couple: "romantis",
  berdua: "romantis", anniversary: "romantis",
  rame: "populer", ramai: "populer", hits: "populer", viral: "populer",
  // budaya & budget
  budaya: "budaya", adat: "budaya", tradisional: "budaya", sejarah: "budaya",
  tenun: "budaya", desa: "budaya",
  murmer: "murah", murah: "murah", hemat: "murah", gratis: "murah",
  budget: "murah", ngirit: "murah",
  tersembunyi: "hidden gem", antimainstream: "hidden gem", rahasia: "hidden gem",
  // kencan & kualitas
  date: "romantis", kencan: "romantis", dating: "romantis", doi: "romantis",
  ayang: "romantis", nembak: "romantis", jadian: "romantis",
  bagus: "populer", terbaik: "populer", best: "populer", top: "populer",
  favorit: "populer", wajib: "populer", rekomendasi: "populer",
  rekomen: "populer", recommended: "populer", worth: "populer",
};

// Kata yang menandakan user bingung / terbuka pada apa saja
const OPEN_ENDED = new Set([
  "gabut", "bosan", "bosen", "bingung", "terserah", "random", "bebas",
  "kemana", "kemanaya", "mana", "apa", "aja", "suggest", "saran",
]);

// Kosakata dikenal: semua tag + kategori + lokasi + nama spot (per kata)
function vocabulary(): Set<string> {
  const v = new Set<string>();
  for (const s of SPOTS) {
    for (const t of s.tags) v.add(t.toLowerCase());
    for (const w of `${s.category} ${s.location} ${s.name}`.toLowerCase().split(/[^a-z0-9-]+/))
      if (w.length > 2) v.add(w);
  }
  return v;
}
const VOCAB = vocabulary();

// Jarak edit sederhana untuk toleransi typo (maks 1 huruf beda)
function within1(a: string, b: string): boolean {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0, j = 0, diff = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { i++; j++; continue; }
    if (++diff > 1) return false;
    if (a.length > b.length) i++;
    else if (b.length > a.length) j++;
    else { i++; j++; }
  }
  return diff + (a.length - i) + (b.length - j) <= 1;
}

// Ekstrak intent (istilah kanonik) dari kalimat bebas
export function extractIntents(query: string): string[] {
  const words = query
    .toLowerCase()
    .split(/[^a-z0-9-]+/)
    .filter((w) => w.length > 0 && !STOPWORDS.has(w));

  const intents = new Set<string>();
  for (const w of words) {
    if (SLANG[w]) { intents.add(SLANG[w]); continue; }
    if (VOCAB.has(w)) { intents.add(w); continue; }
    // toleransi typo: cari kata slang/kosakata berjarak 1
    if (w.length >= 5) {
      const slangHit = Object.keys(SLANG).find((k) => within1(w, k));
      if (slangHit) { intents.add(SLANG[slangHit]); continue; }
      const vocabHit = [...VOCAB].find((k) => k.length >= 5 && within1(w, k));
      if (vocabHit) intents.add(vocabHit);
    }
  }
  return [...intents];
}

// Skor kecocokan spot terhadap kumpulan intent
function scoreAgainst(spot: Spot, intents: string[]): number {
  const tags = spot.tags.map((t) => t.toLowerCase());
  const meta = `${spot.name} ${spot.category} ${spot.location}`.toLowerCase();
  const text = `${spot.description} ${spot.uniqueness}`.toLowerCase();
  let score = 0;
  for (const t of intents) {
    if (tags.some((tag) => tag.includes(t))) score += 3;
    else if (meta.includes(t)) score += 2;
    else if (text.includes(t)) score += 1;
  }
  return score;
}

export type SmartResult = {
  intents: string[]; // istilah yang berhasil dipahami
  results: { spot: Spot; score: number }[];
  // true = query tidak spesifik (gabut/bingung) atau tak terpahami;
  // results berisi favorit se-Lombok, bukan hasil pencocokan.
  explore: boolean;
};

function topPicks(spots: Spot[]): { spot: Spot; score: number }[] {
  return [...spots]
    .sort((a, b) => b.rating - a.rating)
    .map((spot) => ({ spot, score: 0 }));
}

export function smartSearch(query: string, spots: Spot[] = SPOTS): SmartResult {
  const q = query.trim().toLowerCase();
  if (!q)
    return {
      intents: [],
      results: spots.map((spot) => ({ spot, score: 0 })),
      explore: false,
    };

  const intents = extractIntents(q);

  if (intents.length > 0) {
    const results = spots
      .map((spot) => ({ spot, score: scoreAgainst(spot, intents) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score || b.spot.rating - a.spot.rating);
    if (results.length > 0) return { intents, results, explore: false };
  }

  // Query galau ("gabut, kemana ya") → mode explore: tampilkan favorit
  const words = q.split(/[^a-z0-9]+/).filter(Boolean);
  if (words.some((w) => OPEN_ENDED.has(w))) {
    return { intents: [], results: topPicks(spots), explore: true };
  }

  // Fallback: substring polos (perilaku lama)
  const results = spots
    .filter((s) =>
      `${s.name} ${s.category} ${s.location} ${s.description} ${s.uniqueness} ${s.tags.join(" ")}`
        .toLowerCase()
        .includes(q)
    )
    .map((spot) => ({ spot, score: 1 }));

  // Tetap tak ketemu → jangan buntu: favorit se-Lombok + ajakan tes
  if (results.length === 0) {
    return { intents: [], results: topPicks(spots), explore: true };
  }

  return { intents, results, explore: false };
}
