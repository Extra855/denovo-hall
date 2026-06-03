"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";

export function FloatingCTA() {
   const [isVisible, setIsVisible] = useState(false);
   const t = useTranslations("FloatingCTA");
   const tickingRef = useRef(0);
   const pathname = usePathname();

   useEffect(() => {
      const handleScroll = () => {
         if (tickingRef.current) return;
         tickingRef.current = requestAnimationFrame(() => {
            setIsVisible(window.scrollY > 600);
            tickingRef.current = 0;
         });
      };
      window.addEventListener("scroll", handleScroll);
      return () => {
         window.removeEventListener("scroll", handleScroll);
         cancelAnimationFrame(tickingRef.current);
      };
   }, []);

   const scrollToInquiry = () => {
      const targetId = pathname === "/events" ? "corporate-inquiry" : "inquiry";
      const el = document.getElementById(targetId);
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
         style={{
            bottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))",
            insetInlineEnd: "calc(1.5rem + env(safe-area-inset-inline-end, 0px))",
         }}
         aria-label={t("label")}
      >
         <span>{t("text")}</span>
         <span className="w-2 h-2 rounded-full bg-peach animate-pulse" />
      </button>
   );
}
