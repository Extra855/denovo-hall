"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Icons } from "@/components/icons";
import { BlurImage } from "@/components/blur-image";

const CATEGORY_KEYS = ["conferences", "celebrations"] as const;

export function CorporateCategoriesSection() {
   const t = useTranslations("CorporateEvents");
   const locale = useLocale();
   const [activeIndex, setActiveIndex] = useState(0);
   const [mobileIndex, setMobileIndex] = useState(0);
   const scrollRef = useRef<HTMLDivElement>(null);

   const categories = CATEGORY_KEYS.map((key) => ({
      key,
      title: t(`categories.${key}.title`),
      description: t(`categories.${key}.description`),
      image: key === "conferences" ? "/Grand-Ballroom.jpg" : "/Garden-Terrace.jpg",
      features: [0, 1, 2, 3].map((i) => t(`categories.${key}.features.${i}`)),
   }));

   // Mobile snap scroll sync
   const handleScroll = useCallback(() => {
      const container = scrollRef.current;
      if (!container) return;
      const scrollPos = locale === "ar" ? -container.scrollLeft : container.scrollLeft;
      const cardWidth = container.scrollWidth / categories.length;
      const newIndex = Math.round(scrollPos / cardWidth);
      if (newIndex >= 0 && newIndex < categories.length) {
         setMobileIndex(newIndex);
      }
   }, [locale, categories.length]);

   useEffect(() => {
      const container = scrollRef.current;
      if (!container) return;
      container.addEventListener("scroll", handleScroll, { passive: true });
      return () => container.removeEventListener("scroll", handleScroll);
   }, [handleScroll]);

   const scrollToCategory = (index: number) => {
      const container = scrollRef.current;
      if (!container) return;
      const cardWidth = container.scrollWidth / categories.length;
      container.scrollTo({
         left: locale === "ar" ? -cardWidth * index : cardWidth * index,
         behavior: "smooth",
      });
      setMobileIndex(index);
   };

   return (
      <section id="corporate-categories" className="py-24 md:py-32 lg:py-40 px-6 bg-alabaster relative overflow-hidden">
         <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-16 md:mb-20 animate-fade-up">
               <p className="text-sm tracking-widest uppercase text-sage mb-4">
                  {t("categories.subtitle")}
               </p>
               <h2 className="font-serif-display heading-large text-charcoal mb-4">
                  {t("categories.heading")}
               </h2>
               <div className="w-16 h-px bg-champagne mx-auto" />
            </div>

            {/* Desktop: split view */}
            <div className="hidden md:grid md:grid-cols-2 gap-12 md:gap-20 items-start">
               {/* Left: crossfade image */}
               <div className="relative animate-fade-up">
                  {categories.map((cat, i) => (
                     <div
                        key={cat.key}
                        className="aspect-[4/5] relative rounded-sm overflow-hidden transition-all duration-700"
                        style={{
                           opacity: activeIndex === i ? 1 : 0,
                           position: activeIndex === i ? "relative" : "absolute",
                           inset: activeIndex === i ? undefined : 0,
                        }}
                     >
                        <BlurImage
                           src={cat.image}
                           alt={cat.title}
                           sizes="50vw"
                           className="object-cover"
                        />
                     </div>
                  ))}
               </div>

               {/* Right: stacked category tabs */}
               <div className="flex flex-col gap-4 animate-fade-up" style={{ transitionDelay: "0.2s" }}>
                  {categories.map((cat, i) => {
                     const isActive = activeIndex === i;
                     return (
                        <button
                           key={cat.key}
                           onClick={() => setActiveIndex(i)}
                           className={`text-start p-6 md:p-8 rounded-sm border transition-all duration-500 ${
                              isActive
                                 ? "bg-charcoal border-champagne/30"
                                 : "bg-transparent border-alabaster hover:border-champagne/20"
                           }`}
                        >
                           <div className="flex items-center justify-between mb-2">
                              <h3
                                 className={`font-serif-display text-xl md:text-2xl transition-colors duration-500 ${
                                    isActive ? "text-alabaster" : "text-charcoal"
                                 }`}
                              >
                                 {cat.title}
                              </h3>
                              <span
                                 className={`transition-colors duration-500 ${
                                    isActive ? "text-champagne" : "text-charcoal/30"
                                 }`}
                              >
                                 <Icons.chevronDown />
                              </span>
                           </div>
                           <div
                              className="overflow-hidden transition-all duration-500"
                              style={{
                                 maxHeight: isActive ? "400px" : "0px",
                                 opacity: isActive ? 1 : 0,
                              }}
                           >
                              <p className="text-alabaster/60 mb-6 leading-relaxed">
                                 {cat.description}
                              </p>
                              <ul className="space-y-3">
                                 {cat.features.map((feature, fi) => (
                                    <li key={fi} className="flex items-start gap-3">
                                       <span className="text-sage mt-1 shrink-0">
                                          <Icons.check />
                                       </span>
                                       <span className="text-sm text-alabaster/70">
                                          {feature}
                                       </span>
                                    </li>
                                 ))}
                              </ul>
                           </div>
                        </button>
                     );
                  })}
               </div>
            </div>

            {/* Mobile: horizontal snap carousel */}
            <div className="md:hidden">
               <div
                  ref={scrollRef}
                  className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth -mx-6 px-6"
               >
                  {categories.map((cat, i) => (
                     <div
                        key={cat.key}
                        className="w-[85vw] shrink-0 snap-center"
                     >
                        <div className="relative aspect-[4/3] rounded-sm overflow-hidden mb-4">
                           <BlurImage src={cat.image} alt={cat.title} sizes="85vw" className="object-cover" />
                           <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                           <div className="absolute bottom-0 start-0 end-0 p-5">
                              <h3 className="font-serif-display text-xl text-alabaster mb-2">
                                 {cat.title}
                              </h3>
                              <p className="text-alabaster/70 text-sm leading-relaxed">
                                 {cat.description}
                              </p>
                           </div>
                        </div>
                        <ul className="space-y-3">
                           {cat.features.map((feature, fi) => (
                              <li key={fi} className="flex items-start gap-3">
                                 <span className="text-sage mt-1 shrink-0">
                                    <Icons.check />
                                 </span>
                                 <span className="text-sm text-muted-foreground">
                                    {feature}
                                 </span>
                              </li>
                           ))}
                        </ul>
                     </div>
                  ))}
               </div>
               {/* Dot indicators */}
               <div className="flex items-center justify-center gap-3 mt-6">
                  {categories.map((_, index) => (
                     <button
                        key={index}
                        onClick={() => scrollToCategory(index)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                           index === mobileIndex
                              ? "bg-champagne w-8"
                              : "bg-charcoal/25 w-1.5 hover:bg-charcoal/40"
                        }`}
                        aria-label={`Go to ${categories[index].title}`}
                     />
                  ))}
               </div>
            </div>
         </div>
      </section>
   );
}
