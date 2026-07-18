import Link from "next/link";
import Logo from "@/components/Logo";
import AppDownloadButtons from "@/components/AppDownloadButtons";

const explore = [
  { href: "/jelajah", label: "Jelajah Tempat" },
  { href: "/peta", label: "Peta Wisata" },
  { href: "/paket", label: "Paket Wisata" },
  { href: "/kuliner", label: "Kuliner" },
  { href: "/aksesoris", label: "Aksesoris & Oleh-oleh" },
  { href: "/blog", label: "Blog" },
];

const account = [
  { href: "/tes-kepribadian", label: "Tes Kepribadian" },
  { href: "/profil", label: "Profil & Tag" },
  { href: "/itinerary", label: "Itinerary Saya" },
  { href: "/pesanan", label: "Riwayat Pesanan" },
  { href: "/membership", label: "Membership" },
  { href: "/masuk", label: "Masuk" },
];

const bantuan = [
  { href: "/faq", label: "FAQ" },
  { href: "/mitra", label: "Mitra Lokal" },
  { href: "/tentang", label: "Tentang Kami" },
  { href: "/privasi", label: "Kebijakan Privasi" },
];

export default function Footer() {
  return (
    <footer className="mt-20 bg-primary-dark text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo light />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            Temukan pengalaman wisata Mataram &amp; Lombok sesuai mood dan
            kepribadianmu.
          </p>
          <AppDownloadButtons light className="mt-5" />
        </div>

        <nav aria-label="Jelajahi" className="text-sm">
          <div className="font-semibold text-white">Jelajahi</div>
          <ul className="mt-3 space-y-2">
            {explore.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-white/70 transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Akun" className="text-sm">
          <div className="font-semibold text-white">MoodTrip</div>
          <ul className="mt-3 space-y-2">
            {account.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-white/70 transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-sm">
          <div className="font-semibold text-white">Bantuan</div>
          <ul className="mt-3 space-y-2">
            {bantuan.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-white/70 transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="tel:+6281558024800"
                className="text-white/70 transition-colors hover:text-white"
              >
                0815-5802-4800
              </a>
            </li>
            <li className="text-white/70">Mataram, Lombok, NTB</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/60">
        © 2026 MoodTrip. Seluruh hak cipta.
      </div>
    </footer>
  );
}
