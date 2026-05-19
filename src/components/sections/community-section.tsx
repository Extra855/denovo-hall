"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Icons } from "@/components/icons";
import { BlurImage } from "@/components/blur-image";

export function CommunitySection() {
   const t = useTranslations("Vendors");
   const ig = useTranslations("Instagram");
   const [activeVendor, setActiveVendor] = useState(0);

   const vendors = [
      { category: t("items.0.category"), names: t("items.0.names") },
      { category: t("items.1.category"), names: t("items.1.names") },
      { category: t("items.2.category"), names: t("items.2.names") },
      { category: t("items.3.category"), names: t("items.3.names") },
      { category: t("items.4.category"), names: t("items.4.names") },
      { category: t("items.5.category"), names: t("items.5.names") },
   ];

   const instagramPosts = [
      {
         id: 1,
         image: "/gallery/543461987_122196725672299891_2833086693858307664_n.jpg",
         alt: ig("posts.0.alt"),
      },
      {
         id: 2,
         image: "/gallery/670416047_17935120251213589_3656472072603517799_n.jpg",
         alt: ig("posts.1.alt"),
      },
      {
         id: 3,
         image: "/gallery/555993848_122199386996299891_2529894381116447068_n.jpg",
         alt: ig("posts.2.alt"),
      },
      {
         id: 4,
         image: "/gallery/501281401_122181708704299891_2166528847618797340_n.jpg",
         alt: ig("posts.3.alt"),
      },
      {
         id: 5,
         image: "/gallery/476611018_122162852420299891_8755466114327543274_n.jpg",
         alt: ig("posts.4.alt"),
      },
      {
         id: 6,
         image: "/gallery/472312220_122156924954299891_8540390733152468683_n.jpg",
         alt: ig("posts.5.alt"),
      },
   ];

   return (
      <section className="py-24 md:py-32 px-6 bg-secondary/30 relative overflow-hidden">
         <div className="absolute -start-20 top-1/2 -translate-y-1/2 w-64 h-64 opacity-5">
            <svg viewBox="0 0 200 200" className="w-full h-full text-charcoal">
               <circle
                  cx="100"
                  cy="100"
                  r="100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
               />
               <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
               />
               <circle
                  cx="100"
                  cy="100"
                  r="60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
               />
            </svg>
         </div>

         <div className="max-w-7xl mx-auto relative">
            {/* Vendors — center-aligned heading */}
            <div className="max-w-5xl mx-auto mb-20 md:mb-28">
               <div className="mb-12 md:mb-16 text-center animate-fade-up">
                  <p className="text-xs tracking-widest uppercase text-sage mb-3">
                     {t("subtitle")}
                  </p>
                  <h2 className="font-serif-display heading-medium text-charcoal">
                     {t("heading")}
                  </h2>
                  <p
                     className="text-muted-foreground text-sm max-w-lg mx-auto mt-3"
                     style={{ transitionDelay: "0.1s" }}
                  >
                     {t("description")}
                  </p>
               </div>

               {/* Mobile: pill bar + single card */}
               <div className="md:hidden mb-8">
                  <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-6 px-6 mb-6">
                     {vendors.map((vendor, index) => (
                        <button
                           key={vendor.category}
                           type="button"
                           onClick={() => setActiveVendor(index)}
                           className={`shrink-0 whitespace-nowrap px-4 py-2.5 rounded-full text-xs tracking-widest uppercase border transition-colors ${
                              activeVendor === index
                                 ? "bg-charcoal text-alabaster border-charcoal"
                                 : "bg-transparent text-charcoal/70 border-champagne/50"
                           }`}
                           style={{ minHeight: "44px" }}
                        >
                           {vendor.category}
                        </button>
                     ))}
                  </div>
                  <div className="luxury-card p-6 animate-fade-up">
                     <p className="text-xs tracking-widest uppercase text-sage mb-2">
                        {vendors[activeVendor].category}
                     </p>
                     <p className="font-serif-display text-lg text-charcoal">
                        {vendors[activeVendor].names}
                     </p>
                  </div>
               </div>

               {/* Desktop: original grid */}
               <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {vendors.map((vendor, index) => (
                     <div
                        key={vendor.category}
                        className="luxury-card p-6 animate-fade-up"
                        style={{ transitionDelay: `${0.3 + index * 0.05}s` }}
                     >
                        <p className="text-xs tracking-widest uppercase text-sage mb-2">
                           {vendor.category}
                        </p>
                        <p className="font-serif-display text-lg text-charcoal">
                           {vendor.names}
                        </p>
                     </div>
                  ))}
               </div>
            </div>

            {/* Instagram — center-aligned */}
            <div>
               <div className="text-center mb-10 animate-fade-up">
                  <p className="text-xs tracking-widest uppercase text-sage mb-2">
                     {ig("subtitle")}
                  </p>
                  <a
                     href="https://www.instagram.com/denovohall"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="font-serif-display heading-large text-charcoal hover:text-sage transition-colors"
                  >
                     {ig("handle")}
                  </a>
                  <div className="mt-3">
                     <a
                        href="https://www.instagram.com/denovohall"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-charcoal/70 hover:text-charcoal transition-colors"
                     >
                        <Icons.instagram />
                        <span className="text-sm tracking-wider">
                           {ig("followLink")}
                        </span>
                     </a>
                  </div>
               </div>

               <div className="relative">
                  <div className="pointer-events-none absolute end-0 top-0 bottom-0 w-8 bg-gradient-to-l from-secondary/30 to-transparent z-10 md:hidden" />
                  <div className="flex md:grid md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-6 md:px-0 -mx-6 md:mx-0">
                     {instagramPosts.map((post, index) => (
                        <div
                           key={post.id}
                           className="animate-fade-up aspect-square img-zoom cursor-pointer relative shrink-0 w-[70vw] md:w-auto snap-start"
                           style={{ transitionDelay: `${0.1 + index * 0.05}s` }}
                        >
                           <BlurImage
                              src={post.image}
                              alt={post.alt}
                              sizes="(max-width: 768px) 70vw, 16vw"
                              className="object-cover rounded-sm"
                           />
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}
