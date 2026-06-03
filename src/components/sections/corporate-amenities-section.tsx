"use client";

import { useTranslations } from "next-intl";
import { Icons } from "@/components/icons";

export function CorporateAmenitiesSection() {
   const t = useTranslations("CorporateEvents");

   const categoryIcons = [Icons.speaker, Icons.dining, Icons.chair];

   const categories = ["technology", "catering", "furniture"] as const;
   const itemCounts = [5, 5, 4] as const;

   return (
      <section id="corporate-amenities" className="py-24 md:py-32 lg:py-40 px-6 bg-charcoal relative overflow-hidden">
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
                  {t("amenities.subtitle")}
               </p>
               <h2 className="font-serif-display heading-large text-alabaster mb-4">
                  {t("amenities.heading")}
               </h2>
               <p className="text-alabaster/50 body-regular max-w-lg">
                  {t("amenities.description")}
               </p>
            </div>

            {/* Amenity Categories Grid */}
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
               {categories.map((cat, ci) => {
                  const Icon = categoryIcons[ci];
                  const itemCount = itemCounts[ci];
                  return (
                     <div
                        key={cat}
                        className="border border-champagne/20 p-8 md:p-10 animate-fade-up bg-gradient-to-b from-champagne/5 to-transparent"
                        style={{ transitionDelay: `${0.2 + ci * 0.1}s` }}
                     >
                        <div className="flex items-center gap-3 mb-6">
                           <span className="text-champagne"><Icon /></span>
                           <h3 className="font-serif-display text-xl text-alabaster">
                              {t(`amenities.categories.${cat}.title`)}
                           </h3>
                        </div>
                        <ul className="space-y-1">
                           {Array.from({ length: itemCount }, (_, i) => (
                              <li key={i} className="amenity-item">
                                 <span className="text-champagne shrink-0">
                                    <Icons.check />
                                 </span>
                                 <span className="text-alabaster/60 text-sm">
                                    {t(`amenities.categories.${cat}.items.${i}`)}
                                 </span>
                              </li>
                           ))}
                        </ul>
                     </div>
                  );
               })}
            </div>
         </div>
      </section>
   );
}
