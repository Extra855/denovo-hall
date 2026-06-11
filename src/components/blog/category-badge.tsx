"use client";

import type { SanityCategory } from "@/sanity/lib/queries";

interface CategoryBadgeProps {
  category: SanityCategory;
  locale: "en" | "ar";
}

export function CategoryBadge({ category, locale }: CategoryBadgeProps) {
  const title = locale === "ar" ? category.title_ar : category.title_en;

  return (
    <span className="bg-champagne/20 text-charcoal/70 text-xs tracking-widest uppercase font-sans px-3 py-1">
      {title}
    </span>
  );
}
