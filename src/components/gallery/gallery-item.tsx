"use client";

import { useTranslations } from "next-intl";
import { Icons } from "@/components/icons";
import { BlurImage } from "@/components/blur-image";
import type { GalleryImage } from "./gallery-data";

const spanClasses: Record<string, string> = {
   tall: "sm:aspect-[3/4]",
   wide: "sm:aspect-[4/3]",
   large: "sm:aspect-square",
   normal: "sm:aspect-square",
};

export function GalleryItem({
   image,
   index,
   onClick,
}: {
   image: GalleryImage;
   index: number;
   onClick: () => void;
}) {
   const t = useTranslations();

   return (
      <div
         className="gallery-item-enter animate-fade-up overflow-hidden rounded-sm cursor-pointer group break-inside-avoid mb-2 sm:mb-4"
         style={{ animationDelay: `${index * 80}ms` }}
         onClick={onClick}
      >
         <div className={`relative aspect-[4/3] ${spanClasses[image.span]}`}>
            <BlurImage
               src={image.src}
               alt={t(image.altKey as Parameters<typeof t>[0])}
               sizes="(max-width: 640px) 48vw, (max-width: 1024px) 48vw, 33vw"
               className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
            />
            {/* Mobile caption — always visible, hidden on desktop */}
            <div className="sm:opacity-0 sm:group-hover:opacity-100 absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent pointer-events-none transition-opacity duration-300 flex flex-col justify-end p-2.5 sm:p-4">
               <span className="text-champagne text-[10px] sm:text-xs tracking-widest uppercase font-sans mb-0.5 sm:mb-1">
                  {t(`Gallery.categories.${image.category}` as Parameters<typeof t>[0])}
               </span>
               <span className="text-alabaster font-serif-display text-sm sm:text-lg">
                  {t(image.titleKey as Parameters<typeof t>[0])}
               </span>
            </div>
            {/* Expand icon — desktop only */}
            <span className="hidden sm:block absolute top-4 end-4 text-alabaster/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
               <Icons.expand />
            </span>
         </div>
      </div>
   );
}
