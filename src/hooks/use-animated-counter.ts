"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export function useAnimatedCounter(
   end: number,
   duration: number = 2000,
   startOnView: boolean = true,
) {
   const decimals = end % 1 !== 0 ? 1 : 0;
   const [count, setCount] = useState(0);
   const [hasStarted, setHasStarted] = useState(false);
   const ref = useRef<HTMLDivElement>(null);
   const hasStartedRef = useRef(false);

   const prefersReducedMotion = useRef(false);

   // Check reduced motion preference once at init
   if (typeof window !== "undefined") {
      prefersReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
   }

   const animateCount = useCallback(() => {
      if (prefersReducedMotion.current) {
         setCount(end);
         return;
      }
      const startTime = Date.now();
      let lastFrame = 0;
      const animate = () => {
         const now = Date.now();
         if (now - lastFrame < 33) {
            requestAnimationFrame(animate);
            return;
         }
         lastFrame = now;
         const elapsed = now - startTime;
         const progress = Math.min(elapsed / duration, 1);
         const easeOut = 1 - Math.pow(1 - progress, 3);
         const raw = end * easeOut;
         setCount(
            decimals > 0 ? parseFloat(raw.toFixed(decimals)) : Math.floor(raw),
         );
         if (progress < 1) {
            requestAnimationFrame(animate);
         }
      };
      animate();
   }, [end, duration, decimals]);

   useEffect(() => {
      if (!startOnView) {
         animateCount();
         return;
      }

      const observer = new IntersectionObserver(
         (entries) => {
            if (entries[0].isIntersecting && !hasStartedRef.current) {
               hasStartedRef.current = true;
               setHasStarted(true);
               animateCount();
            }
         },
         { threshold: 0.5 },
      );

      if (ref.current) {
         observer.observe(ref.current);
      }

      return () => observer.disconnect();
   }, [startOnView, animateCount]);

   return { count, ref };
}
