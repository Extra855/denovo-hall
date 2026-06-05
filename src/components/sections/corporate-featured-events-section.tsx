"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Icons } from "@/components/icons";
import { BlurImage } from "@/components/blur-image";

const ITEMS_COUNT = 6;

const typeBadgeColors: Record<string, string> = {
   conference: "bg-sage/80 text-alabaster",
   launch: "bg-champagne/80 text-charcoal",
   gala: "bg-peach/80 text-charcoal",
   celebration: "bg-sage/60 text-alabaster",
   networking: "bg-champagne/70 text-charcoal",
};

export function CorporateFeaturedEventsSection() {
   const [currentIndex, setCurrentIndex] = useState(0);
   const t = useTranslations("CorporateEvents");
   const locale = useLocale();
   const isRTL = locale === "ar";

   const items = Array.from({ length: ITEMS_COUNT }, (_, i) => ({
      name: t(`featuredEvents.items.${i}.name`),
      company: t(`featuredEvents.items.${i}.company`),
      type: t(`featuredEvents.items.${i}.type`),
      typeBadge: t(`featuredEvents.items.${i}.typeBadge`),
      guests: t(`featuredEvents.items.${i}.guests`),
      date: t(`featuredEvents.items.${i}.date`),
      description: t(`featuredEvents.items.${i}.description`),
      quote: t(`featuredEvents.items.${i}.quote`),
      quoteAuthor: t(`featuredEvents.items.${i}.quoteAuthor`),
      image: t(`featuredEvents.items.${i}.image`),
      imageAlt: t(`featuredEvents.items.${i}.imageAlt`),
   }));

   const next = useCallback(() => setCurrentIndex((prev) => (prev + 1) % ITEMS_COUNT), []);
   const prev = useCallback(() => setCurrentIndex((prev) => (prev - 1 + ITEMS_COUNT) % ITEMS_COUNT), []);

   const AUTO_INTERVAL = 6000;
   const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

   const startTimer = useCallback(() => {
      clearInterval(timerRef.current!);
      timerRef.current = setInterval(next, AUTO_INTERVAL);
   }, [next]);

   const stopTimer = useCallback(() => {
      clearInterval(timerRef.current!);
   }, []);

   useEffect(() => {
      startTimer();
      return () => clearInterval(timerRef.current!);
   }, [startTimer]);

   const current = items[currentIndex];
   const badgeColor = typeBadgeColors[current.type] || "bg-sage/80 text-alabaster";

   return (
      <section id="corporate-featured-events" className="py-24 md:py-32 bg-charcoal relative overflow-hidden">
         <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #FAF9F6 1px, transparent 0)`,
            backgroundSize: "40px 40px",
         }} />

         {/* Decorative corner accents */}
         <div className="absolute top-0 start-0 w-32 h-32 opacity-[0.04]">
            <svg viewBox="0 0 128 128" className="w-full h-full text-champagne">
               <path d="M0 0 L128 0 L128 4 L4 4 L4 128 L0 128 Z" fill="currentColor" />
            </svg>
         </div>
         <div className="absolute bottom-0 end-0 w-32 h-32 opacity-[0.04]">
            <svg viewBox="0 0 128 128" className="w-full h-full text-champagne">
               <path d="M0 128 L128 128 L128 124 L4 124 L4 0 L0 0 Z" fill="currentColor" />
            </svg>
         </div>

         <div className="max-w-6xl mx-auto relative px-6">
            {/* Section header */}
            <div className="mb-16 md:mb-20 animate-fade-up">
               <p className="text-champagne/60 text-xs tracking-[0.3em] uppercase mb-2">
                  {t("featuredEvents.subtitle")}
               </p>
               <h2 className="font-serif-display heading-large text-alabaster">
                  {t("featuredEvents.heading")}
               </h2>
               <div className="mt-8 h-px bg-gradient-to-r from-champagne/20 via-champagne/10 to-transparent" />
            </div>

            {/* Slide viewport */}
            <div
               className="relative aspect-[16/9] md:aspect-[21/9] rounded-sm overflow-hidden group"
               onMouseEnter={stopTimer}
               onMouseLeave={startTimer}
            >
               <BlurImage
                  key={currentIndex}
                  src={current.image}
                  alt={current.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 1152px"
                  className="object-cover transition-opacity duration-500"
               />

               {/* Double gradient overlay */}
               <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-charcoal/20" />
               <div className="absolute inset-0 bg-gradient-to-e from-charcoal/60 to-transparent" />

               {/* Content */}
               <div
                  key={`content-${currentIndex}`}
                  className="absolute inset-0 flex items-end p-6 md:p-12 transition-opacity duration-500"
               >
                  <div className="max-w-2xl">
                     {/* Type badge */}
                     <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${badgeColor}`}>
                        {current.typeBadge}
                     </span>

                     {/* Event name */}
                     <h3 className="font-serif-display text-2xl md:text-4xl text-alabaster mb-1">
                        {current.name}
                     </h3>

                     {/* Company */}
                     <p className="text-alabaster/70 text-sm md:text-base mb-3">
                        {current.company}
                     </p>

                     {/* Metadata row */}
                     <p className="text-alabaster/60 text-xs md:text-sm mb-3">
                        {current.guests} <span className="mx-1">&middot;</span> {current.date}
                     </p>

                     {/* Description */}
                     <p className="text-alabaster/80 text-sm md:text-base line-clamp-3 mb-4">
                        {current.description}
                     </p>

                     {/* Optional quote */}
                     {current.quote && (
                        <blockquote className="border-s-2 border-champagne/30 ps-4">
                           <p className="text-alabaster/70 italic text-sm md:text-base">
                              &ldquo;{current.quote}&rdquo;
                           </p>
                           {current.quoteAuthor && (
                              <cite className="text-alabaster/50 text-xs not-italic mt-1 block">
                                 — {current.quoteAuthor}
                              </cite>
                           )}
                        </blockquote>
                     )}
                  </div>
               </div>
            </div>

            {/* Navigation controls */}
            <div className="flex items-center justify-center gap-4 mt-8">
               <button
                  onClick={() => { prev(); stopTimer(); setTimeout(startTimer, AUTO_INTERVAL); }}
                  className="w-12 h-12 rounded-full border border-alabaster/20 text-alabaster hover:bg-champagne hover:text-charcoal transition-all duration-300 flex items-center justify-center"
                  aria-label={t("featuredEvents.prevLabel")}
               >
                  {isRTL ? <Icons.chevronRight /> : <Icons.chevronLeft />}
               </button>
               <div className="flex gap-2">
                  {items.map((_, index) => (
                     <button
                        key={index}
                        onClick={() => { setCurrentIndex(index); stopTimer(); setTimeout(startTimer, AUTO_INTERVAL); }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                           index === currentIndex
                              ? "bg-champagne w-6"
                              : "bg-alabaster/30 hover:bg-alabaster/50"
                        }`}
                        aria-label={t("featuredEvents.goToLabel", { index: index + 1 })}
                     />
                  ))}
               </div>
               <button
                  onClick={() => { next(); stopTimer(); setTimeout(startTimer, AUTO_INTERVAL); }}
                  className="w-12 h-12 rounded-full border border-alabaster/20 text-alabaster hover:bg-champagne hover:text-charcoal transition-all duration-300 flex items-center justify-center"
                  aria-label={t("featuredEvents.nextLabel")}
               >
                  {isRTL ? <Icons.chevronLeft /> : <Icons.chevronRight />}
               </button>
            </div>
         </div>
      </section>
   );
}
