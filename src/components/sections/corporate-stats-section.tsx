"use client";

import { Fragment } from "react";
import { useTranslations } from "next-intl";
import { Icons } from "@/components/icons";
import { useAnimatedCounter } from "@/hooks/use-animated-counter";

export function CorporateStatsSection() {
   const t = useTranslations("CorporateEvents");

   const eventsCounter = useAnimatedCounter(150);
   const companiesCounter = useAnimatedCounter(50);
   const capacityCounter = useAnimatedCounter(1000);
   const satisfactionCounter = useAnimatedCounter(98);

   const stats = [
      {
         icon: Icons.calendar,
         value: eventsCounter.count,
         suffix: "+",
         label: t("stats.events"),
         ref: eventsCounter.ref,
      },
      {
         icon: Icons.bespoke,
         value: companiesCounter.count,
         suffix: "+",
         label: t("stats.companies"),
         ref: companiesCounter.ref,
      },
      {
         icon: Icons.dining,
         value: capacityCounter.count,
         suffix: "+",
         label: t("stats.capacity"),
         ref: capacityCounter.ref,
      },
      {
         icon: Icons.star,
         value: satisfactionCounter.count,
         suffix: "%",
         label: t("stats.satisfaction"),
         ref: satisfactionCounter.ref,
      },
   ];

   const trustItems = [
      { value: "#1", label: t("stats.trustBadges.0") },
      { value: "24h", label: t("stats.trustBadges.1") },
   ];

   return (
      <section className="py-24 md:py-32 px-6 stats-premium relative overflow-hidden">
         <div className="absolute top-0 start-0 end-0 h-px bg-gradient-to-r from-transparent via-champagne/30 to-transparent" />
         <div className="absolute bottom-0 start-0 end-0 h-px bg-gradient-to-r from-transparent via-champagne/30 to-transparent" />
         <div className="max-w-7xl mx-auto relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
               {stats.map((stat, index) => (
                  <div
                     key={stat.label}
                     ref={stat.ref}
                     className="stat-card animate-fade-up"
                     style={{ transitionDelay: `${index * 0.1}s` }}
                  >
                     <div className="icon-container-luxury">
                        <div className="text-champagne/70">
                           <stat.icon />
                        </div>
                     </div>
                     <bdi className="font-serif-display text-[clamp(1.5rem,3.5vw,3rem)] tracking-tighter text-alabaster mb-3 stat-value-glow block whitespace-nowrap">
                        {stat.value.toLocaleString()}
                        {stat.suffix}
                     </bdi>
                     <p className="text-champagne/70 text-sm tracking-[0.15em] uppercase font-light">
                        {stat.label}
                     </p>
                  </div>
               ))}
            </div>

            <div
               className="mt-14 flex flex-col items-center gap-6 md:gap-10 animate-fade-up"
               style={{ transitionDelay: "0.5s" }}
            >
               <h2 className="text-champagne/60 text-xs tracking-[0.3em] uppercase font-light">
                  {t("stats.heading1")}{" "}
                  <span className="italic text-champagne/80">
                     {t("stats.heading2")}
                  </span>{" "}
                  {t("stats.heading3")}
               </h2>
               <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
                  {trustItems.map((item, i) => (
                     <Fragment key={item.label}>
                        <div className="trust-badge">
                           <svg
                              className="w-4 h-4 text-sage"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                           >
                              {i === 0 ? (
                                 <>
                                    <circle cx="12" cy="8" r="6" />
                                    <path d="M15.477 12.89L17 22L12 19L7 22L8.523 12.89" />
                                 </>
                              ) : (
                                 <>
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 6V12L16 14" strokeLinecap="round" />
                                 </>
                              )}
                           </svg>
                           <span>
                              {item.value} {item.label}
                           </span>
                        </div>
                        {i === 0 && (
                           <div className="w-px h-6 bg-champagne/20 hidden md:block" />
                        )}
                     </Fragment>
                  ))}
                  <div className="w-px h-6 bg-champagne/20 hidden md:block" />
                  <div className="trust-badge">
                     <svg
                        className="w-4 h-4 text-sage"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                     >
                        <path d="M12 2L3 7V12C3 17.55 6.84 22.74 12 24C17.16 22.74 21 17.55 21 12V7L12 2Z" />
                        <path d="M9 12L11 14L15 10" strokeLinecap="round" strokeLinejoin="round" />
                     </svg>
                     <span>{t("stats.trustBadges.2")}</span>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}
