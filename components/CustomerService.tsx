"use client";

// Tombol customer service melayang di kanan bawah (global, dari layout).
import { useState } from "react";
import Link from "next/link";
import { WHATSAPP } from "@/lib/store";

export default function CustomerService() {
  const [open, setOpen] = useState(false);

  const waHref = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    "Halo MoodTrip! Saya butuh bantuan."
  )}`;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {/* Panel kecil */}
      {open && (
        <div className="w-72 animate-fade-up rounded-3xl border border-line bg-white p-5 shadow-card">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 flex-none place-items-center rounded-full bg-primary/10 text-xl">
              👋
            </div>
            <div>
              <p className="font-bold text-ink">Butuh bantuan?</p>
              <p className="text-xs text-muted">
                Tim MoodTrip siap bantu, 08.00–22.00 WITA.
              </p>
            </div>
          </div>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn mt-4 w-full bg-[#25D366] py-2.5 text-sm text-white hover:brightness-105"
          >
            <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.4 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.4-.7-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.5-1.1-2.9s.7-2 .9-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.4l.9 2.1c.1.2.1.4 0 .6l-.4.6-.5.5c-.2.2-.3.3-.1.6.2.3.8 1.4 1.8 2.2 1.2 1.1 2.3 1.4 2.6 1.6.3.1.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.3.1.2.1.7-.2 1.3Z" />
            </svg>
            Chat via WhatsApp
          </a>
          <Link
            href="/faq"
            onClick={() => setOpen(false)}
            className="btn-outline mt-2 w-full py-2.5 text-sm"
          >
            Lihat FAQ
          </Link>
        </div>
      )}

      {/* Tombol bulat */}
      <button
        type="button"
        aria-label={open ? "Tutup bantuan" : "Buka bantuan customer service"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className={`grid h-14 w-14 place-items-center rounded-full text-white shadow-card transition-all hover:scale-105 ${
          open ? "bg-ink" : "bg-primary hover:bg-primary-dark"
        }`}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="5" y1="5" x2="19" y2="19" />
            <line x1="19" y1="5" x2="5" y2="19" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12a8 8 0 0 1-8 8H5l-2 2V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8Z" />
            <path d="M9 11h.01M12.5 11h.01M16 11h.01" />
          </svg>
        )}
      </button>
    </div>
  );
}
