"use client";

import { useRef, Suspense } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Billboard, Text } from "@react-three/drei";

import { Stars, Sun, Moon, Planet } from "@/components";

gsap.registerPlugin(useGSAP);

const SceneWrapper = () => {
  const galaxyRef = useRef();
  const starsRef = useRef();
  const sunRef = useRef();
  const moonRef = useRef();
  const limitlessRef = useRef();

  const planetRef1 = useRef();
  const planetRef2 = useRef();
  const planetRef3 = useRef();
  const planetRef4 = useRef();
  const planetRef5 = useRef();
  const planetRef6 = useRef();
  const planetRef7 = useRef();
  const planetRef8 = useRef();

  const planetsOrbitRef = useRef();

  const orbitRadius = 2.35;
  const orbitVal = 0.001;
  const planets_data = [
    {
      label: "THINK TANK",
      ref: planetRef1,
      scale: 1,
    },
    {
      label: "LAB",
      ref: planetRef2,
      scale: 0.65,
    },
    {
      label: "THINK TANK",
      ref: planetRef3,
    },
    {
      label: "THINK TANK",
      ref: planetRef4,
      scale: 0.7,
    },
    {
      label: "THINK TANK",
      ref: planetRef5,
    },
    {
      label: "THINK TANK",
      ref: planetRef6,
      scale: 0.65,
    },
    {
      label: "THINK TANK",
      ref: planetRef7,
      scale: 0.9,
    },
    {
      label: "ROADSHOW",
      ref: planetRef8,
      scale: 0.7,
    },
  ];

  const introTL = useRef();
  //   useGSAP(
  //     () => {
  //       gsap.to(planetsOrbitRef.current.rotation, {
  //         y: 360,
  //         duration: 5000,
  //         repeat: -1,
  //       });
  //     },
  //     { scope: galaxyRef.current }
  //   );

  //   useGSAP(
  //     () => {
  //       introTL.current = gsap.timeline().from(starsRef.current.scale, {
  //         x: 0,
  //         y: 0,
  //         z: 0,
  //         duration: 1,
  //         ease: "none",
  //       });
  //     },
  //     { scope: galaxyRef }
  //   );

  return (
    <Suspense fallback={null}>
      <group ref={galaxyRef}>
        <Stars ref={starsRef} />
        <group ref={limitlessRef} position={[1.5, 0, 0]}>
          <Sun ref={sunRef} scale={0.6} />
          <Moon ref={moonRef} scale={0.6} />
          <Billboard>
            <Text
              color="white"
              anchorX="center"
              anchorY="middle"
              position={[0, 0, 1]}
              // position={[-0.23, 0, 1]}
              fontSize={0.1}
              // font={"/fonts/satoshi.otf"}
            >
              LIMITLESS
            </Text>
          </Billboard>
        </group>
        <group rotation={[-Math.PI / 1.15, 0, 0]} position={[0.5, 0, 0]}>
          <group ref={planetsOrbitRef}>
            {planets_data.map((planet, i) => (
              <Planet
                ref={planet.ref}
                key={i}
                label={planet.label}
                position={[
                  Math.cos(orbitVal + Math.PI * 0.25 * i) * orbitRadius,
                  0,
                  Math.sin(orbitVal + Math.PI * 0.25 * i) * orbitRadius,
                ]}
                scale={planet.scale || 1}
              />
            ))}
          </group>
        </group>
      </group>
    </Suspense>
  );
};

export default SceneWrapper;
