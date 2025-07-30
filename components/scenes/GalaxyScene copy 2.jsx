"use client";

import { useRef, Suspense, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter, usePathname } from "next/navigation";

import { Stars, Sun, Moon, Planet, SelectiveBloom } from "@/components";

// ! ZUSTAND
import { useIntroStore } from "@/utils/store.js";
import { Scroll } from "@react-three/drei";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const GalaxyScene = ({ data, windowSize }) => {
  const { width: w, height: h } = windowSize; // * GET WINDOW WIDTH AND HEIGHT
  const isDesktopLayout = w > h; // * IS DESKTOP LAYOUT?
  const [animateSunBloom, setAnimateSunBloom] = useState(false);
  const [showLimitlessText, setShowLimitlessText] = useState(false);
  const [showPlanetsText, setShowPlanetsText] = useState(false);
  const [hoveringMesh, setHoveringMesh] = useState(false);
  const [activePlanet, setActivePlanet] = useState(0);
  const [pauseAutoRotation, setPauseAutoRotation] = useState(false);
  const [planetIsTransitioning, setPlanetIsTransitioning] = useState(false); // * STATE FOR WHETHER THE PAGE IS IN THE PROCESS  BEING TRANSITIONED FROM/TO A PLANET PAGE
  const [finishedPlanetTransition, setFinishedPlanetTransition] =
    useState(false); // * STATE FOR WHETHER TRANSITION FROM HOME TO PLANET PAGE HAS FINISHED

  const router = useRouter();
  const pathname = usePathname();
  const previousPathname = useRef("");

  const container = useRef(null);
  const scrollRef = useRef(null);
  const galaxyRef = useRef(null);
  const starsRef = useRef(null);
  const sunRef = useRef(null);
  const moonRef = useRef(null);
  const limitlessRef = useRef(null);
  const planetsOrbitRef = useRef(null);
  const planetRefs = useRef([]);
  const dragWrapperRef = useRef(null);

  const { contextSafe } = useGSAP({ scope: container });

  const introFinished = useIntroStore((state) => state.introFinished);
  const setIntroFinished = useIntroStore((state) => state.setIntroFinished);
  const setIntroStarted = useIntroStore((state) => state.setIntroStarted);

  // * PLANET ORBIT VARIABLES
  const orbitRadius = isDesktopLayout ? 2.5 : 1.8;
  const orbitVal = 0.001;
  const planetRad = 0.2;
  const planetSM = planetRad * 0.8;
  const planetMid = planetRad * 0.9;

  // * INTRO ANIMATION VARIABLES
  const tl = useRef(null);
  const noTransitionTL = useRef(null);
  const homeTL = useRef(null);
  const limitlessTL = useRef(null);
  const planetsTL = useRef(null);
  const eventTL = useRef(null);
  // * Home
  const homeLimitlessScale = isDesktopLayout ? 0.7 : 0.75;
  const homeLimitlessEndX = isDesktopLayout ? 2.25 : 0.75;
  const limitlessY = -0.25;
  const activePlanetRotationY = isDesktopLayout
    ? Math.PI * 4 + Math.PI * 0.55 + (Math.PI * 2 * activePlanet) / data.length
    : Math.PI * 4 + Math.PI * 0.62 + (Math.PI * 2 * activePlanet) / data.length;
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
    if (!planetIsTransitioning) {
      setHoveringMesh(true);
      gsap
        .timeline({ defaults: { duration: 2, ease: "power2.out" } })
        .to(planetRefs.current[i].scale, {
          x: 1.1,
          y: 1.1,
          z: 1.1,
        });
    }
  });
  const handlePlanetsLeave = contextSafe((i) => {
    if (!planetIsTransitioning) {
      setHoveringMesh(false);
      gsap
        .timeline({ defaults: { duration: 2, ease: "power2.out" } })
        .to(planetRefs.current[i].scale, {
          x: 1,
          y: 1,
          z: 1,
        });
    }
  });

  // ! DRAG AND PLANETS ORBIT
  // ! DRAG AND PLANETS ORBIT
  // ! DRAG AND PLANETS ORBIT
  useFrame(() => {
    dragAngle.current += dragVelocity.current;
    dragVelocity.current *= 0.9;
    if (dragWrapperRef.current && !pauseAutoRotation) {
      dragWrapperRef.current.rotation.y = dragAngle.current;
    }

    if (planetsOrbitRef.current && !pauseAutoRotation) {
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

  // !SCROLLABLE SECTION
  useGSAP(
    () => {
      if (scrollRef.current) {
        gsap.to(scrollRef.current.position, {
          y: 2,
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "+=" + window.innerHeight * 1.2,
            scrub: 0.1,
          },
        });
      }
    },
    { dependencies: [pathname, scrollRef] }
  );

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
      // * 1. TO HOME PAGE
      if (
        pathname === "/" &&
        previousPathname.current !== "/" &&
        !previousPathname.current.includes("/page/")
      ) {
        console.log("to home");
        toHome();
      }
      // * 2. TO PLANET PAGE
      if (previousPathname.current !== "/" && pathname.includes("/page/")) {
        console.log("to planet page");
        toPlanetPage();
      }
      // * 3. HOME TO PLANET PAGE
      else if (
        previousPathname.current === "/" &&
        pathname.includes("/page/")
      ) {
        console.log("home to planet page");
        homeToPlanet();
      } // * 4. PLANET PAGE TO HOME PAGE
      else if (
        previousPathname.current.includes("/page/") &&
        pathname === "/"
      ) {
        console.log("home to planet page");
        planetToHome();
      }
      // * NORMAL PAGES WITHOUT TRANSITIONS
      else {
        console.log("else");
        toNoTransition(true);
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

  const toNoTransition = (animate) => {
    tl.current = gsap.timeline({
      defaults: { duration: 1.2, ease: "expo.inOut" },
      onStart: () => {
        setPauseAutoRotation(animate ? true : false);
        setShowLimitlessText(false);
        setShowPlanetsText(false);
      },
      onComplete: () => animate && transitionComplete(),
    });

    tl.current
      .set(starsRef.current.scale, { x: 5, y: 5, z: 5 })
      .set(limitlessRef.current.scale, { x: 1, y: 1, z: 1 })
      .set(limitlessRef.current.position, { x: 0, y: limitlessY, z: 0 })
      .set(sunRef.current.position, { x: 0, y: 0.3, z: 0 })
      .set(moonRef.current.position, {
        x: homeLimitlessEndX,
        y: 0,
        z: 0,
      })
      .set(moonRef.current.scale, {
        x: homeLimitlessScale,
        y: homeLimitlessScale,
        z: homeLimitlessScale,
      })
      .set(sunRef.current.scale, { x: 0, y: 0, z: 0 })
      .set(planetsOrbitRef.current.scale, { x: 3, y: 3, z: 3 })
      .set(planetsOrbitRef.current.position, { x: 0, y: -1, z: 0 })
      .set(planetsOrbitRef.current.rotation, { x: 0, y: 0, z: 0 });

    if (animate) {
      tl.current.to(starsRef.current.scale, {
        x: 1,
        y: 1,
        z: 1,
      });
    }
  };

  // ! TRANSITION ANIMATION 1: TO HOME (FOR MOVING TO HOME FROM UNKNOWN/NOT LIMITLESS OR PLANET PAGE)
  const toHome = contextSafe(() => {
    toNoTransition();

    setTimeout(() => {
      tl.current = gsap.timeline({
        defaults: { duration: 1.2, ease: "expo.inOut" },
        onStart: () => {
          setPauseAutoRotation(false);
        },
        onComplete: () => {
          transitionComplete();
        },
      });

      tl.current
        .to(sunRef.current.scale, {
          x: homeLimitlessScale * 0.5,
          y: homeLimitlessScale * 0.5,
          z: homeLimitlessScale * 0.5,
          duration: 2,
        })
        .to(sunRef.current.position, {
          x: homeLimitlessEndX,
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
        .to(
          starsRef.current.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 3,
            onComplete: () => setPauseAutoRotation(false),
          },
          "<+=0.2"
        )
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
    }, 500);
  });

  // ! TRANSITION ANIMATION 2: TO PLANET PAGE (FOR MOVING FROM UNKNOWN TO PLANET PAGE)
  const toPlanetPage = contextSafe(() => {
    toNoTransition();

    setTimeout(() => {
      tl.current = gsap.timeline({
        defaults: { duration: 1.2, ease: "expo.inOut" },
        onStart: () => {
          setPauseAutoRotation(true);
          setFinishedPlanetTransition(false);
        },
        onComplete: () => {
          setTimeout(() => {
            homeToPlanet();
          }, 1000);
        },
      });

      tl.current
        .to(sunRef.current.scale, {
          x: homeLimitlessScale * 0.5,
          y: homeLimitlessScale * 0.5,
          z: homeLimitlessScale * 0.5,
          duration: 2,
        })
        .to(sunRef.current.position, {
          x: homeLimitlessEndX,
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
              setShowLimitlessText(true);
              setTimeout(() => setShowPlanetsText(true), 500);
            },
          },
          "<+=0.3"
        );
    }, 500);
  });

  // ! TRANSITION ANIMATION 3: HOME TO PLANET ANIMATION
  const homeToPlanet = contextSafe(() => {
    tl.current = gsap.timeline({
      defaults: { ease: "expo.inOut" },
      onStart: () => {
        setPauseAutoRotation(true);
        setPlanetIsTransitioning(true);
        setFinishedPlanetTransition(false);
      },
      onComplete: () => {
        setFinishedPlanetTransition(true); // Make active planet's dot larger and fadeout other planets
        transitionComplete();
      },
    });

    // Hide the Limitless group
    tl.current.to(limitlessRef.current.scale, {
      x: 0,
      y: 0,
      z: 0,
      duration: 0.5,
    });

    // Rotate the orbit group to focus on the selected planet
    tl.current.to(
      planetsOrbitRef.current.rotation,
      {
        x: -Math.PI * 0.12,
        y: activePlanetRotationY,
        duration: 2.5,
      },
      "<+=0.2"
    );

    // Move orbit group upward slightly (gives nice depth)
    tl.current.to(
      planetsOrbitRef.current.position,
      {
        y: w > h ? 0 : -1.3,
        duration: 2.5,
      },
      "<"
    );

    // Scale up the active planet
    tl.current.to(
      planetRefs.current[activePlanet].scale,
      {
        x: 6,
        y: 6,
        z: 6,
        duration: 2,
      },
      "<+=0.6"
    );
  });

  // console.log(planetRefs.current[activePlanet]);
  // ! TRANSITION ANIMATION 4: PLANET PAGE TO HOME ANIMATION
  const planetToHome = contextSafe(() => {
    tl.current = gsap.timeline({
      defaults: { ease: "expo.inOut" },
      onStart: () => {
        setIntroStarted();
        setFinishedPlanetTransition(false);
      },
      onComplete: () => {
        setPauseAutoRotation(false);
        setPlanetIsTransitioning(false);
        transitionComplete();
      },
    });

    // Shrink the active planet back to original size
    tl.current.to(planetRefs.current[activePlanet].scale, {
      x: w > h ? 1 : 1.25,
      y: w > h ? 1 : 1.25,
      z: w > h ? 1 : 1.25,
      duration: 2,
    });

    // Rotate orbit group back to home rotation
    tl.current.to(
      planetsOrbitRef.current.rotation,
      {
        x: 0,
        y: 0,
        duration: 2.5,
      },
      "<+=0.3"
    );

    // Reset orbit position
    tl.current.to(
      planetsOrbitRef.current.position,
      {
        y: 0,
        duration: 2.5,
      },
      "<"
    );

    // Show Limitless group again
    tl.current.to(
      limitlessRef.current.scale,
      {
        x: 1,
        y: 1,
        z: 1,
        duration: 1,
      },
      "<+=0.5"
    );
  });

  return (
    <group ref={container}>
      <SelectiveBloom animateBloom={animateSunBloom} />
      <group ref={galaxyRef} scale={w > h ? 2.5 : 2}>
        <Stars ref={starsRef} scale={5} />

        <group ref={scrollRef}>
          <group ref={limitlessRef} position={[0, limitlessY, 0]}>
            <Sun ref={sunRef} scale={0} position-y={0.3} />
            <Moon
              ref={moonRef}
              scale={homeLimitlessScale}
              position-x={homeLimitlessEndX}
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
                    makeLargeDots={
                      finishedPlanetTransition && i === activePlanet
                    }
                    hide={finishedPlanetTransition && i !== activePlanet}
                  />
                ))}
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

export default GalaxyScene;
