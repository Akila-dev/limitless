"use client";

import { useRef } from "react";
import Link from "next/link";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { FaChevronLeft } from "react-icons/fa6";

gsap.registerPlugin(useGSAP);

const Button = ({ text, href, onClick, back, white }) => {
  const container = useRef();
  const { contextSafe } = useGSAP({ scope: container });

  const hovering = contextSafe(() => {
    if (back) {
      gsap.to(".gsap-button", {
        scale: 1.1,
        duration: 1,
        ease: "power2.out",
      });
    } else {
      gsap.to(".clip-bg", {
        top: "50%",
        opacity: 1,
        scale: 1,
        duration: 1,
        // stagger: 0.175,
        ease: "power2.out",
      });
    }
  });
  const hoverOut = contextSafe(() => {
    if (back) {
      gsap.to(".gsap-button", {
        scale: 1,
        duration: 1,
        ease: "power2.out",
      });
    } else {
      gsap.to(".clip-bg", {
        top: "200px",
        scale: 0,
        duration: 1,
        // stagger: 0.175,
        ease: "power2.out",
      });
    }
  });

  return href ? (
    <Link
      onMouseEnter={() => hovering()}
      onMouseLeave={() => hoverOut()}
      href={href}
      className={
        back
          ? "inner-block"
          : `btn relative group !overflow-hidden ${white ? "!bg-fg !border-fg" : ""}`
      }
      ref={container}
    >
      {!back && <span className={`clip-bg ${white ? "!bg-bg" : ""}`}></span>}
      <span
        className={
          back
            ? "flex-v-center uppercase gsap-button"
            : `relative z-1 group-hover:text-bg duration-700 flex-center ${white ? "!text-bg group-hover:!text-fg" : "!text-fg group-hover:!text-bg"}`
        }
      >
        {back && <FaChevronLeft className="h3" />}
        {text}
      </span>
    </Link>
  ) : (
    <button
      type="button"
      onMouseEnter={() => hovering()}
      onMouseLeave={() => hoverOut()}
      onClick={onClick}
      className={
        back
          ? "inner-block"
          : `btn relative group !overflow-hidden ${white ? "!bg-fg !border-fg" : ""}`
      }
      ref={container}
    >
      {!back && <span className={`clip-bg ${white ? "!bg-bg" : ""}`}></span>}
      <span
        className={
          back
            ? "flex-v-center uppercase gsap-button"
            : `relative z-1 group-hover:text-bg duration-700 flex-center ${white ? "!text-bg group-hover:!text-fg" : "!text-fg group-hover:!text-bg"}`
        }
      >
        {back && <FaChevronLeft className="h3" />}
        {text}
      </span>
    </button>
  );
};

export default Button;
