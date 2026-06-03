"use client";

import { GalleryItem } from "./gallery-item";
import type { GalleryImage } from "./gallery-data";

export function GalleryGrid({
   images,
   onItemClick,
   categoryNamespace,
}: {
   images: GalleryImage[];
   onItemClick: (index: number) => void;
   categoryNamespace?: string;
}) {
   return (
      <div className="gallery-masonry">
         {images.map((image, i) => (
            <GalleryItem
               key={image.id}
               image={image}
               index={i}
               onClick={() => onItemClick(i)}
               categoryNamespace={categoryNamespace}
            />
         ))}
      </div>
   );
}
