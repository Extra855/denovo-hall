"use client";

import { useTranslations } from "next-intl";
import { Icons } from "@/components/icons";
import { useAnimatedCounter } from "@/hooks/use-animated-counter";

export function StatisticsSection() {
   const t = useTranslations("Statistics");
   const weddingsCounter = useAnimatedCounter(300);
   const yearsCounter = useAnimatedCounter(3);
   const guestsCounter = useAnimatedCounter(250000);
   const ratingCounter = useAnimatedCounter(4.3);

   const stats = [
      {
         icon: Icons.heart,
         value: weddingsCounter.count,
         suffix: "+",
         label: t("weddings"),
         highlight: "300+",
      },
      {
         icon: Icons.calendar,
         value: yearsCounter.count,
         suffix: "+",
         label: t("years"),
         highlight: "3+",
      },
      {
         icon: Icons.ring,
         value: guestsCounter.count,
         suffix: "+",
         label: t("guests"),
         highlight: "250,00+",
      },
      {
         icon: Icons.star,
         value: ratingCounter.count,
         suffix: "",
         label: t("rating"),
         highlight: "4.3",
      },
   ];

   return (
      <section className="py-24 md:py-32 px-6 stats-premium relative overflow-hidden">
         <div className="absolute top-0 start-0 end-0 h-px bg-gradient-to-r from-transparent via-champagne/30 to-transparent" />
         <div className="absolute bottom-0 start-0 end-0 h-px bg-gradient-to-r from-transparent via-champagne/30 to-transparent" />
         <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-12 md:mb-16 animate-fade-up">
               <p className="text-champagne/80 text-xs tracking-[0.3em] uppercase mb-4">
                  {t("subtitle")}
               </p>
               <h2 className="font-serif-display text-3xl md:text-4xl text-alabaster mb-4">
                  {t("heading1")}{" "}
                  <span className="italic text-champagne">{t("heading2")}</span>{" "}
                  {t("heading3")}
               </h2>
               <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-px bg-gradient-to-r from-transparent to-champagne/50" />
                  <svg
                     width="8"
                     height="8"
                     viewBox="0 0 8 8"
                     fill="none"
                     className="text-champagne/60"
                  >
                     <circle
                        cx="4"
                        cy="4"
                        r="3"
                        stroke="currentColor"
                        strokeWidth="1"
                     />
                  </svg>
                  <div className="w-12 h-px bg-gradient-to-l from-transparent to-champagne/50" />
               </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
               {stats.map((stat, index) => (
                  <div
                     key={stat.label}
                     ref={
                        stat.icon === Icons.heart
                           ? weddingsCounter.ref
                           : stat.icon === Icons.calendar
                             ? yearsCounter.ref
                             : stat.icon === Icons.ring
                               ? guestsCounter.ref
                               : ratingCounter.ref
                     }
                     className="stat-card animate-fade-up"
                     style={{ transitionDelay: `${index * 0.1}s` }}
                  >
                     <div className="icon-container-luxury">
                        <div className="text-champagne/70">
                           <stat.icon />
                        </div>
                     </div>
                     <div className="font-serif-display text-4xl md:text-5xl lg:text-6xl text-alabaster mb-3 stat-value-glow">
                        {stat.value.toLocaleString()}
                        {stat.suffix}
                     </div>
                     <p className="text-champagne/70 text-sm tracking-[0.15em] uppercase font-light">
                        {stat.label}
                     </p>
                  </div>
               ))}
            </div>
            <div
               className="mt-16 flex flex-wrap items-center justify-center gap-6 md:gap-10 animate-fade-up"
               style={{ transitionDelay: "0.5s" }}
            >
               <div className="flex items-center gap-2 text-champagne/60">
                  <div className="flex gap-0.5">
                     {[...Array(5)].map((_, i) => (
                        <svg
                           key={i}
                           className="w-4 h-4 star-shine"
                           viewBox="0 0 20 20"
                           fill="currentColor"
                           style={{ animationDelay: `${i * 0.2}s` }}
                        >
                           <path d="M10 2L11.545 7.09H17L12.727 9.91L14.272 15L10 12.18L5.728 15L7.273 9.91L3 7.09H8.455L10 2Z" />
                        </svg>
                     ))}
                  </div>
                  <span className="text-xs tracking-wider">
                     {t("googleReviews")}
                  </span>
               </div>
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
                     <path
                        d="M9 12L11 14L15 10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                  </svg>
                  <span>{t("licensedInsured")}</span>
               </div>
               <div className="w-px h-6 bg-champagne/20 hidden md:block" />
               <div className="trust-badge">
                  <svg
                     className="w-4 h-4 text-sage"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2"
                  >
                     <circle cx="12" cy="12" r="10" />
                     <path d="M12 6V12L16 14" strokeLinecap="round" />
                  </svg>
                  <span>{t("support")}</span>
               </div>
            </div>
         </div>
      </section>
   );
}
