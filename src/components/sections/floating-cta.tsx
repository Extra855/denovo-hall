"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export function FloatingCTA() {
   const [isVisible, setIsVisible] = useState(false);
   const t = useTranslations("FloatingCTA");

   useEffect(() => {
      const handleScroll = () => {
         setIsVisible(window.scrollY > 600);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   const scrollToInquiry = () => {
      const el = document.getElementById("inquiry");
      if (el) {
         const offset = 80;
         const top = el.getBoundingClientRect().top + window.scrollY - offset;
         window.scrollTo({ top, behavior: "smooth" });
      }
   };

   if (!isVisible) return null;

   return (
      <button
         onClick={scrollToInquiry}
         className="fixed bottom-6 end-6 z-40 bg-charcoal text-alabaster px-6 py-3 rounded-full shadow-lg hover:bg-charcoal/90 transition-all duration-300 flex items-center gap-2 text-sm tracking-wider uppercase group"
         aria-label={t("label")}
      >
         <span>{t("text")}</span>
         <span className="w-2 h-2 rounded-full bg-champagne animate-pulse" />
      </button>
   );
}
