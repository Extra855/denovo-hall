"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Ornament } from "@/components/ornament";

export function PlanningTipsSection() {
   const t = useTranslations("PlanningTips");

   const tips = [
      { number: "01", title: t("items.0.title"), description: t("items.0.description"), icon: "calendar" },
      { number: "02", title: t("items.1.title"), description: t("items.1.description"), icon: "bespoke" },
      { number: "03", title: t("items.2.title"), description: t("items.2.description"), icon: "dining" },
      { number: "04", title: t("items.3.title"), description: t("items.3.description"), icon: "privacy" },
   ];

   return (
      <section className="py-24 md:py-32 px-6 bg-charcoal relative overflow-hidden">
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
            <div className="text-center mb-16 md:mb-20">
               <p className="text-sm tracking-widest uppercase text-champagne mb-4 animate-fade-up">
                  {t("subtitle")}
               </p>
               <h2
                  className="font-serif-display heading-large text-alabaster mb-6 animate-fade-up"
                  style={{ transitionDelay: "0.1s" }}
               >
                  {t("heading")}
               </h2>
               <Ornament className="animate-fade-up" style={{ transitionDelay: "0.15s" }} />
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
               {tips.map((tip, index) => (
                  <div
                     key={tip.number}
                     className="flex gap-6 animate-fade-up group"
                     style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
                  >
                     <div className="shrink-0">
                        <div className="w-16 h-16 rounded-full border-2 border-champagne/50 flex items-center justify-center font-serif-display text-xl text-champagne group-hover:border-champagne group-hover:bg-champagne/10 transition-all duration-500">
                           {tip.number}
                        </div>
                     </div>
                     <div className="pt-1">
                        <h3 className="font-serif-display text-xl text-alabaster mb-3">
                           {tip.title}
                        </h3>
                        <p className="text-alabaster/60 leading-relaxed">
                           {tip.description}
                        </p>
                     </div>
                  </div>
               ))}
            </div>

            <div className="text-center mt-16 animate-fade-up" style={{ transitionDelay: "0.7s" }}>
               <Button
                  asChild
                  className="bg-champagne hover:bg-champagne/90 text-charcoal rounded-none px-10 py-5 text-sm tracking-widest uppercase btn-luxury btn-raised group"
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
