"use client";

import Image from "next/image";
import { useState, useCallback } from "react";

interface BlurImageProps {
   src: string;
   alt: string;
   fill?: boolean;
   priority?: boolean;
   sizes?: string;
   className?: string;
   objectContain?: boolean;
}

export function BlurImage({
   src,
   alt,
   fill = true,
   priority,
   sizes,
   className,
   objectContain,
}: BlurImageProps) {
   const [loaded, setLoaded] = useState(false);

   const handleLoad = useCallback(() => {
      setLoaded(true);
   }, []);

   return (
      <>
         {!loaded && <div className="blur-image-shimmer" />}
         <Image
            src={src}
            alt={alt}
            fill={fill}
            priority={priority}
            sizes={sizes}
            onLoad={handleLoad}
            className={`${className ?? ""} transition-opacity duration-500 ${
               loaded ? "opacity-100" : "opacity-0"
            }`}
            style={objectContain ? { objectFit: "contain" } : undefined}
         />
      </>
   );
}
