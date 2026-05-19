"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
   const scrollRef = useRef<HTMLDivElement>(null);
   const [canScrollStart, setCanScrollStart] = useState(false);
   const [canScrollEnd, setCanScrollEnd] = useState(false);

   const checkScroll = useCallback(() => {
      const el = scrollRef.current;
      if (!el) return;
      setCanScrollStart(el.scrollLeft > 4);
      setCanScrollEnd(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
   }, []);

   useEffect(() => {
      const el = scrollRef.current;
      if (!el) return;
      // Initial check after layout
      const raf = requestAnimationFrame(checkScroll);
      el.addEventListener("scroll", checkScroll, { passive: true });
      return () => {
         cancelAnimationFrame(raf);
         el.removeEventListener("scroll", checkScroll);
      };
   }, [checkScroll]);

   // Auto-scroll active pill into view
   useEffect(() => {
      const el = scrollRef.current;
      if (!el) return;
      const btn = el.querySelector(`[data-filter="${active}"]`) as HTMLElement;
      btn?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
   }, [active]);

   return (
      <div className="relative w-full">
         {/* Start fade */}
         {canScrollStart && (
            <div className="pointer-events-none absolute start-0 top-0 bottom-0 w-8 bg-gradient-to-r from-alabaster to-transparent z-10" />
         )}
         <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 px-1 scroll-smooth"
         >
            {categories.map((cat) => (
               <button
                  key={cat}
                  data-filter={cat}
                  onClick={() => onChange(cat)}
                  aria-pressed={active === cat}
                  className={`gallery-filter-btn shrink-0 whitespace-nowrap px-5 py-3 min-h-[44px] rounded-full text-xs tracking-widest uppercase font-sans transition-all duration-400 ease-luxury border ${
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
         {/* End fade */}
         {canScrollEnd && (
            <div className="pointer-events-none absolute end-0 top-0 bottom-0 w-8 bg-gradient-to-l from-alabaster to-transparent z-10" />
         )}
      </div>
   );
}
