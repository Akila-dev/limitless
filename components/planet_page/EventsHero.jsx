"use client";

import { useRef } from "react";

import Image from "next/image";
import moment from "moment";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import { Text4R3F, CardsAnimationWrapper } from "@/components";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const EventsHero = ({
  img,
  name,
  description,
  location,
  date,
  tag,
  reservation,
}) => {
  const containerRef = useRef();
  const bannerRef = useRef();
  const titleRef = useRef();
  const cardsRefs = useRef([]);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top+=95%",
            toggleActions: "restart none none reset",
          },
          defaults: {
            duration: 1,
            ease: "power2.inOut",
            y: 20,
            opacity: 0,
            stagger: 0.1,
          },
        });

        // ! TITLE
        if (titleRef.current) {
          let splitH = SplitText.create(titleRef.current, {
            type: "words, lines",
            mask: "lines",
          });
          tl.from(bannerRef.current, {
            y: 0,
            duration: 1,
          }).from(
            splitH.words,
            {
              duration: 1,
            },
            ">-=0.3"
          );
        }
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef }
  );

  return (
    <div>
      <div className="relative">
        <Image
          ref={bannerRef}
          src={img}
          alt={name}
          width={1440}
          height={400}
          className="absolute top-0 left-0 w-full h-full object-cover object-top"
        />
        <div className="relative w-full min-h-14 pt-8 bg-gradient-to-b from-transparent to-black flex flex-col justify-end container-x">
          <h1 ref={titleRef} className="h2 !font-base text-white max-w-15">
            {name}
          </h1>
        </div>
      </div>
      <div className="container-x">
        <div className="">
          <CardsAnimationWrapper
            className="flex-v-center flex-wrap !gap-x-1 !gap-y-0.25 pt-0.5"
            childrenRefs={cardsRefs}
          >
            <p
              ref={(el) => (cardsRefs.current[0] = el)}
              className="p-xs uppercase !font-medium"
            >
              {location} - {moment(date).format("l")}
            </p>
            <p
              ref={(el) => (cardsRefs.current[1] = el)}
              className="border-[0.1em] rounded-[0.3em] p-xs uppercase italic px-0.75 text-white/50"
            >
              {tag}
            </p>
          </CardsAnimationWrapper>
          <div className="pt-2 max-w">
            <Text4R3F
              paragraph={description}
              buttons={[{ text: "Reserve Your Seat", url: reservation || "/" }]}
              delay={2}
              sm
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsHero;
