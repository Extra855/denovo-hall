import { setRequestLocale } from "next-intl/server";
import { Navigation } from "@/components/sections/navigation";
import { HeroSection } from "@/components/sections/hero-section";
import { SocialProofSection } from "@/components/sections/social-proof-section";
import { SpacesSection } from "@/components/sections/spaces-section";
import { FeaturedWeddingsSection } from "@/components/sections/featured-weddings-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { WhyChooseUsSection } from "@/components/sections/why-choose-us-section";
import { PlanningGuideSection } from "@/components/sections/planning-guide-section";
import { CommunitySection } from "@/components/sections/community-section";
import { HelpSection } from "@/components/sections/help-section";
import { FloatingCTA } from "@/components/sections/floating-cta";
import { BackToTop } from "@/components/sections/back-to-top";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ClientForms } from "@/components/client-forms";

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
