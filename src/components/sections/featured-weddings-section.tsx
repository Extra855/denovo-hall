"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { BlurImage } from "@/components/blur-image";

import { Link } from "@/i18n/navigation";

const weddingSlugs = [
   "Sarah-Akram",
   "Amal-Waleed",
   "Abtisam-Adeeb",
   "Wafa-Muhamad",
] as const;

export function FeaturedWeddingsSection() {
   const t = useTranslations("FeaturedWeddings");
   const [activeIndex, setActiveIndex] = useState(0);
   const scrollRef = useRef<HTMLDivElement>(null);
   const locale = useLocale();
   const isRTL = locale === "ar";

   const featuredWeddings = [
      {
         id: 1,
         slug: weddingSlugs[0],
         couple: t("items.0.couple"),
         theme: t("items.0.theme"),
         image: "/sarah-akram.jpg",
         color: t("items.0.color"),
         season: t("items.0.season"),
      },
      {
         id: 2,
         slug: weddingSlugs[1],
         couple: t("items.1.couple"),
         theme: t("items.1.theme"),
         image: "/amal-waleed.jpg",
         color: t("items.1.color"),
         season: t("items.1.season"),
      },
      {
         id: 3,
         slug: weddingSlugs[2],
         couple: t("items.2.couple"),
         theme: t("items.2.theme"),
         image: "/abtisam-adeeb.jpg",
         color: t("items.2.color"),
         season: t("items.2.season"),
      },
      {
         id: 4,
         slug: weddingSlugs[3],
         couple: t("items.3.couple"),
         theme: t("items.3.theme"),
         image: "/wafa-muhamad.jpg",
         color: t("items.3.color"),
         season: t("items.3.season"),
      },
   ];

   const totalCount = featuredWeddings.length;

   // Sync active dot with scroll position
   useEffect(() => {
      const container = scrollRef.current;
      if (!container) return;
      const handleScroll = () => {
         const scrollPos = isRTL ? -container.scrollLeft : container.scrollLeft;
         const cardWidth = container.scrollWidth / totalCount;
         const newIndex = Math.round(scrollPos / cardWidth);
         if (newIndex >= 0 && newIndex < totalCount) {
            setActiveIndex(newIndex);
         }
      };
      container.addEventListener("scroll", handleScroll, { passive: true });
      return () => container.removeEventListener("scroll", handleScroll);
   }, [isRTL, totalCount]);

   const scrollToIndex = useCallback(
      (index: number) => {
         const container = scrollRef.current;
         if (!container) return;
         const cardWidth = container.scrollWidth / totalCount;
         container.scrollTo({
            left: isRTL ? -cardWidth * index : cardWidth * index,
            behavior: "smooth",
         });
         setActiveIndex(index);
      },
      [isRTL, totalCount],
   );

   return (
      <section className="py-24 md:py-32 px-6 bg-alabaster relative overflow-hidden">
         <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, #2C2C2C 1px, transparent 0)`,
               backgroundSize: "40px 40px",
            }}
         />
         <div className="max-w-7xl mx-auto relative">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-16">
               <div className="animate-fade-up">
                  <p className="text-sm tracking-widest uppercase text-sage mb-2">
                     {t("subtitle")}
                  </p>
                  <h2 className="font-serif-display heading-large text-charcoal">
                     {t("heading")}
                  </h2>
               </div>
               <p
                  className="text-muted-foreground body-regular max-w-md animate-fade-up md:text-end"
                  style={{ transitionDelay: "0.1s" }}
               >
                  {t("description")}
               </p>
            </div>

            <div className="-mx-6 px-6 relative">
               <div
                  ref={scrollRef}
                  className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-2 md:gap-8 md:overflow-visible scroll-smooth"
               >
                  {featuredWeddings.map((wedding, index) => (
                     <div
                        key={wedding.id}
                        className="w-[85vw] snap-center shrink-0 md:w-auto md:shrink"
                     >
                        <Link
                           href={`/gallery?wedding=${wedding.slug}`}
                           className="group relative overflow-hidden rounded-sm animate-fade-up block active:scale-[0.98] transition-transform"
                           style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
                        >
                           <div className="aspect-[4/3] img-zoom relative">
                              <BlurImage
                                 src={wedding.image}
                                 alt={`${wedding.couple}'s ${wedding.theme.toLowerCase()} wedding at De novo`}
                                 sizes="(max-width: 768px) 85vw, 50vw"
                                 className="object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                           </div>
                           <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                           <div className="absolute bottom-0 start-0 end-0 p-6 md:p-8">
                              <div className="flex items-center gap-2 mb-3">
                                 <span className="luxury-tag">
                                    {wedding.season}
                                 </span>
                                 <span className="luxury-tag">
                                    {wedding.theme}
                                 </span>
                              </div>
                              <h3 className="font-serif-display text-2xl text-alabaster mb-2">
                                 {wedding.couple}
                              </h3>
                              <p className="text-alabaster/80 text-sm">
                                 {t("colorPalette")}: {wedding.color}
                              </p>
                              <div className="mt-4 flex items-center gap-2 text-champagne text-sm tracking-wider uppercase opacity-60 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 md:group-hover:translate-y-0">
                                 <span>{t("viewGallery")}</span>
                                 <Icons.arrowRight />
                              </div>
                           </div>
                        </Link>
                     </div>
                  ))}
               </div>

               {/* Mobile dot indicators + swipe hint */}
               <div className="flex items-center justify-center gap-3 mt-6 md:hidden">
                  {featuredWeddings.map((_, index) => (
                     <button
                        key={index}
                        onClick={() => scrollToIndex(index)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                           index === activeIndex
                              ? "bg-sage w-8"
                              : "bg-charcoal/20 w-1.5 hover:bg-charcoal/35"
                        }`}
                        aria-label={`Go to wedding ${index + 1}`}
                     />
                  ))}
                  <div className="text-charcoal/30 flex items-center gap-1 ms-2">
                     <svg
                        className="w-3.5 h-3.5 swipe-nudge"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                     </svg>
                  </div>
               </div>
            </div>

            <div
               className="text-center mt-12 animate-fade-up"
               style={{ transitionDelay: "0.7s" }}
            >
               <Button
                  asChild
                  variant="outline"
                  className="rounded-none border-charcoal/20 text-charcoal hover:bg-charcoal hover:text-alabaster px-8 py-5 text-sm tracking-widest uppercase transition-all duration-500"
               >
                  <a href="#inquiry">{t("cta")}</a>
               </Button>
            </div>
         </div>
      </section>
   );
}
