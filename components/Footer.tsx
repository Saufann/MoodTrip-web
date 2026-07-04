import Link from "next/link";
import Logo from "@/components/Logo";
import AppDownloadButtons from "@/components/AppDownloadButtons";

const explore = [
  { href: "/jelajah", label: "Jelajah Tempat" },
  { href: "/paket", label: "Paket Wisata" },
  { href: "/kuliner", label: "Kuliner" },
  { href: "/aksesoris", label: "Aksesoris" },
];

const account = [
  { href: "/tes-kepribadian", label: "Tes Kepribadian" },
  { href: "/profil", label: "Profil & Tag" },
  { href: "/membership", label: "Membership" },
  { href: "/masuk", label: "Masuk" },
  { href: "/tentang", label: "Tentang Kami" },
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
          <div className="font-semibold text-white">Kontak</div>
          <ul className="mt-3 space-y-2 text-white/70">
            <li>
              <a
                href="tel:+6285737736349"
                className="transition-colors hover:text-white"
              >
                0857-3773-6349
              </a>
            </li>
            <li>Mataram, Lombok, NTB</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/60">
        © 2026 MoodTrip. Seluruh hak cipta.
      </div>
    </footer>
  );
}
