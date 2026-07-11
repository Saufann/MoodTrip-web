// Foto terkurasi (Unsplash) sebagai placeholder profesional.
// Ganti URL di sini kapan saja dengan foto asli spot/produk dari mitra.

const u = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

export const unsplash = u;

export const HERO_IMAGE = "/images/pantai_senggigi.jpg"; // foto sendiri
export const CTA_IMAGE = u("photo-1476514525535-07fb3b4ae5f1", 1600);

// Foto per spot (key = spot.id)
const SPOT_IMAGES: Record<number, string> = {
  1: "/images/Islamic_center_ntb.jpg", // foto sendiri (public/images)
  2: "/images/Sangkareang.jpg", // foto sendiri (public/images)
  3: "/images/pantai_senggigi.jpg", // Pantai Senggigi
  4: "/images/merese.jpeg", // Bukit Merese
  5: "/images/desa_sade.jpeg", // Desa Sade — budaya
  6: "/images/ayam_taliwang.jpeg", // Ayam Taliwang
  7: "/images/nasi_puyung.jpeg", // Nasi Balap Puyung
  8: "/images/ampenan_heritage.jpeg", // Kafe Ampenan
  9: u("photo-1519046904884-53103b34b206"), // Gili Trawangan
  10: u("photo-1432405972618-c60b0225b8f9"), // Sendang Gile
  11: u("photo-1501785888041-af3ef285b470"), // Bukit Selong
  12: u("photo-1500375592092-40eb2168fd21"), // Tanjung Aan
  13: u("photo-1507525428034-b723cf961d3e"), // Pink Beach
  14: u("photo-1544551763-46a013bb70d5"), // Gili Nanggu — snorkeling
  15: u("photo-1432405972618-c60b0225b8f9"), // Tiu Kelep
  16: u("photo-1464822759023-fed622ff2c3b"), // Sembalun
  17: "/images/foto_ampenan.jpeg", // Kota Tua Ampenan — foto sendiri
  18: u("photo-1519046904884-53103b34b206"), // Kuta Mandalika
  19: u("photo-1544441893-675973e31985"), // Sukarara — tenun
  20: u("photo-1555939594-58d7cb561ad1"), // Sate Rembiga
};

export function spotImage(id: number) {
  return SPOT_IMAGES[id] ?? u("photo-1506744038136-46273834b3fb");
}

// Foto paket wisata (key = persona)
const PAKET_IMAGES: Record<string, string> = {
  "Sang Penenang": u("photo-1544367567-0f2fcb009e0b"),
  "Pemburu Rasa": u("photo-1555939594-58d7cb561ad1"),
  "Sang Petualang": "/images/trek_merese.jpg",
  "Pemburu Estetik": "/images/foto_ampenan.jpeg",
  "Sang Romantis": u("photo-1414235077428-338989a2e8c0"),
  "Penjelajah Keluarga": u("photo-1511895426328-dc8714191300"),
};

export function paketImage(persona: string) {
  return PAKET_IMAGES[persona] ?? u("photo-1501785888041-af3ef285b470");
}

// Galeri foto per paket (untuk slider di kartu) — foto pertama = foto utama.
// Sang Penenang: yoga, meditasi, spa. Silakan ganti/tambah sesukamu.
const PAKET_GALLERIES: Record<string, string[]> = {
  "Sang Penenang": [
    u("photo-1544367567-0f2fcb009e0b"), // yoga di alam
    u("photo-1506126613408-eca07ce68773"), // meditasi
    u("photo-1540555700478-4be289fbecef"), // spa & relaksasi
  ],
  "Pemburu Rasa": [
    u("photo-1555939594-58d7cb561ad1"), // bakaran
    u("photo-1504674900247-0877df9cc836"), // hidangan
    u("photo-1512058564366-18510be2db19"), // nasi khas
  ],
  "Sang Petualang": [
    "/images/trek_merese.jpg", // foto sendiri
    u("photo-1506905925346-21bda4d32df4"), // puncak gunung
    u("photo-1476514525535-07fb3b4ae5f1"), // kano di danau
  ],
  "Pemburu Estetik": [
    "/images/foto_ampenan.jpeg", // foto sendiri
    u("photo-1502920917128-1aa500764cbd"), // kamera
    u("photo-1516035069371-29a1b244cc32"), // fotografer bekerja
  ],
  "Sang Romantis": [
    u("photo-1414235077428-338989a2e8c0"), // fine dining
    u("photo-1520250497591-112f2f40a3f4"), // resort
    u("photo-1519046904884-53103b34b206"), // pantai senja
  ],
  "Penjelajah Keluarga": [
    u("photo-1511895426328-dc8714191300"), // keluarga
    u("photo-1470246973918-29a93221c455"), // piknik
    "/images/pantai_senggigi.jpg", // foto sendiri
  ],
};

export function paketGallery(persona: string): string[] {
  return PAKET_GALLERIES[persona] ?? [paketImage(persona)];
}

// Foto resto kuliner (key = nama)
const RESTO_IMAGES: Record<string, string> = {
  "Warung Ayam Taliwang": "/images/ayam_taliwang.jpeg",
  "Nasi Balap Puyung": "/images/nasi_puyung.jpeg",
  "Kafe Ampenan Heritage": "/images/ampenan_heritage.jpeg", // foto sendiri
};

export function restoImage(name: string) {
  return RESTO_IMAGES[name] ?? u("photo-1504674900247-0877df9cc836");
}

// Foto produk aksesoris (key = nama produk)
const PRODUCT_IMAGES: Record<string, string> = {
  // Travel gear
  "Tumbler MoodTrip": u("photo-1602143407151-7111542de6e8", 600),
  "Dry Bag 10L": u("photo-1553062407-98eeb64c6a62", 600),
  "Daypack Lipat 20L": u("photo-1553062407-98eeb64c6a62", 600),
  "Tripod Mini HP": u("photo-1502920917128-1aa500764cbd", 600),
  "Power Bank 10.000mAh": u("photo-1519389950473-47ba0277781c", 600),
  "Topi Pantai": u("photo-1469334031218-e382a71b716b", 600),
  // Khas Lombok — ganti dengan foto produk asli dari perajin bila ada
  "Kain Tenun Sasak": u("photo-1544441893-675973e31985", 600),
  "Scarf Tenun Sasak": u("photo-1544441893-675973e31985", 600),
  "Gelang Mutiara Sekarbela": u("photo-1515562141207-7a88fb7ce338", 600),
  "Anyaman Ketak Lombok": u("photo-1470246973918-29a93221c455", 600),
  "Sambal Kit Lombok": u("photo-1596040033229-a9821ebd058d", 600),
  "Kopi Sembalun": u("photo-1495474472287-4d71bcdd2085", 600),
};

export function productImage(name: string) {
  return PRODUCT_IMAGES[name] ?? u("photo-1553062407-98eeb64c6a62", 600);
}
