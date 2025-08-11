"use server";

import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import moment from "moment";

import { FaLinkedinIn } from "react-icons/fa";
import { Button, CardsAnimationWrapper, Text4R3F } from "@/components";

// ! SANITY
import { client } from "@/sanity/lib/client";
import { GET_SINGLE_BLOG } from "@/sanity/lib/queries";
import Link from "next/link";
import { BlogCarousel } from "@/containers";
const options = { next: { revalidate: 30 } };

// ! Get data function
async function getPageData(params) {
  const page_data = await client.fetch(GET_SINGLE_BLOG, await params, options);

  return page_data;
}

// ! Dynamic metadata function
export async function generateMetadata({ params }) {
  const { slug } = await params;
  return {
    title: `Blog - ${slug}`,
  };
}

// ! Main page
export default async function BlogPostPage({ params }) {
  const blog = await getPageData(params);
  if (!blog) return notFound();

  return (
    <main className="relative">
      {/* Background */}
      {blog.mainImage?.asset?.url && (
        <CardsAnimationWrapper
          animationType="fade-in"
          className="absolute top-0 left-0 w-full h-screen overflow-clip"
        >
          <Image
            src={blog.mainImage.asset.url}
            alt={blog.title}
            width={800}
            height={400}
            className="rounded-lg w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black/50 to-black/80" />
        </CardsAnimationWrapper>
      )}

      {/* Main Content */}
      <div className="relative min-h-screen container">
        {/* Title */}
        <CardsAnimationWrapper
          delay={0.25}
          className="space-y-2.5 pt-5  lg:max-w-[70vw]"
        >
          <div className="flex">
            <Button text="Back to Blog" href="/blog" back />
          </div>
          <div>
            <Text4R3F
              delay={0.35}
              title={blog.title}
              titleClassName="h2 !font-base uppercase"
            />
          </div>
        </CardsAnimationWrapper>

        {/* Body */}
        <CardsAnimationWrapper delay={0.5} className="pt-2">
          <article className="prose prose-invert prose-p:text-white/90 prose-h2:h2 prose-h3:h3 prose-img:rounded-md lg:max-w-[80vw] [&>p:not(:first-child)]:lg:max-w-[70vw] space-y-2">
            <PortableText value={blog.body} components={portableComponents} />
          </article>
        </CardsAnimationWrapper>
      </div>

      {/* Carousel */}
      <div className="container-x pb-4 lg:pb-5">
        <BlogCarousel />
      </div>
    </main>
  );
}

const portableComponents = {
  types: {
    image: ({ value }) =>
      value?.asset?.url ? (
        <Image
          src={value.asset.url}
          alt=""
          width={800}
          height={400}
          className="rounded-md"
        />
      ) : null,
  },
};
