"use client";

import { useEffect } from "react";

export function LocaleAttributes({ locale }: { locale: string }) {
  useEffect(() => {
    const html = document.documentElement;
    html.lang = locale;
    html.dir = locale === "ar" ? "rtl" : "ltr";
    html.classList.add("js-loaded");
  }, [locale]);

  return null;
}
