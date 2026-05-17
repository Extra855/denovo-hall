"use client";

import { useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Icons } from "@/components/icons";
import { BlurImage } from "@/components/blur-image";
import type { GalleryImage } from "./gallery-data";

export function GalleryLightbox({
   images,
   currentIndex,
   isOpen,
   onClose,
   onNavigate,
}: {
   images: GalleryImage[];
   currentIndex: number;
   isOpen: boolean;
   onClose: () => void;
   onNavigate: (index: number) => void;
}) {
   const t = useTranslations();
   const image = images[currentIndex];
   const total = images.length;

   const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
         if (!isOpen) return;
         if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            e.preventDefault();
            const isRTL = document.documentElement.dir === "rtl";
            const nextKey = isRTL ? "ArrowLeft" : "ArrowRight";
            const prevKey = isRTL ? "ArrowRight" : "ArrowLeft";
            if (e.key === nextKey) {
               onNavigate(currentIndex < total - 1 ? currentIndex + 1 : 0);
            } else if (e.key === prevKey) {
               onNavigate(currentIndex > 0 ? currentIndex - 1 : total - 1);
            }
         }
      },
      [isOpen, currentIndex, total, onNavigate],
   );

   useEffect(() => {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
   }, [handleKeyDown]);

   // Preload adjacent images
   useEffect(() => {
      if (!isOpen) return;
      const prevIdx = currentIndex > 0 ? currentIndex - 1 : total - 1;
      const nextIdx = currentIndex < total - 1 ? currentIndex + 1 : 0;
      [prevIdx, nextIdx].forEach((i) => {
         const img = new Image();
         img.src = images[i].src;
      });
   }, [isOpen, currentIndex, total, images]);

   if (!image) return null;

   return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
         <DialogContent
            className="fixed !inset-0 !top-0 !left-0 !translate-x-0 !translate-y-0 !max-w-none !w-full !h-full !rounded-none !shadow-none bg-charcoal/95 backdrop-blur-xl border-none p-0 overflow-hidden"
            showCloseButton={false}
         >
            <div className="relative w-full h-full flex flex-col">
               {/* Close button */}
               <button
                  onClick={onClose}
                  aria-label={t("Gallery.closeLightbox" as Parameters<typeof t>[0])}
                  className="absolute top-4 end-4 z-50 w-12 h-12 rounded-full bg-white/10 text-alabaster hover:bg-white/20 transition-colors flex items-center justify-center"
               >
                  <Icons.close />
               </button>

               {/* Prev button */}
               <button
                  onClick={() =>
                     onNavigate(currentIndex > 0 ? currentIndex - 1 : total - 1)
                  }
                  aria-label={t("Gallery.previousImage" as Parameters<typeof t>[0])}
                  className="gallery-lightbox-nav absolute start-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-alabaster hover:bg-white/20 transition-colors flex items-center justify-center"
               >
                  <Icons.chevronLeft />
               </button>

               {/* Next button */}
               <button
                  onClick={() =>
                     onNavigate(currentIndex < total - 1 ? currentIndex + 1 : 0)
                  }
                  aria-label={t("Gallery.nextImage" as Parameters<typeof t>[0])}
                  className="gallery-lightbox-nav absolute end-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-alabaster hover:bg-white/20 transition-colors flex items-center justify-center"
               >
                  <Icons.chevronRight />
               </button>

               {/* Image area */}
               <div className="flex-1 flex items-center justify-center min-h-0 overflow-hidden">
                  <div className="h-full w-full relative">
                     <BlurImage
                        key={image.id}
                        src={image.src}
                        alt={t(image.altKey as Parameters<typeof t>[0])}
                        sizes="(max-width: 768px) 100vw, 80vw"
                        objectContain
                        className="animate-in fade-in duration-300"
                     />
                  </div>
               </div>

               {/* Bottom bar */}
               <div className="shrink-0 flex items-center justify-between px-6 py-4 bg-charcoal/60">
                  <div>
                     <span className="text-champagne text-xs tracking-widest uppercase font-sans">
                        {t(`Gallery.categories.${image.category}` as Parameters<typeof t>[0])}
                     </span>
                     <p className="text-alabaster font-serif-display text-lg mt-1">
                        {t(image.titleKey as Parameters<typeof t>[0])}
                     </p>
                  </div>
                  <span className="text-alabaster/60 text-sm font-sans">
                     {t("Gallery.imageCounter" as Parameters<typeof t>[0], {
                        current: currentIndex + 1,
                        total,
                     })}
                  </span>
               </div>
            </div>
         </DialogContent>
      </Dialog>
   );
}
