"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import { Button } from "@/components";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const Text4R3F = ({
  title,
  subtitle,
  paragraph,
  buttons,
  center,
  sm,
  delay,
}) => {
  const containerRef = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();
  const paragraphRef = useRef();
  const buttonRefs = useRef([]);

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
          tl.from(splitH.words, {
            duration: 1,
            delay: delay ? delay : 0,
          });
        }

        // ! SUBTITLE
        if (subtitleRef.current) {
          let splitST = SplitText.create(subtitleRef.current, {
            type: "lines",
            mask: "lines",
          });
          tl.from(
            splitST.lines,
            {
              duration: 1,
              delay: !titleRef.current && delay ? delay : 0,
            },
            titleRef.current ? ">-=1" : ">"
          );
        }

        // ! PARAGRAPH
        if (paragraphRef.current) {
          let splitP = SplitText.create(paragraphRef.current, {
            type: "words, lines",
            mask: "lines",
          });
          tl.from(
            splitP.lines,
            {
              duration: 1,
              delay:
                !titleRef.current && !subtitleRef.current && delay ? delay : 0,
            },
            titleRef.current ? ">-=1" : ">"
          );
        }

        // ! BUTTONS
        if (buttonRefs.current) {
          tl.from(
            buttonRefs.current,
            {
              duration: 1,
              delay:
                !titleRef.current &&
                !subtitleRef.current &&
                !paragraphRef.current &&
                delay
                  ? delay
                  : 0,
            },
            titleRef.current || subtitleRef.current || paragraphRef.current
              ? ">-=1"
              : ">"
          );
        }
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={`space-y-0.5 lg:space-y-0.25 ${center ? "!text-center" : ""}`}
    >
      {title && <h1 ref={titleRef}>{title}</h1>}
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
        <div className="flex items-center justify-start flex-wrap pt-2.25">
          {buttons.map((button, i) => (
            // <Button key={i} text={button.text} href={button.url} />
            <div
              key={i}
              ref={(el) => (buttonRefs.current[i] = el)}
              className="flex"
            >
              <Button text={button.text} href={button.url} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Text4R3F;
