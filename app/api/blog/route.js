import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

const PAGE_SIZE = 8;

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);

  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const data = await client.fetch(
    `*[_type=="blog" && defined(slug.current)][${start}...${end}] | order(date desc) | order(_createdAt asc){
    title,
    excerpt,
    mainImage{
      asset-> {
        __id,
        url
      }
    },
    slug
  }`
  );

  return NextResponse.json(data);
}
