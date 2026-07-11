"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import { wishlistCount, cartCount, STORE_EVENT } from "@/lib/store";
import { useUser } from "@/components/useUser";

const links = [
  { href: "/jelajah", label: "Jelajah" },
  { href: "/peta", label: "Peta" },
  { href: "/paket", label: "Paket Wisata" },
  { href: "/aksesoris", label: "Aksesoris" },
  { href: "/kuliner", label: "Kuliner" },
  { href: "/membership", label: "Membership" },
  { href: "/tentang", label: "Tentang" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [wish, setWish] = useState(0);
  const [cart, setCart] = useState(0);

  useEffect(() => {
    const update = () => {
      setWish(wishlistCount());
      setCart(cartCount());
    };
    update();
    window.addEventListener(STORE_EVENT, update);
    return () => window.removeEventListener(STORE_EVENT, update);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-white/85 shadow-soft backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <div onClick={() => setOpen(false)}>
          <Logo />
        </div>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const active = pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                  active
                    ? "bg-primary/10 font-semibold text-primary"
                    : "text-ink hover:bg-primary/5 hover:text-primary"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <IconLink
            href="/wishlist"
            label="Wishlist"
            count={wish}
            active={pathname.startsWith("/wishlist")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3.4 1-4.5 2.5C10.9 4 9.3 3 7.5 3A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7 7-7Z" />
            </svg>
          </IconLink>
          <IconLink
            href="/profil"
            label="Profil"
            count={0}
            active={pathname.startsWith("/profil")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
            </svg>
          </IconLink>
          <IconLink
            href="/keranjang"
            label="Keranjang"
            count={cart}
            active={pathname.startsWith("/keranjang")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1.5" />
              <circle cx="19" cy="21" r="1.5" />
              <path d="M2 3h3l2.7 12.4a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L23 7H6" />
            </svg>
          </IconLink>
          {!user && (
            <Link
              href="/masuk"
              className="hidden text-sm font-medium text-primary hover:underline sm:block"
            >
              Masuk
            </Link>
          )}
          <Link
            href="/tes-kepribadian"
            className="hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-glow sm:block"
          >
            Tes Kepribadian
          </Link>

          {/* Tombol menu mobile */}
          <button
            type="button"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink lg:hidden"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            >
              {open ? (
                <>
                  <line x1="5" y1="5" x2="19" y2="19" />
                  <line x1="19" y1="5" x2="5" y2="19" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      {open && (
        <div className="border-t border-line bg-white px-5 pb-5 pt-2 lg:hidden">
          <div className="flex flex-col">
            {links.map((l) => {
              const active = pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-3 py-2.5 text-sm ${
                    active
                      ? "bg-primary/10 font-semibold text-primary"
                      : "text-ink hover:bg-primary/5"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
          <Link
            href="/profil"
            onClick={() => setOpen(false)}
            className={`rounded-xl px-3 py-2.5 text-sm ${
              pathname.startsWith("/profil")
                ? "bg-primary/10 font-semibold text-primary"
                : "text-ink hover:bg-primary/5"
            }`}
          >
            Profil &amp; Tag
          </Link>
          <div className="mt-3 flex gap-3">
            <Link
              href="/tes-kepribadian"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-full bg-primary px-4 py-2.5 text-center text-sm font-semibold text-white"
            >
              Tes Kepribadian
            </Link>
            <Link
              href="/masuk"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-full border border-primary px-4 py-2.5 text-center text-sm font-semibold text-primary"
            >
              Masuk
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function IconLink({
  href,
  label,
  count,
  active,
  children,
}: {
  href: string;
  label: string;
  count: number;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={`${label}${count > 0 ? ` (${count})` : ""}`}
      className={`relative grid h-10 w-10 place-items-center rounded-full transition-colors ${
        active
          ? "bg-primary/10 text-primary"
          : "text-ink hover:bg-primary/5 hover:text-primary"
      }`}
    >
      {children}
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-accent px-1 text-[10px] font-bold leading-none text-white">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Link>
  );
}
