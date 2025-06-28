"use client";

import { useRef, useEffect } from "react";
import { Text, Billboard } from "@react-three/drei";
import gsap from "gsap";

const BillboardText = (props) => {
  const textRef = useRef();

  useEffect(() => {
    if (props.showText) {
      gsap.to(textRef.current, {
        fillOpacity: 1,
        duration: 1,
        ease: "none",
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
          fillOpacity={0}
          {...props}
          // font={"/fonts/satoshi.otf"}
        >
          {props.text}
        </Text>
      </Billboard>
    </>
  );
};

export default BillboardText;
