"use client";

import { Suspense, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ! COMPONENTS
import { Sun, Moon, SelectiveBloom, Stars } from "@/components";

// ! ZUSTAND
import { useIntroAnimationStore } from "@/utils/store.js";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function Scene({ trigger }) {
  const containerRef = useRef(null);
  const limitlessRef = useRef(null);
  const limitlessRefInner = useRef(null);
  const starsRef = useRef(null);
  const { width: w, height: h } = useThree((state) => state.viewport);

  const introTL = useRef(null);
  const st = useRef(null);

  const completedIntroAnimation = useIntroAnimationStore(
    (state) => state.completed
  );
  const setIntroAnimationAsCompleted = useIntroAnimationStore(
    (state) => state.setIntroAnimationAsCompleted
  );

  // ! INTRO ANIMATION
  useGSAP(
    () => {
      if (!starsRef.current || !limitlessRef.current) {
        return;
      }

      introTL.current = gsap.timeline({
        defaults: { ease: "expo.inOut", duration: 2 },
        onComplete: () => setIntroAnimationAsCompleted(),
      });

      introTL.current
        .from(starsRef.current.scale, {
          x: 5,
          y: 5,
          z: 5,
        })
        .from(
          limitlessRef.current.position,
          {
            y: h * 2,
          },
          "<+=1.3"
        );
    },
    {
      scope: containerRef,
      dependencies: [limitlessRef],
    }
  );

  // ! SCROLLTRIGGER ANIMATION
  useGSAP(
    () => {
      if (!limitlessRefInner.current) {
        return;
      }

      if (trigger && completedIntroAnimation) {
        st.current = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: trigger,
            start: "top top+=35%",
            end: "top top",
            scrub: 0.1,
          },
        });

        st.current.to(limitlessRefInner.current.position, {
          y: h * 0.1,
        });
      }
    },
    {
      dependencies: [completedIntroAnimation, limitlessRefInner, trigger],
    }
  );

  return (
    <group ref={containerRef}>
      <Stars ref={starsRef} />
      <SelectiveBloom animateBloom={true} />
      <mesh ref={limitlessRef} scale={4} position-y={h * 1.3}>
        <mesh ref={limitlessRefInner}>
          <Sun scale={0.98} position={[0, 0, 0]} />
          <Moon scale={1} position={[0, 0, 0]} />
        </mesh>
      </mesh>
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
