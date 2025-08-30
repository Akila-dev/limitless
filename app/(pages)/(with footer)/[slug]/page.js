"use server";

import { notFound } from "next/navigation";

// ! COMPONENTS
import {
  Hero,
  EventsSection,
  CenterSphere,
  BulletPointSection,
  Footer,
  StarsCanvas,
} from "@/components";

// ! SANITY
import { client } from "@/sanity/lib/client";
import {
  GET_PLANET_PAGE_STATIC_PARAMS,
  GET_PLANET_PAGE,
} from "@/sanity/lib/queries";
const options = { next: { revalidate: 30 } };

// ! Static params function
export async function generateStaticParams() {
  const events = await client.fetch(GET_PLANET_PAGE_STATIC_PARAMS);

  return events.map((event) => ({
    slug: event.slug.current,
  }));
}

// ! Get data function
async function getPageData(params) {
  const page_data = await client.fetch(GET_PLANET_PAGE, await params, options);

  return page_data;
}

// ! Dynamic metadata function
export async function generateMetadata({ params }) {
  const page_data = await getPageData(params);
  if (!page_data) return { title: "Not found" };

  return {
    title: `${page_data.name} | Limitless`,
    description: page_data.hero.subtitle || page_data.hero.paragraph || "",
    openGraph: {
      title: page_data.name,
      description: page_data.hero.subtitle || page_data.hero.paragraph || "",
    },
  };
}

// ! Main page
export default async function Page({ params }) {
  const page_data = await getPageData(params);
  if (!page_data) return notFound();

  return (
    <div className="">
      {/* <StarsCanvas /> */}
      {/* HERO SECTION*/}
      <Hero
        text={{
          title: (page_data && page_data.hero.title) || "",
          subtitle: (page_data && page_data.hero.subtitle) || "",
          paragraph: (page_data && page_data.hero.paragraph) || "",
        }}
      />
      {/* EVENTS SECTION */}
      <EventsSection
        text={{
          title: (page_data && page_data.events.title) || "",
          subtitle: (page_data && page_data.events.subtitle) || "",
          paragraph: (page_data && page_data.events.paragraph) || "",
        }}
      />
      {/* CENTER SPHERE SECTION */}
      <CenterSphere
        text={{
          title: (page_data && page_data.center.title) || "",
          subtitle: (page_data && page_data.center.subtitle) || "",
          paragraph: (page_data && page_data.center.paragraph) || "",
        }}
      />
      {/* BULLETPOINTS SECTION */}
      <BulletPointSection
        text={{
          title: (page_data && page_data.features.title) || "",
          subtitle: (page_data && page_data.features.subtitle) || "",
          paragraph: (page_data && page_data.features.paragraph) || "",
        }}
        bullet_list={page_data && page_data.features.features}
      />
      {/* FOOTER/RESERVE SEAT SECTION */}
      <Footer
        text={{
          title: (page_data && page_data.footer.title) || "",
          subtitle: (page_data && page_data.footer.subtitle) || "",
          paragraph: (page_data && page_data.footer.paragraph) || "",
        }}
        buttons={[
          {
            text: "Reserve Your Seat",
            url: page_data.footer.url || "/",
          },
        ]}
      />
    </div>
  );
}
