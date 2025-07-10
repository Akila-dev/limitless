import { defineType, defineField } from "sanity";

export const planetPage = defineType({
  name: "planetPage",
  title: "Planet Page",
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
      name: "hero",
      title: "Hero Section",
      type: "section",
    }),
    defineField({
      name: "events",
      title: "Events Section",
      type: "section",
    }),
    defineField({
      name: "center",
      title: "Center Section",
      type: "section",
    }),
    defineField({
      name: "features",
      title: "Features Section",
      type: "featuresSection",
    }),
    defineField({
      name: "footer",
      title: "Footer Section",
      type: "footerSection",
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
  },
});
