"use client";

import { useTranslations } from "next-intl";
import { Ornament } from "@/components/ornament";

export function BlogPageHeader() {
  const t = useTranslations("Blog");

  return (
    <section className="pt-24 pb-10 md:pb-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto text-center">
        <span className="text-sage text-sm tracking-[0.3em] uppercase font-sans block mb-4 animate-fade-up">
          {t("pageSubtitle")}
        </span>
        <h1 className="font-serif-display text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6 animate-fade-up" style={{ animationDelay: "100ms" }}>
          {t("pageHeading1")}{" "}
          {t("pageHeading2") && <span className="italic">{t("pageHeading2")}</span>}
        </h1>
        <Ornament className="mb-6 animate-fade-up" style={{ animationDelay: "300ms" }} />
        <p className="text-charcoal/60 font-sans text-lg max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "400ms" }}>
          {t("pageDescription")}
        </p>
      </div>
    </section>
  );
}
