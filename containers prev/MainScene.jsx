"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";

import { SceneWrapper } from "@/components";

export default function MainScene() {
  return (
    <Canvas
      style={{ background: "black", height: "100vh", width: "100vw" }}
      gl={{ toneMapping: THREE.NoToneMapping }}
    >
      <PerspectiveCamera makeDefault fov={40} position={[-4, 4.5, 10]} />
      {/* <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={250} /> */}
      <fog attach="fog" args={["#000000", 15, 20]} />

      <ambientLight intensity={0.2} />
      <SceneWrapper />
      <Environment files="/env3.jpg" />
      {/* <OrbitControls enabled={false} /> */}
      <OrbitControls />
    </Canvas>
  );
}
