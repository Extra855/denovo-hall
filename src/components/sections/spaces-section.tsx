"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Icons } from "@/components/icons";
import { Ornament } from "@/components/ornament";
import { ImageLightbox } from "@/components/image-lightbox";
import { BlurImage } from "@/components/blur-image";

export function SpacesSection() {
   const [lightboxOpen, setLightboxOpen] = useState(false);
   const [selectedImage, setSelectedImage] = useState({ src: "", alt: "" });
   const t = useTranslations("Spaces");
   const ti = useTranslations("Introduction");
   const tg = useTranslations("InspirationGallery");

   const openLightbox = useCallback((src: string, alt: string) => {
      setSelectedImage({ src, alt });
      setLightboxOpen(true);
   }, []);

   const spaces = [
      {
         id: 1,
         title: t("items.0.title"),
         description: t("items.0.description"),
         capacity: t("items.0.capacity"),
         image: "/Grand-Ballroom.jpg",
      },
      {
         id: 2,
         title: t("items.1.title"),
         description: t("items.1.description"),
         capacity: t("items.1.capacity"),
         image: "/Garden-Terrace.jpg",
      },
      {
         id: 3,
         title: t("items.2.title"),
         description: t("items.2.description"),
         capacity: t("items.2.capacity"),
         image: "/Intimate-Lounge.jpg",
      },
      {
         id: 4,
         title: t("items.3.title"),
         description: t("items.3.description"),
         capacity: t("items.3.capacity"),
         image: "/Exchange-Hall.jpg",
      },
   ];

   const inspirations = [
      { id: 1, title: tg("items.0.title"), image: "/romantic.jpg", description: tg("items.0.description") },
      { id: 2, title: tg("items.1.title"), image: "/Garden-Terrace.jpg", description: tg("items.1.description") },
      { id: 3, title: tg("items.2.title"), image: "/vintage.jpg", description: tg("items.2.description") },
      { id: 4, title: tg("items.3.title"), image: "/hero.jpg", description: tg("items.3.description") },
   ];

   return (
      <>
         <section id="spaces" className="py-24 md:py-32 lg:py-40 px-6 bg-alabaster relative overflow-hidden">
            <div
               className="absolute inset-0 opacity-[0.02]"
               style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, #2C2C2C 1px, transparent 0)`,
                  backgroundSize: "40px 40px",
               }}
            />
            <div className="max-w-7xl mx-auto relative">
               {/* Introduction header */}
               <div className="text-center mb-8 animate-fade-up">
                  <div className="mb-6">
                     <Icons.leaf />
                  </div>
                  <h2
                     className="font-serif-display heading-large text-charcoal mb-6 animate-fade-up"
                     style={{ transitionDelay: "0.1s" }}
                  >
                     {ti("heading")}
                  </h2>
                  <Ornament className="mb-6 animate-fade-up" style={{ transitionDelay: "0.15s" }} />
                  <p
                     className="text-muted-foreground body-large max-w-2xl mx-auto animate-fade-up leading-relaxed"
                     style={{ transitionDelay: "0.2s" }}
                  >
                     {ti("description")}
                  </p>
               </div>

               {/* Mood images row */}
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-24">
                  {inspirations.map((item, index) => (
                     <div
                        key={item.id}
                        className="inspiration-card animate-fade-up"
                        style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
                     >
                        <BlurImage src={item.image} alt={item.title} sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                        <div className="inspiration-content">
                           <h3 className="font-serif-display text-lg md:text-xl text-alabaster mb-1">
                              {item.title}
                           </h3>
                           <p className="text-alabaster/80 text-xs tracking-wide">
                              {item.description}
                           </p>
                        </div>
                     </div>
                  ))}
               </div>

               {/* Spaces — heading floats left, description in right margin */}
               <div className="grid md:grid-cols-12 gap-8 md:gap-12 mb-12 md:mb-16">
                  <div className="md:col-span-5 animate-fade-up">
                     <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-px bg-champagne" />
                        <p className="text-xs tracking-widest uppercase text-sage">
                           {t("subtitle")}
                        </p>
                     </div>
                     <h2 className="font-serif-display heading-large text-charcoal">
                        {t("heading")}
                     </h2>
                  </div>
                  <div className="md:col-span-7 flex items-end animate-fade-up" style={{ transitionDelay: "0.1s" }}>
                     <p className="text-muted-foreground body-regular">
                        {t("description")}
                     </p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
                  <div className="md:col-span-7 animate-fade-up group" style={{ transitionDelay: "0.3s" }}>
                     <div
                        className="img-zoom rounded-sm overflow-hidden relative cursor-pointer"
                        onClick={() => openLightbox(spaces[0].image, spaces[0].title)}
                     >
                        <div className="w-full h-[400px] md:h-[500px] relative">
                           <BlurImage src={spaces[0].image} alt={spaces[0].title} sizes="(max-width: 768px) 100vw, 58vw" className="object-cover" />
                           <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-500 flex items-center justify-center">
                              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-alabaster">
                                 <Icons.expand />
                              </span>
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

                  <div className="md:col-span-5 flex flex-col gap-6 md:gap-8">
                     {spaces.slice(1, 3).map((space, index) => (
                        <div key={space.id} className="animate-fade-up group" style={{ transitionDelay: `${0.4 + index * 0.1}s` }}>
                           <div
                              className="img-zoom rounded-sm overflow-hidden relative cursor-pointer"
                              onClick={() => openLightbox(space.image, space.title)}
                           >
                              <div className="w-full h-[250px] md:h-[230px] relative">
                                 <BlurImage src={space.image} alt={space.title} sizes="(max-width: 768px) 100vw, 42vw" className="object-cover" />
                              </div>
                              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-500 flex items-center justify-center">
                                 <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-alabaster">
                                    <Icons.expand />
                                 </span>
                              </div>
                           </div>
                           <div className="mt-4">
                              <div className="flex items-center gap-3 mb-1">
                                 <h3 className="font-serif-display text-xl text-charcoal">{space.title}</h3>
                              </div>
                              <p className="text-muted-foreground text-sm">{space.description}</p>
                              <span className="text-xs tracking-wider text-muted-foreground mt-1 inline-block">{space.capacity}</span>
                           </div>
                        </div>
                     ))}
                  </div>

                  <div className="md:col-span-12 animate-fade-up group" style={{ transitionDelay: "0.6s" }}>
                     <div
                        className="img-zoom rounded-sm overflow-hidden relative cursor-pointer"
                        onClick={() => openLightbox(spaces[3].image, spaces[3].title)}
                     >
                        <div className="w-full h-[300px] md:h-[400px] relative">
                           <BlurImage src={spaces[3].image} alt={spaces[3].title} sizes="100vw" className="object-cover" />
                        </div>
                        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-500 flex items-center justify-center">
                           <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-alabaster">
                              <Icons.expand />
                           </span>
                        </div>
                     </div>
                     <div className="mt-6 text-center">
                        <div className="flex items-center justify-center gap-3 mb-2">
                           <h3 className="font-serif-display text-2xl text-charcoal">{spaces[3].title}</h3>
                           <span className="text-xs tracking-wider text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                              {spaces[3].capacity}
                           </span>
                        </div>
                        <p className="text-muted-foreground">{spaces[3].description}</p>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <ImageLightbox
            isOpen={lightboxOpen}
            onClose={() => setLightboxOpen(false)}
            imageSrc={selectedImage.src}
            imageAlt={selectedImage.alt}
         />
      </>
   );
}
