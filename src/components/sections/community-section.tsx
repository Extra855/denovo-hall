"use client";

import { useTranslations } from "next-intl";
import { Icons } from "@/components/icons";
import { BlurImage } from "@/components/blur-image";

export function CommunitySection() {
   const ig = useTranslations("Instagram");

   const instagramPosts = [
      {
         id: 1,
         image: "/gallery/543461987_122196725672299891_2833086693858307664_n.jpg",
         alt: ig("posts.0.alt"),
         url: "https://www.instagram.com/denovohall/p/DXm-7RrDRCC/",
      },
      {
         id: 2,
         image: "/gallery/670416047_17935120251213589_3656472072603517799_n.jpg",
         alt: ig("posts.1.alt"),
         url: "https://www.instagram.com/denovohall/reel/DYXaVR7uhmy/",
      },
      {
         id: 3,
         image: "/gallery/555993848_122199386996299891_2529894381116447068_n.jpg",
         alt: ig("posts.2.alt"),
         url: "https://www.instagram.com/denovohall/p/DX7U4hLDTnB/",
      },
      {
         id: 4,
         image: "/gallery/501281401_122181708704299891_2166528847618797340_n.jpg",
         alt: ig("posts.3.alt"),
         url: "https://www.instagram.com/denovohall/reel/DYDU1AQtWs7/",
      },
      {
         id: 5,
         image: "/gallery/476611018_122162852420299891_8755466114327543274_n.jpg",
         alt: ig("posts.4.alt"),
         url: "https://www.instagram.com/denovohall/p/DX7WLWXDT8r/",
      },
      {
         id: 6,
         image: "/gallery/472312220_122156924954299891_8540390733152468683_n.jpg",
         alt: ig("posts.5.alt"),
         url: "https://www.instagram.com/denovohall/reel/DX4zK_ZNohn/",
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
                        <a
                           key={post.id}
                           href={post.url}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="animate-fade-up aspect-square img-zoom cursor-pointer relative shrink-0 w-[70vw] md:w-auto snap-start block"
                           style={{ transitionDelay: `${0.1 + index * 0.05}s` }}
                        >
                           <BlurImage
                              src={post.image}
                              alt={post.alt}
                              sizes="(max-width: 768px) 70vw, 16vw"
                              className="object-cover rounded-sm"
                           />
                        </a>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}
