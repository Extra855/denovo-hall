import dynamic from "next/dynamic";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Navigation } from "@/components/sections/navigation";
import { HeroSection } from "@/components/sections/hero-section";
import { FloatingCTA } from "@/components/sections/floating-cta";
import { BackToTop } from "@/components/sections/back-to-top";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ClientForms } from "@/components/client-forms";
import { JsonLd } from "@/components/json-ld";

const SocialProofSection = dynamic(
  () => import("@/components/sections/social-proof-section").then(m => m.SocialProofSection),
  { loading: () => <div className="min-h-[400px]" /> }
);
const SpacesSection = dynamic(
  () => import("@/components/sections/spaces-section").then(m => m.SpacesSection),
  { loading: () => <div className="min-h-[400px]" /> }
);
const FeaturedWeddingsSection = dynamic(
  () => import("@/components/sections/featured-weddings-section").then(m => m.FeaturedWeddingsSection),
  { loading: () => <div className="min-h-[400px]" /> }
);
const TestimonialsSection = dynamic(
  () => import("@/components/sections/testimonials-section").then(m => m.TestimonialsSection),
  { loading: () => <div className="min-h-[400px]" /> }
);
const WhyChooseUsSection = dynamic(
  () => import("@/components/sections/why-choose-us-section").then(m => m.WhyChooseUsSection),
  { loading: () => <div className="min-h-[400px]" /> }
);
const VenueFeaturesSection = dynamic(
  () => import("@/components/sections/venue-features-section").then(m => m.VenueFeaturesSection),
  { loading: () => <div className="min-h-[400px]" /> }
);
const IncludedAmenitiesSection = dynamic(
  () => import("@/components/sections/included-amenities-section").then(m => m.IncludedAmenitiesSection),
  { loading: () => <div className="min-h-[400px]" /> }
);
const PlanningGuideSection = dynamic(
  () => import("@/components/sections/planning-guide-section").then(m => m.PlanningGuideSection),
  { loading: () => <div className="min-h-[400px]" /> }
);
const CommunitySection = dynamic(
  () => import("@/components/sections/community-section").then(m => m.CommunitySection),
  { loading: () => <div className="min-h-[400px]" /> }
);
const HelpSection = dynamic(
  () => import("@/components/sections/help-section").then(m => m.HelpSection),
  { loading: () => <div className="min-h-[400px]" /> }
);

const BASE_URL = "https://denovohall.com";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tm = await getTranslations({ locale, namespace: "Metadata" });
  const tf = await getTranslations({ locale, namespace: "FAQ" });

  const faqItems: Array<{ question: string; answer: string }> = [];
  for (let i = 0; i < 5; i++) {
    try {
      faqItems.push({
        question: tf(`items.${i}.question`),
        answer: tf(`items.${i}.answer`),
      });
    } catch { break; }
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "WeddingVenue"],
    name: tm("schemaName"),
    description: tm("schemaDescription"),
    url: `${BASE_URL}/${locale}`,
    telephone: "+967775228246",
    email: "events@denovohall.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: tm("schemaAddress"),
      addressLocality: locale === "ar" ? "صنعاء" : "Sana'a",
      addressCountry: "YE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 15.2935,
      longitude: 44.1948,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.3",
      reviewCount: "108",
      bestRating: "5",
    },
    priceRange: "$$$$",
    openingHours: "Mo-Su 09:00-18:00",
    image: `${BASE_URL}/hero.jpg`,
    sameAs: [
      "https://www.instagram.com/denovohall",
      "https://www.facebook.com/denovohall",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main id="main-content" className="min-h-screen bg-alabaster flex flex-col">
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={faqSchema} />
      <Navigation />
      <HeroSection />
      <ScrollReveal><SocialProofSection /></ScrollReveal>
      <ScrollReveal><SpacesSection /></ScrollReveal>
      <ScrollReveal><FeaturedWeddingsSection /></ScrollReveal>
      <ScrollReveal><TestimonialsSection /></ScrollReveal>
      <ScrollReveal><VenueFeaturesSection /></ScrollReveal>
      <ScrollReveal><WhyChooseUsSection /></ScrollReveal>
      <ScrollReveal><IncludedAmenitiesSection /></ScrollReveal>
      <ScrollReveal><PlanningGuideSection /></ScrollReveal>
      <ScrollReveal><CommunitySection /></ScrollReveal>
      <ScrollReveal><HelpSection /></ScrollReveal>
      <ClientForms />
      <FloatingCTA />
      <BackToTop />
    </main>
  );
}
