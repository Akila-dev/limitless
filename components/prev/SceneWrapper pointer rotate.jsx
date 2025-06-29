"use client";

import { useRef, Suspense, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { Stars, Sun, Moon, Planet, SelectiveBloom } from "@/components";

gsap.registerPlugin(useGSAP);

const SceneWrapper = () => {
  const [animateSunBloom, setAnimateSunBloom] = useState(false);
  const [showLimitlessText, setShowLimitlessText] = useState(false);
  const [showPlanetsText, setShowPlanetsText] = useState(false);

  // ! REFS
  const galaxyRef = useRef();
  const starsRef = useRef();
  const sunRef = useRef();
  const moonRef = useRef();
  const limitlessRef = useRef();

  const planetsOrbitRef = useRef(); // Infinite rotation
  const dragWrapperRef = useRef(); // Hover rotation

  // ! PLANET REFS
  const planetRefs = Array.from({ length: 8 }, () => useRef());

  const orbitRadius = 2.5;
  const orbitVal = 0.001;
  const planetRad = 0.2;
  const planetSM = planetRad * 0.8;
  const planetMid = planetRad * 0.9;

  const planets_data = [
    { label: "THINK TANK", radius: planetRad },
    { label: "LAB", radius: planetSM },
    { label: "THINK TANK", radius: planetRad },
    { label: "THINK TANK", radius: planetMid },
    { label: "THINK TANK", radius: planetRad },
    { label: "THINK TANK", radius: planetRad },
    { label: "THINK TANK", radius: planetSM },
    { label: "ROADSHOW", radius: planetMid },
  ];

  // ! POINTER ROTATION STATE
  const dragVelocity = useRef(0);
  const dragAngle = useRef(0);

  useEffect(() => {
    const handlePointerMove = (e) => {
      const centerX = window.innerWidth / 2;
      const deltaX = (e.clientX - centerX) / centerX; // -1 to 1
      dragVelocity.current = deltaX * 0.05; // Sensitivity
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  // ! FRAME LOOP
  useFrame(() => {
    // Inertia-based drag rotation
    dragAngle.current += dragVelocity.current;
    dragVelocity.current *= 0.9;

    if (dragWrapperRef.current) {
      dragWrapperRef.current.rotation.y = dragAngle.current;
    }

    // Infinite planet orbit spin
    if (planetsOrbitRef.current) {
      planetsOrbitRef.current.rotation.y += 0.002;
    }
  });

  // ! GSAP INTRO ANIMATION
  const introTL = useRef();
  const limitlessScale = 0.7;
  const limitlessEndX = 2.5;
  const limitlessY = -0.25;

  useGSAP(() => {
    if (introTL && starsRef && planetsOrbitRef) {
      introTL.current = gsap.timeline({
        defaults: { ease: "expo.inOut", duration: 3 },
      });

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
          duration: 4,
        })
        .to(
          sunRef.current.scale,
          {
            x: limitlessScale * 0.95,
            y: limitlessScale * 0.95,
            z: limitlessScale * 0.95,
            duration: 4,
            onStart: () => setAnimateSunBloom(true),
          },
          "<+=0.3"
        )
        .to(
          planetsOrbitRef.current.scale,
          { x: 1, y: 1, z: 1, duration: 3 },
          "<+=1.2"
        )
        .to(planetsOrbitRef.current.position, { y: 0, duration: 3 }, "<+=0.2")
        .to(starsRef.current.scale, { x: 1, y: 1, z: 1, duration: 3 }, "<+=0.2")
        .to(
          planetsOrbitRef.current.rotation,
          {
            y: Math.PI * 4,
            duration: 3,
            onComplete: () => {
              setShowLimitlessText(true);
              setTimeout(() => {
                setShowPlanetsText(true);
              }, 500);
            },
          },
          "<+=0.3"
        );

      // Background & orbit wobble
      gsap.to(galaxyRef.current.rotation, {
        y: "+=0.1",
        repeat: -1,
        duration: 20,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(planetsOrbitRef.current.rotation, {
        x: -0.01,
        z: -0.01,
        yoyo: true,
        repeat: -1,
        duration: 5,
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

        {/* POINTER CONTROLLED ROTATION */}
        <group rotation={[-Math.PI / 1.02, 0, 0]} position={[0.6, 0.5, 0]}>
          <group ref={dragWrapperRef}>
            {/* INNER INFINITE ROTATION */}
            <group ref={planetsOrbitRef} position-y={-1} scale={3}>
              {planets_data.map((planet, i) => (
                <Planet
                  ref={planetRefs[i]}
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
      </group>
    </Suspense>
  );
};

export default SceneWrapper;
