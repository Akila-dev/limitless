import { defineType, defineField } from "sanity";

export const footerSection = defineType({
  name: "footerSection",
  title: "Footer Section",
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
    defineField({ name: "url", title: "URL", type: "url" }),
  ],
});
