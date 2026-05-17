"use client";

import { useTranslations } from "next-intl";
import type { GalleryCategory } from "./gallery-data";

const categories: Array<GalleryCategory | "all"> = [
   "all",
   "ceremonies",
   "receptions",
   "details",
   "venues",
];

export function GalleryFilter({
   active,
   onChange,
}: {
   active: GalleryCategory | "all";
   onChange: (cat: GalleryCategory | "all") => void;
}) {
   const t = useTranslations("Gallery");

   return (
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 px-1">
         {categories.map((cat) => (
            <button
               key={cat}
               onClick={() => onChange(cat)}
               aria-pressed={active === cat}
               className={`gallery-filter-btn whitespace-nowrap px-5 py-2 rounded-full text-xs tracking-widest uppercase font-sans transition-all duration-400 ease-luxury border ${
                  active === cat
                     ? "bg-charcoal text-alabaster border-charcoal"
                     : "bg-transparent text-charcoal/70 border-champagne/50 hover:border-champagne hover:text-charcoal"
               }`}
            >
               {cat === "all"
                  ? t("allCategories")
                  : t(`categories.${cat}` as "categories.ceremonies")}
            </button>
         ))}
      </div>
   );
}
