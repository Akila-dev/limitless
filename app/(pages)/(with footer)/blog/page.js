import { BlogArchive } from "@/components";

// ! SANITY
import { client } from "@/sanity/lib/client";
const options = { next: { revalidate: 30 } };

const PAGE_SIZE = 8;

export default async function Limitless() {
  const initialData = await client.fetch(
    `*[_type=="blog" && defined(slug.current)][0...${PAGE_SIZE}] | order(date desc) | order(_createdAt asc){
    title,
    excerpt,
    mainImage{
      asset-> {
        __id,
        url
      }
    },
    slug
  }`,
    options
  );

  return (
    <div className="">
      <BlogArchive initialData={initialData} />
    </div>
  );
}
