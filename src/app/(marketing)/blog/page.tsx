import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { blogPosts } from "@/lib/mock-blog";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Travel tips, Pocono guides, and vacation rental insights from Forteca Estate.",
};

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="grain bg-forteca-navy px-4 pb-16 pt-14">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-forteca-gold">
            From the Forteca Blog
          </p>
          <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl">
            Stories, Tips & Guides
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/50">
            Everything you need to plan the perfect Pocono getaway — plus
            insights for property owners and investors.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="bg-forteca-cream px-4 py-16">
        <div className="mx-auto max-w-5xl">
          {/* Featured (first post) */}
          {blogPosts.length > 0 && (
            <Link
              href={`/blog/${blogPosts[0].slug}`}
              className="group mb-12 block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-forteca-navy/5 transition-shadow hover:shadow-md"
            >
              <div
                className={`grain flex h-64 items-end bg-gradient-to-br ${blogPosts[0].coverGradient} p-8`}
              >
                <div>
                  <div className="mb-2 flex gap-2">
                    {blogPosts[0].tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">
                    {blogPosts[0].title}
                  </h2>
                </div>
              </div>
              <div className="p-6">
                <p className="text-forteca-slate">{blogPosts[0].excerpt}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-forteca-slate">
                    <span>{formatDate(blogPosts[0].publishedAt)}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {blogPosts[0].readTime} min read
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-sm font-semibold text-forteca-gold transition-colors group-hover:text-forteca-gold-light">
                    Read more <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Rest of posts */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.slice(1).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-forteca-navy/5 transition-shadow hover:shadow-md"
              >
                <div
                  className={`grain flex h-40 items-end bg-gradient-to-br ${post.coverGradient} p-5`}
                >
                  <div className="flex gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-bold text-forteca-navy group-hover:text-forteca-gold transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-forteca-slate line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-forteca-slate">
                    <span>{formatDate(post.publishedAt)}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime} min
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
