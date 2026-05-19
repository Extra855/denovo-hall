"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { Ornament } from "@/components/ornament";

export function InquirySection() {
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [isSubmitted, setIsSubmitted] = useState(false);
   const [errorMessage, setErrorMessage] = useState("");
   const t = useTranslations("Inquiry");

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setErrorMessage("");
      setIsSubmitting(true);

      const form = e.currentTarget;
      const payload: Record<string, string> = {};
      new FormData(form).forEach((value, key) => {
         const v = value.toString().trim();
         if (v) payload[key] = v;
      });

      try {
         console.log("[inquiry] Submitting:", payload);
         const res = await fetch("/api/inquiry", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
         });

         const resBody = await res.json();
         console.log("[inquiry] Response:", res.status, resBody);

         if (res.ok) {
            setIsSubmitted(true);
            return;
         }

         if (res.status === 429) {
            setErrorMessage(t("errorRateLimit"));
         } else if (res.status === 422) {
            const details = resBody?.details;
            if (details?.fieldErrors) {
               const lines = Object.entries(details.fieldErrors)
                  .filter(([, msgs]) => (msgs as unknown[])?.length)
                  .map(([field, msgs]) => `${field}: ${(msgs as string[]).join(", ")}`);
               setErrorMessage(lines.length ? lines.join("\n") : t("errorValidation"));
            } else {
               setErrorMessage(t("errorValidation"));
            }
         } else {
            setErrorMessage(resBody?.error || t("errorGeneral"));
         }
      } catch (err) {
         console.error("[inquiry] Network error:", err);
         setErrorMessage(t("errorNetwork"));
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <section
         id="inquiry"
         className="py-24 md:py-32 lg:py-40 px-6 bg-secondary/50 relative"
      >
         <div className="max-w-2xl mx-auto relative">
            <div className="text-center mb-12">
               <p className="text-sm tracking-widest uppercase text-sage mb-4 animate-fade-up">
                  {t("subtitle")}
               </p>
               <h2
                  className="font-serif-display heading-large text-charcoal mb-6 animate-fade-up"
                  style={{ transitionDelay: "0.1s" }}
               >
                  {t("heading")}
               </h2>
               <Ornament
                  className="mb-6 animate-fade-up"
                  style={{ transitionDelay: "0.15s" }}
               />
               <p
                  className="text-muted-foreground body-regular animate-fade-up"
                  style={{ transitionDelay: "0.2s" }}
               >
                  {t("description")}
               </p>
            </div>

            {isSubmitted ? (
               <div className="text-center py-12 animate-fade-up">
                  <div className="w-20 h-20 rounded-full bg-sage/20 flex items-center justify-center mx-auto mb-6">
                     <svg className="w-10 h-10 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                     </svg>
                  </div>
                  <h3 className="font-serif-display text-2xl md:text-3xl text-charcoal mb-3">
                     {t("thankYouTitle")}
                  </h3>
                  <p className="text-muted-foreground">
                     {t("thankYouMessage")}
                  </p>
               </div>
            ) : (
               <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                     <div className="animate-fade-up" style={{ transitionDelay: "0.3s" }}>
                        <Label htmlFor="name" className="text-sm tracking-wider uppercase text-charcoal mb-2 block">
                           {t("name")}
                        </Label>
                        <Input
                           id="name"
                           name="name"
                           type="text"
                           required
                           className="bg-alabaster border-champagne/50 rounded-none h-14 focus:border-champagne focus:ring-champagne/20 text-charcoal placeholder:text-muted-foreground/50"
                           placeholder={t("namePlaceholder")}
                           aria-label={t("nameLabel")}
                        />
                     </div>
                     <div className="animate-fade-up" style={{ transitionDelay: "0.35s" }}>
                        <Label htmlFor="email" className="text-sm tracking-wider uppercase text-charcoal mb-2 block">
                           {t("email")}
                        </Label>
                        <Input
                           id="email"
                           name="email"
                           type="email"
                           required
                           className="bg-alabaster border-champagne/50 rounded-none h-14 focus:border-champagne focus:ring-champagne/20 text-charcoal placeholder:text-muted-foreground/50"
                           placeholder={t("emailPlaceholder")}
                           aria-label={t("emailLabel")}
                        />
                     </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                     <div className="animate-fade-up" style={{ transitionDelay: "0.4s" }}>
                        <Label htmlFor="phone" className="text-sm tracking-wider uppercase text-charcoal mb-2 block">
                           {t("phone")}
                        </Label>
                        <Input
                           id="phone"
                           name="phone"
                           type="tel"
                           className="bg-alabaster border-champagne/50 rounded-none h-14 focus:border-champagne focus:ring-champagne/20 text-charcoal placeholder:text-muted-foreground/50"
                           placeholder={t("phonePlaceholder")}
                           aria-label={t("phoneLabel")}
                        />
                     </div>
                     <div className="animate-fade-up" style={{ transitionDelay: "0.42s" }}>
                        <Label htmlFor="date" className="text-sm tracking-wider uppercase text-charcoal mb-2 block">
                           {t("date")}
                        </Label>
                        <Input
                           id="date"
                           name="date"
                           type="date"
                           className="bg-alabaster border-champagne/50 rounded-none h-14 focus:border-champagne focus:ring-champagne/20 text-charcoal"
                           aria-label={t("dateLabel")}
                        />
                     </div>
                  </div>
                  <div className="animate-fade-up" style={{ transitionDelay: "0.44s" }}>
                     <Label htmlFor="guests" className="text-sm tracking-wider uppercase text-charcoal mb-2 block">
                        {t("guests")}
                     </Label>
                     <Input
                        id="guests"
                        name="guests"
                        type="number"
                        min="10"
                        max="1000"
                        placeholder={t("guestsPlaceholder")}
                        className="bg-alabaster border-champagne/50 rounded-none h-14 focus:border-champagne focus:ring-champagne/20 text-charcoal placeholder:text-muted-foreground/50"
                        aria-label={t("guestsLabel")}
                     />
                  </div>
                  <div className="animate-fade-up" style={{ transitionDelay: "0.48s" }}>
                     <Label htmlFor="message" className="text-sm tracking-wider uppercase text-charcoal mb-2 block">
                        {t("message")}
                     </Label>
                     <textarea
                        id="message"
                        name="message"
                        rows={4}
                        placeholder={t("messagePlaceholder")}
                        className="w-full bg-alabaster border border-champagne/50 rounded-none p-4 focus:border-champagne focus:ring-champagne/20 text-charcoal placeholder:text-muted-foreground/50 resize-none"
                        aria-label={t("messageLabel")}
                     />
                  </div>
                  <div className="animate-fade-up pt-4" style={{ transitionDelay: "0.5s" }}>
                     <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-charcoal hover:bg-charcoal/90 text-alabaster rounded-none h-14 text-sm tracking-widest uppercase btn-luxury group"
                     >
                        {isSubmitting ? (
                           <span className="flex items-center gap-3">
                              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              {t("sending")}
                           </span>
                        ) : (
                           <>
                              {t("submit")}
                              <span className="ms-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                 <Icons.arrowRight />
                              </span>
                           </>
                        )}
                     </Button>
                  </div>
                  {errorMessage && (
                     <div
                        className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 text-sm animate-fade-up whitespace-pre-line"
                        role="alert"
                     >
                        {errorMessage}
                     </div>
                  )}
               </form>
            )}
         </div>
      </section>
   );
}
