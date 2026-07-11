import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS } from "@/lib/posts";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = POSTS.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: [post.cover] },
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const others = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <article className="mx-auto max-w-3xl px-5 py-12">
      <nav className="text-sm text-muted" aria-label="Breadcrumb">
        <Link href="/blog" className="hover:text-primary">
          Blog
        </Link>{" "}
        <span aria-hidden>/</span>{" "}
        <span className="font-medium text-ink">{post.title}</span>
      </nav>

      <h1 className="mt-5 text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
        {post.title}
      </h1>
      <p className="mt-3 text-sm text-muted">
        {post.date} · {post.readMinutes} menit baca · Tim MoodTrip
      </p>

      <div className="mt-6 overflow-hidden rounded-[2rem]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={post.cover} alt="" className="h-64 w-full object-cover sm:h-80" />
      </div>

      <div className="mt-8 space-y-5 leading-relaxed text-ink/85">
        {post.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <div className="mt-10 rounded-2xl bg-cream p-6 text-center">
        <p className="font-semibold text-ink">
          Mau itinerary yang menyesuaikan kepribadianmu?
        </p>
        <Link href="/tes-kepribadian" className="btn-primary mt-4">
          Ikuti Tes MoodTrip
        </Link>
      </div>

      {others.length > 0 && (
        <section className="mt-12 border-t border-line pt-8">
          <h2 className="font-bold text-ink">Baca juga</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {others.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="card-hover p-5"
              >
                <p className="text-xs text-muted">{p.date}</p>
                <h3 className="mt-1 font-bold leading-snug text-ink">
                  {p.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
