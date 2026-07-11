import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Tempat-tempat yang kamu simpan untuk trip berikutnya.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
