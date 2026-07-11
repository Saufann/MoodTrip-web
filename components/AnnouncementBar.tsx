"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ANNOUNCEMENT } from "@/lib/config";

const DISMISS_KEY = "moodtrip_announce_dismissed";

export default function AnnouncementBar() {
  // Mulai tersembunyi agar tidak berkedip saat cek localStorage
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Kunci hilang bila teks pengumuman berubah — promo baru tampil lagi
    setVisible(localStorage.getItem(DISMISS_KEY) !== ANNOUNCEMENT.text);
  }, []);

  if (!ANNOUNCEMENT.enabled || !visible) return null;

  return (
    <div className="relative bg-accent px-10 py-2 text-center text-sm font-medium text-white">
      {ANNOUNCEMENT.text}{" "}
      <Link href={ANNOUNCEMENT.href} className="underline underline-offset-2">
        {ANNOUNCEMENT.cta}
      </Link>
      <button
        type="button"
        aria-label="Tutup pengumuman"
        onClick={() => {
          localStorage.setItem(DISMISS_KEY, ANNOUNCEMENT.text);
          setVisible(false);
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
      >
        ✕
      </button>
    </div>
  );
}
