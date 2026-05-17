"use client";

import { useTranslations } from "next-intl";
import { BlurImage } from "@/components/blur-image";
import { featuredWeddingImages, weddingSlugs, type WeddingSlug } from "./gallery-data";

interface FeaturedWeddingsGalleryProps {
   activeWedding: WeddingSlug | null;
   onToggle: (slug: WeddingSlug) => void;
}

export function FeaturedWeddingsGallery({
   activeWedding,
   onToggle,
}: FeaturedWeddingsGalleryProps) {
   const t = useTranslations("Gallery.featuredWeddings");

   return (
      <div className="mb-12">
         <div className="text-center mb-8">
            <p className="text-sm tracking-widest uppercase text-sage mb-2">
               {t("subtitle")}
            </p>
            <h3 className="font-serif-display text-2xl md:text-3xl text-charcoal">
               {t("heading")}
            </h3>
         </div>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {weddingSlugs.map((slug) => {
               const isActive = activeWedding === slug;
               return (
                  <button
                     key={slug}
                     onClick={() => onToggle(slug)}
                     className={`group relative overflow-hidden rounded-sm aspect-[4/3] transition-all duration-300 ${
                        isActive
                           ? "ring-2 ring-sage ring-offset-2"
                           : "ring-1 ring-charcoal/10 hover:ring-charcoal/30"
                     }`}
                     type="button"
                  >
                     <BlurImage
                        src={featuredWeddingImages[slug]}
                        alt={t(`couples.${slug}`)}
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                     />
                     <div
                        className={`absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent transition-opacity duration-300 ${
                           isActive ? "opacity-90" : "opacity-60 group-hover:opacity-80"
                        }`}
                     />
                     <div className="absolute bottom-0 inset-x-0 p-3 md:p-4">
                        <span className="font-serif-display text-alabaster text-sm md:text-base">
                           {t(`couples.${slug}`)}
                        </span>
                        {isActive && (
                           <span className="block text-champagne text-xs mt-1 tracking-wider uppercase">
                              ✓ Active
                           </span>
                        )}
                     </div>
                  </button>
               );
            })}
         </div>
      </div>
   );
}
