import { planetPage } from "./planetPage";
import { event } from "./event";
import { blog } from "./blog";

// OBJECTS
import { section } from "./objects/section";
import { footerSection } from "./objects/footerSection";
import { featuresSection } from "./objects/featuresSection";
import { eventsTag } from "./objects/eventsTag";
import { author } from "./objects/author";
import { blogCategory } from "./objects/blogCategory";
import { blockContent } from "./objects/blockContent";

export const schema = {
  types: [
    planetPage,
    event,
    section,
    footerSection,
    featuresSection,
    eventsTag,
    blog,
    author,
    blogCategory,
    blockContent,
  ],
};
