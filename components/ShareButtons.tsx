"use client";

import { useState } from "react";

export default function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  function currentUrl() {
    return typeof window !== "undefined" ? window.location.href : "";
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(currentUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // fallback: seleksi manual tidak diperlukan; abaikan
    }
  }

  function shareWa() {
    const text = encodeURIComponent(`Cek ${title} di MoodTrip! ${currentUrl()}`);
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener");
  }

  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={shareWa}
        aria-label="Bagikan ke WhatsApp"
        className="btn border border-line bg-white py-2.5 text-sm text-ink hover:border-[#25D366] hover:text-[#25D366]"
      >
        <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.4 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.4-.7-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.5-1.1-2.9s.7-2 .9-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.4l.9 2.1c.1.2.1.4 0 .6l-.4.6-.5.5c-.2.2-.3.3-.1.6.2.3.8 1.4 1.8 2.2 1.2 1.1 2.3 1.4 2.6 1.6.3.1.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.3.1.2.1.7-.2 1.3Z" />
        </svg>
        Bagikan
      </button>
      <button
        type="button"
        onClick={copy}
        aria-label="Salin tautan"
        className="btn border border-line bg-white py-2.5 text-sm text-ink hover:border-primary hover:text-primary"
      >
        {copied ? "✓ Tersalin" : "🔗 Salin Link"}
      </button>
    </div>
  );
}
