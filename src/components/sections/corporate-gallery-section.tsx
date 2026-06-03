"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { GalleryLightbox } from "@/components/gallery/gallery-lightbox";
import {
   corporateGalleryImages,
   corporateGalleryCategories,
   type CorporateGalleryCategory,
} from "@/components/gallery/corporate-gallery-data";
// Structural compatibility — CorporateGalleryImage is a subset of GalleryImage
import type { GalleryImage } from "@/components/gallery/gallery-data";

type FilterCategory = CorporateGalleryCategory | "all";

export function CorporateGallerySection() {
   const t = useTranslations("CorporateEvents");
   const [activeCategory, setActiveCategory] = useState<FilterCategory>("all");
   const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

   const filteredImages = useMemo(() => {
      if (activeCategory === "all") return corporateGalleryImages;
      return corporateGalleryImages.filter((img) => img.category === activeCategory);
   }, [activeCategory]);

   const images = filteredImages as unknown as GalleryImage[];

   return (
      <section className="py-20 sm:py-28 bg-alabaster">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-12 sm:mb-16">
               <span className="text-champagne text-xs sm:text-sm tracking-[0.3em] uppercase font-sans">
                  {t("gallery.subtitle")}
               </span>
               <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-charcoal mt-3 sm:mt-4">
                  {t("gallery.title")}
               </h2>
               <div className="flex items-center justify-center gap-2 mt-4 sm:mt-6">
                  <span className="w-8 h-px bg-champagne" />
                  <span className="w-2 h-2 rounded-full bg-champagne" />
                  <span className="w-8 h-px bg-champagne" />
               </div>
               <p className="text-charcoal/60 font-sans text-sm sm:text-base max-w-2xl mx-auto mt-4 sm:mt-6">
                  {t("gallery.description")}
               </p>
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
               <button
                  onClick={() => setActiveCategory("all")}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-sans tracking-wide transition-all duration-300 ${
                     activeCategory === "all"
                        ? "bg-charcoal text-alabaster"
                        : "bg-charcoal/5 text-charcoal/70 hover:bg-charcoal/10"
                  }`}
               >
                  {t("gallery.allCategories")}
               </button>
               {corporateGalleryCategories.map((cat) => (
                  <button
                     key={cat}
                     onClick={() => setActiveCategory(cat)}
                     className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-sans tracking-wide transition-all duration-300 ${
                        activeCategory === cat
                           ? "bg-charcoal text-alabaster"
                           : "bg-charcoal/5 text-charcoal/70 hover:bg-charcoal/10"
                     }`}
                  >
                     {t(`gallery.categories.${cat}` as Parameters<typeof t>[0])}
                  </button>
               ))}
            </div>

            {/* Result count */}
            <p className="text-center text-charcoal/50 text-xs sm:text-sm font-sans mb-6 sm:mb-8">
               {t("gallery.resultCount", { count: filteredImages.length })}
            </p>

            {/* Gallery grid */}
            <GalleryGrid
               images={images}
               onItemClick={(i) => setLightboxIndex(i)}
               categoryNamespace="CorporateEvents.gallery.categories"
            />

            {/* Lightbox */}
            <GalleryLightbox
               images={images}
               currentIndex={lightboxIndex ?? 0}
               isOpen={lightboxIndex !== null}
               onClose={() => setLightboxIndex(null)}
               onNavigate={(i) => setLightboxIndex(i)}
               categoryNamespace="CorporateEvents.gallery.categories"
               closeLabelKey="CorporateEvents.gallery.closeLightbox"
               prevLabelKey="CorporateEvents.gallery.previousImage"
               nextLabelKey="CorporateEvents.gallery.nextImage"
               counterKey="CorporateEvents.gallery.imageCounter"
            />
         </div>
      </section>
   );
}
