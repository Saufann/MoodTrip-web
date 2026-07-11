import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jelajah Lombok",
  description: "Cari 20 tempat wisata Lombok berdasarkan mood, tag, dan kata kunci.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
