"use client";

// Slider foto: crossfade otomatis (default tiap 5 detik) + kontrol manual
// (panah & titik). Jeda otomatis saat kursor di atas. Aman dipakai di dalam
// kartu yang bisa diklik — semua kontrol menghentikan propagasi klik.

import { useEffect, useState } from "react";

export default function ImageSlider({
  images,
  alt,
  className = "h-44",
  intervalMs = 5000,
}: {
  images: string[];
  alt: string;
  className?: string;
  intervalMs?: number;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const many = images.length > 1;

  // Ganti otomatis
  useEffect(() => {
    if (!many || paused) return;
    const t = setInterval(
      () => setActive((i) => (i + 1) % images.length),
      intervalMs
    );
    return () => clearInterval(t);
  }, [many, paused, images.length, intervalMs]);

  function go(e: React.MouseEvent, next: number) {
    e.stopPropagation();
    e.preventDefault();
    setActive((next + images.length) % images.length);
  }

  return (
    <div
      className={`group/slider relative w-full overflow-hidden ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Tumpukan foto — crossfade */}
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src + i}
          src={src}
          alt={i === 0 ? alt : ""}
          aria-hidden={i !== active}
          loading={i === 0 ? undefined : "lazy"}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {many && (
        <>
          {/* Panah — muncul saat hover */}
          <button
            type="button"
            aria-label="Foto sebelumnya"
            onClick={(e) => go(e, active - 1)}
            className="absolute left-2 top-1/2 z-10 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur transition-opacity hover:bg-black/60 group-hover/slider:opacity-100"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Foto berikutnya"
            onClick={(e) => go(e, active + 1)}
            className="absolute right-2 top-1/2 z-10 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur transition-opacity hover:bg-black/60 group-hover/slider:opacity-100"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 6 6 6-6 6" />
            </svg>
          </button>

          {/* Titik indikator */}
          <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ke foto ${i + 1}`}
                aria-current={i === active}
                onClick={(e) => go(e, i)}
                className={`h-1.5 rounded-full shadow-soft transition-all ${
                  i === active ? "w-4 bg-white" : "w-1.5 bg-white/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
