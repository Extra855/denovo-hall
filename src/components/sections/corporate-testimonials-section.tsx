"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Icons } from "@/components/icons";
import { BlurImage } from "@/components/blur-image";

export function CorporateTestimonialsSection() {
   const [currentIndex, setCurrentIndex] = useState(0);
   const t = useTranslations("CorporateEvents");
   const locale = useLocale();
   const isRTL = locale === "ar";

   const testimonials = [
      {
         quote: t("testimonials.items.0.quote"),
         name: t("testimonials.items.0.name"),
         role: t("testimonials.items.0.role"),
         company: t("testimonials.items.0.company"),
         image: t("testimonials.items.0.image"),
         imageAlt: t("testimonials.items.0.imageAlt"),
      },
      {
         quote: t("testimonials.items.1.quote"),
         name: t("testimonials.items.1.name"),
         role: t("testimonials.items.1.role"),
         company: t("testimonials.items.1.company"),
         image: t("testimonials.items.1.image"),
         imageAlt: t("testimonials.items.1.imageAlt"),
      },
      {
         quote: t("testimonials.items.2.quote"),
         name: t("testimonials.items.2.name"),
         role: t("testimonials.items.2.role"),
         company: t("testimonials.items.2.company"),
         image: t("testimonials.items.2.image"),
         imageAlt: t("testimonials.items.2.imageAlt"),
      },
   ];

   const nextTestimonial = useCallback(() => setCurrentIndex((prev) => (prev + 1) % testimonials.length), [testimonials.length]);
   const prevTestimonial = useCallback(() => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length), [testimonials.length]);

   const AUTO_INTERVAL = 6000;
   const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

   const startTimer = useCallback(() => {
      clearInterval(timerRef.current!);
      timerRef.current = setInterval(nextTestimonial, AUTO_INTERVAL);
   }, [nextTestimonial]);

   const stopTimer = useCallback(() => {
      clearInterval(timerRef.current!);
   }, []);

   useEffect(() => {
      startTimer();
      return () => clearInterval(timerRef.current!);
   }, [startTimer]);

   return (
      <section id="corporate-testimonials" className="py-24 md:py-32 px-6 bg-charcoal relative overflow-hidden">
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

         <div className="max-w-6xl mx-auto relative">
            {/* Section header */}
            <div className="mb-16 md:mb-20 animate-fade-up">
               <p className="text-champagne/60 text-xs tracking-[0.3em] uppercase mb-2">
                  {t("testimonials.subtitle")}
               </p>
               <h2 className="font-serif-display heading-large text-alabaster">
                  {t("testimonials.heading")}
               </h2>
               <div className="mt-8 h-px bg-gradient-to-r from-champagne/20 via-champagne/10 to-transparent" />
            </div>

            {/* Carousel */}
            <div
               className="grid md:grid-cols-2 gap-12 md:gap-20 items-center"
               onMouseEnter={stopTimer}
               onMouseLeave={startTimer}
            >
               {/* Image with decorative border offset */}
               <div className="animate-fade-up relative order-2 md:order-none">
                  <div className="relative group aspect-[4/3] md:aspect-[4/5]">
                     <div className="absolute -inset-4 border border-champagne/30 rounded-sm transition-transform duration-500 group-hover:-translate-x-2 group-hover:translate-y-2 hidden md:block" />
                     <div className="w-full h-full rounded-sm relative z-10">
                        <BlurImage
                           key={testimonials[currentIndex].name}
                           src={testimonials[currentIndex].image}
                           alt={testimonials[currentIndex].imageAlt}
                           sizes="(max-width: 768px) 100vw, 50vw"
                           className="object-cover rounded-sm"
                        />
                     </div>
                  </div>
               </div>

               {/* Quote + navigation */}
               <div className="animate-fade-up order-1 md:order-none" style={{ transitionDelay: "0.2s" }}>
                  <div className="flex gap-1 mb-6">
                     {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-peach" viewBox="0 0 20 20" fill="currentColor">
                           <path d="M10 2L11.545 7.09H17L12.727 9.91L14.272 15L10 12.18L5.728 15L7.273 9.91L3 7.09H8.455L10 2Z" />
                        </svg>
                     ))}
                  </div>
                  <svg className="w-12 h-12 text-champagne/40 mb-6" viewBox="0 0 48 48" fill="currentColor">
                     <path d="M12 28C12 23.5817 15.5817 20 20 20V12C11.1634 12 4 19.1634 4 28V36H20V20C15.5817 20 12 23.5817 12 28V28ZM36 28C36 23.5817 39.5817 20 44 20V12C35.1634 12 28 19.1634 28 28V36H44V20C39.5817 20 36 23.5817 36 28V28Z" />
                  </svg>
                  <blockquote
                     key={`quote-${currentIndex}`}
                     className="font-serif-display text-xl md:text-3xl text-alabaster italic mb-8 leading-relaxed transition-opacity duration-500"
                  >
                     &ldquo;{testimonials[currentIndex].quote}&rdquo;
                  </blockquote>
                  <div className="border-s-2 border-peach ps-6 mb-8">
                     <p className="text-alabaster font-medium text-lg">{testimonials[currentIndex].name}</p>
                     <p className="text-alabaster/60">{testimonials[currentIndex].role}, {testimonials[currentIndex].company}</p>
                  </div>
                  <div className="flex items-center gap-4">
                     <button
                        onClick={() => { prevTestimonial(); stopTimer(); setTimeout(startTimer, AUTO_INTERVAL); }}
                        className="w-12 h-12 rounded-full border border-alabaster/20 text-alabaster hover:bg-champagne hover:text-charcoal transition-all duration-300 flex items-center justify-center"
                        aria-label={t("testimonials.prevLabel")}
                     >
                        {isRTL ? <Icons.chevronRight /> : <Icons.chevronLeft />}
                     </button>
                     <div className="flex gap-2">
                        {testimonials.map((_, index) => (
                           <button
                              key={index}
                              onClick={() => { setCurrentIndex(index); stopTimer(); setTimeout(startTimer, AUTO_INTERVAL); }}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                 index === currentIndex
                                    ? "bg-champagne w-6"
                                    : "bg-alabaster/30 hover:bg-alabaster/50"
                              }`}
                              aria-label={t("testimonials.goToLabel", { index: index + 1 })}
                           />
                        ))}
                     </div>
                     <button
                        onClick={() => { nextTestimonial(); stopTimer(); setTimeout(startTimer, AUTO_INTERVAL); }}
                        className="w-12 h-12 rounded-full border border-alabaster/20 text-alabaster hover:bg-champagne hover:text-charcoal transition-all duration-300 flex items-center justify-center"
                        aria-label={t("testimonials.nextLabel")}
                     >
                        {isRTL ? <Icons.chevronLeft /> : <Icons.chevronRight />}
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}
