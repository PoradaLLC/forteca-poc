import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { blogPosts, getBlogPost } from "@/lib/mock-blog";
import { formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  // Simple markdown-ish rendering: bold, paragraphs, lists
  const paragraphs = post.content.split("\n\n").filter(Boolean);

  return (
    <>
      {/* Hero */}
      <div
        className={`grain bg-gradient-to-br ${post.coverGradient} px-4 pb-16 pt-12`}
      >
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            All Posts
          </Link>

          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <div className="mt-6 flex items-center gap-4 text-sm text-white/60">
            <span>{post.author}</span>
            <span>·</span>
            <span>{formatDate(post.publishedAt)}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime} min read
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="bg-forteca-cream px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-forteca-navy/5 sm:p-12">
            <div className="prose prose-lg max-w-none">
              {paragraphs.map((p, i) => {
                // Check if it's a list block
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

                // Bold headings (lines starting with **)
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

                // Section headers like **Title**\nBody
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

          {/* Back link */}
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
