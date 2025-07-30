"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";

import { GalaxyScene, IntroAnimationWrapper } from "@/components";

export default function GalaxySceneCanvasWrapper({ data, children }) {
  const [windowSize, setWindowSize] = useState({
    width: null,
    height: null,
  });

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 150); // Debounce delay
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="w-full h-screen fixed top-0 left-0 overflow-x-hidden">
        <Canvas
          style={{ background: "black", height: "100vh", width: "100vw" }}
          gl={{ toneMapping: THREE.NoToneMapping }}
          onCreated={({ gl, scene, raycaster }) => {
            raycaster.params.Points.threshold = 0.05; // smaller = more precise
          }}
        >
          <PerspectiveCamera makeDefault fov={40} position={[-4, 4.5, 10]} />
          {/* <PerspectiveCamera makeDefault fov={40} position={[-4, 4.5, 5]} /> */}
          {/* <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={250} /> */}
          <fog attach="fog" args={["#000000", 15, 20]} />

          <ambientLight intensity={0.2} />
          <Suspense fallback={null}>
            <GalaxyScene data={data} windowSize={windowSize} />
          </Suspense>
          {/* <Environment files="/env3.jpg" /> */}
          <OrbitControls enabled={false} />
          {/* <OrbitControls /> */}
        </Canvas>
      </div>

      <IntroAnimationWrapper>{children}</IntroAnimationWrapper>
    </>
  );
}
