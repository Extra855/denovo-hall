import { groq } from "next-sanity";

// --- Types ---

export interface SanityImageAsset {
  _ref: string;
  _type: "reference";
}

export interface SanityImageCrop {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface SanityImageHotspot {
  x: number;
  y: number;
  height: number;
  width: number;
}

export interface SanityImage {
  _type: "image";
  asset: SanityImageAsset;
  crop?: SanityImageCrop;
  hotspot?: SanityImageHotspot;
  alt_en?: string;
  alt_ar?: string;
}

export interface SanityAuthor {
  _id: string;
  name: string;
  slug: { current: string };
  photo?: SanityImage & { alt?: string };
  bio_en?: string;
  bio_ar?: string;
}

export interface SanityCategory {
  _id: string;
  title_en: string;
  title_ar: string;
  slug: { current: string };
}

export interface SanityTag {
  _id: string;
  title_en: string;
  title_ar: string;
  slug: { current: string };
}

export interface SanityPostListItem {
  _id: string;
  title_en: string;
  title_ar: string;
  slug: { current: string };
  excerpt_en?: string;
  excerpt_ar?: string;
  featuredImage?: SanityImage;
  author?: SanityAuthor;
  categories?: SanityCategory[];
  publishedAt: string;
}

export interface SanityPost extends SanityPostListItem {
  body_en?: any[];
  body_ar?: any[];
  tags?: SanityTag[];
}

// --- Queries ---

const AUTHOR_FIELDS = groq`
  author->{
    _id, name, slug, bio_en, bio_ar,
    "photo": photo{ _type, asset, crop, hotspot, alt_en, alt_ar, "alt": alt }
  }
`;

const CATEGORY_FIELDS = groq`
  categories[]->{ _id, title_en, title_ar, slug }
`;

const TAG_FIELDS = groq`
  tags[]->{ _id, title_en, title_ar, slug }
`;

const IMAGE_FIELDS = groq`
  featuredImage {
    _type, asset,
    crop, hotspot,
    alt_en, alt_ar,
    "metadata": asset->metadata { lqip }
  }
`;

export const ALL_POSTS_QUERY = groq`
  *[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id, title_en, title_ar, slug,
    excerpt_en, excerpt_ar,
    publishedAt,
    ${IMAGE_FIELDS},
    ${AUTHOR_FIELDS},
    ${CATEGORY_FIELDS}
  }
`;

export const POST_BY_SLUG_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id, title_en, title_ar, slug,
    excerpt_en, excerpt_ar,
    publishedAt,
    ${IMAGE_FIELDS},
    ${AUTHOR_FIELDS},
    ${CATEGORY_FIELDS},
    ${TAG_FIELDS},
    body_en, body_ar
  }
`;

export const ALL_POST_SLUGS_QUERY = groq`
  *[_type == "post" && !(_id in path("drafts.**"))].slug.current
`;

export const RELATED_POSTS_QUERY = groq`
  *[_type == "post" && !(_id in path("drafts.**")) && _id != $excludeId] | order(publishedAt desc) [0..4] {
    _id, title_en, title_ar, slug,
    excerpt_en, excerpt_ar,
    publishedAt,
    ${IMAGE_FIELDS},
    ${AUTHOR_FIELDS},
    ${CATEGORY_FIELDS},
    ${TAG_FIELDS}
  }
`;
