"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

import { Stars } from "@/components";

function Scene() {
  return <Stars scale={1.5} />;
}

export default function StarsCanvas() {
  return (
    <Canvas
      style={{
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
      }}
      gl={{ toneMapping: THREE.NoToneMapping }}
    >
      <PerspectiveCamera makeDefault fov={40} position={[0, 0, 5]} />
      <ambientLight intensity={0.2} />
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
