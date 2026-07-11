import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-24 text-center">
      <p className="text-7xl font-extrabold text-primary/20">404</p>
      <h1 className="mt-4 text-3xl font-bold text-ink">
        Waduh, halaman ini tersesat
      </h1>
      <p className="mx-auto mt-3 max-w-md text-muted">
        Sepertinya tempat yang kamu cari tidak ada di peta kami. Yuk kembali
        dan temukan destinasi lain.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">
          Kembali ke Beranda
        </Link>
        <Link href="/jelajah" className="btn-outline">
          Jelajahi Tempat
        </Link>
      </div>
    </div>
  );
}
