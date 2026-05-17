"use client";

import { useTranslations } from "next-intl";
import { Icons } from "@/components/icons";
import { BlurImage } from "@/components/blur-image";

export function InstagramSection() {
   const t = useTranslations("Instagram");

   const instagramPosts = [
      {
         id: 1,
         image: "/gallery/543461987_122196725672299891_2833086693858307664_n.jpg",
         alt: t("posts.0.alt"),
      },
      {
         id: 2,
         image: "/gallery/670416047_17935120251213589_3656472072603517799_n.jpg",
         alt: t("posts.1.alt"),
      },
      {
         id: 3,
         image: "/gallery/555993848_122199386996299891_2529894381116447068_n.jpg",
         alt: t("posts.2.alt"),
      },
      {
         id: 4,
         image: "/gallery/501281401_122181708704299891_2166528847618797340_n.jpg",
         alt: t("posts.3.alt"),
      },
      {
         id: 5,
         image: "/gallery/476611018_122162852420299891_8755466114327543274_n.jpg",
         alt: t("posts.4.alt"),
      },
      {
         id: 6,
         image: "/gallery/472312220_122156924954299891_8540390733152468683_n.jpg",
         alt: t("posts.5.alt"),
      },
   ];

   return (
      <section className="py-24 md:py-32 px-6 bg-secondary/20">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
               <p className="text-sm tracking-widest uppercase text-sage mb-4 animate-fade-up">
                  {t("subtitle")}
               </p>
               <h2
                  className="font-serif-display heading-medium text-charcoal mb-4 animate-fade-up"
                  style={{ transitionDelay: "0.1s" }}
               >
                  {t("handle")}
               </h2>
               <a
                  href="https://www.instagram.com/denovohall"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-charcoal/70 hover:text-charcoal transition-colors animate-fade-up"
                  style={{ transitionDelay: "0.2s" }}
               >
                  <Icons.instagram />
                  <span className="text-sm tracking-wider">
                     {t("followLink")}
                  </span>
               </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
               {instagramPosts.map((post, index) => (
                  <div
                     key={post.id}
                     className="animate-fade-up aspect-square img-zoom cursor-pointer relative"
                     style={{ transitionDelay: `${0.1 + index * 0.05}s` }}
                  >
                     <BlurImage
                        src={post.image}
                        alt={post.alt}
                        sizes="(max-width: 768px) 50vw, 16vw"
                        className="object-cover rounded-sm"
                     />
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
}
