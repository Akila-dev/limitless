import { defineType, defineField } from "sanity";

export const section = defineType({
  name: "section",
  title: "Section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle (Use either subtitle or paragraph)",
      type: "string",
    }),
    defineField({
      name: "paragraph",
      title: "Paragraph (Use either subtitle or paragraph)",
      type: "text",
    }),
  ],
});
