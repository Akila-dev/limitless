"use client";

import { useRef } from "react";

import Image from "next/image";
import bulletpoint from "@/assets/images/bulletpoint.png";
import { CardsAnimationWrapper } from "@/components";

const BulletList = ({ data }) => {
  const cardsRef = useRef([]);

  return (
    <CardsAnimationWrapper className="space-y-0.5" childrenRefs={cardsRef}>
      {data &&
        data.map(({ title, description }, i) => (
          <div
            ref={(el) => (cardsRef.current[i] = el)}
            key={i}
            className={`gsap-list flex-v-center ${
              i % 2 ? "lg:pl-7 xl:pl-8" : ""
            }`}
          >
            <Image
              src={bulletpoint}
              alt="bullet"
              width={100}
              height={100}
              className="w-5.5 h-auto object-contain"
            />
            <div className="pt-0.5">
              <h3>{title}</h3>
              <p className="xs">{description}</p>
            </div>
          </div>
        ))}
    </CardsAnimationWrapper>
  );
};

export default BulletList;
