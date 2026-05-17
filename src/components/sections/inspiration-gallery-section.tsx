"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Ornament } from "@/components/ornament";
import { BlurImage } from "@/components/blur-image";

export function InspirationGallerySection() {
   const t = useTranslations("InspirationGallery");

   const inspirations = [
      { id: 1, title: t("items.0.title"), image: "/romantic.jpg", description: t("items.0.description") },
      { id: 2, title: t("items.1.title"), image: "/garden.jpg", description: t("items.1.description") },
      { id: 3, title: t("items.2.title"), image: "/vintage.jpg", description: t("items.2.description") },
      { id: 4, title: t("items.3.title"), image: "/glam.jpg", description: t("items.3.description") },
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
         <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-12 md:mb-16">
               <p className="text-sm tracking-widest uppercase text-sage mb-4 animate-fade-up">
                  {t("subtitle")}
               </p>
               <h2
                  className="font-serif-display heading-large text-charcoal mb-6 animate-fade-up"
                  style={{ transitionDelay: "0.1s" }}
               >
                  {t("heading1")}{" "}
                  <span className="italic text-champagne">{t("heading2")}</span>
               </h2>
               <Ornament className="mb-6 animate-fade-up" style={{ transitionDelay: "0.15s" }} />
               <p
                  className="text-muted-foreground body-regular max-w-2xl mx-auto animate-fade-up"
                  style={{ transitionDelay: "0.2s" }}
               >
                  {t("description")}
               </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
               {inspirations.map((item, index) => (
                  <div
                     key={item.id}
                     className="inspiration-card animate-fade-up"
                     style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
                  >
                     <BlurImage src={item.image} alt={item.title} sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                     <div className="inspiration-content">
                        <h3 className="font-serif-display text-lg md:text-xl text-alabaster mb-1">
                           {item.title}
                        </h3>
                        <p className="text-alabaster/80 text-xs tracking-wide">
                           {item.description}
                        </p>
                     </div>
                  </div>
               ))}
            </div>
            <div className="text-center mt-12 animate-fade-up" style={{ transitionDelay: "0.7s" }}>
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
