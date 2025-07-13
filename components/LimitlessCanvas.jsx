"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ! COMPONENTS
import { Sun, Moon, SelectiveBloom, Stars } from "@/components";

// ! ZUSTAND
import { useIntroStore } from "@/utils/store.js";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function Scene({ trigger }) {
  const containerRef = useRef(null);
  const limitlessRef = useRef(null);
  const limitlessRefInner = useRef(null);
  const starsRef = useRef(null);
  const { width: w, height: h } = useThree((state) => state.viewport);

  const introTL = useRef(null);
  const st = useRef(null);

  const introFinished = useIntroStore((state) => state.introFinished);
  const setIntroFinished = useIntroStore((state) => state.setIntroFinished);

  // ! INTRO ANIMATION
  useGSAP(
    () => {
      if (!starsRef.current || !limitlessRefInner.current) {
        return;
      }

      introTL.current = gsap.timeline({
        defaults: { ease: "expo.inOut", duration: 2 },
        onComplete: () => setIntroFinished(),
      });

      introTL.current
        .to(starsRef.current.scale, {
          x: 1,
          y: 1,
          z: 1,
        })
        .to(
          limitlessRefInner.current.position,
          {
            y: h * 1.3,
          },
          "<+=1.3"
        );
    },
    {
      scope: containerRef,
      dependencies: [limitlessRefInner],
    }
  );

  // ! SCROLLTRIGGER ANIMATION
  useGSAP(
    () => {
      if (!limitlessRef.current) {
        return;
      }

      if (trigger && introFinished) {
        st.current = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: trigger,
            start: "top top+=35%",
            end: "top top",
            scrub: 0.1,
          },
        });

        st.current.to(limitlessRef.current.position, {
          y: h * 0.5,
        });
      }
    },
    {
      dependencies: [introFinished, limitlessRef, trigger],
    }
  );

  return (
    <group ref={containerRef}>
      <Stars ref={starsRef} scale={5} />
      <SelectiveBloom animateBloom={true} />
      <group ref={limitlessRef}>
        <mesh ref={limitlessRefInner} scale={4} position-y={h * 2}>
          <Sun scale={0.98} position={[0, 0, 0]} />
          <Moon scale={1} position={[0, 0, 0]} />
        </mesh>
      </group>
    </group>
  );
}

export default function LimitlessCanvas({ trigger }) {
  return (
    <div className="fixed top-0 left-0 w-full h-screen -z-10">
      <Canvas
        style={{
          height: "100%",
          width: "100%",
        }}
        gl={{ toneMapping: THREE.NoToneMapping }}
      >
        <PerspectiveCamera makeDefault fov={40} position={[0, 0, 5]} />
        <ambientLight intensity={0.2} />
        <Suspense fallback={null}>
          <Scene trigger={trigger} />
        </Suspense>
      </Canvas>
    </div>
  );
}
