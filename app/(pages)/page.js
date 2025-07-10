"use server";

import { HomeCanvas } from "@/containers";

// ! SANITY
import { client } from "@/sanity/lib/client";
import { GET_PLANET_PAGES_LIST } from "@/sanity/lib/queries";
const options = { next: { revalidate: 30 } };

async function getPageData() {
  const page_data = await client.fetch(GET_PLANET_PAGES_LIST, options);

  return page_data;
}

export default async function Home() {
  const page_data = await getPageData();

  return (
    <div className="">
      <div className="w-full h-screen relative overflow-hidden">
        <div className="w-screen h-screen absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <HomeCanvas data={page_data} />
        </div>
      </div>
    </div>
  );
}
