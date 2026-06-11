import { Link } from "@/i18n/navigation";

export default function BlogPostNotFound() {
  return (
    <main id="main-content">
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-serif-display text-4xl text-charcoal mb-4">
            404
          </h1>
          <p className="text-charcoal/50 font-sans mb-6">
            This blog post doesn&apos;t exist or has been removed.
          </p>
          <Link
            href="/blog"
            className="text-sage underline font-sans text-sm hover:text-charcoal transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    </main>
  );
}
