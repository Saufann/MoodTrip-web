import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kuliner Lombok",
  description: "Menu dan ketersediaan kuliner khas Lombok, langsung dari mitra.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
