"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Ornament } from "@/components/ornament";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Link } from "@/i18n/navigation";
import { galleryImages, type GalleryCategory, type WeddingSlug } from "./gallery-data";
import { GalleryFilter } from "./gallery-filter";
import { GalleryGrid } from "./gallery-grid";
import { GalleryLightbox } from "./gallery-lightbox";
import { FeaturedWeddingsGallery } from "./featured-weddings-gallery";

export function GalleryPage() {
   const t = useTranslations("Gallery");
   const searchParams = useSearchParams();
   const [activeCategory, setActiveCategory] = useState<GalleryCategory | "all">("all");
   const [activeWedding, setActiveWedding] = useState<WeddingSlug | null>(null);
   const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

   // Read ?wedding= param on mount
   useEffect(() => {
      const param = searchParams.get("wedding");
      if (param && (["sarah-michael", "emma-james", "olivia-thomas", "grace-william"] as WeddingSlug[]).includes(param as WeddingSlug)) {
         setActiveWedding(param as WeddingSlug);
      }
   }, [searchParams]);

   const filteredImages = useMemo(() => {
      let result = galleryImages;
      if (activeWedding) {
         result = result.filter((img) => img.wedding === activeWedding);
      }
      if (activeCategory !== "all") {
         result = result.filter((img) => img.category === activeCategory);
      }
      return result;
   }, [activeCategory, activeWedding]);

   const lightboxOpen = lightboxIndex !== null;

   const handleWeddingToggle = useCallback((slug: WeddingSlug) => {
      setActiveWedding((prev) => (prev === slug ? null : slug));
   }, []);

   return (
      <>
         {/* Page header */}
         <section className="pt-24 pb-10 md:pb-16 px-4 md:px-6">
            <div className="max-w-7xl mx-auto text-center">
               <span className="text-sage text-sm tracking-[0.3em] uppercase font-sans block mb-4 animate-fade-up">
                  {t("subtitle")}
               </span>
               <h1 className="font-serif-display text-4xl md:text-5xl lg:text-6xl text-charcoal mb-4 animate-fade-up" style={{ animationDelay: "100ms" }}>
                  {t("heading1")}
               </h1>
               <h2 className="font-serif-display text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6 animate-fade-up" style={{ animationDelay: "200ms" }}>
                  {t("heading2")}
               </h2>
               <Ornament className="mb-6 animate-fade-up" style={{ animationDelay: "300ms" }} />
               <p className="text-charcoal/60 font-sans text-lg max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "400ms" }}>
                  {t("description")}
               </p>
            </div>
         </section>

         {/* Filter + Grid */}
         <section className="pb-24 px-4 md:px-6 overflow-x-hidden">
            <div className="max-w-7xl mx-auto">
               <FeaturedWeddingsGallery
                  activeWedding={activeWedding}
                  onToggle={handleWeddingToggle}
               />

               <div className="mb-10">
                  <GalleryFilter active={activeCategory} onChange={setActiveCategory} />
               </div>

               <p className="text-charcoal/40 text-xs tracking-widest uppercase text-center mb-6 font-sans">
                  {t("resultCount", { count: filteredImages.length })}
               </p>

               {filteredImages.length === 0 ? (
                  <div className="text-center py-16">
                     <p className="text-charcoal/50 font-sans text-lg">
                        {t("noResults")}
                     </p>
                  </div>
               ) : (
                  <ScrollReveal>
                     <GalleryGrid
                        images={filteredImages}
                        onItemClick={(i) => setLightboxIndex(i)}
                     />
                  </ScrollReveal>
               )}
            </div>
         </section>

         {/* CTA */}
         <section className="py-24 px-4 md:px-6 bg-charcoal">
            <div className="max-w-3xl mx-auto text-center">
               <h2 className="font-serif-display text-3xl md:text-4xl text-alabaster mb-6">
                  {t("cta")}
               </h2>
               <Button
                  asChild
                  className="bg-alabaster hover:bg-alabaster/90 text-charcoal rounded-none px-8 py-3 text-sm tracking-widest uppercase btn-luxury group"
               >
                  <Link href="/#inquiry">
                     {t("cta")}
                     <span className="inline-block ms-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        <Icons.arrowRight />
                     </span>
                  </Link>
               </Button>
            </div>
         </section>

         {/* Lightbox */}
         {lightboxOpen && (
            <GalleryLightbox
               images={filteredImages}
               currentIndex={lightboxIndex}
               isOpen={lightboxOpen}
               onClose={() => setLightboxIndex(null)}
               onNavigate={setLightboxIndex}
            />
         )}
      </>
   );
}
