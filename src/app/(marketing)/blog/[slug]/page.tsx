export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import { BlogImageGallery } from "./BlogImageGallery";
import { JsonLd } from "@/components/JsonLd";

interface BlogImage {
  url: string;
  path: string;
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("slug")
      .eq("status", "published");
    return (data ?? []).map((post: { slug: string }) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("title, excerpt, images")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!post) return {};
  const images = (post.images as BlogImage[] | null) ?? [];
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: images.length > 0 ? { images: [{ url: images[0].url }] } : undefined,
    alternates: { canonical: `/blog/${slug}` },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, content, published_at, created_at, images")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!post) notFound();

  const images = (post.images as BlogImage[] | null) ?? [];
  // Normalize line endings (browsers may send \r\n) then split on blank lines
  const normalized = post.content.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const paragraphs: string[] = normalized.split(/\n{2,}/).filter(Boolean);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt ?? undefined,
          datePublished: post.published_at ?? post.created_at,
          author: { "@type": "Organization", name: "Forteca Estate" },
          publisher: {
            "@type": "Organization",
            name: "Forteca Estate",
            url: "https://fortecaestate.com",
          },
          image: images.length > 0 ? images[0].url : undefined,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://fortecaestate.com" },
            { "@type": "ListItem", position: 2, name: "Blog", item: "https://fortecaestate.com/blog" },
            { "@type": "ListItem", position: 3, name: post.title },
          ],
        }}
      />

      {/* Hero */}
      <div className="grain bg-gradient-to-br from-forteca-navy via-forteca-navy/90 to-forteca-navy/70 px-4 pb-16 pt-12">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            All Posts
          </Link>

          <h1 className="font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <div className="mt-6 flex items-center gap-4 text-sm text-white/60">
            <span>Forteca Estate</span>
            <span>&middot;</span>
            <span>{formatDate(post.published_at ?? post.created_at)}</span>
          </div>
        </div>
      </div>

      {/* Image gallery */}
      {images.length > 0 && (
        <BlogImageGallery images={images} title={post.title} />
      )}

      {/* Content */}
      <article className="bg-forteca-cream px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-forteca-navy/5 sm:p-12">
            <div className="prose prose-lg max-w-none">
              {paragraphs.map((p, i) => {
                if (p.startsWith("- ")) {
                  const items = p.split("\n").filter((l) => l.startsWith("- "));
                  return (
                    <ul key={i} className="my-4 space-y-1.5">
                      {items.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-forteca-navy/80"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-forteca-gold" />
                          <span
                            dangerouslySetInnerHTML={{
                              __html: item
                                .slice(2)
                                .replace(
                                  /\*\*(.*?)\*\*/g,
                                  '<strong class="text-forteca-navy">$1</strong>'
                                ),
                            }}
                          />
                        </li>
                      ))}
                    </ul>
                  );
                }

                if (p.startsWith("**") && p.endsWith("**")) {
                  return (
                    <h3
                      key={i}
                      className="mb-2 mt-8 font-serif text-xl font-bold text-forteca-navy"
                    >
                      {p.slice(2, -2)}
                    </h3>
                  );
                }

                if (p.startsWith("**")) {
                  const boldEnd = p.indexOf("**", 2);
                  if (boldEnd > 0) {
                    const title = p.slice(2, boldEnd);
                    const body = p.slice(boldEnd + 2).trim();
                    return (
                      <div key={i} className="my-4">
                        <h3 className="mb-2 font-serif text-xl font-bold text-forteca-navy">
                          {title}
                        </h3>
                        {body && (
                          <p className="leading-relaxed text-forteca-navy/70">
                            {body}
                          </p>
                        )}
                      </div>
                    );
                  }
                }

                return (
                  <p
                    key={i}
                    className="my-4 leading-relaxed text-forteca-navy/70"
                    dangerouslySetInnerHTML={{
                      __html: p.replace(
                        /\*\*(.*?)\*\*/g,
                        '<strong class="text-forteca-navy">$1</strong>'
                      ),
                    }}
                  />
                );
              })}
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-forteca-navy transition-colors hover:text-forteca-gold"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all posts
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
