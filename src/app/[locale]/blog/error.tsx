"use client";

import { useTranslations } from "next-intl";

export default function BlogError({
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
          <button
            onClick={reset}
            className="bg-charcoal text-alabaster px-6 py-3 text-sm tracking-widest uppercase font-sans hover:bg-charcoal/90 transition-colors"
          >
            {t("retryButton")}
          </button>
        </div>
      </div>
    </main>
  );
}
