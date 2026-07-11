import Link from "next/link";
import { notFound } from "next/navigation";
import { SPOTS } from "@/lib/spots";
import { spotDetail } from "@/lib/details";
import { restoForSpotName } from "@/lib/kuliner";
import { WHATSAPP } from "@/lib/store";
import SpotCard from "@/components/SpotCard";
import WishlistButton from "@/components/WishlistButton";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import ShareButtons from "@/components/ShareButtons";

export function generateStaticParams() {
  return SPOTS.map((s) => ({ id: String(s.id) }));
}

export default function SpotDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const spot = SPOTS.find((s) => s.id === Number(params.id));
  if (!spot) notFound();

  const detail = spotDetail(spot.id);
  const resto = restoForSpotName(spot.name); // spot ini juga resto mitra?

  const related = SPOTS.filter(
    (s) =>
      s.id !== spot.id &&
      (s.category === spot.category ||
        s.tags.some((t) => spot.tags.includes(t)))
  ).slice(0, 3);

  // Kuliner & kafe di sekitar (selain spot ini sendiri)
  const kulinerSekitar = SPOTS.filter(
    (s) =>
      s.id !== spot.id &&
      (s.category.toLowerCase().includes("kuliner") ||
        s.category.toLowerCase().includes("kafe"))
  ).slice(0, 3);

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${spot.name} ${spot.location}`
  )}`;

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted" aria-label="Breadcrumb">
        <Link href="/jelajah" className="hover:text-primary">
          Jelajah
        </Link>{" "}
        <span aria-hidden>/</span>{" "}
        <span className="font-medium text-ink">{spot.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr,1fr]">
        {/* Galeri */}
        <Gallery images={detail.gallery} alt={spot.name} />

        {/* Info utama */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip bg-primary/10 font-semibold text-primary">
              {spot.category}
            </span>
            <span className="chip bg-accent/10 font-semibold text-accent">
              ★ {spot.rating}
            </span>
          </div>
          <h1 className="mt-3 text-3xl font-extrabold text-ink sm:text-4xl">
            {spot.name}
          </h1>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-primary"
          >
            <svg
              aria-hidden
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {spot.location} · <span className="underline">Buka di Maps</span>
          </a>

          <p className="mt-5 leading-relaxed text-ink/85">{spot.description}</p>
          <p className="mt-3 leading-relaxed text-muted">{spot.uniqueness}</p>

          <dl className="mt-6 grid grid-cols-2 gap-3">
            <div className="card p-4">
              <dt className="text-xs uppercase tracking-wide text-muted">
                Harga masuk
              </dt>
              <dd className="mt-1 font-bold text-primary">{spot.price}</dd>
            </div>
            <div className="card p-4">
              <dt className="text-xs uppercase tracking-wide text-muted">
                Jam buka
              </dt>
              <dd className="mt-1 font-bold text-ink">{spot.hours}</dd>
            </div>
          </dl>

          {/* Fasilitas */}
          <h2 className="mt-6 font-bold text-ink">Fasilitas</h2>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {detail.fasilitas.map((f) => (
              <span key={f} className="chip bg-cream text-ink/80">
                ✓ {f}
              </span>
            ))}
          </div>

          {/* Tags */}
          <h2 className="mt-5 font-bold text-ink">Tag</h2>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {spot.tags.map((t) => (
              <Link
                key={t}
                href="/jelajah"
                className="chip bg-cream text-muted transition-colors hover:bg-primary/10 hover:text-primary"
              >
                #{t}
              </Link>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <WishlistButton id={spot.id} size="lg" />
            <Link href="/paket" className="btn-accent">
              Lihat Paket Terkait
            </Link>
            <ShareButtons title={spot.name} />
          </div>
        </div>
      </div>

      {/* Menu & ketersediaan (bila spot ini resto mitra) */}
      {resto && (
        <section className="mt-16">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-extrabold text-ink">
              Menu &amp; Ketersediaan
            </h2>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                resto.isOpen
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-600"
              }`}
            >
              <span
                aria-hidden
                className={`h-2 w-2 rounded-full ${
                  resto.isOpen ? "bg-green-500" : "bg-red-500"
                }`}
              />
              {resto.isOpen ? "Buka sekarang" : "Sedang tutup"}
            </span>
          </div>
          <div className="mt-5 max-w-xl rounded-3xl border border-line bg-white p-6 shadow-soft">
            <ul className="divide-y divide-line">
              {resto.menu.map((m) => (
                <li
                  key={m.name}
                  className="flex items-center justify-between py-2.5"
                >
                  <div className={m.ready ? "" : "opacity-40"}>
                    <div className="text-sm font-medium text-ink">
                      {m.name}
                    </div>
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
            <a
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
                `Halo MoodTrip! Saya mau tanya/order dari ${resto.name}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn mt-5 w-full bg-[#25D366] text-white hover:brightness-105"
            >
              Tanya / Order via WhatsApp
            </a>
            <p className="mt-2 text-center text-xs text-muted">
              Status diperbarui langsung oleh mitra.
            </p>
          </div>
        </section>
      )}

      {/* Kuliner di sekitar */}
      {kulinerSekitar.length > 0 && (
        <section className="mt-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-ink">
                Kuliner di sekitar
              </h2>
              <p className="mt-1 text-sm text-muted">
                Isi perut sebelum atau sesudah ke {spot.name}.
              </p>
            </div>
            <Link
              href="/kuliner"
              className="whitespace-nowrap text-sm font-semibold text-primary hover:underline"
            >
              Semua kuliner →
            </Link>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {kulinerSekitar.map((s) => (
              <SpotCard key={s.id} spot={s} />
            ))}
          </div>
        </section>
      )}

      {/* Review */}
      <Reviews spotId={spot.id} seed={detail.reviews} />

      {/* Spot terkait */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-extrabold text-ink">
            Tempat serupa yang mungkin kamu suka
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s) => (
              <SpotCard key={s.id} spot={s} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
