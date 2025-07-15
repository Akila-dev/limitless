"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";

import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";

// SWIPER
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

// CUSTOM COMPONENTS
import { EmptyData, CardsAnimationWrapper } from "@/components";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Mousewheel, Pagination } from "swiper/modules";

const SlideSmall = ({ ref, image, alt, name, slug }) => (
  <Link
    ref={ref}
    href={`/events/${slug}`}
    className="w-full h-10 border-[0.1em] border-fg rounded-[0.5em] overflow-clip block !p-0"
  >
    <div className="relative h-full">
      <Image
        src={image}
        width={350}
        height={200}
        alt={alt}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full px-1 py-0.75 flex items-end bg-gradient-to-b from-transparent via-transparent to-black">
        <p className="text-white w-full text-center uppercase !font-medium text-nowrap overflow-hidden text-ellipsis whitespace-nowrap">
          {name}
        </p>
      </div>
    </div>
  </Link>
);

const SlideNormal = ({ ref, image, alt, name, slug, date, tag, location }) => (
  <Link
    ref={ref}
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

const NavigationButtons = ({ small }) => {
  const swiper = useSwiper();
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const checkBounds = () => {
      setAtStart(swiper.isBeginning);
      setAtEnd(swiper.isEnd);
    };

    // Listen for changes
    swiper.on("slideChange", checkBounds);

    // Initial check
    checkBounds();

    // Cleanup
    return () => {
      swiper.off("slideChange", checkBounds);
    };
  }, [swiper]);

  return (
    <div
      className={`w-full flex-between !text-white py-1 ${small ? "!justify-end" : ""}`}
    >
      {!small && (
        <h3 className="p-lg !font-base !font-medium">RECENT EVENTS</h3>
      )}
      <div className="flex-v-center !gap-0.5">
        <button onClick={() => swiper.slidePrev()}>
          <FaChevronLeft
            className={`p-lg ${atStart ? "text-white/30" : "text-white"}`}
          />
        </button>
        <button onClick={() => swiper.slideNext()}>
          <FaChevronRight
            className={`p-lg ${atEnd ? "text-white/30" : "text-white"}`}
          />
        </button>
      </div>
    </div>
  );
};

const Carousel = ({ data, small, delay }) => {
  const [isDesktop, setIsDesktop] = useState();
  const cardsRefs = useRef([]);

  const handleResize = () => {
    setIsDesktop(window.innerWidth >= 1024);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <CardsAnimationWrapper
      className="mt-3 space-y-1 w-full max-w-[90vw]"
      // animationType="fade-in"
      childrenRefs={cardsRefs}
      onlyOnce={!small}
      delay={delay ? delay : small ? 0 : 1}
    >
      {/* Slider */}
      {data && data.length > 0 ? (
        <Swiper
          spaceBetween={isDesktop ? (small ? 10 : 40) : 10}
          pagination={{
            el: ".swiper-pagination-custom",
            type: "progressbar",
            clickable: true,
          }}
          mousewheel={true}
          modules={[Mousewheel, Pagination]}
          slidesPerView={isDesktop ? (small ? 2.5 : 3) : small ? 2 : 2}
          className="eventsSwiper"
        >
          {data.map(({ name, date, image, slug, location, tag }, i) => (
            <SwiperSlide key={i}>
              {small ? (
                <SlideSmall
                  ref={(el) => (cardsRefs.current[i] = el)}
                  image={image.asset.url}
                  alt={image.alt}
                  name={name}
                  slug={slug.current}
                />
              ) : (
                <SlideNormal
                  ref={(el) => (cardsRefs.current[i] = el)}
                  name={name}
                  date={date}
                  image={image.asset.url}
                  alt={image.alt}
                  slug={slug.current}
                  location={location}
                  tag={tag.name}
                />
              )}
            </SwiperSlide>
          ))}

          {small && (
            <div className="swiper-pagination-custom" slot="container-end" />
          )}
          <div slot="container-start">
            <NavigationButtons small={small} />
          </div>
        </Swiper>
      ) : (
        <EmptyData text="No events found" />
      )}
    </CardsAnimationWrapper>
  );
};

export default Carousel;
