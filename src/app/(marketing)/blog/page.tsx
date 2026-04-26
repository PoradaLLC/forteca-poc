export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, FileText } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Travel tips, vacation guides, and rental insights from Forteca Estate.",
};

interface BlogImage {
  url: string;
  path: string;
}

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  status: string;
  published_at: string | null;
  created_at: string;
  images: BlogImage[] | null;
}

export default async function BlogPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, slug, title, excerpt, status, published_at, created_at, images")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  const blogPosts = (posts ?? []) as BlogPost[];

  function getThumbnail(post: BlogPost): string | null {
    if (post.images && post.images.length > 0) return post.images[0].url;
    return null;
  }

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
            Everything you need to plan the perfect getaway — plus
            insights for property owners and investors.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="bg-forteca-cream px-4 py-16">
        <div className="mx-auto max-w-5xl">
          {blogPosts.length === 0 ? (
            <div className="py-20 text-center">
              <FileText className="mx-auto mb-4 h-12 w-12 text-forteca-navy/20" />
              <h2 className="font-serif text-2xl font-bold text-forteca-navy">
                Coming Soon
              </h2>
              <p className="mt-2 text-forteca-slate">
                We&apos;re working on great content. Check back soon!
              </p>
            </div>
          ) : (
            <>
              {/* Featured (first post) */}
              <Link
                href={`/blog/${blogPosts[0].slug}`}
                className="group mb-12 block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-forteca-navy/5 transition-shadow hover:shadow-md"
              >
                <div
                  className={`relative flex h-64 items-end overflow-hidden p-8 ${
                    !getThumbnail(blogPosts[0])
                      ? "grain bg-gradient-to-br from-forteca-navy via-forteca-navy/90 to-forteca-navy/70"
                      : ""
                  }`}
                >
                  {getThumbnail(blogPosts[0]) && (
                    <>
                      <Image
                        src={getThumbnail(blogPosts[0])!}
                        alt={blogPosts[0].title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 80vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forteca-navy/80 via-forteca-navy/30 to-transparent" />
                    </>
                  )}
                  <div className="relative z-10">
                    <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">
                      {blogPosts[0].title}
                    </h2>
                  </div>
                </div>
                <div className="p-6">
                  {blogPosts[0].excerpt && (
                    <p className="text-forteca-slate">{blogPosts[0].excerpt}</p>
                  )}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-forteca-slate">
                      <span>
                        {formatDate(
                          blogPosts[0].published_at ?? blogPosts[0].created_at
                        )}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-sm font-semibold text-forteca-gold transition-colors group-hover:text-forteca-gold-light">
                      Read more <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>

              {/* Rest of posts */}
              {blogPosts.length > 1 && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {blogPosts.slice(1).map((post) => {
                    const thumb = getThumbnail(post);
                    return (
                      <Link
                        key={post.id}
                        href={`/blog/${post.slug}`}
                        className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-forteca-navy/5 transition-shadow hover:shadow-md"
                      >
                        <div
                          className={`relative h-40 overflow-hidden ${
                            !thumb
                              ? "grain bg-gradient-to-br from-forteca-navy via-forteca-navy/80 to-forteca-navy/60"
                              : ""
                          }`}
                        >
                          {thumb && (
                            <>
                              <Image
                                src={thumb}
                                alt={post.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-forteca-navy/40 to-transparent" />
                            </>
                          )}
                        </div>
                        <div className="p-5">
                          <h3 className="font-serif text-lg font-bold text-forteca-navy transition-colors group-hover:text-forteca-gold">
                            {post.title}
                          </h3>
                          {post.excerpt && (
                            <p className="mt-2 line-clamp-2 text-sm text-forteca-slate">
                              {post.excerpt}
                            </p>
                          )}
                          <div className="mt-4 flex items-center gap-4 text-xs text-forteca-slate">
                            <span>
                              {formatDate(post.published_at ?? post.created_at)}
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
