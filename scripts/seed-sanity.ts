import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_API_READ_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function seed() {
  console.log("Seeding Sanity...");

  // Categories
  const categories = await Promise.all([
    client.createOrReplace({
      _id: "cat-venue-tips",
      _type: "category",
      title_en: "Venue Tips",
      title_ar: "نصائح القاعة",
      slug: { _type: "slug", current: "venue-tips" },
      description_en: "Tips and advice for choosing and planning your venue",
      description_ar: "نصائح وإرشادات لاختيار وتخطيط قاعتك",
    }),
    client.createOrReplace({
      _id: "cat-real-weddings",
      _type: "category",
      title_en: "Real Weddings",
      title_ar: "زفاف حقيقي",
      slug: { _type: "slug", current: "real-weddings" },
      description_en: "Real wedding stories from De Novo",
      description_ar: "قصص زفاف حقيقية من دي نوفو",
    }),
    client.createOrReplace({
      _id: "cat-news",
      _type: "category",
      title_en: "News",
      title_ar: "أخبار",
      slug: { _type: "slug", current: "news" },
      description_en: "Latest news and updates from De Novo",
      description_ar: "آخر الأخبار والتحديثات من دي نوفو",
    }),
    client.createOrReplace({
      _id: "cat-planning",
      _type: "category",
      title_en: "Planning",
      title_ar: "التخطيط",
      slug: { _type: "slug", current: "planning" },
      description_en: "Wedding planning guides and checklists",
      description_ar: "أدلة وقوائم تخطيط الزفاف",
    }),
  ]);
  console.log(`Created ${categories.length} categories`);

  // Tags
  const tags = await Promise.all([
    client.createOrReplace({
      _id: "tag-decor",
      _type: "tag",
      title_en: "Decor",
      title_ar: "الديكور",
      slug: { _type: "slug", current: "decor" },
    }),
    client.createOrReplace({
      _id: "tag-catering",
      _type: "tag",
      title_en: "Catering",
      title_ar: "الضيافة",
      slug: { _type: "slug", current: "catering" },
    }),
    client.createOrReplace({
      _id: "tag-photography",
      _type: "tag",
      title_en: "Photography",
      title_ar: "التصوير",
      slug: { _type: "slug", current: "photography" },
    }),
    client.createOrReplace({
      _id: "tag-fashion",
      _type: "tag",
      title_en: "Fashion",
      title_ar: "الأزياء",
      slug: { _type: "slug", current: "fashion" },
    }),
    client.createOrReplace({
      _id: "tag-inspiration",
      _type: "tag",
      title_en: "Inspiration",
      title_ar: "إلهام",
      slug: { _type: "slug", current: "inspiration" },
    }),
  ]);
  console.log(`Created ${tags.length} tags`);

  // Author
  const [author] = await Promise.all([
    client.createOrReplace({
      _id: "author-denovo",
      _type: "author",
      name: "De Novo Team",
      slug: { _type: "slug", current: "denovo-team" },
      bio_en: "The De Novo team shares insights, tips, and stories from Yemen's premier wedding venue.",
      bio_ar: "يشارك فريق دي نوفو الرؤى والنصائح والقصص من أرقى قاعة زفاف في اليمن.",
    }),
  ]);
  console.log("Created author");

  // Posts
  const posts = await Promise.all([
    client.createOrReplace({
      _id: "post-1",
      _type: "post",
      title_en: "5 Essential Tips for Choosing Your Wedding Venue",
      title_ar: "٥ نصائح أساسية لاختيار قاعة زفافك",
      slug: { _type: "slug", current: "5-tips-choosing-wedding-venue" },
      excerpt_en: "Your venue sets the tone for your entire celebration. Here's how to choose the perfect space for your special day.",
      excerpt_ar: "تحدد القاعة طابع احتفالك بالكامل. إليك كيفية اختيار المساحة المثالية ليومك المميز.",
      body_en: [
        {
          _type: "block",
          _key: "b1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s1",
              text: "Choosing a wedding venue is one of the most important decisions you'll make during your planning journey. The right space transforms your vision into reality.",
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "b2",
          style: "h2",
          children: [
            { _type: "span", _key: "s2", text: "1. Know Your Guest Count" },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "b3",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s3",
              text: "Before you start touring venues, have a realistic estimate of your guest list. A space that's too small feels cramped, while one that's too large can feel empty and impersonal.",
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "b4",
          style: "h2",
          children: [
            { _type: "span", _key: "s4", text: "2. Consider the Layout" },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "b5",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s5",
              text: "Think about the flow of your event. Does the venue support a smooth transition from ceremony to cocktail hour to reception? At De Novo, our flexible spaces allow for seamless movement between each phase of your celebration.",
            },
          ],
          markDefs: [],
        },
      ],
      body_ar: [
        {
          _type: "block",
          _key: "b1ar",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s1ar",
              text: "اختيار قاعة الزفاف هو أحد أهم القرارات التي ستتخذها خلال رحلة التخطيط. المساحة المناسبة تحول رؤيتك إلى واقع.",
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "b2ar",
          style: "h2",
          children: [
            { _type: "span", _key: "s2ar", text: "١. اعرف عدد ضيوفك" },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "b3ar",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s3ar",
              text: "قبل البدء بجولة في القاعات، احصل على تقدير واقعي لقائمة الضيوف. المساحة الصغيرة جداً تبدو مزدحمة، بينما الكبيرة جداً قد تبدو فارغة.",
            },
          ],
          markDefs: [],
        },
      ],
      publishedAt: "2026-01-15T10:00:00Z",
      author: { _type: "reference", _ref: "author-denovo" },
      categories: [{ _type: "reference", _ref: "cat-venue-tips" }],
      tags: [
        { _type: "reference", _ref: "tag-inspiration" },
        { _type: "reference", _ref: "tag-decor" },
      ],
    }),
    client.createOrReplace({
      _id: "post-2",
      _type: "post",
      title_en: "Sarah & Akram: A Night to Remember",
      title_ar: "سارة وأكرم: ليلة لا تُنسى",
      slug: { _type: "slug", current: "sarah-akram-night-to-remember" },
      excerpt_en: "A breathtaking celebration of love that transformed our Grand Ballroom into a floral paradise.",
      excerpt_ar: "احتفال مذهل بالحبة حوّل صالتنا الكبرى إلى فردوس زهري.",
      body_en: [
        {
          _type: "block",
          _key: "p2b1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "p2s1",
              text: "Sarah and Akram's wedding was nothing short of magical. From the moment guests arrived, they were transported into a world of elegance and romance.",
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "p2b2",
          style: "h2",
          children: [
            { _type: "span", _key: "p2s2", text: "The Vision" },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "p2b3",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "p2s3",
              text: "The couple envisioned a modern romantic theme with cascading floral installations, warm candlelight, and a palette of blush and gold. Every detail was curated to reflect their unique love story.",
            },
          ],
          markDefs: [],
        },
      ],
      body_ar: [
        {
          _type: "block",
          _key: "p2b1ar",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "p2s1ar",
              text: "كان زفاف سارة وأكرم سحراً حقيقياً. من لحظة وصول الضيوف، نُقلوا إلى عالم من الأناقة والرومانسية.",
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "p2b2ar",
          style: "h2",
          children: [
            { _type: "span", _key: "p2s2ar", text: "الرؤية" },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "p2b3ar",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "p2s3ar",
              text: "تصور الزوجان موضوعاً رومانسياً حديثاً مع تنصيبات زهرية متساقطة، وإضاءة شموع دافئة، ولوحة من الوردي والذهبي.",
            },
          ],
          markDefs: [],
        },
      ],
      publishedAt: "2026-03-20T10:00:00Z",
      author: { _type: "reference", _ref: "author-denovo" },
      categories: [{ _type: "reference", _ref: "cat-real-weddings" }],
      tags: [
        { _type: "reference", _ref: "tag-decor" },
        { _type: "reference", _ref: "tag-photography" },
      ],
    }),
    client.createOrReplace({
      _id: "post-3",
      _type: "post",
      title_en: "De Novo Welcomes 2026 with New Garden Terrace",
      title_ar: "دي نوفو ترحب بعام ٢٠٢٦ مع تراس الحديقة الجديد",
      slug: { _type: "slug", current: "new-garden-terrace-2026" },
      excerpt_en: "We're thrilled to announce the opening of our stunning new Garden Terrace, perfect for outdoor ceremonies and cocktail hours.",
      excerpt_ar: "يسعدنا الإعلان عن افتتاح تراس الحديقة الجديد المذهل، مثالي للاحتفالات الخارجية واستراحات الكوكتيل.",
      body_en: [
        {
          _type: "block",
          _key: "p3b1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "p3s1",
              text: "We're excited to share that our new Garden Terrace is now open! This beautiful outdoor space accommodates up to 500 guests and features lush landscaping, ambient lighting, and panoramic views.",
            },
          ],
          markDefs: [],
        },
      ],
      body_ar: [
        {
          _type: "block",
          _key: "p3b1ar",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "p3s1ar",
              text: "نحن متحمسون لمشاركة أن تراس الحديقة الجديد مفتوح الآن! تستوعب هذه المساحة الخارجية الجميلة حتى ٥٠٠ ضيف وتتميز بمناظر طبيعية خضراء وإضاءة محيطية وإطلالات بانورامية.",
            },
          ],
          markDefs: [],
        },
      ],
      publishedAt: "2026-05-10T10:00:00Z",
      author: { _type: "reference", _ref: "author-denovo" },
      categories: [{ _type: "reference", _ref: "cat-news" }],
      tags: [{ _type: "reference", _ref: "tag-inspiration" }],
    }),
  ]);
  console.log(`Created ${posts.length} posts`);

  console.log("Seed complete!");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
