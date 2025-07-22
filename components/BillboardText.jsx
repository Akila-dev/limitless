"use client";

import { useEffect, useRef } from "react";
import { Text, Billboard } from "@react-three/drei";
import gsap from "gsap";

const StaggeredText = ({
  text = "",
  showText = false,
  color = "white",
  ...props
}) => {
  const letterRefs = useRef([]);
  const letterSpacing = props.fontSize / 1.25;
  const offset = (text.length - 1) * 0.5 * letterSpacing;

  useEffect(() => {
    if (letterRefs.current.length > 0) {
      // Set initial state
      letterRefs.current.forEach((ref) => {
        if (ref) {
          ref.scale.set(0.5, 0.5, 0.5);
          ref.material.opacity = 0;
          ref.material.transparent = true;
          ref.material.needsUpdate = true;
        }
      });
    }
  }, []);

  useEffect(() => {
    if (showText && letterRefs.current.length > 0) {
      const tl = gsap.timeline();

      // Set initial state
      letterRefs.current.forEach((ref) => {
        if (ref) {
          ref.scale.set(0.5, 0.5, 0.5);
          ref.material.opacity = 0;
          ref.material.transparent = true;
        }
      });

      tl.to(
        letterRefs.current.map((ref) => ref.material),
        {
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "sine.out",
        },
        0
      ).to(
        letterRefs.current.map((ref) => ref.scale),
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "power3.out",
        },
        0
      );
    } else {
      const tl = gsap.timeline();

      // // Set initial state
      // letterRefs.current.forEach((ref) => {
      //   if (ref) {
      //     ref.scale.set(0, 0, 0);
      //     ref.material.opacity = 0;
      //     ref.material.transparent = true;
      //   }
      // });

      tl.to(
        letterRefs.current.map((ref) => ref.material),
        {
          opacity: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "sine.out",
        },
        0
      ).to(
        letterRefs.current.map((ref) => ref.scale),
        {
          x: 0,
          y: 0,
          z: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "power3.out",
        },
        0
      );
    }
  }, [showText]);

  return (
    <Billboard follow lockX={false} lockY={false} lockZ={false}>
      <group {...props}>
        {text.split("").map((char, i) => (
          <Text
            key={i}
            ref={(el) => (letterRefs.current[i] = el)}
            position={[i * letterSpacing - offset, 0, 0]} // spacing between letters
            fontSize={props.fontSize || 0.1}
            color={color}
            anchorX="center"
            anchorY="middle"
            transparent
            opacity={0}
          >
            {char}
          </Text>
        ))}
      </group>
    </Billboard>
  );
};

export default StaggeredText;
