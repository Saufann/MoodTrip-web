import { MetadataRoute } from "next";
import { SPOTS } from "@/lib/spots";
import { POSTS } from "@/lib/posts";

// TODO: ganti dengan domain aslimu setelah deploy
export const BASE_URL = "https://moodtrip.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/jelajah",
    "/peta",
    "/paket",
    "/kuliner",
    "/aksesoris",
    "/membership",
    "/tes-kepribadian",
    "/tes-kepribadian/diri",
    "/tes-kepribadian/wisata",
    "/mitra",
    "/blog",
    "/faq",
    "/privasi",
    "/tentang",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));

  const spots = SPOTS.map((s) => ({
    url: `${BASE_URL}/jelajah/${s.id}`,
    lastModified: new Date(),
  }));

  const posts = POSTS.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: new Date(),
  }));

  return [...routes, ...spots, ...posts];
}
