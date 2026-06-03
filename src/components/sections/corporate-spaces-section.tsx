"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { BlurImage } from "@/components/blur-image";
import { ImageLightbox } from "@/components/image-lightbox";
import { Icons } from "@/components/icons";

export function CorporateSpacesSection() {
   const t = useTranslations("CorporateEvents");
   const locale = useLocale();
   const [lightboxOpen, setLightboxOpen] = useState(false);
   const [lightboxSrc, setLightboxSrc] = useState("");
   const [lightboxAlt, setLightboxAlt] = useState("");
   const [mobileIndex, setMobileIndex] = useState(0);
   const scrollRef = useRef<HTMLDivElement>(null);

   const spaces = [
      {
         title: t("spaces.items.0.title"),
         description: t("spaces.items.0.description"),
         capacity: t("spaces.items.0.capacity"),
         image: t("spaces.items.0.image"),
      },
      {
         title: t("spaces.items.1.title"),
         description: t("spaces.items.1.description"),
         capacity: t("spaces.items.1.capacity"),
         image: t("spaces.items.1.image"),
      },
      {
         title: t("spaces.items.2.title"),
         description: t("spaces.items.2.description"),
         capacity: t("spaces.items.2.capacity"),
         image: t("spaces.items.2.image"),
      },
   ];

   const openLightbox = (src: string, alt: string) => {
      setLightboxSrc(src);
      setLightboxAlt(alt);
      setLightboxOpen(true);
   };

   // Mobile snap scroll sync
   const handleScroll = useCallback(() => {
      const container = scrollRef.current;
      if (!container) return;
      const scrollPos = locale === "ar" ? -container.scrollLeft : container.scrollLeft;
      const cardWidth = container.scrollWidth / spaces.length;
      const newIndex = Math.round(scrollPos / cardWidth);
      if (newIndex >= 0 && newIndex < spaces.length) {
         setMobileIndex(newIndex);
      }
   }, [locale, spaces.length]);

   useEffect(() => {
      const container = scrollRef.current;
      if (!container) return;
      container.addEventListener("scroll", handleScroll, { passive: true });
      return () => container.removeEventListener("scroll", handleScroll);
   }, [handleScroll]);

   const scrollToSpace = (index: number) => {
      const container = scrollRef.current;
      if (!container) return;
      const cardWidth = container.scrollWidth / spaces.length;
      container.scrollTo({
         left: locale === "ar" ? -cardWidth * index : cardWidth * index,
         behavior: "smooth",
      });
      setMobileIndex(index);
   };

   return (
      <>
         <section id="corporate-spaces" className="py-24 md:py-32 lg:py-40 px-6 bg-beige relative overflow-hidden">
            <div
               className="absolute inset-0 opacity-[0.02]"
               style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, #2C2C2C 1px, transparent 0)`,
                  backgroundSize: "40px 40px",
               }}
            />
            <div className="max-w-7xl mx-auto relative">
               <div className="text-center mb-16 md:mb-20 animate-fade-up">
                  <p className="text-sm tracking-widest uppercase text-sage mb-4">
                     {t("spaces.subtitle")}
                  </p>
                  <h2 className="font-serif-display heading-large text-charcoal mb-4">
                     {t("spaces.heading")}
                  </h2>
                  <div className="w-16 h-px bg-champagne mx-auto" />
               </div>

               {/* Asymmetric grid - Desktop */}
               <div className="hidden md:grid md:grid-cols-12 gap-6 md:gap-8">
                  {/* Large featured card */}
                  <div className="md:col-span-7 animate-fade-up group" style={{ transitionDelay: "0.2s" }}>
                     <div
                        className="img-zoom rounded-sm overflow-hidden cursor-pointer relative"
                        onClick={() => openLightbox(spaces[0].image, spaces[0].title)}
                     >
                        <div className="w-full h-[400px] md:h-[500px] relative">
                           <BlurImage src={spaces[0].image} alt={spaces[0].title} sizes="(max-width: 768px) 100vw, 58vw" className="object-cover" />
                           {/* Hover overlay with expand icon */}
                           <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300 flex items-center justify-center">
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-alabaster">
                                 <Icons.expand />
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="mt-6">
                        <div className="flex items-center gap-3 mb-2">
                           <h3 className="font-serif-display text-2xl text-charcoal">{spaces[0].title}</h3>
                           <span className="text-xs tracking-wider text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                              {spaces[0].capacity}
                           </span>
                        </div>
                        <p className="text-muted-foreground">{spaces[0].description}</p>
                     </div>
                  </div>

                  {/* Stacked smaller cards */}
                  <div className="md:col-span-5 flex flex-col gap-6 md:gap-8">
                     {spaces.slice(1).map((space, index) => (
                        <div key={space.title} className="animate-fade-up group" style={{ transitionDelay: `${0.3 + index * 0.1}s` }}>
                           <div
                              className="img-zoom rounded-sm overflow-hidden cursor-pointer relative"
                              onClick={() => openLightbox(space.image, space.title)}
                           >
                              <div className="w-full h-[230px] relative">
                                 <BlurImage src={space.image} alt={space.title} sizes="(max-width: 768px) 100vw, 42vw" className="object-cover" />
                                 <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300 flex items-center justify-center">
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-alabaster">
                                       <Icons.expand />
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="mt-4">
                              <div className="flex items-center gap-3 mb-1">
                                 <h3 className="font-serif-display text-xl text-charcoal">{space.title}</h3>
                                 <span className="text-xs tracking-wider text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                                    {space.capacity}
                                 </span>
                              </div>
                              <p className="text-muted-foreground text-sm">{space.description}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Mobile: horizontal snap carousel */}
               <div className="md:hidden">
                  <div
                     ref={scrollRef}
                     className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth -mx-6 px-6"
                  >
                     {spaces.map((space, index) => (
                        <div
                           key={space.title}
                           className="w-[85vw] shrink-0 snap-center animate-fade-up"
                           style={{ transitionDelay: `${0.2 + index * 0.1}s` }}
                        >
                           <div
                              className="img-zoom rounded-sm overflow-hidden mb-4 cursor-pointer relative"
                              onClick={() => openLightbox(space.image, space.title)}
                           >
                              <div className="aspect-[4/3] relative">
                                 <BlurImage src={space.image} alt={space.title} sizes="85vw" className="object-cover" />
                                 <div className="absolute inset-0 bg-charcoal/0 hover:bg-charcoal/20 transition-colors duration-300 flex items-center justify-center">
                                    <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 text-alabaster">
                                       <Icons.expand />
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-serif-display text-xl text-charcoal">{space.title}</h3>
                              <span className="text-xs tracking-wider text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                                 {space.capacity}
                              </span>
                           </div>
                           <p className="text-muted-foreground text-sm">{space.description}</p>
                        </div>
                     ))}
                  </div>
                  {/* Dot indicators */}
                  <div className="flex items-center justify-center gap-3 mt-6">
                     {spaces.map((_, index) => (
                        <button
                           key={index}
                           onClick={() => scrollToSpace(index)}
                           className={`h-1.5 rounded-full transition-all duration-300 ${
                              index === mobileIndex
                                 ? "bg-champagne w-8"
                                 : "bg-charcoal/25 w-1.5 hover:bg-charcoal/40"
                           }`}
                           aria-label={`Go to ${spaces[index].title}`}
                        />
                     ))}
                  </div>
               </div>
            </div>
         </section>

         <ImageLightbox
            isOpen={lightboxOpen}
            onClose={() => setLightboxOpen(false)}
            imageSrc={lightboxSrc}
            imageAlt={lightboxAlt}
         />
      </>
   );
}
