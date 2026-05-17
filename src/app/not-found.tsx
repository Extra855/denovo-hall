import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | De novo",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-alabaster flex items-center justify-center relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full border border-champagne/15" />
        <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[550px] md:h-[550px] rounded-full border border-champagne/20" />
        <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[280px] md:h-[280px] rounded-full border border-champagne/25" />

        {/* Floating botanical accents */}
        <div className="absolute top-[15%] start-[8%] opacity-[0.12] rotate-[-15deg] hidden md:block">
          <svg width="60" height="60" viewBox="0 0 40 40" fill="none" stroke="#E8DCC4" strokeWidth="1">
            <path d="M20 5C20 5 35 15 35 25C35 32 28 35 20 35C12 35 5 32 5 25C5 15 20 5 20 5Z" />
            <path d="M20 10V35" />
            <path d="M12 18C15 22 18 24 20 24" />
            <path d="M28 18C25 22 22 24 20 24" />
          </svg>
        </div>
        <div className="absolute bottom-[18%] end-[10%] opacity-[0.12] rotate-[20deg] hidden md:block">
          <svg width="50" height="50" viewBox="0 0 40 40" fill="none" stroke="#E8DCC4" strokeWidth="1">
            <path d="M20 5C20 5 35 15 35 25C35 32 28 35 20 35C12 35 5 32 5 25C5 15 20 5 20 5Z" />
            <path d="M20 10V35" />
            <path d="M12 18C15 22 18 24 20 24" />
            <path d="M28 18C25 22 22 24 20 24" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        {/* Brand logo */}
        <div className="mb-8 inline-flex flex-col items-center gap-3">
          <a href="/" aria-label="Return to homepage" className="group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              className="h-10 w-10 md:h-12 md:w-12 text-charcoal transition-colors duration-300 group-hover:text-champagne"
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
          </a>
          <span className="font-serif-display text-sm tracking-[0.3em] uppercase text-charcoal/60">
            De novo
          </span>
        </div>

        {/* Large 404 */}
        <div className="relative inline-block">
          <h1
            className="font-serif-display text-[8rem] sm:text-[10rem] md:text-[13rem] leading-none tracking-tight text-charcoal/[0.07] select-none"
            aria-hidden="true"
          >
            404
          </h1>
          <span className="sr-only">Page not found, error 404</span>
        </div>

        {/* Ornamental divider */}
        <div className="flex items-center justify-center gap-4 -mt-6 mb-8">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-champagne/50" />
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-champagne/60">
            <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" />
            <circle cx="6" cy="6" r="2" fill="currentColor" />
          </svg>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-champagne/50" />
        </div>

        {/* Headline */}
        <h2 className="font-serif-display heading-large text-charcoal mb-4">
          A Path Yet to Be <span className="italic text-champagne/80">Discovered</span>
        </h2>

        {/* Subtext */}
        <p className="body-regular text-muted-foreground max-w-md mx-auto mb-10">
          This page seems to have wandered off the guest list.
          Let us guide you back to where your story begins.
        </p>

        {/* CTA */}
        <a
          href="/"
          className="group inline-flex items-center gap-3 bg-charcoal text-alabaster px-10 py-4 text-sm tracking-[0.2em] uppercase btn-luxury pulse-subtle transition-all duration-400 hover:bg-charcoal/90"
        >
          Return to De novo
          <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12H19" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 5L19 12L12 19" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </a>
      </div>
    </main>
  );
}
