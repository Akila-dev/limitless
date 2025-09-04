"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

import { Button, CardsAnimationWrapper } from "@/components";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const Text4R3F = ({
  title,
  subtitle,
  paragraph,
  buttons,
  center,
  delay,
  titleClassName,
  children,
  onlyOnce,
  animateImmediately,
}) => {
  const containerRef = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();
  const paragraphRef = useRef();
  const buttonRefs = useRef([]);

  const tlRef = useRef(); // * Timeline Ref

  // ! SPLIT TEXT REFS
  const splitHRef = useRef();
  const splitSTRef = useRef();
  const splitPRef = useRef();

  const splitAndAnimate = () => {
    splitHRef.current?.revert();
    splitSTRef.current?.revert();
    splitPRef.current?.revert();

    // ! SPLIT TITLE
    if (titleRef.current) {
      splitHRef.current = new SplitText(titleRef.current, {
        type: "words, lines",
        mask: "lines",
      });
    }
    // ! SPLIT SUBTITLE
    if (subtitleRef.current) {
      splitSTRef.current = new SplitText(subtitleRef.current, {
        type: "lines",
        mask: "lines",
      });
    }
    // ! SPLIT PARAGRAPH
    if (paragraphRef.current) {
      splitPRef.current = new SplitText(paragraphRef.current, {
        type: "words, lines",
        mask: "lines",
      });
    }

    // ! ANIMATE SPLIT TEXTS
    tlRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: animateImmediately ? "top bottom" : "top top+=95%",
        toggleActions: onlyOnce
          ? "play none none none"
          : "play pause resume reset",
      },
      defaults: {
        duration: 1,
        ease: "power2.inOut",
        y: 20,
        opacity: 0,
        stagger: 0.1,
      },
    });
    tlRef.current.set(containerRef.current, { y: 0, opacity: 1 });
    // * TITLE ANIMATION
    if (titleRef.current && splitHRef.current) {
      tlRef.current.from(splitHRef.current.words, {
        duration: 1,
        delay: delay ? delay : 0,
      });
    }
    // * SUBTITLE ANIMATION
    if (subtitleRef.current && splitSTRef.current) {
      tlRef.current.from(
        splitSTRef.current.lines,
        {
          duration: 1,
          delay: !titleRef.current && delay ? delay : 0,
        },
        titleRef.current ? ">-=1" : ">"
      );
    }
    // * PARAGRAPH ANIMATION
    if (paragraphRef.current && splitPRef.current) {
      tlRef.current.from(
        splitPRef.current.lines,
        {
          duration: 1,
          delay: !titleRef.current && !subtitleRef.current && delay ? delay : 0,
        },
        titleRef.current ? ">-=1" : ">"
      );
    }

    ScrollTrigger.refresh();
  };

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        document.fonts.ready.then(() => {
          splitAndAnimate();
        });

        // Resize listener with debounce
        let resizeTimeout;
        const handleResize = () => {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(() => {
            splitAndAnimate();
          }, 100);
        };

        window.addEventListener("resize", handleResize);

        return () => {
          window.removeEventListener("resize", handleResize);

          splitHRef.current?.revert();
          splitSTRef.current?.revert();
          splitPRef.current?.revert();
          tlRef.current?.kill();
        };
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={`flex flex-col gap-1.5 opacity-0 ${center ? "text-center" : ""} ${center ? "!text-center" : ""}`}
    >
      {title && (
        <h1
          ref={titleRef}
          className={`${titleClassName ? titleClassName : ""}`}
        >
          {title}
        </h1>
      )}
      {subtitle && (
        <p ref={subtitleRef} className={`p-lg`}>
          {subtitle}
        </p>
      )}
      {paragraph && (
        <p ref={paragraphRef} className={``}>
          {paragraph}
        </p>
      )}
      {buttons && (
        <CardsAnimationWrapper delay={0.5} onlyOnce={onlyOnce} classNAme="mt-1">
          {buttons.map((button, i) => (
            <div key={i} className="flex-v-center">
              <Button text={button.text} href={button.url} />
            </div>
          ))}
        </CardsAnimationWrapper>
      )}
      {children && (
        <CardsAnimationWrapper onlyOnce={onlyOnce}>
          {children}
        </CardsAnimationWrapper>
      )}
    </div>
  );
};

export default Text4R3F;
