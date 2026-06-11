import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt text",
          type: "string",
          description: 'Defaults to author name if empty',
        },
      ],
    }),
    defineField({
      name: "bio_en",
      title: "Bio (English)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "bio_ar",
      title: "Bio (Arabic)",
      type: "text",
      rows: 4,
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "photo",
    },
  },
});
