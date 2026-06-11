"use client";

import { useTranslations, useLocale } from "next-intl";
import type { SanityPost } from "@/sanity/lib/queries";

interface BlogPostInfoProps {
  post: SanityPost;
}

export function BlogPostInfo({ post }: BlogPostInfoProps) {
  const t = useTranslations("Blog");
  const locale = useLocale() as "en" | "ar";

  const publishedDate = new Date(post.publishedAt).toLocaleDateString(
    locale === "ar" ? "ar-YE" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-4 flex items-center gap-3 text-charcoal/50 text-sm font-sans border-b border-champagne/30">
      {post.author && <span>{t("byAuthor", { name: post.author.name })}</span>}
      <span>·</span>
      <span>{t("publishedOn", { date: publishedDate })}</span>
    </div>
  );
}
