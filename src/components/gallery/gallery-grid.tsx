"use client";

import { GalleryItem } from "./gallery-item";
import type { GalleryImage } from "./gallery-data";

export function GalleryGrid({
   images,
   onItemClick,
}: {
   images: GalleryImage[];
   onItemClick: (index: number) => void;
}) {
   return (
      <div className="gallery-masonry">
         {images.map((image, i) => (
            <GalleryItem
               key={image.id}
               image={image}
               index={i}
               onClick={() => onItemClick(i)}
            />
         ))}
      </div>
   );
}
