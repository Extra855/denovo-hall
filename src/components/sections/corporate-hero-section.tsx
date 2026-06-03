"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Ornament } from "@/components/ornament";
import { BlurImage } from "@/components/blur-image";

export function CorporateHeroSection() {
   const sectionRef = useRef<HTMLElement>(null);
   const t = useTranslations("CorporateEvents");

   useEffect(() => {
      const timer = setTimeout(() => {
         sectionRef.current
            ?.querySelectorAll(".animate-fade-up")
            .forEach((el) => el.classList.add("visible"));
      }, 200);
      return () => clearTimeout(timer);
   }, []);

   return (
      <section ref={sectionRef} className="relative h-screen max-h-[85vh] md:max-h-none min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
         <div className="absolute inset-0">
            <BlurImage
               src="/hero.jpg"
               alt={t("hero.altImage")}
               priority
               sizes="100vw"
               className="object-cover"
            />
            <div className="hero-overlay absolute inset-0" />
         </div>

         <div className="absolute top-20 start-10 opacity-20 hidden lg:block animate-fade-up">
            <Icons.diamond />
         </div>
         <div
            className="absolute top-40 end-16 opacity-20 hidden lg:block animate-fade-up"
            style={{ transitionDelay: "0.3s" }}
         >
            <Icons.diamond />
         </div>

         <div className="relative z-10 text-center px-6 max-w-5xl">
            <div className="mb-8 animate-fade-up">
               <span className="inline-block px-5 py-2.5 border border-alabaster/40 text-alabaster text-sm tracking-[0.35em] uppercase hero-tagline bg-charcoal/20 backdrop-blur-sm">
                  {t("hero.tagline")}
               </span>
            </div>
            <h1
               className="font-serif-display heading-display text-alabaster mb-6 animate-fade-up"
               style={{ transitionDelay: "0.1s" }}
            >
               {t("hero.heading1")}
               <br />
               <span className="italic text-peach">{t("hero.heading2")}</span>
            </h1>
            <Ornament
               className="mb-8 animate-fade-up"
               style={
                  {
                     transitionDelay: "0.2s",
                  } as React.CSSProperties
               }
            />
            <p
               className="text-alabaster/90 body-large max-w-2xl mx-auto mb-10 animate-fade-up"
               style={{ transitionDelay: "0.3s" }}
            >
               {t("hero.description")}
            </p>
            <Button
               asChild
               size="lg"
               className="bg-peach hover:bg-peach/90 text-charcoal rounded-none px-10 py-6 text-sm tracking-widest uppercase btn-luxury pulse-subtle animate-fade-up group"
               style={{ transitionDelay: "0.4s" }}
            >
               <a href="#corporate-inquiry">
                  {t("hero.cta")}
                  <span className="ms-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                     <Icons.arrowRight />
                  </span>
               </a>
            </Button>
         </div>
      </section>
   );
}
