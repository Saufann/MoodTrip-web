"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroSearch() {
  const [q, setQ] = useState("");
  const router = useRouter();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    router.push(q.trim() ? `/jelajah?q=${encodeURIComponent(q.trim())}` : "/jelajah");
  }

  return (
    <form
      onSubmit={submit}
      className="mt-8 flex max-w-md items-center gap-3 rounded-full bg-white p-2 pl-5 shadow-card transition-transform focus-within:scale-[1.01]"
    >
      <svg
        aria-hidden
        className="flex-none text-muted"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.5" y2="16.5" />
      </svg>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder='Mau ke mana? Coba "healing" atau "pedas"...'
        aria-label="Cari tempat"
        className="w-full min-w-0 bg-transparent text-sm text-ink outline-none placeholder:text-muted"
      />
      <button type="submit" className="btn-primary flex-none px-5 py-2.5 text-sm">
        Jelajahi
      </button>
    </form>
  );
}
