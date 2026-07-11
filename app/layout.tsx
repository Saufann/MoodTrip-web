import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";

export const metadata: Metadata = {
  metadataBase: new URL("https://moodtrip.vercel.app"), // TODO: ganti domain
  title: {
    default: "MoodTrip — Wisata Lombok Sesuai Kepribadianmu",
    template: "%s — MoodTrip",
  },
  description:
    "Ikuti tes kepribadian MoodTrip dan dapatkan rekomendasi paket wisata, aksesoris, dan kuliner Lombok yang pas untukmu.",
  openGraph: {
    title: "MoodTrip — Wisata Lombok Sesuai Kepribadianmu",
    description:
      "Rekomendasi wisata Lombok yang disesuaikan dengan mood dan kepribadianmu.",
    images: ["/images/og.png"],
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <AnnouncementBar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
