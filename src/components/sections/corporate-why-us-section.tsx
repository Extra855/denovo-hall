"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export function CorporateWhyUsSection() {
   const t = useTranslations("CorporateEvents");

   const items = [
      { icon: Icons.bespoke, title: t("whyUs.items.0.title"), description: t("whyUs.items.0.description") },
      { icon: Icons.speaker, title: t("whyUs.items.1.title"), description: t("whyUs.items.1.description") },
      { icon: Icons.diamond, title: t("whyUs.items.2.title"), description: t("whyUs.items.2.description") },
      { icon: Icons.dining, title: t("whyUs.items.3.title"), description: t("whyUs.items.3.description") },
   ];

   return (
      <section id="corporate-why-us" className="py-24 md:py-32 lg:py-40 px-6 bg-charcoal relative overflow-hidden">
         <div
            className="absolute inset-0 opacity-5"
            style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, #FAF9F6 1px, transparent 0)`,
               backgroundSize: "40px 40px",
            }}
         />

         <div className="max-w-6xl mx-auto relative">
            <div className="text-center mb-16 md:mb-24 animate-fade-up">
               <p className="text-champagne/60 text-xs tracking-[0.3em] uppercase mb-2">
                  {t("whyUs.subtitle")}
               </p>
               <h2 className="font-serif-display heading-large text-alabaster">
                  {t("whyUs.heading")}
               </h2>
               <div className="mt-8 h-px bg-gradient-to-r from-transparent via-champagne/20 to-transparent max-w-xs mx-auto" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12 mb-16 md:mb-20">
               {items.map((item, index) => (
                  <div
                     key={item.title}
                     className="text-center animate-fade-up group"
                     style={{ transitionDelay: `${0.2 + index * 0.1}s` }}
                  >
                     <div className="flex justify-center mb-4 md:mb-6 text-champagne group-hover:text-peach transition-colors duration-500">
                        <item.icon />
                     </div>
                     <h3 className="font-serif-display text-base md:text-xl text-alabaster mb-3 md:mb-4">
                        {item.title}
                     </h3>
                     <p className="text-alabaster/50 text-xs md:text-sm">
                        {item.description}
                     </p>
                  </div>
               ))}
            </div>

            <div className="text-center animate-fade-up" style={{ transitionDelay: "0.7s" }}>
               <Button
                  asChild
                  className="bg-alabaster hover:bg-champagne text-charcoal rounded-none px-10 py-5 text-sm tracking-widest uppercase btn-luxury group"
               >
                  <a href="#corporate-inquiry">
                     {t("whyUs.cta")}
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
