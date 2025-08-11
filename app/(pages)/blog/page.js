import { BlogArchive } from "@/components";

// ! SANITY
import { client } from "@/sanity/lib/client";
import { GET_BLOG_LIST } from "@/sanity/lib/queries";
const options = { next: { revalidate: 30 } };

export default async function Limitless() {
  const data = await client.fetch(GET_BLOG_LIST, options);

  return (
    <div className="">
      <BlogArchive data={data} />
    </div>
  );
}
