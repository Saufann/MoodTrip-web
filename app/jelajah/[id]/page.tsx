import Link from "next/link";
import { notFound } from "next/navigation";
import { SPOTS } from "@/lib/spots";
import { spotImage } from "@/lib/images";
import SpotCard from "@/components/SpotCard";
import WishlistButton from "@/components/WishlistButton";

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

  const related = SPOTS.filter(
    (s) =>
      s.id !== spot.id &&
      (s.category === spot.category ||
        s.tags.some((t) => spot.tags.includes(t)))
  ).slice(0, 3);

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

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.15fr,1fr]">
        {/* Foto */}
        <div className="relative overflow-hidden rounded-[2rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={spotImage(spot.id)}
            alt={spot.name}
            className="h-72 w-full object-cover sm:h-[26rem]"
          />
          <span className="chip absolute left-4 top-4 bg-white/90 font-semibold text-ink shadow-soft backdrop-blur">
            {spot.category}
          </span>
          <span className="chip absolute right-4 top-4 bg-black/45 font-semibold text-white backdrop-blur">
            ★ {spot.rating}
          </span>
        </div>

        {/* Info */}
        <div>
          <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">
            {spot.name}
          </h1>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
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
            {spot.location}
          </p>

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

          <div className="mt-5 flex flex-wrap gap-1.5">
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
          </div>
        </div>
      </div>

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
