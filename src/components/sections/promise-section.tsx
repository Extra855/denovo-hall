"use client";

import { useTranslations } from "next-intl";
import { Ornament } from "@/components/ornament";

export function PromiseSection() {
   const t = useTranslations("Promise");

   const promises = [
      { title: t("items.0.title"), description: t("items.0.description") },
      { title: t("items.1.title"), description: t("items.1.description") },
      { title: t("items.2.title"), description: t("items.2.description") },
      { title: t("items.3.title"), description: t("items.3.description") },
      { title: t("items.4.title"), description: t("items.4.description") },
   ];

   return (
      <section className="py-24 md:py-32 px-6 bg-alabaster relative overflow-hidden">
         <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, #2C2C2C 1px, transparent 0)`,
               backgroundSize: "40px 40px",
            }}
         />
         <div className="max-w-6xl mx-auto relative">
            <div className="text-center mb-12 md:mb-16">
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               {promises.map((promise, index) => (
                  <div
                     key={promise.title}
                     className="promise-card animate-fade-up"
                     style={{ transitionDelay: `${0.3 + index * 0.08}s` }}
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
         </div>
      </section>
   );
}
