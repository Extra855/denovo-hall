"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export function CountdownSection() {
   const t = useTranslations("Countdown");
   const [timeLeft, setTimeLeft] = useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
   });

   useEffect(() => {
      const targetDate = new Date();
      targetDate.setMonth(targetDate.getMonth() + 6);

      const interval = setInterval(() => {
         const now = new Date();
         const difference = targetDate.getTime() - now.getTime();

         if (difference > 0) {
            setTimeLeft({
               days: Math.floor(difference / (1000 * 60 * 60 * 24)),
               hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
               minutes: Math.floor((difference / (1000 * 60)) % 60),
               seconds: Math.floor((difference / 1000) % 60),
            });
         }
      }, 1000);

      return () => clearInterval(interval);
   }, []);

   return (
      <section className="py-16 md:py-24 px-6 bg-gradient-to-r from-champagne/20 via-champagne/30 to-champagne/20 relative overflow-hidden">
         <div
            className="absolute inset-0 opacity-10"
            style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232C2C2C' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
         />
         <div className="max-w-4xl mx-auto text-center relative">
            <p className="text-sm tracking-widest uppercase text-charcoal/70 mb-4 animate-fade-up">
               {t("subtitle")}
            </p>
            <h2
               className="font-serif-display text-2xl md:text-3xl text-charcoal mb-8 animate-fade-up"
               style={{ transitionDelay: "0.1s" }}
            >
               {t("heading1")}{" "}
               <span className="italic text-champagne">{t("heading2")}</span>
            </h2>
            <div className="countdown-timer animate-fade-up" style={{ transitionDelay: "0.2s" }}>
               <div className="countdown-item bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-sm shadow-sm">
                  <span className="countdown-value">{timeLeft.days}</span>
                  <span className="countdown-label">{t("days")}</span>
               </div>
               <div className="countdown-item bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-sm shadow-sm">
                  <span className="countdown-value">{timeLeft.hours}</span>
                  <span className="countdown-label">{t("hours")}</span>
               </div>
               <div className="countdown-item bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-sm shadow-sm">
                  <span className="countdown-value">{timeLeft.minutes}</span>
                  <span className="countdown-label">{t("minutes")}</span>
               </div>
               <div className="countdown-item bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-sm shadow-sm">
                  <span className="countdown-value">{timeLeft.seconds}</span>
                  <span className="countdown-label">{t("seconds")}</span>
               </div>
            </div>
            <p className="text-sm text-muted-foreground mt-6 animate-fade-up" style={{ transitionDelay: "0.3s" }}>
               {t("footer")}
            </p>
         </div>
      </section>
   );
}
