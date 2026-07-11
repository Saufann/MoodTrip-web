import type { Metadata } from "next";
import Link from "next/link";
import { POSTS } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Cerita, panduan, dan tips wisata Lombok dari tim MoodTrip.",
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <span className="chip bg-primary/10 font-semibold text-primary">
        Blog
      </span>
      <h1 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
        Cerita &amp; Panduan Lombok
      </h1>
      <p className="mt-2 max-w-xl text-muted">
        Ditulis oleh orang-orang yang benar-benar tinggal dan makan pedas di
        sini.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {POSTS.map((post) => (
          <article key={post.slug} className="group card-hover relative overflow-hidden">
            <Link
              href={`/blog/${post.slug}`}
              aria-label={post.title}
              className="absolute inset-0 z-10"
            />
            <div className="h-44 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.cover}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <p className="text-xs text-muted">
                {post.date} · {post.readMinutes} menit baca
              </p>
              <h2 className="mt-2 text-lg font-bold leading-snug text-ink transition-colors group-hover:text-primary">
                {post.title}
              </h2>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                {post.excerpt}
              </p>
              <span className="mt-3 inline-block text-sm font-semibold text-primary">
                Baca selengkapnya →
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
