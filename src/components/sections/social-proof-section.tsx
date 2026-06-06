"use client";

import { Fragment } from "react";
import { useTranslations } from "next-intl";
import { Icons } from "@/components/icons";
import { useAnimatedCounter } from "@/hooks/use-animated-counter";

export function SocialProofSection() {
   const t = useTranslations("Statistics");
   const sp = useTranslations("SocialProof");

   const weddingsCounter = useAnimatedCounter(300);
   const yearsCounter = useAnimatedCounter(2);
   const guestsCounter = useAnimatedCounter(250000);
   const ratingCounter = useAnimatedCounter(4.3);

   const stats = [
      {
         icon: Icons.heart,
         value: weddingsCounter.count,
         suffix: "+",
         label: t("weddings"),
         ref: weddingsCounter.ref,
      },
      {
         icon: Icons.calendar,
         value: yearsCounter.count,
         suffix: "+",
         label: t("years"),
         ref: yearsCounter.ref,
      },
      {
         icon: Icons.ring,
         value: guestsCounter.count,
         suffix: "+",
         label: t("guests"),
         ref: guestsCounter.ref,
      },
      {
         icon: Icons.star,
         value: ratingCounter.count,
         suffix: "",
         label: t("rating"),
         ref: ratingCounter.ref,
      },
   ];

   const trustItems = [
      { value: "#1", label: sp("weddingVenue") },
      { value: "100%", label: sp("satisfaction") },
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

                     {/* <div className="font-serif-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-alabaster mb-3 stat-value-glow">
                        {stat.value.toLocaleString()}
                        {stat.suffix}
                     </div> */}
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
                  {t("heading1")}{" "}
                  <span className="italic text-champagne/80">
                     {t("heading2")}
                  </span>{" "}
                  {t("heading3")}
               </h2>
               <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
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
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
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
         </div>
      </section>
   );
}
