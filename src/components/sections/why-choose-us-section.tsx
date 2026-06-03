"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";


export function WhyChooseUsSection() {
   const t = useTranslations("Experience");
   const p = useTranslations("Promise");
   const [promisesExpanded, setPromisesExpanded] = useState(false);

   const experiences = [
      { icon: Icons.bespoke, title: t("items.0.title"), description: t("items.0.description") },
      { icon: Icons.dining, title: t("items.1.title"), description: t("items.1.description") },
      { icon: Icons.bespoke, title: t("items.2.title"), description: t("items.2.description") },
      { icon: Icons.privacy, title: t("items.3.title"), description: t("items.3.description") },
   ];

   const promises = [
      { title: p("items.0.title"), description: p("items.0.description") },
      { title: p("items.1.title"), description: p("items.1.description") },
      { title: p("items.2.title"), description: p("items.2.description") },
      { title: p("items.3.title"), description: p("items.3.description") },
      { title: p("items.4.title"), description: p("items.4.description") },
   ];

   return (
      <section id="experience" className="py-24 md:py-32 lg:py-40 px-6 bg-beige relative overflow-hidden">
         <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, #2C2C2C 1px, transparent 0)`,
               backgroundSize: "40px 40px",
            }}
         />
         <div className="max-w-6xl mx-auto relative">
            {/* Left-aligned heading — no Ornament */}
            <div className="mb-16 md:mb-24 animate-fade-up">
               <div className="w-16 h-px bg-champagne mb-6" />
               <h2 className="font-serif-display heading-large text-charcoal mb-2">
                  {t("heading")}
               </h2>
               <p className="text-sm tracking-widest uppercase text-peach">
                  {t("subtitle")}
               </p>
            </div>

            {/* Features — 2x2 on mobile, 4-col on desktop */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12 mb-20 md:mb-28">
               {experiences.map((experience, index) => (
                  <div
                     key={experience.title}
                     className="text-center animate-fade-up group"
                     style={{ transitionDelay: `${0.2 + index * 0.1}s` }}
                  >
                     <div className="flex justify-center mb-4 md:mb-6 text-charcoal group-hover:text-peach transition-colors duration-500">
                        <experience.icon />
                     </div>
                     <h3 className="font-serif-display text-base md:text-xl text-charcoal mb-3 md:mb-4">
                        {experience.title}
                     </h3>
                     <p className="text-muted-foreground text-xs md:text-sm">
                        {experience.description}
                     </p>
                  </div>
               ))}
            </div>

            {/* Promise — heading as part of grid layout */}
            <div className="mb-12 md:mb-16 animate-fade-up" style={{ transitionDelay: "0.2s" }}>
               <div className="flex items-center gap-4 mb-2">
                  <div className="w-8 h-px bg-champagne" />
                  <p className="text-sm tracking-widest uppercase text-sage">
                     {p("subtitle")}
                  </p>
               </div>
               <h2 className="font-serif-display heading-large text-charcoal">
                  {p("heading")}
               </h2>
               <p className="text-muted-foreground body-regular max-w-lg mt-3">
                  {p("description")}
               </p>
            </div>

            {/* Promises grid — progressive disclosure on mobile */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               {promises.map((promise, index) => (
                  <div
                     key={promise.title}
                     className={`promise-card animate-fade-up ${index >= 2 && !promisesExpanded ? "hidden md:block" : ""}`}
                     style={{
                        ...(index >= 2 && promisesExpanded ? {
                           opacity: 1,
                           transform: "translateY(0)",
                           transitionProperty: "none",
                           transitionDuration: "0s",
                           transitionTimingFunction: "ease",
                           transitionDelay: "0s",
                        } : {
                           transitionDelay: `${0.3 + index * 0.08}s`,
                        }),
                     }}
                  >
                     <h3 className="font-serif-display text-xl text-charcoal mb-2">
                        {promise.title}
                     </h3>
                     <p className="text-muted-foreground leading-relaxed">
                        {promise.description}
                     </p>
                  </div>
               ))}
            </div>

            {/* Mobile expand/collapse toggle */}
            <button
               type="button"
               onClick={() => setPromisesExpanded(prev => !prev)}
               className="md:hidden w-full mt-6 py-4 border border-champagne/30 text-sage text-sm tracking-widest uppercase hover:bg-champagne/5 transition-colors"
               style={{ minHeight: "44px" }}
            >
               {promisesExpanded ? p("showLess") : p("viewAll")}
            </button>

            <div className="text-center mt-16 md:mt-20 animate-fade-up" style={{ transitionDelay: "0.7s" }}>
               <Button
                  asChild
                  className="bg-charcoal hover:bg-charcoal/90 text-alabaster rounded-none px-10 py-5 text-sm tracking-widest uppercase btn-luxury group"
               >
                  <a href="#inquiry">
                     {t("cta")}
                     <span className="ms-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        <Icons.arrowRight />
                     </span>
                  </a>
               </Button>
            </div>
         </div>
      </section>
   );
}
