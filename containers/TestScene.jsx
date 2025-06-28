"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function Eclipse() {
  const sunRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Step 1: Sun moves from left to center
    tl.to(sunRef.current.position, {
      x: 0,
      duration: 1.5,
      ease: "power2.inOut",
    });

    // Step 2: Sun scales up behind moon
    tl.to(sunRef.current.scale, {
      x: 0.3,
      y: 0.3,
      z: 0.3,
      duration: 1.5,
      ease: "power2.inOut",
    });
  }, []);

  return (
    <>
      {/* Sun: starts small left, moves behind moon and scales up */}
      <mesh
        ref={sunRef}
        position={[-1.2, 0, -0.01]} // behind moon
        scale={[0.15, 0.15, 0.15]}
      >
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color="white" />
      </mesh>

      {/* Moon: large, centered, in front */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.3, 64, 64]} />
        <meshStandardMaterial color="black" roughness={1} />
      </mesh>

      {/* Bloom = sun's corona glow behind moon */}
      <EffectComposer>
        <Bloom
          intensity={3}
          radius={0.6}
          luminanceThreshold={0}
          luminanceSmoothing={0.9}
        />
      </EffectComposer>
    </>
  );
}

export default function EclipseScene() {
  return (
    <div className="w-screen h-screen bg-black">
      <Canvas camera={{ position: [0, 0, 2], fov: 50 }}>
        <ambientLight intensity={0.2} />
        <Eclipse />
      </Canvas>
    </div>
  );
}
