"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Ornament } from "@/components/ornament";

export function IntroductionSection() {
   const t = useTranslations("Introduction");

   return (
      <section className="py-24 md:py-32 lg:py-40 px-6 bg-alabaster relative overflow-hidden">
         <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, #2C2C2C 1px, transparent 0)`,
               backgroundSize: "40px 40px",
            }}
         />
         <div className="max-w-4xl mx-auto text-center relative">
            <div className="mb-8 animate-fade-up">
               <Icons.leaf />
            </div>
            <p
               className="font-serif-display heading-large text-charcoal mb-8 animate-fade-up"
               style={{ transitionDelay: "0.1s" }}
            >
               {t("heading")}
            </p>
            <Ornament
               className="mb-8 animate-fade-up"
               style={{ transitionDelay: "0.2s" }}
            />
            <p
               className="text-muted-foreground body-large max-w-2xl mx-auto animate-fade-up leading-relaxed"
               style={{ transitionDelay: "0.3s" }}
            >
               {t("description")}
            </p>
            <div
               className="mt-10 animate-fade-up"
               style={{ transitionDelay: "0.4s" }}
            >
               <Button
                  asChild
                  variant="outline"
                  className="rounded-none border-charcoal/20 text-charcoal hover:bg-charcoal hover:text-alabaster px-8 py-5 text-sm tracking-widest uppercase transition-all duration-500"
               >
                  <a href="#spaces">{t("cta")}</a>
               </Button>
            </div>
         </div>
      </section>
   );
}
