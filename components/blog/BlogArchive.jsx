"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import moment from "moment";

import Image from "next/image";
import Link from "next/link";

import { FaClock } from "react-icons/fa6";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { CgArrowRight } from "react-icons/cg";
import { FaChevronRight } from "react-icons/fa6";

import {
  Text4R3F,
  CardsAnimationWrapper,
  EmptyData,
  Button,
  SubscribeForm,
} from "@/components";
// import BlogImageGenerator from "@/components/blog/BlogImageGenerator";

import blog_sphere from "@/assets/images/blog_sphere.png";

const BlogCard = ({ title, date, image, slug, excerpt, author }) => {
  return (
    <div className="space-y-1">
      <div>
        <Image
          src={blog_sphere}
          alt={title}
          width={400}
          height={400}
          className="object-contain h-auto w-full"
        />
      </div>
      <div className="">
        <Link
          href={`/blog/${slug}` || "/blog"}
          className="h4 !font-base !font-medium uppercase !leading-[1]"
        >
          {title}
        </Link>
        <div className="flex-v-center">
          <p className="xs text-white w-full text-left text-wrap overflow-hidden text-ellipsis max-h-3 my-1">
            {excerpt}
          </p>
          <Link
            href={`/blog/${slug}` || "/blog"}
            className="min-w-2 flex-center hover:scale-110 transform duration-700"
          >
            <FaChevronRight className="size-1.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const BlogArchive = ({ initialData, heroText }) => {
  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [noMoreDate, setNoMoreDate] = useState(false);
  const PAGE_SIZE = 8;

  const loadMore = async () => {
    setLoading(true);
    const res = await fetch(`/api/blog?page=${page + 1}`);
    const newData = await res.json();
    if (newData.length < PAGE_SIZE) {
      setNoMoreDate(true);
    }
    setData((prev) => [...prev, ...newData]);
    setPage((prev) => prev + 1);
    setLoading(false);
  };

  return (
    <div className="py-5">
      {/* ! RECENT POSTS */}
      <div className="lg:min-h-screen w-full relative">
        <div className="absolute top-0 right-0 w-[100vw] md:w-[75vw] lg:w-[65vw] h-35 md:h-[80%] lg:h-auto">
          {/* Space For Planet Sphere */}
        </div>
        {/* TEXT CONTENT */}
        <div className="left-0 w-full container grid-2-v2">
          <div className="pt-25 md:pt-3">
            <CardsAnimationWrapper className="flex mb-3" onlyOnce>
              <Button text="Back to Galaxy" href="/" back />
            </CardsAnimationWrapper>
            <Text4R3F
              title={heroText?.title}
              paragraph={heroText?.paragraph}
              titleClassName="h2 !font-base"
              onlyOnce
              animateImmediately
            >
              <div className="flex mt-1">
                <SubscribeForm filledStyle />
              </div>
            </Text4R3F>
          </div>
        </div>
      </div>

      <div className="container-x">
        {data && data.length > 0 ? (
          <div className="space-y-4">
            <CardsAnimationWrapper
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 xl:gap-4"
              onlyOnce
            >
              {data?.map((item, index) => (
                <BlogCard
                  key={index}
                  title={item?.title}
                  slug={item?.slug?.current}
                  excerpt={item?.excerpt}
                />
              ))}
            </CardsAnimationWrapper>

            <div className="flex-center flex-col">
              {noMoreDate && (
                <p className="text-center">You’re all caught up 🎉</p>
              )}
              <CardsAnimationWrapper
                className={`flex-center ${noMoreDate ? "pointer-events-none !opacity-50" : loading ? "animate-pulse pointer-events-none" : ""}`}
                onlyOnce
              >
                <Button text="LOAD MORE" onClick={() => loadMore()} white />
              </CardsAnimationWrapper>
            </div>
          </div>
        ) : (
          <EmptyData text="No posts yet" />
        )}
      </div>
    </div>
  );
};

export default BlogArchive;
