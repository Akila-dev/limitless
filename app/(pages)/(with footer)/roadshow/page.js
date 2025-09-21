import { EventsArchive } from "@/components";

// ! SANITY
import { client } from "@/sanity/lib/client";
const options = { next: { revalidate: 30 } };

const PAGE_SIZE = 8;

export default async function Limitless() {
  const initialData = await client.fetch(
    `*[_type=="event" && defined(slug.current)][0...${PAGE_SIZE}] | order(date desc) | order(_createdAt asc){
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
}`,
    options
  );

  const heroText = await client.fetch(
    `*[_type=="nonPlanetPageText" && defined(slug.current) && slug.current == "roadshow-hero"]{
          text_content
        }`,
    options
  );

  return (
    <div className="">
      <EventsArchive
        initialData={initialData}
        heroText={heroText[0]?.text_content}
      />
    </div>
  );
}
