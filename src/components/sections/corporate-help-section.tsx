"use client";

import { useTranslations } from "next-intl";
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from "@/components/ui/accordion";

const contactIcons = {
   location: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-champagne">
         <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor" />
      </svg>
   ),
   phone: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-champagne">
         <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" fill="currentColor" />
      </svg>
   ),
   email: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-champagne">
         <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor" />
      </svg>
   ),
} as const;

export function CorporateHelpSection() {
   const t = useTranslations("CorporateEvents");
   const loc = useTranslations("Location");

   const faqs = [
      { question: t("faq.items.0.question"), answer: t("faq.items.0.answer") },
      { question: t("faq.items.1.question"), answer: t("faq.items.1.answer") },
      { question: t("faq.items.2.question"), answer: t("faq.items.2.answer") },
      { question: t("faq.items.3.question"), answer: t("faq.items.3.answer") },
      { question: t("faq.items.4.question"), answer: t("faq.items.4.answer") },
   ];

   const contactInfo = [
      {
         icon: "location" as const,
         title: loc("items.0.title"),
         details: [loc("items.0.details.0"), loc("items.0.details.1")],
         action: loc("items.0.action"),
         href: "https://www.google.com/maps/dir//''/data=!4m7!4m6!1m1!4e2!1m2!1m1!1s0x1603c5060369a7ff:0x9c2ac069276b1d6e!3e0?g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF",
      },
      {
         icon: "phone" as const,
         title: loc("items.1.title"),
         details: [loc("items.1.details.0"), loc("items.1.details.1")],
         action: loc("items.1.action"),
         href: "tel:+967775228246",
      },
      {
         icon: "email" as const,
         title: loc("items.2.title"),
         details: [loc("items.2.details.0"), loc("items.2.details.1")],
         action: loc("items.2.action"),
         href: "mailto:denovohall.ye@gmail.com",
      },
   ];

   return (
      <section
         id="faq"
         className="py-24 md:py-32 px-6 bg-charcoal relative overflow-hidden"
      >
         <div
            className="absolute inset-0 opacity-5"
            style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, #FAF9F6 1px, transparent 0)`,
               backgroundSize: "40px 40px",
            }}
         />
         <div className="max-w-6xl mx-auto relative">
            {/* FAQ */}
            <div className="max-w-3xl mx-auto mb-20 md:mb-28">
               <div className="mb-10 md:mb-14 animate-fade-up">
                  <div className="flex items-center gap-3 mb-1">
                     <div className="w-8 h-px bg-champagne/40" />
                     <p className="text-xs tracking-[0.3em] uppercase text-champagne/60">
                        {t("faq.subtitle")}
                     </p>
                  </div>
                  <h2 className="font-serif-display heading-large text-alabaster">
                     {t("faq.heading")}
                  </h2>
               </div>

               <Accordion
                  type="single"
                  collapsible
                  className="w-full space-y-4"
               >
                  {faqs.map((faq, index) => (
                     <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="border border-alabaster/10 rounded-sm px-6 animate-fade-up bg-alabaster/5"
                        style={{ transitionDelay: `${0.2 + index * 0.05}s` }}
                     >
                        <AccordionTrigger className="text-start font-serif-display text-lg text-alabaster hover:text-champagne py-6 transition-colors [&[data-state=open]]:text-alabaster">
                           {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-alabaster/60 pb-6 leading-relaxed">
                           {faq.answer}
                        </AccordionContent>
                     </AccordionItem>
                  ))}
               </Accordion>
            </div>

            {/* Location */}
            <div>
               <div className="mb-12 md:mb-16">
                  <div
                     className="animate-fade-up"
                     style={{ transitionDelay: "0s" }}
                  >
                     <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d779.3745983654658!2d44.194814996572205!3d15.293501594468038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1603c5060369a7ff%3A0x9c2ac069276b1d6e!2z2LXYp9mE2Kkg2K_ZiiDZhtmI2YHZiA!5e1!3m2!1sen!2s!4v1778197464076!5m2!1sen!2s"
                        width="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={loc("mapTitle")}
                        className="w-full aspect-[4/3] md:aspect-[21/9] rounded-sm"
                     />
                  </div>

                  <div className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                     <div
                        className="animate-fade-up"
                        style={{ transitionDelay: "0.1s" }}
                     >
                        <p className="text-xs tracking-[0.3em] uppercase text-champagne/60 mb-2">
                           {loc("subtitle")}
                        </p>
                        <h2 className="font-serif-display heading-large text-alabaster">
                           {loc("heading")}
                        </h2>
                     </div>
                     <p
                        className="text-alabaster/70 body-regular max-w-md animate-fade-up md:text-end"
                        style={{ transitionDelay: "0.2s" }}
                     >
                        {loc("description")}
                     </p>
                  </div>
               </div>

               {/* Mobile: compact inline list */}
               <div className="md:hidden divide-y divide-alabaster/10 mb-12">
                  {contactInfo.map((info, index) => (
                     <a
                        key={info.title}
                        href={info.href}
                        target={
                           info.icon === "location" ? "_blank" : undefined
                        }
                        rel={
                           info.icon === "location"
                              ? "noopener noreferrer"
                              : undefined
                        }
                        className="flex items-center gap-4 py-5 animate-fade-up"
                        style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
                        aria-label={info.action}
                     >
                        <div className="w-10 h-10 rounded-full bg-champagne/20 flex items-center justify-center shrink-0">
                           {contactIcons[info.icon]}
                        </div>
                        <div className="flex-1 min-w-0">
                           <h3 className="font-serif-display text-base text-alabaster">
                              {info.title}
                           </h3>
                           <p className="text-alabaster/60 text-sm break-words" dir={info.icon === "phone" ? "ltr" : undefined}>
                              {info.details[0]}
                           </p>
                        </div>
                        <span className="shrink-0 text-champagne/70 p-2 rtl:scale-x-[-1]">
                           <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                              <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                           </svg>
                        </span>
                     </a>
                  ))}
               </div>

               {/* Desktop: grid */}
               <div className="hidden md:grid md:grid-cols-3 gap-6 mb-12">
                  {contactInfo.map((info, index) => (
                     <a
                        key={info.title}
                        href={info.href}
                        target={
                           info.icon === "location" ? "_blank" : undefined
                        }
                        rel={
                           info.icon === "location"
                              ? "noopener noreferrer"
                              : undefined
                        }
                        className="block bg-alabaster/5 border border-alabaster/10 rounded-sm p-8 text-center animate-fade-up"
                        style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
                        aria-label={info.action}
                     >
                        <div className="w-16 h-16 rounded-full bg-champagne/20 flex items-center justify-center mx-auto mb-6">
                           {info.icon === "location" && (
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-champagne">
                                 <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor" />
                              </svg>
                           )}
                           {info.icon === "phone" && (
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-champagne">
                                 <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" fill="currentColor" />
                              </svg>
                           )}
                           {info.icon === "email" && (
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-champagne">
                                 <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor" />
                              </svg>
                           )}
                        </div>
                        <h3 className="font-serif-display text-xl text-alabaster mb-3">
                           {info.title}
                        </h3>
                        {info.details.map((detail, i) => (
                           <p
                              key={i}
                              className="text-alabaster/60 text-sm mb-1"
                              dir={info.icon === "phone" ? "ltr" : undefined}
                           >
                              {detail}
                           </p>
                        ))}
                        <span className="mt-4 inline-block text-champagne text-sm tracking-wider uppercase animated-underline">
                           {info.action}
                        </span>
                     </a>
                  ))}
               </div>
            </div>
         </div>
      </section>
   );
}
