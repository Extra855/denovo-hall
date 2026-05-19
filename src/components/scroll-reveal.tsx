"use client";

import { useEffect, useRef } from "react";

let io: IntersectionObserver | null = null;

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

function observeElement(el: HTMLElement) {
   if (el.classList.contains("visible")) return;
   if (el.classList.contains("animate-fade-up") || el.classList.contains("reveal-image")) {
      getIO().observe(el);
   }
}

function observeSubtree(root: HTMLElement) {
   root.querySelectorAll(".animate-fade-up:not(.visible), .reveal-image:not(.visible)").forEach(observeElement);
   if (root.classList.contains("animate-fade-up") && !root.classList.contains("visible")) {
      observeElement(root);
   }
}

export function ScrollReveal({ children }: { children: React.ReactNode }) {
   const ref = useRef<HTMLDivElement>(null);
   const moRef = useRef<MutationObserver | null>(null);

   useEffect(() => {
      const el = ref.current;
      if (!el) return;

      // Observe existing animated children
      observeSubtree(el);

      // Watch for dynamically added children (defer to avoid interfering with React reconciliation)
      const mo = new MutationObserver((mutations) => {
         requestAnimationFrame(() => {
            for (const mutation of mutations) {
               for (const node of mutation.addedNodes) {
                  if (node instanceof HTMLElement) {
                     observeSubtree(node);
                  }
               }
            }
         });
      });
      moRef.current = mo;
      mo.observe(el, { childList: true, subtree: true });

      // Safety net: force all pending elements visible after 2s
      const timeout = setTimeout(() => {
         el.querySelectorAll(".animate-fade-up:not(.visible), .reveal-image:not(.visible)").forEach((child) => {
            child.classList.add("visible");
         });
      }, 2000);

      return () => {
         mo.disconnect();
         moRef.current = null;
         clearTimeout(timeout);
      };
   }, []);

   return <div ref={ref}>{children}</div>;
}
