// Data produk aksesoris & oleh-oleh. Nanti dari tabel `products` di Supabase.
// oldPrice terisi = produk sedang diskon (badge % dihitung otomatis di kartu).

export type Product = {
  name: string;
  price: string;
  oldPrice?: string; // harga coret (opsional)
  desc: string;
  kategori: "gear" | "khas_lombok";
  rating: number; // 0-5
  sold: number; // jumlah terjual
  origin: string; // toko / asal perajin
  official: boolean; // toko resmi MoodTrip
  freeShipping: boolean;
  stock: number;
};

export const TRAVEL_GEAR: Product[] = [
  {
    name: "Tumbler MoodTrip",
    price: "Rp89.000",
    oldPrice: "Rp120.000",
    desc: "Botol minum 750ml double-wall, tahan dingin 12 jam & panas 6 jam. Bonus tali gantung.",
    kategori: "gear",
    rating: 4.9,
    sold: 312,
    origin: "MoodTrip Official",
    official: true,
    freeShipping: true,
    stock: 48,
  },
  {
    name: "Dry Bag 10L",
    price: "Rp120.000",
    desc: "Tas anti air 10L untuk island hopping & air terjun. Bahan PVC tebal, tali bahu bisa dilepas.",
    kategori: "gear",
    rating: 4.8,
    sold: 187,
    origin: "MoodTrip Official",
    official: true,
    freeShipping: true,
    stock: 26,
  },
  {
    name: "Daypack Lipat 20L",
    price: "Rp135.000",
    oldPrice: "Rp165.000",
    desc: "Ransel 20L super ringan (280 gram), bisa dilipat sekepal tangan. Bahan ripstop anti sobek.",
    kategori: "gear",
    rating: 4.7,
    sold: 145,
    origin: "MoodTrip Official",
    official: true,
    freeShipping: true,
    stock: 31,
  },
  {
    name: "Tripod Mini HP",
    price: "Rp95.000",
    desc: "Tripod fleksibel + remote bluetooth. Kaki gurita bisa dililit ke pagar/dahan untuk angle sulit.",
    kategori: "gear",
    rating: 4.6,
    sold: 230,
    origin: "MoodTrip Official",
    official: true,
    freeShipping: false,
    stock: 54,
  },
  {
    name: "Power Bank 10.000mAh",
    price: "Rp180.000",
    desc: "Dua port USB + Type-C fast charging 22.5W. Lolos aturan kabin pesawat.",
    kategori: "gear",
    rating: 4.8,
    sold: 98,
    origin: "MoodTrip Official",
    official: true,
    freeShipping: true,
    stock: 19,
  },
  {
    name: "Topi Pantai",
    price: "Rp75.000",
    desc: "Topi anyaman lebar ringan dengan tali dagu — tidak terbang saat naik boat. Bisa dilipat.",
    kategori: "gear",
    rating: 4.5,
    sold: 164,
    origin: "MoodTrip Official",
    official: true,
    freeShipping: false,
    stock: 42,
  },
];

export const KHAS_LOMBOK: Product[] = [
  {
    name: "Kain Tenun Sasak",
    price: "Rp250.000",
    desc: "Tenun ikat asli buatan tangan penenun Desa Sukarara, 100x200cm. Motif subahnale klasik — tiap helai unik.",
    kategori: "khas_lombok",
    rating: 5.0,
    sold: 67,
    origin: "Sukarara, Lombok Tengah",
    official: false,
    freeShipping: false,
    stock: 8,
  },
  {
    name: "Scarf Tenun Sasak",
    price: "Rp150.000",
    oldPrice: "Rp185.000",
    desc: "Scarf tenun 40x160cm, ringan dan adem. Motif tradisional dengan warna pilihan perajin.",
    kategori: "khas_lombok",
    rating: 4.9,
    sold: 124,
    origin: "Sukarara, Lombok Tengah",
    official: false,
    freeShipping: false,
    stock: 15,
  },
  {
    name: "Gelang Mutiara Sekarbela",
    price: "Rp175.000",
    desc: "Mutiara air tawar asli sentra Sekarbela dengan sertifikat keaslian. Pengait perak 925.",
    kategori: "khas_lombok",
    rating: 4.9,
    sold: 89,
    origin: "Sekarbela, Mataram",
    official: false,
    freeShipping: false,
    stock: 12,
  },
  {
    name: "Anyaman Ketak Lombok",
    price: "Rp95.000",
    desc: "Tas anyaman ketak buatan tangan — kuat, tahan air ringan, makin dipakai makin mengilap.",
    kategori: "khas_lombok",
    rating: 4.7,
    sold: 143,
    origin: "Lombok Barat",
    official: false,
    freeShipping: false,
    stock: 22,
  },
  {
    name: "Sambal Kit Lombok",
    price: "Rp65.000",
    oldPrice: "Rp80.000",
    desc: "3 botol sambal khas (taliwang, plecing, beberuk) level pedas pilihan. Tahan 3 bulan tanpa pengawet.",
    kategori: "khas_lombok",
    rating: 4.8,
    sold: 276,
    origin: "Mataram",
    official: false,
    freeShipping: true,
    stock: 35,
  },
  {
    name: "Kopi Sembalun",
    price: "Rp55.000",
    desc: "Robusta 200g dari kebun kaki Rinjani, sangrai medium. Pilihan biji utuh atau bubuk.",
    kategori: "khas_lombok",
    rating: 4.8,
    sold: 198,
    origin: "Sembalun, Lombok Timur",
    official: false,
    freeShipping: true,
    stock: 40,
  },
];

export const ALL_PRODUCTS: Product[] = [...TRAVEL_GEAR, ...KHAS_LOMBOK];

// Diskon % dari harga coret ("Rp89.000", "Rp120.000") → 26
export function discountPct(p: Product): number | null {
  if (!p.oldPrice) return null;
  const n = (s: string) => parseInt(s.replace(/\D/g, ""), 10);
  return Math.round((1 - n(p.price) / n(p.oldPrice)) * 100);
}

// "Terjual 276" / "Terjual 100+" ala marketplace
export function soldLabel(sold: number): string {
  if (sold >= 100) return `${Math.floor(sold / 100) * 100}+ terjual`;
  return `${sold} terjual`;
}
