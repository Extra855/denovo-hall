import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Navigation } from "@/components/sections/navigation";
import { FloatingCTA } from "@/components/sections/floating-cta";
import { BackToTop } from "@/components/sections/back-to-top";
import { Footer } from "@/components/sections/footer";
import { ScrollReveal } from "@/components/scroll-reveal";
import { JsonLd } from "@/components/json-ld";
import { BlogPageHeader } from "@/components/blog/blog-page-header";
import { BlogListing } from "@/components/blog/blog-listing";
import { sanityFetch } from "@/sanity/lib/fetch";
import { ALL_POSTS_QUERY } from "@/sanity/lib/queries";
import type { SanityPostListItem } from "@/sanity/lib/queries";

const BASE_URL = "https://denovohall.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    keywords: t("metaKeywords").split(","),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `${BASE_URL}/${locale}/blog`,
    },
    twitter: {
      card: "summary_large_image",
      title: t("metaTitle"),
      description: t("metaDescription"),
    },
    alternates: {
      canonical: `/${locale}/blog`,
      languages: {
        en: `${BASE_URL}/en/blog`,
        ar: `${BASE_URL}/ar/blog`,
        "x-default": `${BASE_URL}/ar/blog`,
      },
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Blog" });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "ar" ? "الرئيسية" : "Home",
        item: `${BASE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("pageTitle"),
        item: `${BASE_URL}/${locale}/blog`,
      },
    ],
  };

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: t("metaTitle"),
    description: t("metaDescription"),
    url: `${BASE_URL}/${locale}/blog`,
  };

  let posts: SanityPostListItem[] = [];
  let hasError = false;

  try {
    posts = await sanityFetch<SanityPostListItem[]>(ALL_POSTS_QUERY, {}, {
      tags: ["post"],
    });
  } catch {
    hasError = true;
  }

  return (
    <main id="main-content">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={blogSchema} />
      <Navigation />
      <BlogPageHeader />
      <section className="pb-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {hasError ? (
            <div className="text-center py-16">
              <h2 className="font-serif-display text-2xl text-charcoal mb-2">
                {t("errorTitle")}
              </h2>
              <p className="text-charcoal/50 font-sans">{t("temporarilyUnavailable")}</p>
            </div>
          ) : (
            <ScrollReveal>
              <BlogListing posts={posts} />
            </ScrollReveal>
          )}
        </div>
      </section>
      <Footer />
      <FloatingCTA />
      <BackToTop />
    </main>
  );
}
