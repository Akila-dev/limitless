import { Carousel } from "@/components";

// ! SANITY
import { client } from "@/sanity/lib/client";
import { GET_RECENT_EVENTS_LIST } from "@/sanity/lib/queries";
const options = { next: { revalidate: 30 } };

const EventsCarousel = async ({ small }) => {
  const data = await client.fetch(GET_RECENT_EVENTS_LIST, options);

  return (
    <div className="w-full">
      <Carousel data={data} small={small} />
    </div>
  );
};

export default EventsCarousel;
