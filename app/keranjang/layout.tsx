import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keranjang",
  description: "Keranjang belanja aksesoris MoodTrip.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
