"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import moment from "moment";

import Image from "next/image";
import Link from "next/link";

import {
  Text4R3F,
  CardsAnimationWrapper,
  EmptyData,
  Button,
  SubscribeForm,
} from "@/components";

const EventsCard = ({ name, date, image, slug, tag, location, alt }) => {
  return (
    <Link
      href={`/events/${slug}`}
      className="w-full h-10 lg:h-12 border-[0.1em] border-fg rounded-[0.5em] overflow-clip block !p-0"
    >
      <div className="relative h-full">
        <Image
          src={image}
          width={350}
          height={200}
          alt={alt}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full px-1 py-0.75 flex flex-col justify-end gap-0.5 bg-gradient-to-b from-transparent via-transparent to-black">
          <div className="flex-v-center flex-wrap !gap-x-1 !gap-y-0.25">
            <p className="p-xs uppercase !font-medium">
              {location} - {moment(date).format("l")}
            </p>
            <p className="border-[0.1em] rounded-[0.3em] p-xs uppercase italic px-0.75">
              {tag}
            </p>
          </div>
          <p className="text-white w-full text-left uppercase !font-medium text-wrap overflow-hidden text-ellipsis max-h-3 max-w-16">
            {name}
          </p>
        </div>
      </div>
    </Link>
  );
};

const EventsArchive = ({ initialData }) => {
  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [noMoreDate, setNoMoreDate] = useState(false);
  const PAGE_SIZE = 8;

  const loadMore = async () => {
    setLoading(true);
    const res = await fetch(`/api/events?page=${page + 1}`);
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
            <CardsAnimationWrapper className="flex mb-3">
              <Button text="Back to Galaxy" href="/" back />
            </CardsAnimationWrapper>
            <Text4R3F
              title={"ROADSHOW: LIMITLESS EVENTS"}
              paragraph={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              }
              titleClassName="h2 !font-base"
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
          <div className="space-y-4">
            <CardsAnimationWrapper
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-1 xl:gap-2"
              onlyOnce
            >
              {data?.map((item, index) => (
                <EventsCard
                  key={index}
                  name={item?.name}
                  date={item?.date}
                  image={item?.image?.asset?.url}
                  alt={item?.image?.alt}
                  slug={item?.slug?.current}
                  location={item?.location}
                  tag={item?.tag?.name}
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
          <EmptyData text="No events found" />
        )}
      </div>
    </div>
  );
};

export default EventsArchive;
