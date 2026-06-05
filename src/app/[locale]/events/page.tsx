import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Navigation } from "@/components/sections/navigation";
import { CorporateHeroSection } from "@/components/sections/corporate-hero-section";
import { FloatingCTA } from "@/components/sections/floating-cta";
import { BackToTop } from "@/components/sections/back-to-top";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Footer } from "@/components/sections/footer";
import { JsonLd } from "@/components/json-ld";
import { CorporateClientForms } from "@/components/corporate-client-forms";

const CorporateStatsSection = dynamic(
   () => import("@/components/sections/corporate-stats-section").then(m => m.CorporateStatsSection),
   { loading: () => <div className="min-h-[400px]" /> }
);
const CorporateCategoriesSection = dynamic(
   () => import("@/components/sections/corporate-categories-section").then(m => m.CorporateCategoriesSection),
   { loading: () => <div className="min-h-[400px]" /> }
);
const CorporateWhyUsSection = dynamic(
   () => import("@/components/sections/corporate-why-us-section").then(m => m.CorporateWhyUsSection),
   { loading: () => <div className="min-h-[400px]" /> }
);
const CorporateAmenitiesSection = dynamic(
   () => import("@/components/sections/corporate-amenities-section").then(m => m.CorporateAmenitiesSection),
   { loading: () => <div className="min-h-[400px]" /> }
);
const CorporateProcessSection = dynamic(
   () => import("@/components/sections/corporate-process-section").then(m => m.CorporateProcessSection),
   { loading: () => <div className="min-h-[400px]" /> }
);
const CorporateGallerySection = dynamic(
   () => import("@/components/sections/corporate-gallery-section").then(m => m.CorporateGallerySection),
   { loading: () => <div className="min-h-[400px]" /> }
);
const CorporateFeaturedEventsSection = dynamic(
   () => import("@/components/sections/corporate-featured-events-section").then(m => m.CorporateFeaturedEventsSection),
   { loading: () => <div className="min-h-[400px]" /> }
);
const CorporateTestimonialsSection = dynamic(
   () => import("@/components/sections/corporate-testimonials-section").then(m => m.CorporateTestimonialsSection),
   { loading: () => <div className="min-h-[400px]" /> }
);
const CorporateHelpSection = dynamic(
   () => import("@/components/sections/corporate-help-section").then(m => m.CorporateHelpSection),
   { loading: () => <div className="min-h-[400px]" /> }
);

const BASE_URL = "https://denovohall.com";

export async function generateMetadata({
   params,
}: {
   params: Promise<{ locale: string }>;
}): Promise<Metadata> {
   const { locale } = await params;
   const t = await getTranslations({ locale, namespace: "CorporateEvents" });

   return {
      title: t("meta.title"),
      description: t("meta.description"),
      keywords: t("meta.keywords").split(","),
      openGraph: {
         title: t("meta.ogTitle"),
         description: t("meta.ogDescription"),
         url: `${BASE_URL}/${locale}/events`,
         images: [
            {
               url: `/og-gallery-${locale}.jpg`,
               width: 1200,
               height: 630,
               alt: t("meta.ogTitle"),
            },
         ],
      },
      twitter: {
         card: "summary_large_image",
         title: t("meta.ogTitle"),
         description: t("meta.ogDescription"),
         images: [`/og-gallery-${locale}.jpg`],
      },
      alternates: {
         canonical: `/${locale}/events`,
         languages: {
            en: `${BASE_URL}/en/events`,
            ar: `${BASE_URL}/ar/events`,
            "x-default": `${BASE_URL}/ar/events`,
         },
      },
      other: {
         "geo.region": "YE-AD",
         "geo.placename": locale === "ar" ? "صنعاء، اليمن" : "Sana'a, Yemen",
         "ICBM": "15.2935, 44.1948",
      },
   };
}

export default async function CorporateEventsRoute({
   params,
}: {
   params: Promise<{ locale: string }>;
}) {
   const { locale } = await params;
   setRequestLocale(locale);

   const t = await getTranslations({ locale, namespace: "CorporateEvents" });

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
            name: locale === "ar" ? "فعاليات الشركات" : "Corporate Events",
            item: `${BASE_URL}/${locale}/events`,
         },
      ],
   };

   const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "EventVenue",
      name: "De Novo",
      description: t("meta.description"),
      url: `${BASE_URL}/${locale}/events`,
      address: {
         "@type": "PostalAddress",
         streetAddress: "50th Street, Behind Atico Station",
         addressLocality: "Sana'a",
         addressCountry: "YE",
      },
      geo: {
         "@type": "GeoCoordinates",
         latitude: 15.2935,
         longitude: 44.1948,
      },
   };

   const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [0, 1, 2, 3, 4].map(i => ({
         "@type": "Question",
         name: t(`faq.items.${i}.question`),
         acceptedAnswer: {
            "@type": "Answer",
            text: t(`faq.items.${i}.answer`),
         },
      })),
   };

   return (
      <main id="main-content" className="min-h-screen bg-alabaster flex flex-col">
         <JsonLd data={breadcrumbSchema} />
         <JsonLd data={localBusinessSchema} />
         <JsonLd data={faqSchema} />
         <Navigation />
         <CorporateHeroSection />
         <ScrollReveal><CorporateStatsSection /></ScrollReveal>
         <ScrollReveal><CorporateCategoriesSection /></ScrollReveal>
         <ScrollReveal><CorporateWhyUsSection /></ScrollReveal>
         <ScrollReveal><CorporateAmenitiesSection /></ScrollReveal>
         <ScrollReveal><CorporateGallerySection /></ScrollReveal>
         <ScrollReveal><CorporateFeaturedEventsSection /></ScrollReveal>
         <ScrollReveal><CorporateProcessSection /></ScrollReveal>
         <ScrollReveal><CorporateTestimonialsSection /></ScrollReveal>
         <ScrollReveal><CorporateHelpSection /></ScrollReveal>
         <ScrollReveal><CorporateClientForms /></ScrollReveal>
         <Footer />
         <FloatingCTA />
         <BackToTop />
      </main>
   );
}
