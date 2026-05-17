"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter, Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { LanguageSwitcher } from "@/components/language-switcher";

export function Navigation() {
   const [isScrolled, setIsScrolled] = useState(false);
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const [activeSection, setActiveSection] = useState("");
   const t = useTranslations("Navigation");
   const tc = useTranslations("common");
   const pathname = usePathname();
   const locale = useLocale();
   const router = useRouter();
   const isHomePage = pathname === "/";
   const localePrefix = `/${locale}`;

   useEffect(() => {
      // Force glass-header on non-homepage routes
      if (!isHomePage) {
         setIsScrolled(true);
         return;
      }

      const handleScroll = () => {
         setIsScrolled(window.scrollY > 50);

         const sections = [
            "spaces",
            "testimonials",
            "experience",
            "faq",
            "inquiry",
         ];
         for (const section of sections.reverse()) {
            const el = document.getElementById(section);
            if (el) {
               const rect = el.getBoundingClientRect();
               if (rect.top <= 150) {
                  setActiveSection(section);
                  break;
               }
            }
         }
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   }, [isHomePage]);

   const navLinks = [
      { href: "#spaces", label: t("spaces"), isRoute: false },
      { href: "#testimonials", label: t("stories"), isRoute: false },
      { href: "#experience", label: t("experience"), isRoute: false },
      { href: "#faq", label: t("faq"), isRoute: false },
      { href: "/gallery", label: t("gallery"), isRoute: true },
   ];

   const resolveHref = (href: string) =>
      isHomePage ? href : `${localePrefix}${href}`;

   const scrollToSection = (
      e: React.MouseEvent<HTMLAnchorElement>,
      href: string,
   ) => {
      e.preventDefault();
      if (!isHomePage) {
         router.push("/");
         const scrollToHash = () => {
            const el = document.querySelector(href);
            if (el) {
               const top = el.getBoundingClientRect().top + window.scrollY - 80;
               window.scrollTo({ top, behavior: "smooth" });
            } else {
               setTimeout(scrollToHash, 100);
            }
         };
         setTimeout(scrollToHash, 300);
         setIsMobileMenuOpen(false);
         return;
      }
      const el = document.querySelector(href);
      if (!el) return;
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
      setIsMobileMenuOpen(false);
   };

   return (
      <header
         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-luxury ${
            isScrolled ? "glass-header py-3 shadow-sm" : "bg-transparent py-5"
         }`}
      >
         <nav
            className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between"
            dir="ltr"
            aria-label={t("mainNav")}
         >
            <Link
               href="/"
               className={`font-serif-display text-2xl md:text-3xl tracking-wide transition-colors duration-300 ${
                  isScrolled
                     ? "text-charcoal hover:text-champagne"
                     : "text-alabaster hover:text-champagne"
               }`}
               onClick={() => {
                  if (isHomePage) {
                     window.scrollTo({ top: 0, behavior: "smooth" });
                  }
               }}
            >
               <span className="relative flex items-center gap-2">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 100 100"
                     className="h-8 w-8 md:h-9 md:w-9"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2.5"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                  >
                     <path d="M 28 18 C 44 18, 46 40, 50 58 C 55 76, 84 72, 80 42 L 68 50" />
                     <path d="M 72 18 C 56 18, 54 40, 50 58 C 45 76, 16 72, 20 42 L 32 50" />
                     <line x1="12" y1="85" x2="88" y2="85" />
                  </svg>
                  De novo
                  <span
                     className={`absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent transition-colors duration-300 ${
                        isScrolled ? "via-champagne/50" : "via-alabaster/50"
                     } to-transparent`}
                  />
               </span>
            </Link>

            <div className="hidden md:flex items-center gap-8 lg:gap-10">
               {navLinks.map((link) =>
                  link.isRoute ? (
                     <Link
                        key={link.href}
                        href={link.href}
                        className={`relative text-sm tracking-widest uppercase transition-colors duration-300 py-2 ${
                           isScrolled
                              ? "text-charcoal/70 hover:text-charcoal"
                              : "text-alabaster/70 hover:text-alabaster"
                        }`}
                     >
                        {link.label}
                     </Link>
                  ) : (
                     <a
                        key={link.href}
                        href={resolveHref(link.href)}
                        onClick={(e) => scrollToSection(e, link.href)}
                        className={`relative text-sm tracking-widest uppercase transition-colors duration-300 py-2 ${
                           isScrolled
                              ? activeSection === link.href.slice(1)
                                 ? "text-charcoal"
                                 : "text-charcoal/70 hover:text-charcoal"
                              : activeSection === link.href.slice(1)
                                ? "text-alabaster"
                                : "text-alabaster/70 hover:text-alabaster"
                        }`}
                     >
                        {link.label}
                        <span
                           className={`absolute bottom-0 left-0 w-full h-px transition-transform duration-300 origin-left ${
                              isScrolled ? "bg-charcoal" : "bg-alabaster"
                           } ${
                              activeSection === link.href.slice(1)
                                 ? "scale-x-100"
                                 : "scale-x-0"
                           }`}
                        />
                     </a>
                  ),
               )}
               <span className={`transition-colors duration-300 ${isScrolled ? "text-charcoal" : "text-alabaster"}`}>
                  <LanguageSwitcher />
               </span>
               <Button
                  asChild
                  className={`h-auto rounded-none px-5 py-2.5 text-xs tracking-widest uppercase btn-luxury group transition-colors duration-300 ${
                     isScrolled
                        ? "bg-charcoal hover:bg-charcoal/90 text-alabaster"
                        : "bg-alabaster/90 hover:bg-alabaster text-charcoal backdrop-blur-sm"
                  }`}
               >
                  <a
                     href={resolveHref("#inquiry")}
                     onClick={(e) => scrollToSection(e, "#inquiry")}
                  >
                     {tc("bookATour")}
                     <span className="inline-block ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        <Icons.arrowRight />
                     </span>
                  </a>
               </Button>
            </div>

            <button
               className={`md:hidden p-4 -mr-4 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-lg transition-colors touch-target ${
                  isScrolled
                     ? "text-charcoal hover:bg-champagne/20"
                     : "text-alabaster hover:bg-white/10"
               }`}
               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
               aria-label={isMobileMenuOpen ? t("closeMenu") : t("openMenu")}
               aria-expanded={isMobileMenuOpen}
            >
               {isMobileMenuOpen ? <Icons.close /> : <Icons.menu />}
            </button>
         </nav>

         <div
            className={`md:hidden absolute top-full left-0 right-0 bg-alabaster/98 backdrop-blur-lg border-t border-champagne/30 transition-all duration-500 ease-luxury overflow-hidden ${
               isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
         >
            <div className="px-6 py-8 flex flex-col gap-4">
               {navLinks.map((link) =>
                  link.isRoute ? (
                     <Link
                        key={link.href}
                        href={link.href}
                        className="text-base tracking-wider text-charcoal/80 hover:text-charcoal transition-colors py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                     >
                        {link.label}
                     </Link>
                  ) : (
                     <a
                        key={link.href}
                        href={resolveHref(link.href)}
                        className="text-base tracking-wider text-charcoal/80 hover:text-charcoal transition-colors py-2"
                        onClick={(e) => scrollToSection(e, link.href)}
                     >
                        {link.label}
                     </a>
                  ),
               )}
               <div className="py-2">
                  <LanguageSwitcher />
               </div>
               <Button
                  asChild
                  className="bg-charcoal hover:bg-charcoal/90 text-alabaster rounded-none px-6 py-3 text-sm tracking-widest uppercase mt-2"
               >
                  <a
                     href={resolveHref("#inquiry")}
                     onClick={(e) => scrollToSection(e, "#inquiry")}
                  >
                     {tc("bookATour")}
                  </a>
               </Button>
            </div>
         </div>
      </header>
   );
}
