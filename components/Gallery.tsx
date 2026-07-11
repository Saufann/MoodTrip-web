"use client";

import { useState } from "react";

export default function Gallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="overflow-hidden rounded-[2rem]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={active}
          src={images[active]}
          alt={`${alt} — foto ${active + 1}`}
          className="h-72 w-full animate-fade-up object-cover sm:h-[24rem]"
        />
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              aria-label={`Lihat foto ${i + 1}`}
              aria-current={i === active}
              onClick={() => setActive(i)}
              className={`h-20 w-28 flex-none overflow-hidden rounded-xl border-2 transition-all ${
                i === active
                  ? "border-primary opacity-100"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
