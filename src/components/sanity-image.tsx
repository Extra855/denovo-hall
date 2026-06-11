import Image from "next/image";
import { urlFor } from "@/sanity/lib/client";
import type { SanityImage as SanityImageType } from "@/sanity/lib/queries";

interface SanityImageProps {
  image: SanityImageType & { metadata?: { lqip?: string } };
  alt?: string;
  title?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  aspect?: string;
}

export function SanityImage({
  image,
  alt,
  title,
  width,
  height,
  fill = false,
  priority,
  sizes,
  className,
  aspect,
}: SanityImageProps) {
  if (!image?.asset?._ref) return null;

  const altText = alt || title || "Blog post image";

  const crop = image.crop;
  const hotspot = image.hotspot;

  let objectFit: "cover" | "contain" = "cover";
  let objectPosition = "center";

  if (hotspot) {
    const x = Math.round(hotspot.x * 100);
    const y = Math.round(hotspot.y * 100);
    objectPosition = `${x}% ${y}%`;
  }

  if (crop) {
    objectFit = "cover";
  }

  const lqip = (image as any).metadata?.lqip;

  const builder = urlFor(image);
  if (width) builder.width(width);
  if (height) builder.height(height);
  if (!width && !height && !fill) {
    builder.width(1200);
  }
  const src = builder.auto("format").quality(80).url();

  if (fill) {
    return (
      <Image
        src={src}
        alt={altText}
        fill
        priority={priority}
        sizes={sizes}
        className={className}
        style={{ objectFit, objectPosition }}
        placeholder={lqip ? "blur" : undefined}
        blurDataURL={lqip || undefined}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={altText}
      width={width || 1200}
      height={height || 675}
      priority={priority}
      sizes={sizes}
      className={className}
      style={{ objectFit, objectPosition }}
      placeholder={lqip ? "blur" : undefined}
      blurDataURL={lqip || undefined}
    />
  );
}
