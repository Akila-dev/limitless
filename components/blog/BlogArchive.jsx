"use client";

import { useState, useEffect } from "react";
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

const BlogArchive = ({ data }) => {
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
            <CardsAnimationWrapper className="flex mb-3">
              <Button text="Back to Galaxy" href="/" back />
            </CardsAnimationWrapper>
            <Text4R3F
              title={"THE FUTURE IS LIMITLESS"}
              paragraph={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              }
              titleClassName="h2 !font-base pb-0.5"
              onlyOnce
              animateImmediately
            />
            <CardsAnimationWrapper className="flex mt-1">
              <SubscribeForm filledStyle />
            </CardsAnimationWrapper>
          </div>
        </div>
      </div>

      <div className="container-x">
        {data && data.length > 0 ? (
          <>
            <CardsAnimationWrapper
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-1 xl:gap-4"
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
          </>
        ) : (
          <EmptyData text="No posts yet" />
        )}
      </div>
    </div>
  );
};

export default BlogArchive;
