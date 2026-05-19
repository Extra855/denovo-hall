"use client";

import { useCallback, useRef, useState } from "react";

interface SwipeHandlers {
   onSwipeLeft: () => void;
   onSwipeRight: () => void;
}

export function useSwipeGesture({ onSwipeLeft, onSwipeRight }: SwipeHandlers) {
   const touchStart = useRef<{ x: number; time: number } | null>(null);
   const handlersRef = useRef({ onSwipeLeft, onSwipeRight });
   const [swipeOffset, setSwipeOffset] = useState(0);
   handlersRef.current = { onSwipeLeft, onSwipeRight };

   const onTouchStart = useCallback((e: React.TouchEvent) => {
      const touch = e.touches[0];
      touchStart.current = { x: touch.clientX, time: Date.now() };
      setSwipeOffset(0);
   }, []);

   const onTouchMove = useCallback((e: React.TouchEvent) => {
      if (!touchStart.current) return;
      const touch = e.touches[0];
      const dx = (touch.clientX - touchStart.current.x) * 0.4;
      setSwipeOffset(dx);
   }, []);

   const onTouchEnd = useCallback((e: React.TouchEvent) => {
      if (!touchStart.current) return;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - touchStart.current.x;
      const dt = Date.now() - touchStart.current.time;
      touchStart.current = null;
      setSwipeOffset(0);

      if (dt > 500) return;

      const isRTL = document.documentElement.dir === "rtl";
      const threshold = 50;

      // In RTL, screen-left swipe = logical "next", screen-right = logical "prev"
      if (Math.abs(dx) >= threshold) {
         if (isRTL) {
            if (dx > 0) handlersRef.current.onSwipeRight();
            else handlersRef.current.onSwipeLeft();
         } else {
            if (dx < 0) handlersRef.current.onSwipeLeft();
            else handlersRef.current.onSwipeRight();
         }
      }
   }, []);

   return { onTouchStart, onTouchMove, onTouchEnd, swipeOffset };
}
