"use client";

import { PortableText } from "@portabletext/react";
import { useLocale } from "next-intl";
import { SanityImage } from "@/components/sanity-image";
import type { SanityPost } from "@/sanity/lib/queries";

interface BlogPostBodyProps {
  post: SanityPost;
}

export function BlogPostBody({ post }: BlogPostBodyProps) {
  const locale = useLocale() as "en" | "ar";
  const body = locale === "ar" ? post.body_ar : post.body_en;

  if (!body) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-8">
      <PortableText value={body} components={serializers(locale)} />
    </div>
  );
}

function serializers(locale: "en" | "ar") {
  return {
    block: {
      h1: ({ children }: any) => (
        <h1 className="font-serif-display text-3xl md:text-4xl text-charcoal mt-10 mb-4">{children}</h1>
      ),
      h2: ({ children }: any) => (
        <h2 className="font-serif-display text-2xl md:text-3xl text-charcoal mt-8 mb-3">{children}</h2>
      ),
      h3: ({ children }: any) => (
        <h3 className="font-serif-display text-xl md:text-2xl text-charcoal mt-6 mb-2">{children}</h3>
      ),
      normal: ({ children }: any) => (
        <p className="font-sans text-charcoal/80 leading-relaxed mb-4 text-lg">{children}</p>
      ),
      blockquote: ({ children }: any) => (
        <blockquote className="border-s-4 border-champagne ps-6 my-8 italic text-charcoal/70 font-serif-display text-xl">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }: any) => (
        <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
      ),
      number: ({ children }: any) => (
        <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }: any) => (
        <li className="font-sans text-charcoal/80 leading-relaxed text-lg">{children}</li>
      ),
      number: ({ children }: any) => (
        <li className="font-sans text-charcoal/80 leading-relaxed text-lg">{children}</li>
      ),
    },
    marks: {
      strong: ({ children }: any) => (
        <strong className="font-semibold text-charcoal">{children}</strong>
      ),
      em: ({ children }: any) => (
        <em className="italic text-charcoal/90">{children}</em>
      ),
      link: ({ children, value }: any) => {
        const isExternal = value?.href?.startsWith("http");
        return (
          <a
            href={value?.href}
            className="text-sage underline hover:text-charcoal transition-colors"
            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {children}
          </a>
        );
      },
    },
    types: {
      image: ({ value }: any) => {
        const alt = locale === "ar"
          ? value.alt_ar || value.alt_en || "Blog post image"
          : value.alt_en || value.alt_ar || "Blog post image";
        const caption = locale === "ar"
          ? value.caption_ar || value.caption_en
          : value.caption_en || value.caption_ar;

        return (
          <figure className="my-8">
            <SanityImage
              image={value}
              alt={alt}
              width={800}
              sizes="(max-width: 768px) 100vw, 800px"
              className="w-full rounded-sm"
            />
            {caption && (
              <figcaption className="text-center text-charcoal/50 text-sm font-sans mt-2">
                {caption}
              </figcaption>
            )}
          </figure>
        );
      },
    },
  };
}
