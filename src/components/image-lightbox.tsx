"use client";

import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { BlurImage } from "@/components/blur-image";

export function ImageLightbox({
   isOpen,
   onClose,
   imageSrc,
   imageAlt,
}: {
   isOpen: boolean;
   onClose: () => void;
   imageSrc: string;
   imageAlt: string;
}) {
   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className="max-w-6xl w-full bg-alabaster/98 border-champagne/20 p-0 overflow-hidden">
            <DialogClose className="absolute top-4 end-4 z-50 w-12 h-12 rounded-full bg-charcoal/80 text-alabaster hover:bg-charcoal transition-colors flex items-center justify-center" />
            <div className="relative w-full" style={{ height: "85vh" }}>
               <BlurImage
                  src={imageSrc}
                  alt={imageAlt}
                  objectContain
                  sizes="80vw"
               />
            </div>
         </DialogContent>
      </Dialog>
   );
}
