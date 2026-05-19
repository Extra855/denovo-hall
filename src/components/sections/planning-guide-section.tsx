"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export function PlanningGuideSection() {
   const t = useTranslations("Journey");
   const pt = useTranslations("PlanningTips");
   const [expandedTips, setExpandedTips] = useState<Set<number>>(new Set());

   const steps = [
      {
         number: "01",
         title: t("items.0.title"),
         description: t("items.0.description"),
         duration: t("items.0.duration"),
      },
      {
         number: "02",
         title: t("items.1.title"),
         description: t("items.1.description"),
         duration: t("items.1.duration"),
      },
      {
         number: "03",
         title: t("items.2.title"),
         description: t("items.2.description"),
         duration: t("items.2.duration"),
      },
      {
         number: "04",
         title: t("items.3.title"),
         description: t("items.3.description"),
         duration: t("items.3.duration"),
      },
   ];

   const tips = [
      {
         number: "01",
         title: pt("items.0.title"),
         description: pt("items.0.description"),
      },
      {
         number: "02",
         title: pt("items.1.title"),
         description: pt("items.1.description"),
      },
      {
         number: "03",
         title: pt("items.2.title"),
         description: pt("items.2.description"),
      },
      {
         number: "04",
         title: pt("items.3.title"),
         description: pt("items.3.description"),
      },
   ];

   const toggleTip = (index: number) => {
      setExpandedTips((prev) => {
         const next = new Set(prev);
         if (next.has(index)) next.delete(index);
         else next.add(index);
         return next;
      });
   };

   return (
      <section className="py-24 md:py-32 lg:py-40 px-6 bg-charcoal relative overflow-hidden">
         <div
            className="absolute inset-0 opacity-5"
            style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, #FAF9F6 1px, transparent 0)`,
               backgroundSize: "40px 40px",
            }}
         />
         <div className="absolute top-20 start-10 opacity-10 animate-float">
            <Icons.leaf />
         </div>
         <div
            className="absolute bottom-20 end-10 opacity-10 animate-float"
            style={{ animationDelay: "3s" }}
         >
            <Icons.leaf />
         </div>

         <div className="max-w-6xl mx-auto relative">
            {/* Journey — steps open directly, thin label above */}
            <div className="mb-16 md:mb-24">
               <div className="flex items-center gap-4 mb-10 animate-fade-up">
                  <p className="text-champagne/60 text-xs tracking-[0.3em] uppercase">
                     {t("subtitle")}
                  </p>
                  <div className="flex-1 h-px bg-gradient-to-r from-champagne/20 to-transparent" />
               </div>
               <h2
                  className="font-serif-display heading-large text-alabaster mb-12 animate-fade-up"
                  style={{ transitionDelay: "0.1s" }}
               >
                  {t("heading")}
               </h2>
            </div>

            {/* Journey steps — horizontal snap carousel on mobile */}
            <div className="relative mb-20 md:mb-28">
               <div className="hidden md:block absolute top-8 start-0 end-0 h-px bg-gradient-to-r from-transparent via-champagne to-transparent" />
               <div className="flex md:grid md:grid-cols-4 gap-8 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-6 md:px-0 -mx-6 md:mx-0">
                  {steps.map((step, index) => (
                     <div
                        key={step.number}
                        className="relative animate-fade-up shrink-0 w-[80vw] md:w-auto snap-start"
                        style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
                     >
                        <div className="bg-champagne/10 border border-champagne/20 rounded-sm p-6 md:bg-transparent md:border-0 md:p-0 md:rounded-none">
                           <div className="flex md:flex-col items-center md:items-center gap-4 md:gap-0 md:text-center">
                              <div className="w-16 h-16 rounded-full border-2 border-champagne bg-charcoal flex items-center justify-center font-serif-display text-2xl text-alabaster shrink-0 relative z-10 shadow-sm">
                                 {step.number}
                              </div>
                              <div className="flex-1 md:mt-6">
                                 <h3 className="font-serif-display text-lg text-alabaster mb-2">
                                    {step.title}
                                 </h3>
                                 <p className="text-alabaster/60 text-sm leading-relaxed mb-3">
                                    {step.description}
                                 </p>
                                 <span className="text-xs tracking-wider text-champagne/70 uppercase">
                                    {step.duration}
                                 </span>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* Tips — side-aligned heading, no centered block */}
            <div className="grid md:grid-cols-12 gap-8 md:gap-12 mb-12 md:mb-16">
               <div className="md:col-span-4 animate-fade-up">
                  <div className="md:sticky md:top-32">
                     <p className="text-champagne/60 text-xs tracking-[0.3em] uppercase mb-3">
                        {pt("subtitle")}
                     </p>
                     <h2 className="font-serif-display heading-medium text-alabaster">
                        {pt("heading")}
                     </h2>
                  </div>
               </div>
               <div className="md:col-span-8" />
            </div>

            {/* Tips grid — line-clamped cards with per-card expand */}
            <div className="grid md:grid-cols-2 gap-5 md:gap-12">
               {tips.map((tip, index) => {
                  const isExpanded = expandedTips.has(index);
                  return (
                     <div
                        key={tip.number}
                        className="flex gap-5 md:gap-12 animate-fade-up group"
                        style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
                     >
                        <div className="shrink-0">
                           <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-champagne/50 flex items-center justify-center font-serif-display text-xl text-champagne group-hover:border-champagne group-hover:bg-champagne/10 transition-all duration-500">
                              {tip.number}
                           </div>
                        </div>
                        <div className="pt-1">
                           <h3 className="font-serif-display text-xl text-alabaster mb-3">
                              {tip.title}
                           </h3>
                           <p
                              className={`text-alabaster/60 leading-relaxed ${!isExpanded ? "line-clamp-2" : ""}`}
                           >
                              {tip.description}
                           </p>
                           <button
                              type="button"
                              onClick={() => toggleTip(index)}
                              className="text-champagne/70 text-xs tracking-wider uppercase mt-2 hover:text-champagne transition-colors"
                              style={{
                                 minHeight: "44px",
                                 minWidth: "44px",
                                 display: "inline-flex",
                                 alignItems: "center",
                              }}
                           >
                              {isExpanded ? pt("readLess") : pt("readMore")}
                           </button>
                        </div>
                     </div>
                  );
               })}
            </div>

            <div
               className="text-center mt-16 animate-fade-up"
               style={{ transitionDelay: "0.7s" }}
            >
               <Button
                  asChild
                  className="bg-champagne hover:bg-champagne/90 text-charcoal rounded-none px-10 py-5 text-sm tracking-widest uppercase btn-luxury btn-raised group"
               >
                  <a href="#inquiry">
                     {pt("cta")}
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
