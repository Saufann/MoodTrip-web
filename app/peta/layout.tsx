import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peta Wisata",
  description: "Semua spot wisata Lombok dalam satu peta interaktif.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
