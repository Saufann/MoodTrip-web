import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Riwayat Pesanan",
  description: "Riwayat pemesanan paket dan belanja aksesorismu.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
