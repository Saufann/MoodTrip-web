import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aksesoris & Oleh-oleh",
  description: "Travel gear dan kerajinan khas Lombok dari UMKM lokal.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
