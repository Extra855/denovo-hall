"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SanityImage } from "@/components/sanity-image";
import { CategoryBadge } from "./category-badge";
import type { SanityPostListItem } from "@/sanity/lib/queries";

interface BlogCardProps {
  post: SanityPostListItem;
}

export function BlogCard({ post }: BlogCardProps) {
  const t = useTranslations("Blog");
  const locale = useLocale();
  const title = locale === "ar" ? post.title_ar : post.title_en;
  const excerpt = locale === "ar" ? post.excerpt_ar : post.excerpt_en;
  const featuredImageAlt = post.featuredImage
    ? locale === "ar"
      ? (post.featuredImage as any).alt_ar || (post.featuredImage as any).alt_en
      : (post.featuredImage as any).alt_en || (post.featuredImage as any).alt_ar
    : undefined;

  const date = new Date(post.publishedAt).toLocaleDateString(
    locale === "ar" ? "ar-YE" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <Link href={`/blog/${post.slug.current}`} className="group block">
      <article className="overflow-hidden">
        <div className="relative aspect-[16/10] overflow-hidden">
          {post.featuredImage ? (
            <SanityImage
              image={post.featuredImage as any}
              alt={featuredImageAlt || title || "Blog post image"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-champagne/20 flex items-center justify-center">
              <span className="text-charcoal/30 font-serif-display text-2xl">De Novo</span>
            </div>
          )}
          {post.categories && post.categories.length > 0 && (
            <div className="absolute top-3 start-3">
              <CategoryBadge category={post.categories[0]} locale={locale as "en" | "ar"} />
            </div>
          )}
        </div>
        <div className="pt-4 pb-6">
          <h2 className="font-serif-display text-xl md:text-2xl text-charcoal mb-2 group-hover:text-sage transition-colors duration-300 line-clamp-2">
            {title}
          </h2>
          {excerpt && (
            <p className="text-charcoal/60 font-sans text-sm leading-relaxed mb-3 line-clamp-2">
              {excerpt}
            </p>
          )}
          <div className="flex items-center gap-3 text-charcoal/40 text-xs font-sans">
            {post.author && <span>{t("byAuthor", { name: post.author.name })}</span>}
            <span>·</span>
            <span>{date}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
