"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Ornament } from "@/components/ornament";

export function ExperienceSection() {
   const t = useTranslations("Experience");

   const experiences = [
      { icon: Icons.bespoke, title: t("items.0.title"), description: t("items.0.description") },
      { icon: Icons.dining, title: t("items.1.title"), description: t("items.1.description") },
      { icon: Icons.bespoke, title: t("items.2.title"), description: t("items.2.description") },
      { icon: Icons.privacy, title: t("items.3.title"), description: t("items.3.description") },
   ];

   return (
      <section id="experience" className="py-24 md:py-32 lg:py-40 px-6 bg-alabaster relative">
         <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 md:mb-24">
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
            <div className="grid md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
               {experiences.map((experience, index) => (
                  <div
                     key={experience.title}
                     className="text-center animate-fade-up group"
                     style={{ transitionDelay: `${0.2 + index * 0.1}s` }}
                  >
                     <div className="flex justify-center mb-6 text-charcoal group-hover:text-sage transition-colors duration-500">
                        <experience.icon />
                     </div>
                     <h3 className="font-serif-display text-xl text-charcoal mb-4">
                        {experience.title}
                     </h3>
                     <p className="text-muted-foreground">
                        {experience.description}
                     </p>
                  </div>
               ))}
            </div>
            <div className="text-center mt-16 md:mt-20 animate-fade-up" style={{ transitionDelay: "0.5s" }}>
               <Button
                  asChild
                  className="bg-charcoal hover:bg-charcoal/90 text-alabaster rounded-none px-10 py-5 text-sm tracking-widest uppercase btn-luxury group"
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
      </section>
   );
}
