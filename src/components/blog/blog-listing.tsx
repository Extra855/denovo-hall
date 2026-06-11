"use client";

import { useTranslations } from "next-intl";
import { BlogCard } from "./blog-card";
import type { SanityPostListItem } from "@/sanity/lib/queries";

interface BlogListingProps {
  posts: SanityPostListItem[];
}

export function BlogListing({ posts }: BlogListingProps) {
  const t = useTranslations("Blog");

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-charcoal/50 font-sans text-lg">{t("noPosts")}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <BlogCard key={post._id} post={post} />
      ))}
    </div>
  );
}
