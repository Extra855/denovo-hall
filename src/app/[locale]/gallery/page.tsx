import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Navigation } from "@/components/sections/navigation";
import { FloatingCTA } from "@/components/sections/floating-cta";
import { BackToTop } from "@/components/sections/back-to-top";
import { Footer } from "@/components/sections/footer";
import { GalleryPage } from "@/components/gallery/gallery-page";
import { JsonLd } from "@/components/json-ld";
import { galleryImages } from "@/components/gallery/gallery-data";

const BASE_URL = "https://denovohall.com";

export async function generateMetadata({
   params,
}: {
   params: Promise<{ locale: string }>;
}): Promise<Metadata> {
   const { locale } = await params;
   const t = await getTranslations({ locale, namespace: "Gallery" });

   return {
      title: t("metaTitle"),
      description: t("metaDescription"),
      openGraph: {
         title: t("metaTitle"),
         description: t("metaDescription"),
         url: `${BASE_URL}/${locale}/gallery`,
         images: [
            {
               url: `/og-gallery-${locale}.jpg`,
               width: 1200,
               height: 630,
               alt: t("metaTitle"),
            },
         ],
      },
      twitter: {
         card: "summary_large_image",
         title: t("metaTitle"),
         description: t("metaDescription"),
         images: [`/og-gallery-${locale}.jpg`],
      },
      alternates: {
         canonical: `${BASE_URL}/${locale}/gallery`,
         languages: {
            en: `${BASE_URL}/en/gallery`,
            ar: `${BASE_URL}/ar/gallery`,
            "x-default": `${BASE_URL}/ar/gallery`,
         },
      },
   };
}

export default async function GalleryRoute({
   params,
}: {
   params: Promise<{ locale: string }>;
}) {
   const { locale } = await params;
   setRequestLocale(locale);

   const t = await getTranslations({ locale, namespace: "Gallery" });

   const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
         {
            "@type": "ListItem",
            position: 1,
            name: locale === "ar" ? "الرئيسية" : "Home",
            item: `${BASE_URL}/${locale}`,
         },
         {
            "@type": "ListItem",
            position: 2,
            name: t("subtitle"),
            item: `${BASE_URL}/${locale}/gallery`,
         },
      ],
   };

   const uniqueImages = Array.from(new Set(galleryImages.map((img) => img.src)));
   const imageGallerySchema = {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      name: t("metaTitle"),
      image: uniqueImages.slice(0, 20).map((src) => ({
         "@type": "ImageObject",
         contentUrl: `${BASE_URL}${src}`,
      })),
   };

   return (
      <main id="main-content">
         <JsonLd data={breadcrumbSchema} />
         <JsonLd data={imageGallerySchema} />
         <Navigation />
         <Suspense>
            <GalleryPage />
         </Suspense>
         <Footer />
         <FloatingCTA />
         <BackToTop />
      </main>
   );
}
