"use client";

import { useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Icons } from "@/components/icons";
import { BlurImage } from "@/components/blur-image";


function VideoCard({
   video,
   index,
}: {
   video: { id: number; couple: string; quote: string; src: string };
   index: number;
}) {
   const videoRef = useRef<HTMLVideoElement>(null);
   const [isPlaying, setIsPlaying] = useState(false);

   const togglePlay = () => {
      if (!videoRef.current) return;
      if (isPlaying) {
         videoRef.current.pause();
         setIsPlaying(false);
      } else {
         videoRef.current.play();
         setIsPlaying(true);
      }
   };

   return (
      <div
         className="relative group cursor-pointer animate-fade-up"
         style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
         onClick={togglePlay}
      >
         <div className="aspect-[4/3] relative overflow-hidden rounded-sm">
            <video
               ref={videoRef}
               src={video.src}
               poster="/gallery/featured-weddings/1/1.jpg"
               preload="none"
               muted
               loop
               playsInline
               controls={isPlaying}
               suppressHydrationWarning
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {!isPlaying && (
               <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/10 transition-colors duration-500 pointer-events-none" />
            )}
            {/* Play/pause icon overlay */}
            {!isPlaying && (
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-14 h-14 rounded-full bg-champagne/20 backdrop-blur-sm border border-champagne/30 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-champagne/30">
                     <svg className="w-5 h-5 text-champagne ms-0.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                     </svg>
                  </div>
               </div>
            )}
         </div>
         <div className="mt-4">
            <h3 className="font-serif-display text-xl text-alabaster mb-2">
               {video.couple}
            </h3>
            <p className="text-alabaster/50 text-sm italic leading-relaxed line-clamp-2">
               &ldquo;{video.quote}&rdquo;
            </p>
         </div>
      </div>
   );
}

export function TestimonialsSection() {
   const [currentIndex, setCurrentIndex] = useState(0);
   const t = useTranslations("Testimonials");
   const vt = useTranslations("VideoTestimonials");
   const locale = useLocale();
   const isRTL = locale === "ar";

   const testimonials = [
      { id: 1, quote: t("items.0.quote"), couple: t("items.0.couple"), date: t("items.0.date"), image: "/Maram-Haitham.jpg" },
      { id: 2, quote: t("items.1.quote"), couple: t("items.1.couple"), date: t("items.1.date"), image: "/Khawla-Mustafa.jpg" },
      { id: 3, quote: t("items.2.quote"), couple: t("items.2.couple"), date: t("items.2.date"), image: "/Kholoud-Ahmed.jpg" },
   ];

   const videoTestimonials = [
      { id: 1, couple: vt("items.0.couple"), quote: vt("items.0.quote"), src: "/videos/1.mp4" },
      { id: 2, couple: vt("items.1.couple"), quote: vt("items.1.quote"), src: "/videos/1.mp4" },
      { id: 3, couple: vt("items.2.couple"), quote: vt("items.2.quote"), src: "/videos/1.mp4" },
   ];

   const nextTestimonial = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
   const prevTestimonial = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

   return (
      <section id="testimonials" className="py-24 md:py-32 px-6 bg-charcoal relative overflow-hidden">
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
               <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                  <div>
                     <p className="text-champagne/60 text-xs tracking-[0.3em] uppercase mb-2">
                        {t("subtitle")}
                     </p>
                     <h2 className="font-serif-display heading-large text-alabaster">
                        {t("heading")}
                     </h2>
                  </div>
                  <p className="text-alabaster/50 body-regular max-w-md md:text-end">
                     {vt("description")}
                  </p>
               </div>
               <div className="mt-8 h-px bg-gradient-to-r from-champagne/20 via-champagne/10 to-transparent" />
            </div>

            {/* Written reviews carousel */}
            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
               <div className="animate-fade-up relative">
                  <div className="relative group aspect-[4/5]">
                     <div className="absolute -inset-4 border border-champagne/30 rounded-sm transition-transform duration-500 group-hover:-translate-x-2 group-hover:translate-y-2" />
                     <div className="w-full h-full rounded-sm relative z-10">
                        <BlurImage
                           key={testimonials[currentIndex].id}
                           src={testimonials[currentIndex].image}
                           alt={testimonials[currentIndex].couple}
                           sizes="(max-width: 768px) 100vw, 50vw"
                           className="object-cover rounded-sm"
                        />
                     </div>
                  </div>
               </div>
               <div className="animate-fade-up" style={{ transitionDelay: "0.2s" }}>
                  <div className="flex gap-1 mb-6">
                     {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-champagne" viewBox="0 0 20 20" fill="currentColor">
                           <path d="M10 2L11.545 7.09H17L12.727 9.91L14.272 15L10 12.18L5.728 15L7.273 9.91L3 7.09H8.455L10 2Z" />
                        </svg>
                     ))}
                  </div>
                  <svg className="w-12 h-12 text-champagne/40 mb-6" viewBox="0 0 48 48" fill="currentColor">
                     <path d="M12 28C12 23.5817 15.5817 20 20 20V12C11.1634 12 4 19.1634 4 28V36H20V20C15.5817 20 12 23.5817 12 28V28ZM36 28C36 23.5817 39.5817 20 44 20V12C35.1634 12 28 19.1634 28 28V36H44V20C39.5817 20 36 23.5817 36 28V28Z" />
                  </svg>
                  <blockquote
                     key={`quote-${testimonials[currentIndex].id}`}
                     className="font-serif-display text-2xl md:text-3xl text-alabaster italic mb-8 leading-relaxed transition-opacity duration-500"
                  >
                     &ldquo;{testimonials[currentIndex].quote}&rdquo;
                  </blockquote>
                  <div className="border-s-2 border-champagne ps-6 mb-8">
                     <p className="text-alabaster font-medium text-lg">{testimonials[currentIndex].couple}</p>
                     <p className="text-alabaster/60">{testimonials[currentIndex].date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                     <button
                        onClick={prevTestimonial}
                        className="w-12 h-12 rounded-full border border-alabaster/20 text-alabaster hover:bg-champagne hover:text-charcoal transition-all duration-300 flex items-center justify-center"
                        aria-label={t("prevTestimonial")}
                     >
                        {isRTL ? <Icons.chevronRight /> : <Icons.chevronLeft />}
                     </button>
                     <div className="flex gap-2">
                        {testimonials.map((_, index) => (
                           <button
                              key={index}
                              onClick={() => setCurrentIndex(index)}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                 index === currentIndex
                                    ? "bg-champagne w-6"
                                    : "bg-alabaster/30 hover:bg-alabaster/50"
                              }`}
                              aria-label={t("goToTestimonial", { index: index + 1 })}
                           />
                        ))}
                     </div>
                     <button
                        onClick={nextTestimonial}
                        className="w-12 h-12 rounded-full border border-alabaster/20 text-alabaster hover:bg-champagne hover:text-charcoal transition-all duration-300 flex items-center justify-center"
                        aria-label={t("nextTestimonial")}
                     >
                        {isRTL ? <Icons.chevronLeft /> : <Icons.chevronRight />}
                     </button>
                  </div>
               </div>
            </div>

            {/* Divider between reviews and videos */}
            <div className="flex items-center justify-center gap-6 my-20 md:my-28">
               <div className="h-px flex-1 bg-gradient-to-r from-transparent to-champagne/20" />
               <div className="flex items-center gap-3 text-champagne/40">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="opacity-60">
                     <path d="M8 0L9.545 5.09H15L10.727 7.91L12.272 13L8 10.18L3.728 13L5.273 7.91L1 5.09H6.455L8 0Z" />
                  </svg>
                  <span className="text-[10px] tracking-[0.4em] uppercase">Video Stories</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="opacity-60">
                     <path d="M8 0L9.545 5.09H15L10.727 7.91L12.272 13L8 10.18L3.728 13L5.273 7.91L1 5.09H6.455L8 0Z" />
                  </svg>
               </div>
               <div className="h-px flex-1 bg-gradient-to-l from-transparent to-champagne/20" />
            </div>

            {/* Video testimonials grid */}
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
               {videoTestimonials.map((video, index) => (
                  <VideoCard key={video.id} video={video} index={index} />
               ))}
            </div>
         </div>
      </section>
   );
}
