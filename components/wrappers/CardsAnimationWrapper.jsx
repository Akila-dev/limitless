"use client";

import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import Image from "next/image";
import bulletpoint from "@/assets/images/bulletpoint.png";
import { Scroll } from "@react-three/drei";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const CardsAnimationWrapper = ({
  children,
  childrenRefs,
  className,
  delay,
  animationType,
  onlyOnce,
}) => {
  const containerRef = useRef(null);
  const cardsRef = childrenRefs || useRef(null);

  const fadeInProp = {
    duration: 1,
    ease: "sine.in",
    opacity: 0,
    stagger: 0.2,
  };

  const slideInProp = {
    duration: 1,
    ease: "sine.out",
    y: 20,
    x: 20,
    opacity: 0,
    stagger: 0.2,
  };

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top+=95%",
            toggleActions: onlyOnce
              ? "play none none none"
              : "restart none none reset",
          },
          defaults: animationType === "fade-in" ? fadeInProp : slideInProp,
        });

        // ! TITLE
        if (cardsRef.current) {
          tl.from(containerRef.current, {
            delay: delay ? delay : 0,
            duration: 0.5,
          }).from(cardsRef.current, {
            // delay: immediate ? 0 : 1,
            duration: 1,
          });
        }

        ScrollTrigger.refresh();
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef }
  );

  return (
    <div className={className || "space-y-0.5"} ref={containerRef}>
      {children}
    </div>
  );
};

export default CardsAnimationWrapper;
