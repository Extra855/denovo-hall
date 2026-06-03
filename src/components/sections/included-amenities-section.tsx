"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

export function IncludedAmenitiesSection() {
   const t = useTranslations("IncludedAmenities");

   const categoryIcons = [Icons.chair, Icons.speaker, Icons.kitchen];

   return (
      <section id="amenities" className="py-24 md:py-32 lg:py-40 px-6 bg-charcoal relative overflow-hidden">
         <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, #FAF9F6 1px, transparent 0)`,
               backgroundSize: "40px 40px",
            }}
         />

         <div className="max-w-6xl mx-auto relative">
            {/* Section Header */}
            <div className="mb-16 md:mb-24 animate-fade-up">
               <div className="w-16 h-px bg-champagne mb-6" />
               <p className="text-sm tracking-widest uppercase text-sage mb-2">
                  {t("subtitle")}
               </p>
               <h2 className="font-serif-display heading-large text-alabaster mb-4">
                  {t("heading")}
               </h2>
               <p className="text-alabaster/50 body-regular max-w-lg">
                  {t("description")}
               </p>
            </div>

            {/* Amenity Categories Grid */}
            <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-20 md:mb-28">
               {(["furniture", "systems", "kitchen"] as const).map((cat, ci) => {
                  const Icon = categoryIcons[ci];
                  const itemKeys = cat === "furniture" ? 6 : cat === "systems" ? 5 : 4;
                  return (
                     <div
                        key={cat}
                        className={cn(
                           "border border-champagne/20 p-8 md:p-10 animate-fade-up",
                           "bg-gradient-to-b from-champagne/5 to-transparent"
                        )}
                        style={{ transitionDelay: `${0.2 + ci * 0.1}s` }}
                     >
                        <div className="flex items-center gap-3 mb-6">
                           <span className="text-champagne"><Icon /></span>
                           <h3 className="font-serif-display text-xl text-alabaster">
                              {t(`categories.${cat}.title`)}
                           </h3>
                        </div>
                        <ul className="space-y-1">
                           {Array.from({ length: itemKeys }, (_, i) => (
                              <li key={i} className="amenity-item">
                                 <span className="text-champagne shrink-0">
                                    <Icons.check />
                                 </span>
                                 <span className="text-alabaster/60 text-sm">
                                    {t(`categories.${cat}.items.${i}`)}
                                 </span>
                              </li>
                           ))}
                        </ul>
                     </div>
                  );
               })}
            </div>

            {/* Stage Options */}
            <div className="mb-20 md:mb-28">
               <div className="mb-12 animate-fade-up">
                  <div className="flex items-center gap-4 mb-2">
                     <div className="w-8 h-px bg-champagne" />
                     <p className="text-sm tracking-widest uppercase text-sage">
                        {t("stages.subtitle")}
                     </p>
                  </div>
                  <h3 className="font-serif-display heading-medium text-alabaster">
                     {t("stages.heading")}
                  </h3>
               </div>

               <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                  {[0, 1, 2].map((i) => {
                     const isHighlighted = i === 1;
                     return (
                        <div
                           key={i}
                           className={cn(
                              "p-8 md:p-10 text-center animate-fade-up relative",
                              isHighlighted ? "premium-card" : "stage-highlight"
                           )}
                           style={{ transitionDelay: `${0.2 + i * 0.1}s` }}
                        >
                           {isHighlighted && (
                              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                 <span className="luxury-tag bg-champagne text-charcoal px-4 py-1 text-xs tracking-widest uppercase">
                                    {t(`stages.items.${i}.badge`)}
                                 </span>
                              </div>
                           )}
                           {!isHighlighted && (
                              <span className="inline-block luxury-tag bg-alabaster/10 text-alabaster/70 px-4 py-1 text-xs tracking-widest uppercase mb-6">
                                 {t(`stages.items.${i}.badge`)}
                              </span>
                           )}
                           <h4 className="font-serif-display text-2xl text-alabaster mb-2 mt-4">
                              {t(`stages.items.${i}.tier`)}
                           </h4>
                           <p className="font-serif-display text-xl text-champagne mb-4">
                              {t(`stages.items.${i}.price`)}
                           </p>
                           <p className="text-alabaster/50 text-sm leading-relaxed">
                              {t(`stages.items.${i}.description`)}
                           </p>
                        </div>
                     );
                  })}
               </div>
               <p className="text-center text-alabaster/40 text-sm mt-6 animate-fade-up">
                  {t("stages.consultation")}
               </p>
            </div>

            {/* Off-Season Offer Banner */}
            <div className="offer-banner p-8 md:p-12 mb-20 md:mb-28 animate-fade-up">
               <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-start">
                     <span className="inline-block luxury-tag bg-champagne/20 text-champagne px-4 py-1 text-xs tracking-widest uppercase mb-4">
                        {t("offer.badge")}
                     </span>
                     <h3 className="font-serif-display text-3xl md:text-4xl text-alabaster mb-1">
                        {t("offer.heading")}
                     </h3>
                     <p className="font-serif-display text-4xl md:text-5xl text-champagne">
                        {t("offer.discount")}
                     </p>
                  </div>
                  <div className="text-center md:text-end">
                     <p className="text-alabaster/40 text-xs tracking-widest uppercase mb-2">
                        {t("offer.badge")}
                     </p>
                     <p className="text-alabaster/70 text-lg">{t("offer.months")}</p>
                  </div>
               </div>
            </div>

            {/* Value Comparison */}
            <div className="mb-16 md:mb-24">
               <div className="mb-12 animate-fade-up">
                  <div className="flex items-center gap-4 mb-2">
                     <div className="w-8 h-px bg-champagne" />
                     <p className="text-sm tracking-widest uppercase text-sage">
                        {t("value.subtitle")}
                     </p>
                  </div>
                  <h3 className="font-serif-display heading-medium text-alabaster">
                     {t("value.heading")}
                  </h3>
               </div>

               <div className="grid md:grid-cols-2 gap-0 md:gap-0">
                  {/* Other Venues Column */}
                  <div className="border border-alabaster/10 p-6 md:p-8 animate-fade-up">
                     <h4 className="font-serif-display text-lg text-alabaster/40 mb-6 text-center">
                        {t("value.othersLabel")}
                     </h4>
                     <ul className="space-y-4">
                        {Array.from({ length: 6 }, (_, i) => (
                           <li key={i} className="flex items-center justify-between gap-4">
                              <span className="text-alabaster/40 text-sm">{t(`value.items.${i}.item`)}</span>
                              <span className="text-red-400/60 text-sm font-medium">{t(`value.items.${i}.othersPrice`)}</span>
                           </li>
                        ))}
                     </ul>
                  </div>

                  {/* De Novo Column */}
                  <div className="value-column-highlight p-6 md:p-8 animate-fade-up">
                     <h4 className="font-serif-display text-lg text-champagne mb-6 text-center">
                        {t("value.oursLabel")}
                     </h4>
                     <ul className="space-y-4">
                        {Array.from({ length: 6 }, (_, i) => (
                           <li key={i} className="flex items-center justify-between gap-4">
                              <span className="text-alabaster/60 text-sm">{t(`value.items.${i}.item`)}</span>
                              <span className="flex items-center gap-1 text-champagne text-sm font-medium">
                                 <Icons.check />
                                 {t("value.included")}
                              </span>
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>

               <p className="text-center text-alabaster/40 text-sm mt-8 animate-fade-up">
                  {t("value.footer")}
               </p>
            </div>

            {/* CTA */}
            <div className="text-center animate-fade-up" style={{ transitionDelay: "0.5s" }}>
               <Button
                  asChild
                  className="bg-alabaster hover:bg-champagne text-charcoal rounded-none px-10 py-5 text-sm tracking-widest uppercase btn-luxury group"
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
