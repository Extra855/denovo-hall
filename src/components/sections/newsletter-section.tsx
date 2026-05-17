"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export function NewsletterSection() {
   const [email, setEmail] = useState("");
   const [isSubscribed, setIsSubscribed] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [errorMessage, setErrorMessage] = useState("");
   const t = useTranslations("Newsletter");

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email) return;
      setErrorMessage("");
      setIsSubmitting(true);

      try {
         const res = await fetch("/api/newsletter", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
         });

         if (res.ok) {
            setIsSubscribed(true);
            return;
         }

         if (res.status === 429) {
            setErrorMessage(t("errorRateLimit"));
         } else if (res.status === 422) {
            setErrorMessage(t("errorValidation"));
         } else {
            setErrorMessage(t("errorGeneral"));
         }
      } catch {
         setErrorMessage(t("errorNetwork"));
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <section className="py-16 md:py-24 px-6 bg-champagne/20 relative overflow-hidden">
         <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, #2C2C2C 1px, transparent 0)`,
               backgroundSize: "40px 40px",
            }}
         />
         <div className="max-w-3xl mx-auto relative text-center">
            <div className="mb-8 animate-fade-up">
               <Icons.leaf />
            </div>
            <h2
               className="font-serif-display heading-medium text-charcoal mb-4 animate-fade-up"
               style={{ transitionDelay: "0.1s" }}
            >
               {t("heading")}
            </h2>
            <p
               className="text-muted-foreground mb-8 animate-fade-up"
               style={{ transitionDelay: "0.2s" }}
            >
               {t("description")}
            </p>

            {isSubscribed ? (
               <div className="animate-fade-up">
                  <div className="inline-flex items-center gap-3 bg-sage/20 text-charcoal px-6 py-4 rounded-sm">
                     <Icons.check />
                     <span className="text-sm tracking-wider">
                        {t("thankYou")}
                     </span>
                  </div>
               </div>
            ) : (
               <>
                  <form
                     onSubmit={handleSubmit}
                     className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto animate-fade-up"
                     style={{ transitionDelay: "0.3s" }}
                  >
                     <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t("placeholder")}
                        required
                        className="newsletter-input touch-target"
                     />
                     <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-charcoal hover:bg-charcoal/90 text-alabaster rounded-none px-8 py-4 text-sm tracking-widest uppercase btn-luxury touch-target whitespace-nowrap"
                     >
                        {isSubmitting ? t("subscribing") : t("subscribe")}
                     </Button>
                  </form>
                  {errorMessage && (
                     <div
                        className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 text-sm animate-fade-up"
                        role="alert"
                     >
                        {errorMessage}
                     </div>
                  )}
               </>
            )}

            <p
               className="text-muted-foreground/60 text-xs mt-6 animate-fade-up"
               style={{ transitionDelay: "0.4s" }}
            >
               {t("privacy")}
            </p>
         </div>
      </section>
   );
}
