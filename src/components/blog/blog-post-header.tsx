"use client";

import { useLocale } from "next-intl";
import { SanityImage } from "@/components/sanity-image";
import { CategoryBadge } from "./category-badge";
import type { SanityPost } from "@/sanity/lib/queries";

interface BlogPostHeaderProps {
  post: SanityPost;
}

export function BlogPostHeader({ post }: BlogPostHeaderProps) {
  const locale = useLocale() as "en" | "ar";
  const title = locale === "ar" ? post.title_ar : post.title_en;
  const featuredImageAlt = post.featuredImage
    ? locale === "ar"
      ? (post.featuredImage as any).alt_ar || (post.featuredImage as any).alt_en
      : (post.featuredImage as any).alt_en || (post.featuredImage as any).alt_ar
    : undefined;

  return (
    <header>
      {post.featuredImage && (
        <div className="relative aspect-[21/9] md:aspect-[21/8] overflow-hidden">
          <SanityImage
            image={post.featuredImage as any}
            alt={featuredImageAlt || title || "Blog post image"}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="max-w-3xl mx-auto px-4 md:px-6 pt-8 md:pt-12">
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.map((cat) => (
              <CategoryBadge key={cat._id} category={cat} locale={locale} />
            ))}
          </div>
        )}
        <h1 className="font-serif-display text-3xl md:text-4xl lg:text-5xl text-charcoal leading-tight">
          {title}
        </h1>
      </div>
    </header>
  );
}
