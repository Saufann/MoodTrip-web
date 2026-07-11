import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paket Wisata",
  description: "Paket wisata Lombok dari mitra lokal tepercaya, dikurasi sesuai persona.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
