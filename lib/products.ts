// Data produk aksesoris & oleh-oleh. Nanti dari tabel `products` di Supabase.

export type Product = {
  name: string;
  price: string;
  desc: string;
  kategori: "gear" | "khas_lombok";
};

export const TRAVEL_GEAR: Product[] = [
  { name: "Tumbler MoodTrip", price: "Rp89.000", desc: "Botol minum 750ml, tahan dingin 12 jam", kategori: "gear" },
  { name: "Dry Bag 10L", price: "Rp120.000", desc: "Anti air — aman untuk island hopping", kategori: "gear" },
  { name: "Daypack Lipat 20L", price: "Rp135.000", desc: "Ringan, bisa dilipat sekepal tangan", kategori: "gear" },
  { name: "Tripod Mini HP", price: "Rp95.000", desc: "Buat konten sunset tanpa minta tolong", kategori: "gear" },
  { name: "Power Bank 10.000mAh", price: "Rp180.000", desc: "Dua port, fast charging", kategori: "gear" },
  { name: "Topi Pantai", price: "Rp75.000", desc: "Anyaman ringan, siap golden hour", kategori: "gear" },
];

export const KHAS_LOMBOK: Product[] = [
  { name: "Kain Tenun Sasak", price: "Rp250.000", desc: "Tenun ikat asli Desa Sukarara", kategori: "khas_lombok" },
  { name: "Scarf Tenun Sasak", price: "Rp150.000", desc: "Motif tradisional, cocok buat OOTD", kategori: "khas_lombok" },
  { name: "Gelang Mutiara Sekarbela", price: "Rp175.000", desc: "Mutiara asli sentra Sekarbela, Mataram", kategori: "khas_lombok" },
  { name: "Anyaman Ketak Lombok", price: "Rp95.000", desc: "Tas/keranjang anyaman tangan khas Lombok", kategori: "khas_lombok" },
  { name: "Sambal Kit Lombok", price: "Rp65.000", desc: "Paket sambal khas — level pedas pilihan", kategori: "khas_lombok" },
  { name: "Kopi Sembalun", price: "Rp55.000", desc: "Robusta kaki Rinjani, sangrai medium", kategori: "khas_lombok" },
];

export const ALL_PRODUCTS: Product[] = [...TRAVEL_GEAR, ...KHAS_LOMBOK];
