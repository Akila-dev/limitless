"use client";

import { useRef } from "react";
import Image from "next/image";
import bulletpoint from "@/assets/images/bulletpoint.png";

const BulletList = ({ data }) => {
  const container = useRef(null);
  return (
    <div className="space-y-0.5" ref={container}>
      {data &&
        data.map(({ heading, desc }, i) => (
          <div
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
              <h3>{heading}</h3>
              <p className="xs">{desc}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default BulletList;
