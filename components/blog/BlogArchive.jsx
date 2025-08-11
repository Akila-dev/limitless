"use client";

import { useState, useEffect } from "react";
import moment from "moment";

import Image from "next/image";
import Link from "next/link";

import { FaClock } from "react-icons/fa6";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { CgArrowRight } from "react-icons/cg";

import { Text4R3F, CardsAnimationWrapper, EmptyData } from "@/components";

const BlogCard = ({ title, date, image, slug, excerpt, author }) => {
  return (
    <div className="space-y-0.5 rounded bg-white/5 backdrop-blur border-[0.1em] border-fg/20">
      <Image
        src={image}
        alt={title}
        width={400}
        height={300}
        className="object-cover h-14 w-full rounde overflow-clip"
      />
      <div className="p-1">
        <Link href={`/blog/${slug}`} className="p-lg !font-base !font-medium">
          {title}
        </Link>
        <p className="xs text-white w-full text-left text-wrap overflow-hidden text-ellipsis max-h-3 my-1">
          {excerpt}
        </p>
        <h4 className="p !font-medium">
          {author?.name} - {moment(date).format("l")}
        </h4>
      </div>
    </div>
  );
};

const RecentBlogCard = ({ title, date, image, slug }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-7 roundedbg-white/5 backdrop-blur border-[0.1em] border-fg/20">
      <div className="col-span-1 md:col-span-3">
        <Image
          src={image}
          alt={title}
          width={400}
          height={300}
          className="object-cover h-11.5 w-full"
        />
      </div>
      <div className="p-1 col-span-1 md:col-span-4 flex flex-col gap-1 justify-between">
        <div>
          <Link
            href={`/blog/${slug}`}
            className="p-lg !font-base !font-medium leading-[1.2]"
          >
            {title}
          </Link>
          <p className="xs !font-medium mt-0.5">
            <FaClock className="inline-block mr-0.5" />{" "}
            {moment(date).format("l")}
          </p>
        </div>
        <Link
          href={`/blog/${slug}`}
          className="xs uppercase !font-base !font-medium"
        >
          Read More <CgArrowRight className="inline-block ml-1" />
        </Link>
      </div>
    </div>
  );
};

const BlogArchive = ({ data }) => {
  const [mostRecentBlogs, setMostRecentBlogs] = useState(data?.slice(0, 3));

  useEffect(() => {
    setMostRecentBlogs(data?.slice(0, 3));
  }, [data]);

  return (
    <div className="py-5 space-y-4">
      <div className="container-x space-y-3">
        <div className="max-w-2 mx-auto">
          {/* <Text4R3F
            title="Our Blog"
            subtitle="Lorem ipsum dolor sit amet lorem ipsum dolor sit amet"
            center
          /> */}
        </div>
        {data && data.length > 0 ? (
          <>
            {/* ! RECENT POSTS */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-1.5">
              {/* Most Recent Post */}
              <CardsAnimationWrapper className="col-span-1 md:col-span-3">
                <div className="relative h-15 md:h-25 rounded border-[0.1em] border-fg/20">
                  <Image
                    src={mostRecentBlogs[0].mainImage.asset.url}
                    alt={mostRecentBlogs[0].title}
                    width={400}
                    height={300}
                    className="absolute top-0 left-0 h-full w-full object-cover"
                  />
                  <div className="h-full p-1 lg:p-2 bg-gradient-to-b from-black/20 via-black/50 to-black relative flex flex-col justify-end !font-base !font-medium">
                    <Link
                      href={`/blog/${mostRecentBlogs[0].slug.current}`}
                      className="h3"
                    >
                      {mostRecentBlogs[0].title}
                    </Link>
                    <p className="pt-0.5 pb-1">
                      <FaClock className="xs inline-block mr-0.5 text-white" />
                      {moment(mostRecentBlogs[0].publishedAt).format("l")}
                    </p>
                    <p className="xs text-white w-full text-left text-wrap overflow-hidden text-ellipsis max-h-3">
                      {mostRecentBlogs[0].excerpt}
                    </p>
                  </div>
                </div>
              </CardsAnimationWrapper>
              <CardsAnimationWrapper className="col-span-1 md:col-span-2 space-y-1.5">
                {mostRecentBlogs.slice(1, 3).map((item, index) => (
                  <RecentBlogCard
                    key={index}
                    title={item.title}
                    date={item.publishedAt}
                    image={item.mainImage.asset.url}
                    slug={item.slug.current}
                  />
                ))}
              </CardsAnimationWrapper>
            </div>
          </>
        ) : (
          <EmptyData text="No posts yet" />
        )}
      </div>
      <div className="container-x">
        <CardsAnimationWrapper
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 xl:gap-4"
          onlyOnce
        >
          {data.map((item, index) => (
            <BlogCard
              key={index}
              title={item.title}
              date={item.publishedAt}
              image={item.mainImage.asset.url}
              slug={item.slug.current}
              excerpt={item.excerpt}
              author={item.author}
            />
          ))}
        </CardsAnimationWrapper>
      </div>
    </div>
  );
};

export default BlogArchive;
