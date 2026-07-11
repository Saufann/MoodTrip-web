import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Itinerary Saya",
  description: "Susun rencana perjalanan Lombok harianmu.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
