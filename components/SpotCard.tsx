import Link from "next/link";
import { Spot } from "@/lib/spots";
import { spotImage } from "@/lib/images";
import WishlistButton from "@/components/WishlistButton";

export default function SpotCard({ spot }: { spot: Spot }) {
  return (
    <article className="group card-hover relative overflow-hidden">
      {/* Link menutupi seluruh kartu */}
      <Link
        href={`/jelajah/${spot.id}`}
        aria-label={`Lihat detail ${spot.name}`}
        className="absolute inset-0 z-10"
      />

      <div className="relative h-48 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={spotImage(spot.id)}
          alt={spot.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
        />
        <span className="chip absolute left-3 top-3 bg-white/90 font-semibold text-ink shadow-soft backdrop-blur">
          {spot.category}
        </span>
        <WishlistButton id={spot.id} className="absolute right-3 top-3 z-20" />
        <span className="absolute bottom-3 left-3 flex items-center gap-1 text-xs font-medium text-white/95">
          <svg
            aria-hidden
            width="12"
            height="12"
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
        </span>
        <span className="chip absolute bottom-3 right-3 bg-black/45 font-semibold text-white backdrop-blur">
          ★ {spot.rating}
        </span>
      </div>

      <div className="p-4">
        <h3 className="font-bold leading-snug text-ink transition-colors group-hover:text-primary">
          {spot.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">
          {spot.uniqueness}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {spot.tags.slice(0, 3).map((t) => (
            <span key={t} className="chip bg-cream text-muted">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <svg
              aria-hidden
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
            {spot.hours}
          </span>
          <span className="font-semibold text-primary">{spot.price}</span>
        </div>
      </div>
    </article>
  );
}
