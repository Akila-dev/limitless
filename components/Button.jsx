"use client";

import { useRef } from "react";
import Link from "next/link";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Button = ({ text, href, onClick }) => {
  const container = useRef();
  const { contextSafe } = useGSAP({ scope: container });

  useGSAP(
    () => {
      gsap.from(".gsap-show", {
        opacity: 0,
        y: 15,
        duration: 0.75,
        stagger: 0.175,
        ease: "power2.out",
        delay: 0.5,
      });
    },
    { scope: container }
  );

  const hovering = contextSafe(() => {
    gsap
      .timeline()

      .to(".clip-bg", {
        top: "50%",
        opacity: 1,
        scale: 1,
        duration: 1,
        // stagger: 0.175,
        ease: "power2.out",
      });
  });
  const hoverOut = contextSafe(() => {
    gsap.to(".clip-bg", {
      top: "200px",
      scale: 0,
      duration: 1,
      // stagger: 0.175,
      ease: "power2.out",
    });
  });

  return href ? (
    <Link
      onMouseEnter={() => hovering()}
      onMouseLeave={() => hoverOut()}
      href={href}
      className="btn relative group !overflow-hidden"
      ref={container}
    >
      <span className="clip-bg"></span>
      <span className="relative z-1 group-hover:text-bg duration-700">
        {text}
      </span>
    </Link>
  ) : (
    <button
      type="button"
      onMouseEnter={() => hovering()}
      onMouseLeave={() => hoverOut()}
      onClick={onClick}
      className="btn relative group overflow-hidden"
      ref={container}
    >
      <span className="clip-bg"></span>
      <span className="relative z-1 group-hover:text-bg duration-700">
        {text}
      </span>
    </button>
  );
};

export default Button;
