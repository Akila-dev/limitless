"use client";

import { Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

import { Planet } from "@/components";

function Scene({ direction }) {
  const { width: w, height: h } = useThree((state) => state.viewport);

  return (
    <Planet
      radius={w > h ? 2 : 2.35}
      scale={w > h ? 1 : 0.8}
      largeDots
      position={
        direction === "right"
          ? [w > h ? 0.5 : 1.25, w > h ? 0.8 : 0.2, 0]
          : direction === "left"
            ? [window.innerWidth >= 1024 ? -0.75 : -1.15, 0, -0.55]
            : [0, 0, -1]
      }
    />
  );
}

export default function PlanetCanvas({ direction }) {
  return (
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
        <Scene direction={direction} />
      </Suspense>
    </Canvas>
  );
}
