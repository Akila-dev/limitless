"use client";

import { useRef, useEffect } from "react";
import { Text, Billboard } from "@react-three/drei";
import gsap from "gsap";

const BillboardText = (props) => {
  const textRef = useRef();

  useEffect(() => {
    textRef.current.material.transparent = true;
    textRef.current.material.opacity = 0;
    textRef.current.material.needsUpdate = true;
  }, []);

  useEffect(() => {
    if (props.showText && textRef.current) {
      gsap.fromTo(
        textRef.current.scale,
        { x: 0.8, y: 0.8, z: 0.8 },
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 1.5,
          ease: "power4.out",
        }
      );

      textRef.current.material.transparent = true;
      textRef.current.material.opacity = 0;
      textRef.current.material.needsUpdate = true;

      gsap.to(textRef.current.material, {
        opacity: 1,
        duration: 1.2,
        ease: "sine.inOut",
      });
    }
  }, [props.showText]);

  return (
    <>
      <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
        <Text
          ref={textRef}
          color={props.color || "white"}
          anchorX="center"
          anchorY="middle"
          transparent
          opacity={0}
          {...props}
        >
          {props.text}
        </Text>
      </Billboard>
    </>
  );
};

export default BillboardText;
