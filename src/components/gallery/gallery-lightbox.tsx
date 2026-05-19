"use client";

import { useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Icons } from "@/components/icons";
import { BlurImage } from "@/components/blur-image";
import { useSwipeGesture } from "@/hooks/use-swipe-gesture";
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

   const swipe = useSwipeGesture({
      onSwipeLeft: () => onNavigate(currentIndex < total - 1 ? currentIndex + 1 : 0),
      onSwipeRight: () => onNavigate(currentIndex > 0 ? currentIndex - 1 : total - 1),
   });

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

   if (!image) return null;

   const progress = total > 1 ? ((currentIndex + 1) / total) * 100 : 100;

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
                  className="gallery-lightbox-nav hidden md:flex absolute start-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-alabaster hover:bg-white/20 transition-colors items-center justify-center rtl:scale-x-[-1]"
               >
                  <Icons.chevronLeft />
               </button>

               {/* Next button */}
               <button
                  onClick={() =>
                     onNavigate(currentIndex < total - 1 ? currentIndex + 1 : 0)
                  }
                  aria-label={t("Gallery.nextImage" as Parameters<typeof t>[0])}
                  className="gallery-lightbox-nav hidden md:flex absolute end-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-alabaster hover:bg-white/20 transition-colors items-center justify-center rtl:scale-x-[-1]"
               >
                  <Icons.chevronRight />
               </button>

               {/* Image area */}
               <div
                  className="flex-1 flex items-center justify-center min-h-0 overflow-hidden"
                  onTouchStart={swipe.onTouchStart}
                  onTouchMove={swipe.onTouchMove}
                  onTouchEnd={swipe.onTouchEnd}
               >
                  <div
                     className="h-full w-full relative"
                     style={{
                        transform: swipe.swipeOffset ? `translateX(${swipe.swipeOffset}px)` : undefined,
                        transition: swipe.swipeOffset ? "none" : undefined,
                     }}
                  >
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

               {/* Progress bar — mobile only */}
               <div className="md:hidden h-0.5 bg-alabaster/10">
                  <div
                     className="h-full bg-champagne transition-all duration-300 ease-out"
                     style={{ width: `${progress}%` }}
                  />
               </div>

               {/* Bottom bar */}
               <div
                  className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-charcoal/60"
                  style={{ paddingBottom: "max(env(safe-area-inset-bottom, 0px), 0.75rem)" }}
               >
                  <div className="min-w-0 flex-1">
                     <span className="text-champagne text-[10px] sm:text-xs tracking-widest uppercase font-sans">
                        {t(`Gallery.categories.${image.category}` as Parameters<typeof t>[0])}
                     </span>
                     <p className="text-alabaster font-serif-display text-sm sm:text-lg mt-0.5 sm:mt-1 truncate">
                        {t(image.titleKey as Parameters<typeof t>[0])}
                     </p>
                  </div>
                  <span className="text-alabaster/60 text-xs sm:text-sm font-sans shrink-0 ms-3">
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
