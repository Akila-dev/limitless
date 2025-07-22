"use client";

import { useRef, Suspense, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRouter, usePathname } from "next/navigation";

import { Stars, Sun, Moon, Planet, SelectiveBloom } from "@/components";

// ! ZUSTAND
import { useIntroStore } from "@/utils/store.js";

gsap.registerPlugin(useGSAP);

const GalaxyScene = ({ data }) => {
  const { width: w, height: h } = useThree((state) => state.viewport);
  const [animateSunBloom, setAnimateSunBloom] = useState(false);
  const [showLimitlessText, setShowLimitlessText] = useState(false);
  const [showPlanetsText, setShowPlanetsText] = useState(false);
  const [hoveringMesh, setHoveringMesh] = useState(false);
  const [activePlanet, setActivePlanet] = useState(0);
  const [showOnlyStars, setShowOnlyStars] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  const [routeFrom, setRouteFrom] = useState("/");

  const container = useRef(null);
  const galaxyRef = useRef(null);
  const starsRef = useRef(null);
  const sunRef = useRef(null);
  const moonRef = useRef(null);
  const limitlessRef = useRef(null);
  const planetsOrbitRef = useRef(null);
  const dragWrapperRef = useRef(null);

  const { contextSafe } = useGSAP({ scope: container });

  const introFinished = useIntroStore((state) => state.introFinished);
  const setIntroFinished = useIntroStore((state) => state.setIntroFinished);
  const setIntroStarted = useIntroStore((state) => state.setIntroStarted);

  const planetRefs = useRef([]);

  // * PLANET ORBIT VARIABLES
  const orbitRadius = w > h ? 2.5 : 1.8;
  const orbitVal = 0.001;
  const planetRad = 0.2;
  const planetSM = planetRad * 0.8;
  const planetMid = planetRad * 0.9;

  // * INTRO ANIMATION VARIABLES
  const noTransitionTL = useRef(null);
  const homeTL = useRef(null);
  const limitlessTL = useRef(null);
  const planetsTL = useRef(null);
  const eventTL = useRef(null);
  // Home
  const homeLimitlessScale = w > h ? 0.7 : 0.75;
  // const limitlessEndX = w > h ? w * 0.11 : w * 0.15;
  const homeLimitlessEndXLG = 2.25;
  const homeLimitlessEndXSMG = 0.75;
  const limitlessY = -0.25;
  // * Limitless
  const limitlessPageLimitlessScale = 4;
  const limitlessPageYStart = h * 1;
  const limitlessPageYEnd = h * 1;

  // * DRAGGING FUNCTION VARIABLES
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragAngle = useRef(0);
  const dragVelocity = useRef(0);

  const planets_data = data.map((planet) => {
    let newPlanet = { ...planet };
    planet.name && planet.name.length < 3
      ? (newPlanet = { ...planet, radius: planetSM })
      : planet.name && planet.name.length > 3 && planet.name.length < 6
        ? (newPlanet = { ...planet, radius: planetMid })
        : (newPlanet = { ...planet, radius: planetRad });
    return newPlanet;
  });

  // ! HOVER EVENTS
  // ! HOVER EVENTS
  // ! HOVER EVENTS
  // * CURSOR-POINTER
  useEffect(() => {
    document.body.style.cursor = hoveringMesh ? "pointer" : "default";
    return () => (document.body.style.cursor = "default");
  }, [hoveringMesh]);

  // * HOVER LIMITLESS
  const handleLimitlessHover = contextSafe(() => {
    setHoveringMesh(true);
    gsap
      .timeline({ defaults: { duration: 1, ease: "power2.out" } })
      .to(limitlessRef.current.scale, {
        x: 1.1,
        y: 1.1,
        z: 1.1,
      })
      .to(
        limitlessRef.current.position,
        {
          x: -0.3,
        },
        "<"
      );
  });
  const handleLimitlessLeave = contextSafe(() => {
    setHoveringMesh(false);
    gsap
      .timeline({ defaults: { duration: 1, ease: "power2.out" } })
      .to(limitlessRef.current.scale, {
        x: 1,
        y: 1,
        z: 1,
      })
      .to(
        limitlessRef.current.position,
        {
          x: 0,
        },
        "<"
      );
  });
  // * HOVER PLANETS
  const handlePlanetsHover = contextSafe((i) => {
    setHoveringMesh(true);
    gsap
      .timeline({ defaults: { duration: 2, ease: "power2.out" } })
      .to(planetRefs.current[i].scale, {
        x: 1.1,
        y: 1.1,
        z: 1.1,
      });
  });
  const handlePlanetsLeave = contextSafe((i) => {
    setHoveringMesh(false);
    gsap
      .timeline({ defaults: { duration: 2, ease: "power2.out" } })
      .to(planetRefs.current[i].scale, {
        x: 1,
        y: 1,
        z: 1,
      });
  });

  // ! DRAG AND PLANETS ORBIT
  // ! DRAG AND PLANETS ORBIT
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
  const handleMoonClick = () => {
    // setRouteFrom(router.pathname);
    router.push("/limitless");
  };

  // ! PLANET CLICK EVENT
  // ! PLANET CLICK EVENT
  // ! PLANET CLICK EVENT
  const handlePlanetClick = (i, slug) => {
    setActivePlanet(i);
    router.push(`/page/${slug}`);
  };

  // ! TRANSITION ANIMATIONS
  // ! TRANSITION ANIMATIONS
  // ! TRANSITION ANIMATIONS
  useEffect(() => {
    setIntroStarted();
    console.log(pathname);
    console.log(previousPathname.current);

    const pageTransitions = () => {
      // * 1. If transitioning from unknown to home page
      if (
        !previousPathname.current.includes("/page/") &&
        !previousPathname.current.includes("/limitless") &&
        pathname === "/"
      ) {
        console.log("to home");
        toHome();
      }
      // * 2. If transitioning from unknown to limitless page
      else if (
        !previousPathname.current.includes("/page/") &&
        !previousPathname.current === "/" &&
        pathname === "/limitless"
      ) {
        console.log("to limitless");
        toLimitless();
      }
      // * 3. If transitioning from unknown to planet page
      else if (
        !previousPathname.current === "/" &&
        previousPathname.current !== "/limitless" &&
        pathname.includes("/page/")
      ) {
        console.log("to planets");
        toHome();
      }
      // * 4. If transitioning from home to limitless page
      else if (previousPathname.current === "/" && pathname === "/limitless") {
        homeToLimitless();
        console.log("home to limitless");
      }
      // * 5. If transitioning from home to planet page
      else if (
        previousPathname.current === "/" &&
        pathname.includes("/page/")
      ) {
        homeToPlanet();
        console.log("home to planet");
      } else {
        console.log("else");
        toNoTransition();
      }
    };

    pageTransitions();
  }, [pathname]);

  // ! ON TRANSITION COMPLETE
  const transitionComplete = () => {
    setIntroFinished();
    previousPathname.current = pathname;
  };

  // ! STOP/PAUSE ALL TIMELINE EXCEPT NEW TIMELINE
  const stopAllTimelineExcept = (newTimeline, onlyStars) => {
    if (onlyStars) {
      setShowOnlyStars(true);
    } else {
      setShowOnlyStars(false);
    }

    if (homeTL.current && homeTL !== newTimeline) {
      homeTL.current.pause();
    }
    if (limitlessTL.current && limitlessTL !== newTimeline) {
      limitlessTL.current.pause();
    }
    if (planetsTL.current && planetsTL !== newTimeline) {
      planetsTL.current.pause();
    }
    if (eventTL.current && eventTL !== newTimeline) {
      eventTL.current.pause();
    }
    if (noTransitionTL.current && noTransitionTL !== newTimeline) {
      noTransitionTL.current.pause();
    }
  };

  const toNoTransition = () => {
    noTransitionTL.current = gsap.timeline({
      defaults: { duration: 1.2, ease: "expo.inOut" },
      onStart: () => stopAllTimelineExcept(noTransitionTL.current, true),
      onComplete: () => transitionComplete(),
    });

    noTransitionTL.current.to(starsRef.current.scale, {
      x: 1,
      y: 1,
      z: 1,
    });
  };

  // ! TRANSITION ANIMATION 1: TO HOME (FOR MOVING TO HOME FROM UNKNOWN/NOT LIMITLESS OR PLANET PAGE)
  const toHome = contextSafe(() => {
    homeTL.current = gsap.timeline({
      defaults: { duration: 1.2, ease: "expo.inOut" },
      onStart: () => stopAllTimelineExcept(homeTL.current),
      onComplete: () => transitionComplete(),
    });

    homeTL.current = gsap.timeline({
      defaults: { ease: "expo.inOut", duration: 3 },
    });

    homeTL.current
      .to(sunRef.current.scale, {
        x: homeLimitlessScale * 0.5,
        y: homeLimitlessScale * 0.5,
        z: homeLimitlessScale * 0.5,
        duration: 2,
      })
      .to(sunRef.current.position, {
        x: w > h ? homeLimitlessEndXLG : homeLimitlessEndXSMG,
        y: 0,
        z: 0,
        duration: 4,
      })
      .to(
        sunRef.current.scale,
        {
          x: homeLimitlessScale * 0.95,
          y: homeLimitlessScale * 0.95,
          z: homeLimitlessScale * 0.95,
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
  });

  // ! TRANSITION ANIMATION 2: TO LIMITLESS (FOR MOVING FROM UNKNOWN TO LIMITLESS)
  const toLimitless = contextSafe(() => {
    setShowLimitlessText(false);
    limitlessTL.current = gsap.timeline({
      defaults: { duration: 1.2, ease: "expo.inOut" },
      onStart: () => stopAllTimelineExcept(limitlessTL.current),
      onComplete: () => transitionComplete(),
    });

    limitlessTL.current
      .set(sunRef.current.scale, {
        x: limitlessPageLimitlessScale * 0.95,
        y: limitlessPageLimitlessScale * 0.95,
        z: limitlessPageLimitlessScale * 0.95,
      })
      .set(moonRef.current.scale, {
        x: limitlessPageLimitlessScale,
        y: limitlessPageLimitlessScale,
        z: limitlessPageLimitlessScale,
      })
      .set(limitlessRef.current.position, {
        x: 0,
        y: limitlessPageYStart,
      })
      .set(
        planetsOrbitRef.current.scale,
        { x: 5, y: 5, z: 5, duration: 3 },
        "<+=1.2"
      )
      .set(planetsOrbitRef.current.position, { y: 0, duration: 3 }, "<+=0.2")
      .to(starsRef.current.scale, { x: 1, y: 1, z: 1, duration: 3 }, "<+=0.2")
      .to(limitlessRef.current.position, {
        // x: 0,
        y: limitlessPageYEnd,
      });
  });

  // ! HOME TO LIMITLESS ANIMATION
  const homeToLimitless = contextSafe(() => {
    limitlessTL.current = gsap.timeline({
      defaults: { duration: 1.2, ease: "expo.inOut" },
      onStart: () => stopAllTimelineExcept(limitlessTL.current),
      onComplete: () => transitionComplete(),
    });

    limitlessTL.current
      .to(
        planetsOrbitRef.current.scale,
        { x: 4, y: 4, z: 4, duration: 3 }
        // "<+=1.2"
      )
      .to(starsRef.current.scale, { x: 5, y: 5, z: 5 }, "<+=0.2")
      .to(
        planetsOrbitRef.current.rotation,
        {
          y: Math.PI * 4,
          onComplete: () => setShowLimitlessText(false),
        },
        "<+=0.3"
      )
      .to(
        limitlessRef.current.position,
        {
          x: 0,
          y: 0,
        },
        "<+=0.3"
      )
      .to(
        limitlessRef.current.scale,
        {
          x: 0,
          y: 0,
          z: 0,
        },
        ">-=0.1"
      )
      .set(limitlessRef.current.position, {
        y: h * 1,
        duration: 3,
      })
      .to(limitlessRef.current.scale, {
        x: 4,
        y: 4,
        z: 4,
      })
      .to(
        limitlessRef.current.position,
        {
          y: h * 1,
          duration: 3,
        },
        "<+=0.3"
      );
  });

  // ! HOME TO PLANET ANIMATION
  const homeToPlanet = contextSafe(() => {
    planetsTL.current = gsap.timeline({
      defaults: { duration: 1.2, ease: "expo.inOut" },
      onStart: () => stopAllTimelineExcept(planetsTL.current),
      onComplete: () => transitionComplete(),
    });

    planetsTL.current
      // .to(
      //   planetsOrbitRef.current.rotation,
      //   {
      //     y: Math.PI * 4,
      //     onComplete: () => setShowLimitlessText(false),
      //   },
      //   "<+=0.3"
      // )
      .to(
        limitlessRef.current.scale,
        {
          x: 0,
          y: 0,
          z: 0,
        },
        ">-=0.1"
      );
  });

  return (
    <group ref={container}>
      <SelectiveBloom animateBloom={animateSunBloom} />
      <group ref={galaxyRef} scale={w > h ? 2.5 : 2}>
        <Stars ref={starsRef} scale={5} />

        <group ref={limitlessRef} position={[0, limitlessY, 0]}>
          <Sun ref={sunRef} scale={0} position-y={0.3} />
          <Moon
            ref={moonRef}
            scale={homeLimitlessScale}
            position-x={w > h ? homeLimitlessEndXLG : homeLimitlessEndXSMG}
            showText={showLimitlessText}
            onClick={() => handleMoonClick()}
            onPointerOver={() => handleLimitlessHover()}
            onPointerLeave={() => handleLimitlessLeave()}
            mobile={w < h}
          />
        </group>
        <group
          rotation={[w > h ? -Math.PI / 1.02 : -Math.PI / 1.1, 0, 0]}
          position={[w > h ? 0.6 : 0.8, w > h ? 0.5 : 0, 0]}
        >
          <group ref={dragWrapperRef}>
            <group ref={planetsOrbitRef} position-y={-1} scale={3}>
              {planets_data.map((planet, i) => (
                <Planet
                  ref={(el) => (planetRefs.current[i] = el)}
                  key={i}
                  label={planet.name}
                  position={[
                    Math.cos(orbitVal + Math.PI * 0.25 * i) * orbitRadius,
                    0,
                    Math.sin(orbitVal + Math.PI * 0.25 * i) * orbitRadius,
                  ]}
                  radius={planet.radius}
                  scale={w > h ? 1 : 1.25}
                  showText={showPlanetsText}
                  onClick={() => handlePlanetClick(i, planet.slug.current)}
                  onPointerOver={() => handlePlanetsHover(i)}
                  onPointerOut={() => handlePlanetsLeave(i)}
                />
              ))}
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

export default GalaxyScene;
