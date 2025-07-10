import { defineQuery } from "next-sanity";

export const GET_PLANET_PAGES_LIST =
  defineQuery(`*[_type=="planetPage"][0...9] | order(_createdAt){
  name,
  slug
}`);

export const GET_PLANET_PAGE =
  defineQuery(`*[_type=="planetPage" && slug.current == $slug][0]{
  name,
  hero,
  events,
  center,
  features {
    title,
    subtitle,
    paragraph,
    features[] {
      title,
      description
    }
  },
  footer
}`);

// ! EVENTS
export const GET_RECENT_EVENTS_LIST =
  defineQuery(`*[_type=="event"][0...10] | order(date desc) | order(_createdAt asc){
  name,
  date,
  image {
    asset-> {
      __id,
      url
    },
    alt
  },
  slug,
  location,
  tag -> {name}
}`);

export const GET_EVENT_DATA =
  defineQuery(`*[_type=="event"  && slug.current == $slug][0]{
  name,
  date,
  location,
  description,
  image{
    asset-> {
      __id,
      url
    },
    alt
  },
  tag -> {name},
  reservation
}`);
