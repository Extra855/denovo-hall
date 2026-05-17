"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Ornament } from "@/components/ornament";

function VideoCard({
   video,
   index,
}: {
   video: { id: number; couple: string; quote: string; src: string };
   index: number;
}) {
   const videoRef = useRef<HTMLVideoElement>(null);
   const [isHovered, setIsHovered] = useState(false);
   const [canAutoPlay, setCanAutoPlay] = useState(false);

   useEffect(() => {
      setCanAutoPlay(true);
   }, []);

   return (
      <div
         className="relative group cursor-pointer animate-fade-up"
         style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
      >
         <div className="aspect-[4/3] relative overflow-hidden rounded-sm">
            <video
               ref={videoRef}
               src={video.src}
               muted
               loop
               playsInline
               autoPlay={canAutoPlay}
               suppressHydrationWarning
               controls={isHovered}
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {!isHovered && (
               <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/10 transition-colors duration-500 pointer-events-none" />
            )}
         </div>
         <div className="mt-4">
            <h3 className="font-serif-display text-xl text-alabaster mb-2">
               {video.couple}
            </h3>
            <p className="text-alabaster/60 text-sm italic">
               &ldquo;{video.quote}&rdquo;
            </p>
         </div>
      </div>
   );
}

export function VideoTestimonialsSection() {
   const t = useTranslations("VideoTestimonials");

   const videoTestimonials = [
      {
         id: 1,
         couple: t("items.0.couple"),
         quote: t("items.0.quote"),
         src: "/videos/1.mp4",
      },
      {
         id: 2,
         couple: t("items.1.couple"),
         quote: t("items.1.quote"),
         src: "/videos/1.mp4",
      },
      {
         id: 3,
         couple: t("items.2.couple"),
         quote: t("items.2.quote"),
         src: "/videos/1.mp4",
      },
   ];

   return (
      <section className="py-24 md:py-32 px-6 bg-charcoal relative overflow-hidden">
         <div
            className="absolute inset-0 opacity-5"
            style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, #FAF9F6 1px, transparent 0)`,
               backgroundSize: "40px 40px",
            }}
         />
         <div className="max-w-6xl mx-auto relative">
            <div className="text-center mb-12 md:mb-16">
               <p className="text-sm tracking-widest uppercase text-champagne mb-4 animate-fade-up">
                  {t("subtitle")}
               </p>
               <h2
                  className="font-serif-display heading-large text-alabaster mb-6 animate-fade-up"
                  style={{ transitionDelay: "0.1s" }}
               >
                  {t("heading")}
               </h2>
               <Ornament
                  className="animate-fade-up"
                  style={{ transitionDelay: "0.15s" }}
               />
               <p
                  className="text-alabaster/70 body-regular max-w-2xl mx-auto animate-fade-up mt-6"
                  style={{ transitionDelay: "0.2s" }}
               >
                  {t("description")}
               </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
               {videoTestimonials.map((video, index) => (
                  <VideoCard key={video.id} video={video} index={index} />
               ))}
            </div>
         </div>
      </section>
   );
}
