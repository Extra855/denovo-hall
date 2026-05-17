"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Ornament } from "@/components/ornament";

export function JourneySection() {
   const t = useTranslations("Journey");

   const steps = [
      { number: "01", title: t("items.0.title"), description: t("items.0.description"), duration: t("items.0.duration") },
      { number: "02", title: t("items.1.title"), description: t("items.1.description"), duration: t("items.1.duration") },
      { number: "03", title: t("items.2.title"), description: t("items.2.description"), duration: t("items.2.duration") },
      { number: "04", title: t("items.3.title"), description: t("items.3.description"), duration: t("items.3.duration") },
   ];

   return (
      <section className="py-24 md:py-32 lg:py-40 px-6 bg-alabaster relative overflow-hidden">
         <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, #2C2C2C 1px, transparent 0)`,
               backgroundSize: "40px 40px",
            }}
         />
         <div className="max-w-6xl mx-auto relative">
            <div className="text-center mb-16 md:mb-24">
               <p className="text-sm tracking-widest uppercase text-sage mb-4 animate-fade-up">
                  {t("subtitle")}
               </p>
               <h2
                  className="font-serif-display heading-large text-charcoal mb-6 animate-fade-up"
                  style={{ transitionDelay: "0.1s" }}
               >
                  {t("heading")}
               </h2>
               <Ornament className="animate-fade-up" style={{ transitionDelay: "0.15s" }} />
               <p
                  className="text-muted-foreground body-regular max-w-2xl mx-auto animate-fade-up mt-6"
                  style={{ transitionDelay: "0.2s" }}
               >
                  {t("description")}
               </p>
            </div>

            <div className="relative">
               <div className="hidden md:block absolute top-8 start-0 end-0 h-px bg-gradient-to-r from-transparent via-champagne to-transparent" />
               <div className="grid md:grid-cols-4 gap-8 md:gap-6">
                  {steps.map((step, index) => (
                     <div
                        key={step.number}
                        className="relative animate-fade-up"
                        style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
                     >
                        <div className="flex md:flex-col items-center md:items-center gap-4 md:gap-0 md:text-center">
                           <div className="w-16 h-16 rounded-full border-2 border-champagne bg-alabaster flex items-center justify-center font-serif-display text-2xl text-charcoal shrink-0 relative z-10 shadow-sm">
                              {step.number}
                           </div>
                           <div className="flex-1 md:mt-6">
                              <h3 className="font-serif-display text-lg text-charcoal mb-2">
                                 {step.title}
                              </h3>
                              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                                 {step.description}
                              </p>
                              <span className="text-xs tracking-wider text-sage uppercase">
                                 {step.duration}
                              </span>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            <div className="text-center mt-16 animate-fade-up" style={{ transitionDelay: "0.7s" }}>
               <Button
                  asChild
                  variant="outline"
                  className="rounded-none border-charcoal/20 text-charcoal hover:bg-charcoal hover:text-alabaster px-8 py-5 text-sm tracking-widest uppercase transition-all duration-500"
               >
                  <a href="#inquiry">{t("cta")}</a>
               </Button>
            </div>
         </div>
      </section>
   );
}
