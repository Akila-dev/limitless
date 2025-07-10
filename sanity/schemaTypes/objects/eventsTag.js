import { defineType, defineField } from "sanity";

export const eventsTag = defineType({
  name: "events_tag",
  title: "Events Tag",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Tag Name",
      type: "string",
      validation: (Rule) => Rule.required(),
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
  ],
});
