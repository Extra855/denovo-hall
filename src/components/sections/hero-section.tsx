"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Ornament } from "@/components/ornament";
import { BlurImage } from "@/components/blur-image";

export function HeroSection() {
   const videoRef = useRef<HTMLVideoElement>(null);
   const sectionRef = useRef<HTMLElement>(null);
   const [videoError, setVideoError] = useState(false);
   const t = useTranslations("Hero");

   useEffect(() => {
      if (videoRef.current && !videoError) {
         videoRef.current.playbackRate = 0.8;
      }
   }, [videoError]);

   useEffect(() => {
      const timer = setTimeout(() => {
         sectionRef.current
            ?.querySelectorAll(".animate-fade-up")
            .forEach((el) => el.classList.add("visible"));
      }, 200);
      return () => clearTimeout(timer);
   }, []);

   return (
      <section ref={sectionRef} className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
         <div className="absolute inset-0">
            <BlurImage
               src="/hero.jpg"
               alt={t("altImage")}
               priority
               sizes="100vw"
               className="object-cover"
            />
            <div className="hero-overlay absolute inset-0" />
         </div>

         <div className="absolute top-20 start-10 opacity-20 hidden lg:block animate-fade-up">
            <Icons.leaf />
         </div>
         <div
            className="absolute top-40 end-16 opacity-20 hidden lg:block animate-fade-up"
            style={{ transitionDelay: "0.3s" }}
         >
            <Icons.leaf />
         </div>

         <div className="relative z-10 text-center px-6 max-w-5xl">
            <div className="mb-8 animate-fade-up">
               <span className="inline-block px-5 py-2.5 border border-alabaster/40 text-alabaster text-sm tracking-[0.35em] uppercase hero-tagline bg-charcoal/20 backdrop-blur-sm">
                  {t("tagline")}
               </span>
            </div>
            <h1
               className="font-serif-display heading-display text-alabaster mb-6 animate-fade-up"
               style={{ transitionDelay: "0.1s" }}
            >
               {t("heading1")}
               <br />
               <span className="italic text-champagne">{t("heading2")}</span>
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
               {t("description")}
            </p>
            <Button
               asChild
               size="lg"
               className="bg-champagne hover:bg-champagne/90 text-charcoal rounded-none px-10 py-6 text-sm tracking-widest uppercase btn-luxury pulse-subtle animate-fade-up group"
               style={{ transitionDelay: "0.4s" }}
            >
               <a href="#inquiry">
                  {t("cta")}
                  <span className="ms-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                     <Icons.arrowRight />
                  </span>
               </a>
            </Button>
         </div>

         <button
            onClick={() => {
               const el = document.getElementById("spaces");
               if (el) {
                  const top =
                     el.getBoundingClientRect().top + window.scrollY - 80;
                  window.scrollTo({ top, behavior: "smooth" });
               }
            }}
            className="hidden md:flex absolute bottom-10 start-1/2 ltr:-translate-x-1/2 rtl:translate-x-1/2 flex-col items-center gap-3 cursor-pointer group px-6 py-3"
            aria-label={t("scrollDown")}
         >
            <span className="text-alabaster/80 text-sm tracking-[0.25em] uppercase group-hover:text-alabaster transition-colors hero-discover font-light">
               {t("scrollToExplore")}
            </span>
            <div className="w-8 h-12 rounded-full border-2 border-alabaster/50 group-hover:border-alabaster/80 flex items-start justify-center p-2 transition-colors">
               <div className="w-1 h-3 bg-alabaster/70 rounded-full animate-bounce" />
            </div>
         </button>
      </section>
   );
}
