"use client";

import { useRef, Suspense, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Billboard, Text } from "@react-three/drei";

import { Stars, Sun, Moon, Planet, SelectiveBloom } from "@/components";

gsap.registerPlugin(useGSAP);

const SceneWrapper = () => {
  const [animateSunBloom, setAnimateSunBloom] = useState(false);
  const [showLimitlessText, setShowLimitlessText] = useState(false);
  const [showPlanetsText, setShowPlanetsText] = useState(false);

  // ! OBJECTS REF
  const galaxyRef = useRef();
  const starsRef = useRef();
  const sunRef = useRef();
  const moonRef = useRef();
  const limitlessRef = useRef();
  const limitlessTextRef = useRef();
  const planetsOrbitRef = useRef();

  // ! PLANETS REF
  const planetRef1 = useRef();
  const planetRef2 = useRef();
  const planetRef3 = useRef();
  const planetRef4 = useRef();
  const planetRef5 = useRef();
  const planetRef6 = useRef();
  const planetRef7 = useRef();
  const planetRef8 = useRef();

  // ! PLANETS AND ORBIT DATA
  // const orbitRadius = 20;
  const orbitRadius = 2.5;
  const orbitVal = 0.001;
  const planetRad = 0.2;
  const planetSM = planetRad * 0.8;
  const planetMid = planetRad * 0.9;

  // ! PLANETS DATA
  const planets_data = [
    {
      label: "THINK TANK",
      ref: planetRef1,
      radius: planetRad,
    },
    {
      label: "LAB",
      ref: planetRef2,
      radius: planetSM,
    },
    {
      label: "THINK TANK",
      ref: planetRef3,
      radius: planetRad,
    },
    {
      label: "THINK TANK",
      ref: planetRef4,
      radius: planetMid,
    },
    {
      label: "THINK TANK",
      ref: planetRef5,
      radius: planetRad,
    },
    {
      label: "THINK TANK",
      ref: planetRef6,
      radius: planetRad,
    },
    {
      label: "THINK TANK",
      ref: planetRef7,
      radius: planetSM,
    },
    {
      label: "ROADSHOW",
      ref: planetRef8,
      radius: planetMid,
    },
  ];

  // ! INTRO ANIMATION
  const introTL = useRef();
  const limitlessScale = 0.7;
  const limitlessEndX = 2.5;
  const limitlessY = -0.25;

  const bloomProps = {
    radius: 0,
    strength: 1,
  };

  useGSAP(() => {
    if (introTL && starsRef && planetsOrbitRef) {
      // * TIMELINE CONFIG
      introTL.current = gsap.timeline({
        defaults: {
          ease: "expo.inOut",
          duration: 3,
        },
      });

      // * SOLAR ECLIPSE START
      introTL.current
        .from(sunRef.current.scale, {
          x: 0,
          y: 0,
          z: 0,
          duration: 2,
        })
        .to(sunRef.current.position, {
          x: limitlessEndX,
          y: 0,
          z: 0,
          // delay: 1,
          // ease: "power1.inOut",
          duration: 4,
        })
        .to(
          sunRef.current.scale,
          {
            x: limitlessScale * 0.95,
            y: limitlessScale * 0.95,
            z: limitlessScale * 0.95,
            duration: 4,
            onStart: () => {
              setAnimateSunBloom(true);
            },
          },
          "<+=0.3"
          // "<+=2.5"
        )
        .to(
          planetsOrbitRef.current.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 3,
          },
          "<+=1.2"
        )
        .to(
          planetsOrbitRef.current.position,
          {
            y: 0,
            duration: 3,
          },
          "<+=0.2"
        )
        .to(
          starsRef.current.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 3,
          },
          "<+=0.2"
        )
        .to(
          planetsOrbitRef.current.rotation,
          {
            y: Math.PI * 4,
            duration: 3,
            onComplete: () => {
              // * SHOW LIMITLESS TEXTS
              setShowLimitlessText(true);
              setTimeout(() => {
                // * SHOW PLANETS TEXTS
                setShowPlanetsText(true);
                // * PLANETS ORBIT INFINITE ROTATION
                gsap
                  .timeline({
                    defaults: {
                      duration: 25,
                      ease: "sine.inOut",
                      repeat: -1,
                      delay: 1,
                    },
                  })
                  .to(planetsOrbitRef.current.rotation, {
                    y: Math.PI * 6,
                    ease: "none",
                  })
                  .to(
                    planetsOrbitRef.current.rotation,
                    {
                      x: -0.01,
                      z: -0.01,
                      yoyo: true,
                    },
                    "<"
                  );
              }, 500);
            },
          },
          "<+=0.3"
        );

      gsap.to(galaxyRef.current.rotation, {
        y: "+=0.1",
        repeat: -1,
        duration: 20,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  });

  return (
    <Suspense fallback={null}>
      <SelectiveBloom animateBloom={animateSunBloom} />
      <group ref={galaxyRef} scale={2.5}>
        <Stars ref={starsRef} scale={5} />
        <group ref={limitlessRef} position={[0, limitlessY, 0]}>
          <Sun ref={sunRef} scale={limitlessScale * 0.5} position-y={0.3} />
          <Moon
            ref={moonRef}
            scale={limitlessScale}
            position-x={limitlessEndX}
            showText={showLimitlessText}
          />
        </group>
        <group rotation={[-Math.PI / 1.02, 0, 0]} position={[0.6, 0.5, 0]}>
          <group ref={planetsOrbitRef} position-y={-1} scale={3}>
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
                radius={planet.radius}
                scale={1}
                showText={showPlanetsText}
              />
            ))}
          </group>
        </group>
      </group>
    </Suspense>
  );
};

export default SceneWrapper;
