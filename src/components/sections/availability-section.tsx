"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export function AvailabilitySection() {
   const [selectedMonth, setSelectedMonth] = useState("june");
   const [selectedYear] = useState("2025");
   const t = useTranslations("Availability");

   const monthKeys = ["june", "july", "august", "september", "october"] as const;
   const fullMonthKeys = [
      "january", "february", "march", "april", "may",
      "june", "july", "august", "september", "october",
      "november", "december"
   ] as const;

   const dayKeys = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;

   const availability: Record<string, string[]> = {
      june: ["7", "14", "21", "28"],
      july: ["5", "12", "19", "26"],
      august: ["2", "9", "16", "23", "30"],
      september: ["6", "13", "20", "27"],
      october: ["4", "11", "18", "25"],
   };

   return (
      <section className="py-16 md:py-24 px-6 bg-charcoal relative overflow-hidden">
         <div
            className="absolute inset-0 opacity-5"
            style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, #FAF9F6 1px, transparent 0)`,
               backgroundSize: "40px 40px",
            }}
         />
         <div className="max-w-4xl mx-auto relative">
            <div className="text-center mb-10">
               <p className="text-sm tracking-widest uppercase text-champagne mb-4 animate-fade-up">
                  {t("subtitle")}
               </p>
               <h2
                  className="font-serif-display heading-medium text-alabaster mb-4 animate-fade-up"
                  style={{ transitionDelay: "0.1s" }}
               >
                  {t("heading")}
               </h2>
               <p
                  className="text-alabaster/60 text-sm animate-fade-up"
                  style={{ transitionDelay: "0.15s" }}
               >
                  {t("selectMonth", { year: selectedYear })}
               </p>
            </div>

            <div
               className="flex flex-wrap justify-center gap-2 mb-8 animate-fade-up"
               style={{ transitionDelay: "0.2s" }}
            >
               {monthKeys.map((key) => (
                  <button
                     key={key}
                     onClick={() => setSelectedMonth(key)}
                     className={`px-4 py-2 text-sm tracking-wider uppercase transition-all duration-300 rounded-sm ${
                        selectedMonth === key
                           ? "bg-champagne text-charcoal"
                           : "bg-alabaster/10 text-alabaster/70 hover:bg-alabaster/20 hover:text-alabaster"
                     }`}
                  >
                     {t(`months.${key}`)}
                  </button>
               ))}
            </div>

            <div
               className="bg-alabaster/5 border border-alabaster/10 rounded-sm p-6 md:p-8 animate-fade-up"
               style={{ transitionDelay: "0.3s" }}
            >
               <div className="flex items-center justify-between mb-6">
                  <p className="font-serif-display text-xl text-alabaster">
                     {t(`fullMonths.${selectedMonth}`)} {selectedYear}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-alabaster/60">
                     <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded bg-sage/50" />
                        {t("available")}
                     </span>
                     <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded bg-champagne/50" />
                        {t("limited")}
                     </span>
                  </div>
               </div>

               <div className="grid grid-cols-7 gap-2 mb-2">
                  {dayKeys.map((key) => (
                     <div
                        key={key}
                        className="text-center text-xs text-alabaster/40 py-1"
                     >
                        {t(`days.${key}`)}
                     </div>
                  ))}
               </div>

               <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 35 }, (_, i) => {
                     const day = i - 5 + 1;
                     const isValidDay = day > 0 && day <= 31;
                     const availableDates = availability[selectedMonth] || [];
                     const isAvailable = isValidDay && availableDates.includes(day.toString());
                     const isLimited = isValidDay && !isAvailable && day % 7 === 0;

                     return (
                        <div
                           key={i}
                           className={`aspect-square flex items-center justify-center text-sm rounded-sm transition-all duration-300 ${
                              !isValidDay
                                 ? "text-transparent"
                                 : isAvailable
                                   ? "bg-sage/30 text-alabaster cursor-pointer hover:bg-sage/50"
                                   : isLimited
                                     ? "bg-champagne/30 text-alabaster/80 cursor-pointer hover:bg-champagne/50"
                                     : "text-alabaster/30"
                           }`}
                        >
                           {isValidDay ? day : ""}
                        </div>
                     );
                  })}
               </div>

               <div className="mt-6 pt-6 border-t border-alabaster/10 flex flex-col md:flex-row items-center justify-between gap-4">
                  <p className="text-alabaster/60 text-sm">
                     {t("datesAvailable", {
                        count: availability[selectedMonth]?.length || 0,
                        month: t(`fullMonths.${selectedMonth}`)
                     })}
                  </p>
                  <Button
                     asChild
                     className="bg-champagne hover:bg-champagne/90 text-charcoal rounded-none px-6 py-3 text-sm tracking-widest uppercase btn-luxury group"
                  >
                     <a href="#inquiry">
                        {t("cta")}
                        <span className="ms-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                           <Icons.arrowRight />
                        </span>
                     </a>
                  </Button>
               </div>
            </div>
         </div>
      </section>
   );
}
