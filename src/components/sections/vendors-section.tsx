"use client";

import { useTranslations } from "next-intl";
import { Ornament } from "@/components/ornament";

export function VendorsSection() {
   const t = useTranslations("Vendors");

   const vendors = [
      { category: t("items.0.category"), names: t("items.0.names") },
      { category: t("items.1.category"), names: t("items.1.names") },
      { category: t("items.2.category"), names: t("items.2.names") },
      { category: t("items.3.category"), names: t("items.3.names") },
      { category: t("items.4.category"), names: t("items.4.names") },
      { category: t("items.5.category"), names: t("items.5.names") },
   ];

   return (
      <section className="py-20 md:py-28 px-6 bg-secondary/30 relative overflow-hidden">
         <div className="absolute -start-20 top-1/2 -translate-y-1/2 w-64 h-64 opacity-5">
            <svg viewBox="0 0 200 200" className="w-full h-full text-charcoal">
               <circle cx="100" cy="100" r="100" fill="none" stroke="currentColor" strokeWidth="0.5" />
               <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" />
               <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </svg>
         </div>

         <div className="max-w-5xl mx-auto relative">
            <div className="text-center mb-12 md:mb-16">
               <p className="text-sm tracking-widest uppercase text-sage mb-4 animate-fade-up">
                  {t("subtitle")}
               </p>
               <h2
                  className="font-serif-display heading-medium text-charcoal mb-4 animate-fade-up"
                  style={{ transitionDelay: "0.1s" }}
               >
                  {t("heading")}
               </h2>
               <Ornament className="animate-fade-up" style={{ transitionDelay: "0.15s" }} />
               <p
                  className="text-muted-foreground text-sm max-w-xl mx-auto animate-fade-up mt-4"
                  style={{ transitionDelay: "0.2s" }}
               >
                  {t("description")}
               </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               {vendors.map((vendor, index) => (
                  <div
                     key={vendor.category}
                     className="luxury-card p-6 animate-fade-up"
                     style={{ transitionDelay: `${0.3 + index * 0.05}s` }}
                  >
                     <p className="text-xs tracking-widest uppercase text-sage mb-2">
                        {vendor.category}
                     </p>
                     <p className="font-serif-display text-lg text-charcoal">
                        {vendor.names}
                     </p>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
}
