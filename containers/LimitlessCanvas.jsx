"use client";

import Image from "next/image";
import { useRef, useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  ScrollControls,
  Scroll,
} from "@react-three/drei";
import * as THREE from "three";

import { Stars, Sun, Moon, SelectiveBloom, Text4R3F } from "@/components";

import logo from "@/assets/images/limitless_letters.png";
import metaverse_bg from "@/assets/images/metaverse-x.png";

function SceneWrapper() {
  const limitlessScale = 1;

  return (
    <ScrollControls pages={2} damping={0.1}>
      <SelectiveBloom animateBloom={true} />
      <Stars scale={2.5} />
      <Scroll>
        <group position={[0, 10, 0]} scale={8.5}>
          <Sun scale={limitlessScale * 0.95} />
          <Moon scale={limitlessScale} showText={false} />
        </group>
      </Scroll>
      <Scroll html>
        {/* DOM contents in here will scroll along */}
        <div className="absolute top-0 left-0 w-screen h-[50vh] flex-center">
          <div className="h-1.5 md:h-2">
            <Image
              src={logo}
              alt="Limitless"
              width={450}
              height={70}
              className="object-contain h-full w-auto"
            />
          </div>
        </div>
        <div className="absolute top-[35vh] w-screen h-[65vh] md:h-[60vh] flex-center container-x">
          <div className="max-w">
            <Text4R3F
              paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent bland"
              center
            />
          </div>
        </div>
        <div className="absolute top-[90vh] md:top-[80vh] w-screen h-screen">
          <Image
            src={metaverse_bg}
            alt="Metaverse"
            width={"auto"}
            height={"auto"}
            className="object-cover w-full h-[70vh] lg:h-auto"
          />
        </div>
      </Scroll>
    </ScrollControls>
  );
}

export default function LimitlessCanvas() {
  const [isMobile, setIsMobile] = useState();

  const handleResize = () => {
    setIsMobile(window.innerWidth < window.innerHeight);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Canvas
      style={{ background: "black", height: "100vh", width: "100vw" }}
      gl={{ toneMapping: THREE.NoToneMapping }}
    >
      {isMobile ? (
        <PerspectiveCamera makeDefault fov={40} position={[-6, 5.5, 15]} />
      ) : (
        <PerspectiveCamera makeDefault fov={40} position={[-4, 4.5, 10]} />
      )}
      <fog attach="fog" args={["#000000", 15, 20]} />

      <ambientLight intensity={0.2} />
      <Suspense fallback={null}>
        <SceneWrapper />
      </Suspense>
      <Environment files="/env3.jpg" />
      <OrbitControls enabled={false} />
      {/* <OrbitControls /> */}
    </Canvas>
  );
}
