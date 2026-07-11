// Data resto/kuliner mitra. Nanti dari tabel `restos` + `menu_items` di Supabase.
// isOpen = kondisi real buka/tutup yang diubah admin/mitra (bukan jadwal).

import { SPOTS } from "@/lib/spots";

export type MenuItem = { name: string; price: string; ready: boolean };

export type Resto = {
  id: number;
  name: string;
  location: string;
  hours: string;
  about: string;
  isOpen: boolean;
  lat: number;
  lng: number;
  menu: MenuItem[];
};

// Hubungan resto ↔ spot (nama sama = tempat yang sama)
export function spotIdForResto(resto: Resto): number | undefined {
  return SPOTS.find((s) => s.name === resto.name)?.id;
}

export function restoForSpotName(spotName: string): Resto | undefined {
  return RESTOS.find((r) => r.name === spotName);
}

export const RESTOS: Resto[] = [
  {
    id: 1,
    name: "Warung Ayam Taliwang",
    location: "Mataram",
    hours: "10.00 - 22.00",
    about:
      "Warung legendaris dengan ayam kampung bakar bumbu taliwang asli. Level pedas bisa diminta dari ringan sampai ekstrem.",
    isOpen: true,
    lat: -8.5908,
    lng: 116.1203,
    menu: [
      { name: "Ayam Taliwang (pedas)", price: "Rp45.000", ready: true },
      { name: "Plecing Kangkung", price: "Rp15.000", ready: true },
      { name: "Beberuk Terong", price: "Rp12.000", ready: false },
      { name: "Es Kelapa Muda", price: "Rp10.000", ready: true },
    ],
  },
  {
    id: 2,
    name: "Nasi Balap Puyung",
    location: "Lombok Tengah",
    hours: "08.00 - 21.00",
    about:
      "Nasi balap khas Desa Puyung: ayam suwir pedas, kering kentang, dan bumbu gurih yang bikin nambah.",
    isOpen: true,
    lat: -8.7221,
    lng: 116.2702,
    menu: [
      { name: "Nasi Balap Komplit", price: "Rp25.000", ready: true },
      { name: "Ayam Suwir Pedas", price: "Rp18.000", ready: true },
      { name: "Kering Kentang", price: "Rp10.000", ready: false },
    ],
  },
  {
    id: 3,
    name: "Kafe Ampenan Heritage",
    location: "Kota Tua Ampenan",
    hours: "10.00 - 22.00",
    about:
      "Kafe bernuansa kolonial di kota tua Ampenan. Kopi Lombok single origin dan spot foto vintage di setiap sudut.",
    isOpen: false,
    lat: -8.5679,
    lng: 116.0729,
    menu: [
      { name: "Kopi Lombok", price: "Rp22.000", ready: true },
      { name: "Croissant", price: "Rp28.000", ready: true },
      { name: "Matcha Latte", price: "Rp30.000", ready: false },
    ],
  },
];
