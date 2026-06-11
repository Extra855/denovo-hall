import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title_en",
      title: "Title (English)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title_ar",
      title: "Title (Arabic)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title_en", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt_en",
      title: "Excerpt (English)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "excerpt_ar",
      title: "Excerpt (Arabic)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "body_en",
      title: "Body (English)",
      type: "array",
      of: [
        {
          type: "block",
          marks: {
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  { name: "href", title: "URL", type: "url" },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt_en", title: "Alt text (English)", type: "string" },
            { name: "alt_ar", title: "Alt text (Arabic)", type: "string" },
            { name: "caption_en", title: "Caption (English)", type: "string" },
            { name: "caption_ar", title: "Caption (Arabic)", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "body_ar",
      title: "Body (Arabic)",
      type: "array",
      of: [
        {
          type: "block",
          marks: {
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  { name: "href", title: "URL", type: "url" },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt_en", title: "Alt text (English)", type: "string" },
            { name: "alt_ar", title: "Alt text (Arabic)", type: "string" },
            { name: "caption_en", title: "Caption (English)", type: "string" },
            { name: "caption_ar", title: "Caption (Arabic)", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt_en",
          title: "Alt text (English)",
          type: "string",
          validation: (Rule: any) =>
            Rule.required().warning("Alt text strongly recommended"),
        },
        {
          name: "alt_ar",
          title: "Alt text (Arabic)",
          type: "string",
          validation: (Rule: any) =>
            Rule.required().warning("Alt text strongly recommended"),
        },
      ],
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title_en",
      subtitle: "publishedAt",
      media: "featuredImage",
    },
  },
});
