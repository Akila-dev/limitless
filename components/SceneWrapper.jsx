"use client";

import { useRef, Suspense, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";

import { Stars, Sun, Moon, Planet, SelectiveBloom } from "@/components";

gsap.registerPlugin(useGSAP);

const SceneWrapper = ({ data }) => {
  const [animateSunBloom, setAnimateSunBloom] = useState(false);
  const [showLimitlessText, setShowLimitlessText] = useState(false);
  const [showPlanetsText, setShowPlanetsText] = useState(false);

  const router = useRouter();

  const container = useRef(null);
  const galaxyRef = useRef(null);
  const starsRef = useRef(null);
  const sunRef = useRef(null);
  const moonRef = useRef(null);
  const limitlessRef = useRef(null);
  const planetsOrbitRef = useRef(null);
  const dragWrapperRef = useRef(null);

  const planetRefs = Array.from({ length: 8 }, () => useRef(null));

  const orbitRadius = 2.5;
  const orbitVal = 0.001;
  const planetRad = 0.2;
  const planetSM = planetRad * 0.8;
  const planetMid = planetRad * 0.9;

  const planets_data = data.map((planet) => {
    let newPlanet = { ...planet };
    planet.name && planet.name.length < 3
      ? (newPlanet = { ...planet, radius: planetSM })
      : planet.name && planet.name.length > 3 && planet.name.length < 6
        ? (newPlanet = { ...planet, radius: planetMid })
        : (newPlanet = { ...planet, radius: planetRad });
    return newPlanet;
  });

  // ! DRAG AND PLANETS ORBIT
  useFrame(() => {
    dragAngle.current += dragVelocity.current;
    dragVelocity.current *= 0.9;
    if (dragWrapperRef.current) {
      dragWrapperRef.current.rotation.y = dragAngle.current;
    }

    if (planetsOrbitRef.current) {
      planetsOrbitRef.current.rotation.y += 0.002;
    }
  });

  // ! DRAG EVENT
  // ! DRAG EVENT
  // ! DRAG EVENT
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragAngle = useRef(0);
  const dragVelocity = useRef(0);

  useEffect(() => {
    const handlePointerDown = (e) => {
      isDragging.current = true;
      dragStartX.current = e.clientX;
    };
    const handlePointerMove = (e) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - dragStartX.current;
      dragVelocity.current = -deltaX * 0.0005;
      dragStartX.current = e.clientX;
    };
    const handlePointerUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  // ! MOON CLICK EVENT
  // ! MOON CLICK EVENT
  // ! MOON CLICK EVENT
  const { contextSafe } = useGSAP({ scope: container });
  const handleMoonClick = contextSafe(() => {
    const tl = gsap.timeline({
      defaults: { duration: 1.2, ease: "expo.inOut" },
      onComplete: () => router.push("/limitless"),
    });

    if (dragWrapperRef.current) {
      tl.to(dragWrapperRef.current.position, { y: -5 }, "<")
        .to(dragWrapperRef.current.scale, { x: 0.1, y: 0.1, z: 0.1 }, "<")
        .to(dragWrapperRef.current.rotation, { y: "+=1" }, "<");
    }
    // if (galaxyRef.current) {
    //   tl.to(galaxyRef.current.scale, { x: 0.5, y: 0.5, z: 0.5 }, "<");
    // }
    if (moonRef.current) {
      gsap.to(moonRef.current.scale, {
        x: 0.9,
        y: 0.9,
        z: 0.9,
        duration: 1,
        ease: "power2.out",
      });
    }
  });

  // ! PLANET CLICK EVENT
  // ! PLANET CLICK EVENT
  // ! PLANET CLICK EVENT
  const handlePlanetClick = contextSafe((i, slug) => {
    const tl = gsap.timeline({
      defaults: { duration: 1.2, ease: "expo.inOut" },
      onComplete: () => router.push(`/page/${slug}`),
    });

    if (dragWrapperRef.current) {
      tl.to(dragWrapperRef.current.position, { y: -5 }, "<")
        .to(dragWrapperRef.current.scale, { x: 0.1, y: 0.1, z: 0.1 }, "<")
        .to(dragWrapperRef.current.rotation, { y: "+=1" }, "<");
    }
    // if (galaxyRef.current) {
    //   tl.to(galaxyRef.current.scale, { x: 0.5, y: 0.5, z: 0.5 }, "<");
    // }
    if (moonRef.current) {
      gsap.to(moonRef.current.scale, {
        x: 0.9,
        y: 0.9,
        z: 0.9,
        duration: 1,
        ease: "power2.out",
      });
    }
  });

  // ! INTRO ANIMATION
  // ! INTRO ANIMATION
  // ! INTRO ANIMATION
  const introTL = useRef(null);
  const limitlessScale = 0.7;
  const limitlessEndX = 2.5;
  const limitlessY = -0.25;

  useGSAP(
    () => {
      // if (
      //   introTL.current &&
      //   starsRef.current &&
      //   planetsOrbitRef.current &&
      //   sunRef.current &&
      //   moonRef.current &&
      //   limitlessRef.current
      // ) {
      introTL.current = gsap.timeline({
        defaults: { ease: "expo.inOut", duration: 3 },
      });

      introTL.current
        .from(sunRef.current.scale, { x: 0, y: 0, z: 0, duration: 2 })
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
              setTimeout(() => setShowPlanetsText(true), 500);
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

      gsap.to(planetsOrbitRef.current.rotation, {
        x: -0.01,
        z: -0.01,
        yoyo: true,
        repeat: -1,
        duration: 5,
        ease: "sine.inOut",
      });
      // }
    },
    { scope: container }
  );

  return (
    <Suspense fallback={null}>
      <SelectiveBloom animateBloom={animateSunBloom} />
      <group ref={container}>
        <group ref={galaxyRef} scale={2.5}>
          <Stars ref={starsRef} scale={5} />
          <group ref={limitlessRef} position={[0, limitlessY, 0]}>
            <Sun ref={sunRef} scale={limitlessScale * 0.5} position-y={0.3} />
            <Moon
              ref={moonRef}
              scale={limitlessScale}
              position-x={limitlessEndX}
              showText={showLimitlessText}
              onClick={() => handleMoonClick()}
            />
          </group>
          <group rotation={[-Math.PI / 1.02, 0, 0]} position={[0.6, 0.5, 0]}>
            <group ref={dragWrapperRef}>
              <group ref={planetsOrbitRef} position-y={-1} scale={3}>
                {planets_data.map((planet, i) => (
                  <Planet
                    ref={planetRefs[i]}
                    key={i}
                    label={planet.name}
                    position={[
                      Math.cos(orbitVal + Math.PI * 0.25 * i) * orbitRadius,
                      0,
                      Math.sin(orbitVal + Math.PI * 0.25 * i) * orbitRadius,
                    ]}
                    radius={planet.radius}
                    scale={1}
                    showText={showPlanetsText}
                    onClick={() => handlePlanetClick(i, planet.slug.current)}
                  />
                ))}
              </group>
            </group>
          </group>
        </group>
      </group>
    </Suspense>
  );
};

export default SceneWrapper;
