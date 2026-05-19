"use client";

import { useEffect, useRef } from "react";

let io: IntersectionObserver | null = null;
let mo: MutationObserver | null = null;

function getIO() {
   if (!io) {
      io = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               if (entry.isIntersecting) {
                  entry.target.classList.add("visible");
                  io!.unobserve(entry.target);
               }
            });
         },
         { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
      );
   }
   return io;
}

function getMO() {
   if (!mo) {
      mo = new MutationObserver((mutations) => {
         const observer = getIO();
         for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
               if (node instanceof HTMLElement) {
                  node.querySelectorAll?.(".animate-fade-up:not(.visible), .reveal-image:not(.visible)").forEach((el) => {
                     observer.observe(el);
                  });
                  if (node.classList?.contains("animate-fade-up") && !node.classList.contains("visible")) {
                     observer.observe(node);
                  }
               }
            }
         }
      });
   }
   return mo;
}

export function ScrollReveal({ children }: { children: React.ReactNode }) {
   const ref = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const el = ref.current;
      if (!el) return;

      el.querySelectorAll(".animate-fade-up, .reveal-image").forEach((child) => {
         if (!child.classList.contains("visible")) {
            getIO().observe(child);
         }
      });

      getMO().observe(el, { childList: true, subtree: true });

      // Safety net: force all pending elements visible after 2s
      const timeout = setTimeout(() => {
         el.querySelectorAll(".animate-fade-up:not(.visible), .reveal-image:not(.visible)").forEach((child) => {
            child.classList.add("visible");
         });
      }, 2000);

      return () => {
         getMO().disconnect();
         clearTimeout(timeout);
      };
   }, []);

   return <div ref={ref}>{children}</div>;
}
