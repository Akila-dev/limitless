import { defineType, defineField } from "sanity";

export const featuresSection = defineType({
  name: "featuresSection",
  title: "Features Section",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "subtitle",
      title: "Subtitle (Use either subtitle or paragraph not both)",
      type: "string",
    }),
    defineField({
      name: "paragraph",
      title: "Paragraph (Use either subtitle or paragraph not both)",
      type: "text",
    }),
    defineField({
      name: "features",
      title: "Feature List",
      type: "array",
      of: [
        defineType({
          name: "featureItem",
          title: "Feature",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
            }),
          ],
        }),
      ],
    }),
  ],
});
