"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function BlogPostError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Blog");

  return (
    <main id="main-content">
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="font-serif-display text-3xl text-charcoal mb-4">
            {t("errorTitle")}
          </h2>
          <p className="text-charcoal/50 font-sans mb-6">{t("errorMessage")}</p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={reset}
              className="bg-charcoal text-alabaster px-6 py-3 text-sm tracking-widest uppercase font-sans hover:bg-charcoal/90 transition-colors"
            >
              {t("retryButton")}
            </button>
            <Link
              href="/blog"
              className="text-charcoal/60 underline font-sans text-sm hover:text-charcoal transition-colors"
            >
              {t("backToBlog")}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
