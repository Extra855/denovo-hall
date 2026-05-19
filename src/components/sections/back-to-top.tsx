"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

export function BackToTop() {
   const [isVisible, setIsVisible] = useState(false);
   const t = useTranslations("BackToTop");
   const tickingRef = useRef(0);

   useEffect(() => {
      const handleScroll = () => {
         if (tickingRef.current) return;
         tickingRef.current = requestAnimationFrame(() => {
            setIsVisible(window.scrollY > 500);
            tickingRef.current = 0;
         });
      };
      window.addEventListener("scroll", handleScroll);
      return () => {
         window.removeEventListener("scroll", handleScroll);
         cancelAnimationFrame(tickingRef.current);
      };
   }, []);

   const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
   };

   return (
      <button
         onClick={scrollToTop}
         className={`back-to-top ${isVisible ? "visible" : ""}`}
         aria-label={t("label")}
      >
         <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="text-alabaster"
         >
            <path d="M12 4L4 12H10V20H14V12H20L12 4Z" fill="currentColor" />
         </svg>
      </button>
   );
}
