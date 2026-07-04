// Katalog kuliner: lihat menu + status ketersediaan (Ready/Habis).
// TIDAK ada pemesanan — hanya melihat. Mitra yang mengatur ketersediaan.
// Fitur ini yang sulit dibuat di Wix; di sini jadi sederhana.

import { restoImage } from "@/lib/images";

type MenuItem = { name: string; price: string; ready: boolean };
type Resto = { name: string; location: string; emoji: string; menu: MenuItem[] };

const RESTOS: Resto[] = [
  {
    name: "Warung Ayam Taliwang",
    location: "Mataram",
    emoji: "🍗",
    menu: [
      { name: "Ayam Taliwang (pedas)", price: "Rp45.000", ready: true },
      { name: "Plecing Kangkung", price: "Rp15.000", ready: true },
      { name: "Beberuk Terong", price: "Rp12.000", ready: false },
      { name: "Es Kelapa Muda", price: "Rp10.000", ready: true },
    ],
  },
  {
    name: "Nasi Balap Puyung",
    location: "Lombok Tengah",
    emoji: "🍚",
    menu: [
      { name: "Nasi Balap Komplit", price: "Rp25.000", ready: true },
      { name: "Ayam Suwir Pedas", price: "Rp18.000", ready: true },
      { name: "Kering Kentang", price: "Rp10.000", ready: false },
    ],
  },
  {
    name: "Kafe Ampenan Heritage",
    location: "Kota Tua Ampenan",
    emoji: "☕",
    menu: [
      { name: "Kopi Lombok", price: "Rp22.000", ready: true },
      { name: "Croissant", price: "Rp28.000", ready: true },
      { name: "Matcha Latte", price: "Rp30.000", ready: false },
    ],
  },
];

export default function KulinerPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-3xl font-bold text-ink sm:text-4xl">Kuliner Lombok</h1>
      <p className="mt-2 text-muted">
        Lihat menu dan yang sedang tersedia. Status diperbarui oleh mitra.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {RESTOS.map((r) => (
          <section key={r.name} className="group card-hover overflow-hidden">
            <div className="relative h-36 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={restoImage(r.name)}
                alt={r.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"
              />
              <div className="absolute bottom-3 left-4 right-4">
                <h3 className="font-bold text-white">{r.name}</h3>
                <p className="text-xs text-white/80">{r.location}</p>
              </div>
            </div>
            <div className="p-5 pt-2">
              <ul className="divide-y divide-line">
              {r.menu.map((m) => (
                <li
                  key={m.name}
                  className="flex items-center justify-between py-2"
                >
                  <div className={m.ready ? "" : "opacity-40"}>
                    <div className="text-sm font-medium text-ink">{m.name}</div>
                    <div className="text-xs text-muted">{m.price}</div>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      m.ready
                        ? "bg-primary/10 text-primary"
                        : "bg-line text-muted"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`h-1.5 w-1.5 rounded-full ${
                        m.ready ? "bg-primary" : "bg-muted/60"
                      }`}
                    />
                    {m.ready ? "Ready" : "Habis"}
                  </span>
                </li>
              ))}
              </ul>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
