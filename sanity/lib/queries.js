import { defineQuery } from "next-sanity";

export const GET_PLANET_PAGES_LIST =
  defineQuery(`*[_type=="planetPage" && defined(slug.current)][0...9] | order(_createdAt){
  name,
  slug
}`);

export const GET_PLANET_PAGE_STATIC_PARAMS =
  defineQuery(`*[_type=="planetPage" && defined(slug.current)]{
  slug
}`);

export const GET_PLANET_PAGE =
  defineQuery(`*[_type=="planetPage" && slug.current == $slug][0]{
  name,
  slug,
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
  defineQuery(`*[_type=="event" && defined(slug.current)][0...10] | order(date desc) | order(_createdAt asc){
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

export const GET_EVENT_PAGE_STATIC_PARAMS =
  defineQuery(`*[_type=="event" && defined(slug.current)]{
  slug
}`);
export const GET_EVENT_DATA =
  defineQuery(`*[_type=="event" && slug.current == $slug][0]{
  name,
  date,
  slug,
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
