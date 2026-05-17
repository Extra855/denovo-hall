import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Navigation } from "@/components/sections/navigation";
import { FloatingCTA } from "@/components/sections/floating-cta";
import { BackToTop } from "@/components/sections/back-to-top";
import { GalleryPage } from "@/components/gallery/gallery-page";

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
   };
}

export default async function GalleryRoute({
   params,
}: {
   params: Promise<{ locale: string }>;
}) {
   const { locale } = await params;
   setRequestLocale(locale);

   return (
      <main id="main-content">
         <Navigation />
         <Suspense>
            <GalleryPage />
         </Suspense>
         <FloatingCTA />
         <BackToTop />
      </main>
   );
}
