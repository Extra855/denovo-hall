## Blog System – Feature Specification

### Core Features (Requested by Client)

#### 1. Bilingual Support (Arabic/English)
- Each blog post has both Arabic and English versions (or one post with separate fields).
- Frontend language switcher to toggle between Arabic/English without changing URL structure unnecessarily.
- RTL (Right-to-Left) support for Arabic layout and text.

#### 2. Easy Blog Addition
- Admin dashboard with "Add New Blog" button.
- Form or interface that requires no manual coding.

#### 3. Rich Text Editing for New Blogs
- WYSIWYG editor (bold, italic, headings, lists, links, etc.).
- Image upload and embedding capability.
- Media library or direct upload with basic alignment options.

#### 4. Editing Existing Blogs
- Same editor interface as creating new blogs.
- Ability to update both Arabic and English versions independently.
- Save changes without losing previously published content.

#### 5. Suggested/Related Blogs
- Each blog post displays 3–5 related blog suggestions.
- Logic based on tags, categories, or content similarity.
- Suggestions appear below the main blog content.

#### 6. Blog Post Info Line
- Writer name (automatically from logged-in user or manually set).
- Publication date.
- Last modification date (only shown if different from publication date).

---

### Recommended Additional Features (for better UX & SEO)

#### A. SEO & Metadata
- Meta title, meta description (separate for Arabic/English).
- Customizable URL slug per language.
- Open Graph (OG) tags for social sharing (image, title, description).
- Auto-generated XML sitemap including blog posts.

#### B. Organization & Navigation
- Categories (e.g., Venue Tips, Events, News, Updates).
- Tags (free-form keywords).
- Blog listing page with:
  - Grid or list layout.
  - Pagination or infinite scroll.
  - Filter by category, tag, or language.
  - Search bar for blogs.

#### C. Admin & Publishing Workflow
- Draft saving (unpublished posts).
- Scheduled publishing (set future date/time).
- Preview before publish (view as visitor in both languages).
- Featured image with alt text (separate alt text for Arabic/English).

#### D. Social & Engagement
- Social share buttons (WhatsApp, Instagram, Facebook, X/Twitter) – pre-filled text in current language.
- Optional moderated comment section (can be disabled initially).

#### E. Author Management
- Author profiles with:
  - Name and profile picture.
  - Short bio (bilingual).
  - Link to author’s archive page (all posts by same writer).

#### F. Venue-Specific Conversions
- Call-to-action (CTA) widget within blog post:
  - "Book this venue"
  - "Upcoming events"
  - "Contact us for a tour"
- Can be placed at the end of every post (configurable).

#### G. UX Enhancements
- Responsive design with full RTL support.
- Estimated reading time (calculated automatically from word count).
- Table of contents for long posts (optional toggle).
- Breadcrumb navigation (Home > Blog > Category > Post Title).

#### H. Performance & Maintenance
- Image optimization (automatic compression, WebP conversion).
- Clean URL structure: `/blog/[category]/[slug]` or `/blog/[slug]` with language prefix `/ar/...`.
- 301 redirects if slugs change.
