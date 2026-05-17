"use client";

import { useEffect, useRef } from "react";

export function ScrollReveal({ children }: { children: React.ReactNode }) {
   const ref = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const el = ref.current;
      if (!el) return;

      const io = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               if (entry.isIntersecting) {
                  entry.target.classList.add("visible");
               }
            });
         },
         { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
      );

      const observe = () => {
         el.querySelectorAll(".animate-fade-up, .reveal-image").forEach((child) => {
            if (!child.classList.contains("visible")) {
               io.observe(child);
            }
         });
      };

      observe();

      const mo = new MutationObserver(() => observe());
      mo.observe(el, { childList: true, subtree: true });

      return () => {
         io.disconnect();
         mo.disconnect();
      };
   }, []);

   // Also reveal elements already in viewport (handles dynamic imports)
   useEffect(() => {
      const el = ref.current;
      if (!el) return;

      const revealIfInView = () => {
         el.querySelectorAll(".animate-fade-up:not(.visible)").forEach((child) => {
            const htmlEl = child as HTMLElement;
            if (htmlEl.getBoundingClientRect().top < window.innerHeight) {
               htmlEl.classList.add("visible");
            }
         });
      };

      // Initial check
      const timer = setTimeout(revealIfInView, 100);

      // Re-check when DOM changes (dynamic imports)
      const mo = new MutationObserver(() => setTimeout(revealIfInView, 50));
      mo.observe(el, { childList: true, subtree: true });

      return () => {
         clearTimeout(timer);
         mo.disconnect();
      };
   }, []);

   return <div ref={ref}>{children}</div>;
}
