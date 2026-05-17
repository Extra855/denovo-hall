"use client";

import { useTranslations } from "next-intl";
import { Icons } from "@/components/icons";
import { BlurImage } from "@/components/blur-image";
import type { GalleryImage } from "./gallery-data";

const spanClasses: Record<string, string> = {
   tall: "aspect-[3/4]",
   wide: "aspect-[4/3]",
   large: "aspect-square",
   normal: "aspect-square",
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
         className="gallery-item-enter animate-fade-up overflow-hidden rounded-sm cursor-pointer group break-inside-avoid mb-4"
         style={{ animationDelay: `${index * 80}ms` }}
         onClick={onClick}
      >
         <div className={`relative ${spanClasses[image.span]}`}>
            <BlurImage
               src={image.src}
               alt={t(image.altKey as Parameters<typeof t>[0])}
               sizes="(max-width: 768px) 50vw, 33vw"
               className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
               <span className="text-champagne text-xs tracking-widest uppercase font-sans mb-1">
                  {t(`Gallery.categories.${image.category}` as Parameters<typeof t>[0])}
               </span>
               <span className="text-alabaster font-serif-display text-lg">
                  {t(image.titleKey as Parameters<typeof t>[0])}
               </span>
               <span className="absolute top-4 end-4 text-alabaster/80">
                  <Icons.expand />
               </span>
            </div>
         </div>
      </div>
   );
}
