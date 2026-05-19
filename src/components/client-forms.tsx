"use client";

import dynamic from "next/dynamic";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Footer } from "@/components/sections/footer";

const NewsletterSection = dynamic(
  () =>
    import("@/components/sections/newsletter-section").then(
      (m) => m.NewsletterSection,
    ),
  { ssr: false },
);

const InquirySection = dynamic(
  () =>
    import("@/components/sections/inquiry-section").then(
      (m) => m.InquirySection,
    ),
  { ssr: false },
);

export function ClientForms() {
  return (
    <>
      {/* <ScrollReveal><NewsletterSection /></ScrollReveal> */}
      <ScrollReveal><InquirySection /></ScrollReveal>
      <ScrollReveal><Footer /></ScrollReveal>
    </>
  );
}
