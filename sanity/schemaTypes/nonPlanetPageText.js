import { defineType, defineField } from "sanity";

export const nonPlanetPageText = defineType({
  name: "nonPlanetPageText",
  title: "Non-Planet Page Text",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Page Name/Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "text_content",
      title: "Text Content",
      type: "section",
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
  },
});
