"use client";

import { useTranslations } from "next-intl";

export function SocialProofBar() {
   const t = useTranslations("SocialProof");

   const items = [
      {
         icon: "star",
         value: "4.3",
         label: t("googleRating"),
         count: t("googleReviews"),
      },
      {
         icon: "award",
         value: "#1",
         label: t("weddingVenue"),
         count: t("luxuryAwards"),
      },
      {
         icon: "heart",
         value: "300+",
         label: t("weddings"),
         count: t("successfullyHosted"),
      },
      {
         icon: "verified",
         value: "100%",
         label: t("satisfaction"),
         count: t("clientApproval"),
      },
   ];

   return (
      <section className="social-proof-bar py-6 md:py-8 px-6">
         <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
               {items.map((item, index) => (
                  <div
                     key={item.label}
                     className="flex items-center gap-3 animate-fade-up"
                     style={{ transitionDelay: `${index * 0.1}s` }}
                  >
                     <div className="w-10 h-10 rounded-full bg-champagne/20 flex items-center justify-center flex-shrink-0">
                        {item.icon === "star" && (
                           <svg className="w-5 h-5 text-champagne" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2L14.09 8.26L21 9.27L16.18 13.97L17.18 21L12 17.77L6.82 21L7.82 13.97L3 9.27L9.91 8.26L12 2Z" />
                           </svg>
                        )}
                        {item.icon === "award" && (
                           <svg className="w-5 h-5 text-champagne" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="8" r="6" />
                              <path d="M15.477 12.89L17 22L12 19L7 22L8.523 12.89" />
                           </svg>
                        )}
                        {item.icon === "heart" && (
                           <svg className="w-5 h-5 text-champagne" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                           </svg>
                        )}
                        {item.icon === "verified" && (
                           <svg className="w-5 h-5 text-champagne" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                              <polyline points="22 4 12 14.01 9 11.01" />
                           </svg>
                        )}
                     </div>
                     <div className="min-w-0">
                        <div className="font-serif-display text-xl md:text-2xl text-charcoal">
                           {item.value}
                        </div>
                        <div className="text-xs text-muted-foreground tracking-wide">
                           {item.label}
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
}
