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
  const limitlessTextRef = useRef();

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
  const limitlessScale = 0.6;
  const limitlessEndX = 1.5;
  useGSAP(
    () => {
      if (introTL && starsRef && planetsOrbitRef) {
        // * PLANETS ORBIT INFINITE ROTATION
        gsap.to(planetsOrbitRef.current.rotation, {
          x: 0,
          y: Math.PI * 2,
          z: 0,
          repeat: -1,
          duration: 20,
          ease: "none",
        });

        // * TIMELINE CONFIG
        introTL.current = gsap.timeline({
          defaults: {
            ease: "power2.in",
            duration: 1,
          },
        });

        // * STARS INTRO START
        introTL.current
          .from(starsRef.current.scale, {
            x: 0,
            y: 0,
            z: 0,
          })
          .from(
            starsRef.current.rotation,
            {
              x: 0,
              y: Math.PI * 2,
              z: 0,
            },
            "<"
          )
          // * STARS INTRO END

          // * SOLAR ECLIPSE START
          .to(
            sunRef.current.scale,
            {
              x: limitlessScale,
              y: limitlessScale,
              z: limitlessScale,
            },
            "<"
          )
          .set(moonRef.current.scale, {
            x: limitlessScale,
            y: limitlessScale,
            z: limitlessScale,
          })
          .to(moonRef.current.position, {
            x: 0,
            y: 0,
            z: 0,
          })
          .to(limitlessRef.current.position, {
            x: limitlessEndX,
            y: 0,
            z: 0,
          })
          .to(limitlessTextRef.current, {
            fillOpacity: 1,
          });
        // * SOLAR ECLIPSE END

        // * PLANETS INTRO START
        planets_data.forEach((element) => {
          introTL.current.to(element.ref.current.scale, {
            x: element.scale || 1,
            y: element.scale || 1,
            z: element.scale || 1,
          });
        });
        // * PLANETS INTRO END
      }
    },
    { scope: galaxyRef }
  );

  return (
    <Suspense fallback={null}>
      <group ref={galaxyRef}>
        <Stars ref={starsRef} />
        <group ref={limitlessRef} position={[0, 0, 0]}>
          <Sun ref={sunRef} scale={0} />
          <Moon ref={moonRef} scale={0} position={[3, 0, 0]} />
          <Billboard>
            <Text
              ref={limitlessTextRef}
              color="white"
              anchorX="center"
              anchorY="middle"
              position={[0, 0, 1]}
              transparent
              fillOpacity={0}
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
                scale={0}
              />
            ))}
          </group>
        </group>
      </group>
    </Suspense>
  );
};

export default SceneWrapper;
