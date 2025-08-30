import { EventsArchive } from "@/components";

// ! SANITY
import { client } from "@/sanity/lib/client";
import { GET_EVENTS_LIST } from "@/sanity/lib/queries";
const options = { next: { revalidate: 30 } };

export default async function Limitless() {
  const data = await client.fetch(GET_EVENTS_LIST, options);

  const loadMore = () => {
    console.log("load more");
    // const newPosts = await fetchPosts(visible);
    // setPosts((prev) => [...prev, ...newPosts]);
    // setVisible((prev) => prev + newPosts.length);
  };

  return (
    <div className="">
      <EventsArchive data={data} />
    </div>
  );
}
