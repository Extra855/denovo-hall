import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Cormorant_Garamond, Plus_Jakarta_Sans, Tajawal } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { WebVitals } from "@/components/web-vitals";
import { LocaleAttributes } from "@/components/locale-attributes";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const tajawal = Tajawal({
  variable: "--font-arabic",
  subsets: ["arabic"],
  display: "swap",
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  viewportFit: "cover",
};

const BASE_URL = "https://denovo-hall.vercel.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL(BASE_URL),
    title: t("title"),
    description: t("description"),
    keywords: t("keywords").split(","),
    authors: [{ name: "De novo" }],
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon.ico" },
      ],
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: `${BASE_URL}/${locale}`,
      siteName: locale === "ar" ? "دي نوفو | قاعة زفاف فاخرة" : "De novo | Luxury Wedding Venue",
      images: [
        {
          url: `/og-home-${locale}.jpg`,
          width: 1200,
          height: 630,
          alt: t("ogTitle"),
        },
      ],
      type: "website",
      locale: locale === "ar" ? "ar_SA" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_SA",
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: [`/og-home-${locale}.jpg`],
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: `${BASE_URL}/en`,
        ar: `${BASE_URL}/ar`,
        "x-default": `${BASE_URL}/ar`,
      },
    },
    other: {
      "geo.region": "YE-AD",
      "geo.placename": locale === "ar" ? "صنعاء، اليمن" : "Sana'a, Yemen",
      "ICBM": "15.2935, 44.1948",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const fontVars = `${cormorantGaramond.variable} ${plusJakartaSans.variable} ${tajawal.variable}`;

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning className="scroll-smooth">
      <body className={`${fontVars} antialiased font-sans`}>
        <NextIntlClientProvider messages={messages}>
          <LocaleAttributes locale={locale} />
          <WebVitals />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-[9999] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md focus:text-sm focus:font-medium"
          >
            Skip to main content
          </a>
          {children}
        </NextIntlClientProvider>
        {/* Google Analytics — set NEXT_PUBLIC_GA_ID env var to enable */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} strategy="afterInteractive" />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
