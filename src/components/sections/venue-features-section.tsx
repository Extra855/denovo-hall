"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useAnimatedCounter } from "@/hooks/use-animated-counter";


function CapacityBlock({ t }: { t: ReturnType<typeof useTranslations> }) {
   const { count, ref } = useAnimatedCounter(1000);
   return (
      <div className="text-center md:text-end">
         <div className="flex justify-center md:justify-end mb-4">
            <div className="w-16 h-px bg-champagne" />
         </div>
         <div ref={ref} className="animate-fade-up">
            <div className="font-serif-display text-5xl md:text-6xl text-peach stat-value-glow mb-2">
               {count.toLocaleString()}
            </div>
         </div>
         <p className="text-alabaster/60 text-sm tracking-widest uppercase mb-3 animate-fade-up" style={{ transitionDelay: "0.1s" }}>
            {t("capacity.totalLabel")}
         </p>
         <p className="text-alabaster/40 text-sm animate-fade-up" style={{ transitionDelay: "0.3s" }}>
            {t("capacity.distribution")}
         </p>
      </div>
   );
}

function PanoramicHallBlock({ t }: { t: ReturnType<typeof useTranslations> }) {
   return (
      <div className="animate-fade-up">
         <div className="flex items-center gap-4 mb-2">
            <div className="w-8 h-px bg-champagne" />
            <p className="text-sm tracking-widest uppercase text-sage">
               {t("panoramicHall.subtitle")}
            </p>
         </div>
         <h3 className="font-serif-display text-3xl md:text-4xl text-alabaster mb-4">
            {t("panoramicHall.heading")}
         </h3>
         <p className="text-alabaster/60 leading-relaxed mb-6">
            {t("panoramicHall.description")}
         </p>
         <div className="aspect-video bg-alabaster/5 border border-alabaster/10 flex items-center justify-center">
            <div className="text-alabaster/20 text-center">
               <Icons.bridge />
               <p className="text-xs mt-2 tracking-widest uppercase">Panoramic View Placeholder</p>
            </div>
         </div>
      </div>
   );
}

export function VenueFeaturesSection() {
   const t = useTranslations("VenueFeatures");

   const suiteIcons = [Icons.bridge, Icons.heart, Icons.ring, Icons.sparkle];
   const facilityIcons = [Icons.prayer, Icons.accessibility, Icons.diamond];

   return (
      <section id="features" className="py-24 md:py-32 lg:py-40 px-6 bg-charcoal relative overflow-hidden">
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
               <h2 className="font-serif-display heading-large text-alabaster">
                  {t("heading")}
               </h2>
            </div>

            {/* Capacity Stats & Panoramic Hall */}
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 mb-20 md:mb-28 items-center">
               <CapacityBlock t={t} />
               <PanoramicHallBlock t={t} />
            </div>

            {/* Glass Bridge Hero */}
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 mb-20 md:mb-28 items-center">
               <div className="animate-fade-up order-2 md:order-1">
                  <div className="flex items-center gap-4 mb-2">
                     <div className="w-8 h-px bg-champagne" />
                     <p className="text-sm tracking-widest uppercase text-sage">
                        {t("glassBridge.subtitle")}
                     </p>
                  </div>
                  <h3 className="font-serif-display text-3xl md:text-4xl text-alabaster mb-4">
                     {t("glassBridge.heading")}
                  </h3>
                  <p className="text-alabaster/60 leading-relaxed mb-6">
                     {t("glassBridge.description")}
                  </p>
                  <ul className="space-y-3">
                     {[0, 1, 2].map((i) => (
                        <li key={i} className="flex items-start gap-3">
                           <span className="text-champagne mt-0.5 shrink-0">
                              <Icons.check />
                           </span>
                           <span className="text-alabaster/70 text-sm">
                              {t(`glassBridge.items.${i}`)}
                           </span>
                        </li>
                     ))}
                  </ul>
               </div>
               <div className="order-1 md:order-2 animate-fade-up">
                  <div className="aspect-[4/3] bg-alabaster/5 border border-alabaster/10 flex items-center justify-center">
                     <div className="text-alabaster/20 text-center">
                        <Icons.bridge />
                        <p className="text-xs mt-2 tracking-widest uppercase">Image Placeholder</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Bridal Suites Grid */}
            <div className="mb-16 md:mb-24">
               <div className="mb-12 animate-fade-up">
                  <div className="flex items-center gap-4 mb-2">
                     <div className="w-8 h-px bg-champagne" />
                     <p className="text-sm tracking-widest uppercase text-sage">
                        {t("suites.subtitle")}
                     </p>
                  </div>
                  <h3 className="font-serif-display heading-medium text-alabaster">
                     {t("suites.heading")}
                  </h3>
               </div>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {[0, 1, 2, 3].map((i) => {
                     const Icon = suiteIcons[i];
                     return (
                        <div
                           key={i}
                           className="glass-card p-6 md:p-8 text-center animate-fade-up group"
                           style={{ transitionDelay: `${0.2 + i * 0.1}s` }}
                        >
                           <div className="flex justify-center mb-4 text-champagne/60 group-hover:text-champagne transition-colors duration-500">
                              <Icon />
                           </div>
                           <h4 className="font-serif-display text-lg text-alabaster mb-2">
                              {t(`suites.items.${i}.title`)}
                           </h4>
                           <p className="text-alabaster/50 text-sm leading-relaxed">
                              {t(`suites.items.${i}.description`)}
                           </p>
                        </div>
                     );
                  })}
               </div>
            </div>

            {/* Facilities Row */}
            <div className="mb-16 md:mb-24">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  {[0, 1, 2].map((i) => {
                     const Icon = facilityIcons[i];
                     return (
                        <div
                           key={i}
                           className="glass-card p-6 md:p-8 flex items-start gap-4 animate-fade-up"
                           style={{ transitionDelay: `${0.2 + i * 0.1}s` }}
                        >
                           <div className="text-champagne/60 shrink-0 mt-1">
                              <Icon />
                           </div>
                           <div>
                              <h4 className="font-serif-display text-lg text-alabaster mb-2">
                                 {t(`facilities.items.${i}.title`)}
                              </h4>
                              <p className="text-alabaster/50 text-sm leading-relaxed">
                                 {t(`facilities.items.${i}.description`)}
                              </p>
                           </div>
                        </div>
                     );
                  })}
               </div>
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
