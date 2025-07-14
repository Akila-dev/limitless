"use client";

import React from "react";

import Image from "next/image";
import moment from "moment";

import { Button } from "@/components";

const EventsHero = ({
  img,
  name,
  description,
  location,
  date,
  tag,
  reservation,
}) => {
  return (
    <div>
      <div className="relative">
        <Image
          src={img}
          alt={name}
          width={1440}
          height={400}
          className="absolute top-0 left-0 w-full h-full object-cover object-top"
        />
        <div className="relative w-full min-h-16 pt-8 bg-gradient-to-b from-transparent to-black flex flex-col justify-end container-x">
          <h1 className="h2 !font-base text-white max-w-15">{name}</h1>
        </div>
      </div>
      <div className="container-x">
        <div className="">
          <div className="flex-v-center flex-wrap !gap-x-1 !gap-y-0.25 pt-0.5">
            <p className="p-xs uppercase !font-medium">
              {location} - {moment(date).format("l")}
            </p>
            <p className="border-[0.1em] rounded-[0.3em] p-xs uppercase italic px-0.75 text-white/50">
              {tag}
            </p>
          </div>
          <p className="py-2 max-w-30">{description}</p>

          <div className="flex">
            <Button href={reservation || "/"} text="Reserve Your Seat" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsHero;
