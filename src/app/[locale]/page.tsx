import dynamic from "next/dynamic";
import { setRequestLocale } from "next-intl/server";
import { Navigation } from "@/components/sections/navigation";
import { HeroSection } from "@/components/sections/hero-section";
import { FloatingCTA } from "@/components/sections/floating-cta";
import { BackToTop } from "@/components/sections/back-to-top";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ClientForms } from "@/components/client-forms";

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

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main-content" className="min-h-screen bg-alabaster flex flex-col">
      <Navigation />
      <HeroSection />
      <ScrollReveal><SocialProofSection /></ScrollReveal>
      <ScrollReveal><SpacesSection /></ScrollReveal>
      <ScrollReveal><FeaturedWeddingsSection /></ScrollReveal>
      <ScrollReveal><TestimonialsSection /></ScrollReveal>
      <ScrollReveal><WhyChooseUsSection /></ScrollReveal>
      <ScrollReveal><PlanningGuideSection /></ScrollReveal>
      <ScrollReveal><CommunitySection /></ScrollReveal>
      <ScrollReveal><HelpSection /></ScrollReveal>
      <ClientForms />
      <FloatingCTA />
      <BackToTop />
    </main>
  );
}
