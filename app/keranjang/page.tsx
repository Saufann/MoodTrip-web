"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CartItem,
  getCart,
  setCartQty,
  clearCart,
  formatRp,
  STORE_EVENT,
  WHATSAPP,
} from "@/lib/store";

export default function KeranjangPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const update = () => setItems(getCart());
    update();
    setReady(true);
    window.addEventListener(STORE_EVENT, update);
    return () => window.removeEventListener(STORE_EVENT, update);
  }, []);

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const waText = encodeURIComponent(
    `Halo MoodTrip! Saya ingin memesan aksesoris:\n\n` +
      items.map((i) => `• ${i.name} x${i.qty} — ${formatRp(i.price * i.qty)}`).join("\n") +
      `\n\nTotal: ${formatRp(total)}\n\nMohon info cara pembayaran & pengiriman. Terima kasih!`
  );

  if (!ready) return <div className="min-h-[50vh]" />;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-20 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-cream text-3xl">
          🛒
        </div>
        <h1 className="mt-5 text-2xl font-bold text-ink">
          Keranjangmu masih kosong
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-muted">
          Yuk lihat aksesoris travel yang cocok buat tripmu ke Lombok.
        </p>
        <Link href="/aksesoris" className="btn-primary mt-6">
          Belanja Aksesoris
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <div className="flex items-end justify-between">
        <h1 className="text-3xl font-bold text-ink">Keranjang</h1>
        <button
          onClick={clearCart}
          className="text-sm text-muted hover:text-accent"
        >
          Kosongkan
        </button>
      </div>

      <ul className="mt-6 divide-y divide-line rounded-3xl border border-line bg-white px-6 shadow-soft">
        {items.map((i) => (
          <li key={i.name} className="flex items-center gap-4 py-4">
            <div className="flex-1">
              <div className="font-semibold text-ink">{i.name}</div>
              <div className="text-sm text-muted">{formatRp(i.price)}</div>
            </div>
            <div className="flex items-center gap-2">
              <QtyBtn label="Kurangi" onClick={() => setCartQty(i.name, i.qty - 1)}>
                −
              </QtyBtn>
              <span className="w-8 text-center font-semibold text-ink">
                {i.qty}
              </span>
              <QtyBtn label="Tambah" onClick={() => setCartQty(i.name, i.qty + 1)}>
                +
              </QtyBtn>
            </div>
            <div className="w-24 text-right font-bold text-primary">
              {formatRp(i.price * i.qty)}
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 rounded-3xl border border-line bg-white p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <span className="text-muted">Total</span>
          <span className="text-2xl font-extrabold text-ink">
            {formatRp(total)}
          </span>
        </div>
        <a
          href={`https://wa.me/${WHATSAPP}?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn mt-5 w-full bg-[#25D366] text-white hover:brightness-105"
        >
          Checkout via WhatsApp
        </a>
        <p className="mt-3 text-center text-xs text-muted">
          Pembayaran online (Midtrans/Stripe) akan aktif setelah integrasi
          disambungkan.
        </p>
      </div>
    </div>
  );
}

function QtyBtn({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid h-8 w-8 place-items-center rounded-full border border-line text-ink transition-colors hover:border-primary hover:text-primary"
    >
      {children}
    </button>
  );
}
