"use server";
import { notFound } from "next/navigation";

// ! COMPONENTS
import { StarsCanvas, EventsHero } from "@/components";

import { EventsCarousel } from "@/containers";

// ! SANITY
import { client } from "@/sanity/lib/client";
import {
  GET_EVENT_PAGE_STATIC_PARAMS,
  GET_EVENT_DATA,
} from "@/sanity/lib/queries";
const options = { next: { revalidate: 30 } };

// ! Static params function
export async function generateStaticParams() {
  const events = await client.fetch(GET_EVENT_PAGE_STATIC_PARAMS);

  return events.map((event) => ({
    slug: event.slug.current,
  }));
}

// ! Get data function
async function getPageData(params) {
  const page_data = await client.fetch(GET_EVENT_DATA, await params, options);

  return page_data;
}

// ! Dynamic metadata function
export async function generateMetadata({ params }) {
  const page_data = await getPageData(params);
  if (!page_data) return { title: "Not found" };

  return {
    title: `${page_data.name} | Limitless`,
    description: page_data.description || "",
    openGraph: {
      title: page_data.name,
      description: page_data.description || "",
    },
  };
}

// ! Main page
export default async function EventsPage({ params }) {
  const page_data = await getPageData(params);
  if (!page_data) return notFound();

  return (
    <div className="min-h-screen flex flex-col gap-1 justify-between">
      <StarsCanvas />
      <EventsHero
        img={page_data.image.asset.url}
        name={page_data.name}
        description={page_data.description}
        date={page_data.date}
        location={page_data.location}
        tag={page_data.tag.name}
        reservation={page_data.reservation}
      />
      <div className="container-x pb-2">
        <EventsCarousel />
      </div>
    </div>
  );
}
