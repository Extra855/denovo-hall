"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter, Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { LanguageSwitcher } from "@/components/language-switcher";

export function Navigation() {
   const [isScrolled, setIsScrolled] = useState(false);
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const [activeSection, setActiveSection] = useState("");
   const tickingRef = useRef(0);
   const t = useTranslations("Navigation");
   const tc = useTranslations("common");
   const pathname = usePathname();
   const locale = useLocale();
   const router = useRouter();
   const isHomePage = pathname === "/";
   const localePrefix = `/${locale}`;

   useEffect(() => {
      if (isMobileMenuOpen) {
         const scrollY = window.scrollY;
         document.body.style.position = "fixed";
         document.body.style.inset = "0";
         document.body.style.overflow = "hidden";
         document.body.style.top = `-${scrollY}px`;
         return () => {
            document.body.style.position = "";
            document.body.style.inset = "";
            document.body.style.overflow = "";
            document.body.style.top = "";
            window.scrollTo(0, scrollY);
         };
      }
   }, [isMobileMenuOpen]);

   useEffect(() => {
      // Force glass-header on non-homepage routes
      if (!isHomePage) {
         setIsScrolled(true);
         return;
      }

      const handleScroll = () => {
         if (tickingRef.current) return;
         tickingRef.current = requestAnimationFrame(() => {
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
            tickingRef.current = 0;
         });
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
         style={{ paddingTop: "max(env(safe-area-inset-top), 0px)" }}
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

         {/* Mobile menu overlay */}
         <div
            className={`md:hidden fixed inset-0 z-50 flex flex-col bg-charcoal transition-all duration-500 ease-luxury ${
               isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
         >
            {/* Close button */}
            <div className="flex justify-end px-4 pt-3">
               <button
                  className="p-4 -mr-4 min-w-[48px] min-h-[48px] flex items-center justify-center text-alabaster/60 hover:text-alabaster transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label={t("closeMenu")}
               >
                  <Icons.close />
               </button>
            </div>

            {/* Menu content */}
            <div className="flex flex-col justify-center min-h-0 flex-1 px-8 pb-12">
               <div className="flex flex-col gap-1">
                  {navLinks.map((link, i) =>
                     link.isRoute ? (
                        <Link
                           key={link.href}
                           href={link.href}
                           className={`text-3xl font-serif-display tracking-wider text-alabaster/90 hover:text-alabaster transition-all duration-500 py-3 border-b border-alabaster/10 ${
                              isMobileMenuOpen
                                 ? "translate-y-0 opacity-100"
                                 : "translate-y-4 opacity-0"
                           }`}
                           style={{ transitionDelay: isMobileMenuOpen ? `${150 + i * 75}ms` : "0ms" }}
                           onClick={() => setIsMobileMenuOpen(false)}
                        >
                           {link.label}
                        </Link>
                     ) : (
                        <a
                           key={link.href}
                           href={resolveHref(link.href)}
                           className={`text-3xl font-serif-display tracking-wider text-alabaster/90 hover:text-alabaster transition-all duration-500 py-3 border-b border-alabaster/10 ${
                              isMobileMenuOpen
                                 ? "translate-y-0 opacity-100"
                                 : "translate-y-4 opacity-0"
                           }`}
                           style={{ transitionDelay: isMobileMenuOpen ? `${150 + i * 75}ms` : "0ms" }}
                           onClick={(e) => scrollToSection(e, link.href)}
                        >
                           {link.label}
                        </a>
                     ),
                  )}
               </div>

               <div
                  className={`mt-8 flex flex-col gap-5 transition-all duration-500 ${
                     isMobileMenuOpen
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0"
                  }`}
                  style={{ transitionDelay: isMobileMenuOpen ? "550ms" : "0ms" }}
               >
                  <div className="text-alabaster/40">
                     <LanguageSwitcher />
                  </div>
                  <Button
                     asChild
                     className="bg-alabaster hover:bg-champagne text-charcoal rounded-none px-6 py-4 text-sm tracking-widest uppercase w-full"
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
         </div>
      </header>
   );
}
