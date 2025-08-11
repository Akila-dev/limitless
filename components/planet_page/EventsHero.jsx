"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Image from "next/image";
import moment from "moment";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import { Text4R3F, CardsAnimationWrapper } from "@/components";
import { FaLinkedinIn } from "react-icons/fa";

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
  const cardsRefs = useRef([]);

  const pathname = usePathname();
  const [fullUrl, setFullUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFullUrl(window.location.origin + pathname);
    }
  }, [pathname]);

  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`;

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
        if (bannerRef.current) {
          tl.from(bannerRef.current, {
            y: 0,
            duration: 1,
          });
        }
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef }
  );

  return (
    <div className="relative">
      <Image
        ref={bannerRef}
        src={img}
        alt={name}
        width={1440}
        height={400}
        className="absolute top-0 left-0 w-full h-full object-cover object-top"
      />
      <div className="container relative w-full bg-gradient-to-b from-black/10 to-black/80 flex flex-col justify-end">
        <Text4R3F
          title={name}
          titleClassName="h2 !font-base text-white max-w-15 mt-2"
          delay={0.7}
        />
        <CardsAnimationWrapper
          className="flex-v-center flex-wrap !gap-x-1 !gap-y-0.25 pt-0.5"
          childrenRefs={cardsRefs}
          delay={1}
        >
          <p
            ref={(el) => (cardsRefs.current[0] = el)}
            className="xs uppercase !font-medium"
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
            delay={1.5}
          />
        </div>
        <CardsAnimationWrapper
          className="pt-1 flex items-center gap-0.75"
          delay={2.5}
        >
          <p className="">Share on:</p>
          <Link
            href={linkedInShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 size-2 rounded-full flex-center"
          >
            <FaLinkedinIn />
          </Link>
        </CardsAnimationWrapper>
      </div>
    </div>
  );
};

export default EventsHero;
