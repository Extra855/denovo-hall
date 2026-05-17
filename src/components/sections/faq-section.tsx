"use client";

import { useTranslations } from "next-intl";
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from "@/components/ui/accordion";
import { Ornament } from "@/components/ornament";

export function FAQSection() {
   const t = useTranslations("FAQ");

   const faqs = [
      { question: t("items.0.question"), answer: t("items.0.answer") },
      { question: t("items.1.question"), answer: t("items.1.answer") },
      { question: t("items.2.question"), answer: t("items.2.answer") },
      { question: t("items.3.question"), answer: t("items.3.answer") },
      { question: t("items.4.question"), answer: t("items.4.answer") },
      // { question: t("items.5.question"), answer: t("items.5.answer") },
   ];

   return (
      <section id="faq" className="py-24 md:py-32 lg:py-40 px-6 bg-alabaster">
         <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
               <p className="text-sm tracking-widest uppercase text-sage mb-4 animate-fade-up">
                  {t("subtitle")}
               </p>
               <h2
                  className="font-serif-display heading-large text-charcoal mb-6 animate-fade-up"
                  style={{ transitionDelay: "0.1s" }}
               >
                  {t("heading")}
               </h2>
               <Ornament className="animate-fade-up" style={{ transitionDelay: "0.15s" }} />
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
               {faqs.map((faq, index) => (
                  <AccordionItem
                     key={index}
                     value={`item-${index}`}
                     className="border border-champagne/30 rounded-sm px-6 animate-fade-up"
                     style={{ transitionDelay: `${0.2 + index * 0.05}s` }}
                  >
                     <AccordionTrigger className="text-start font-serif-display text-lg text-charcoal hover:text-sage py-6 transition-colors [&[data-state=open]]:text-charcoal">
                        {faq.question}
                     </AccordionTrigger>
                     <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                        {faq.answer}
                     </AccordionContent>
                  </AccordionItem>
               ))}
            </Accordion>
         </div>
      </section>
   );
}
