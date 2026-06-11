import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { draftMode } from "next/headers";
import { Navigation } from "@/components/sections/navigation";
import { FloatingCTA } from "@/components/sections/floating-cta";
import { BackToTop } from "@/components/sections/back-to-top";
import { Footer } from "@/components/sections/footer";
import { JsonLd } from "@/components/json-ld";
import { BlogPostHeader } from "@/components/blog/blog-post-header";
import { BlogPostInfo } from "@/components/blog/blog-post-info";
import { BlogPostBody } from "@/components/blog/blog-post-body";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  POST_BY_SLUG_QUERY,
  ALL_POST_SLUGS_QUERY,
} from "@/sanity/lib/queries";
import type { SanityPost } from "@/sanity/lib/queries";
import { VisualEditingWrapper } from "@/components/blog/visual-editing-wrapper";

const BASE_URL = "https://denovohall.com";

export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>(ALL_POST_SLUGS_QUERY);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });

  let post: SanityPost | null = null;
  try {
    post = await sanityFetch<SanityPost>(POST_BY_SLUG_QUERY, { slug });
  } catch {
    // Will 404 in the page component
  }

  if (!post) {
    return { title: t("postNotFound") };
  }

  const title = locale === "ar" ? post.title_ar : post.title_en;
  const excerpt = locale === "ar" ? post.excerpt_ar : post.excerpt_en;

  return {
    title,
    description: excerpt || t("metaDescription"),
    openGraph: {
      title,
      description: excerpt || t("metaDescription"),
      url: `${BASE_URL}/${locale}/blog/${slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author.name] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: excerpt || t("metaDescription"),
    },
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      languages: {
        en: `${BASE_URL}/en/blog/${slug}`,
        ar: `${BASE_URL}/ar/blog/${slug}`,
        "x-default": `${BASE_URL}/ar/blog/${slug}`,
      },
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Blog" });

  let post: SanityPost | null = null;
  try {
    post = await sanityFetch<SanityPost>(
      POST_BY_SLUG_QUERY,
      { slug },
      { tags: [`post:${slug}`] },
    );
  } catch {
    notFound();
  }

  if (!post) {
    notFound();
  }

  const title = locale === "ar" ? post.title_ar : post.title_en;

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
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `${BASE_URL}/${locale}/blog/${slug}`,
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    datePublished: post.publishedAt,
    author: post.author
      ? { "@type": "Person", name: post.author.name }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "De Novo",
    },
    mainEntityOfPage: `${BASE_URL}/${locale}/blog/${slug}`,
  };

  let isDraft = false;
  try {
    const dm = await draftMode();
    isDraft = dm.isEnabled;
  } catch {
    // draftMode not available
  }

  return (
    <main id="main-content">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={articleSchema} />
      <Navigation />
      <BlogPostHeader post={post} />
      <BlogPostInfo post={post} />
      <BlogPostBody post={post} />
      <Footer />
      <FloatingCTA />
      <BackToTop />
      {isDraft && <VisualEditingWrapper />}
    </main>
  );
}
