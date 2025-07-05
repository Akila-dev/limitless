"use client";

import Image from "next/image";
import { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  OrthographicCamera,
  Environment,
  ScrollControls,
  Scroll,
} from "@react-three/drei";
import * as THREE from "three";

import { Stars, Text4R3F, ForumBlock, BulletList, Planet } from "@/components";

import { think_tank } from "@/page_data";

function SceneWrapper({ page_data, isMobile }) {
  const { width: w, height: h } = useThree((state) => state.viewport);

  return (
    <ScrollControls pages={5.8} damping={0.1}>
      <Stars scale={4} orthnographic radius={1} />
      <Scroll>
        {/* SECTION 1 PLANET */}
        <Planet
          radius={1}
          position={[w / 4, h / 4, 0]}
          orthnographic
          scale={(w / h) * 0.9}
        />
        {/* SECTION 2 PLANET */}
        <Planet
          radius={1}
          position={[-w / 2.25, -h * 1.15, 0]}
          orthnographic
          scale={(w / h) * 0.8}
        />
        {/* SECTION 3 PLANET */}

        <Planet
          radius={1}
          position={[0, -h * 2.65, 0]}
          orthnographic
          scale={(w / h) * 0.9}
        />
        {/* SECTION 5 PLANET */}
        <Planet
          radius={1}
          position={[-w / 2.5, -h * 4.8, 0]}
          orthnographic
          scale={(w / h) * 0.9}
        />
      </Scroll>
      <Scroll html>
        {/* SECTION 1 */}
        <div className="absolute top-[50vh] left-0 w-screen grid-2 container-x">
          <div>
            <Text4R3F
              title={page_data.hero.heading}
              paragraph={page_data.hero.subheading}
            />
          </div>
        </div>
        {/* SECTION 2 */}
        <div className="absolute top-[115vh] left-0 w-screen h-screen grid-2 container-x">
          <div></div>
          <div className="h-screen flex-center flex-col">
            <Text4R3F
              title={page_data.forum_section.heading}
              paragraph={page_data.forum_section.description}
            />
            <ForumBlock data={page_data.forum_section.events} />
          </div>
        </div>
        {/* SECTION 3 */}
        <div className="absolute top-[265vh] left-0 w-screen h-screen container-x flex-center">
          <div className="max-w-2">
            <Text4R3F paragraph={page_data.quoteSection.text} center />
          </div>
        </div>
        {/* SECTION 4 */}
        <div className="absolute top-[385vh] left-0 w-screen container-x h-screen flex-center">
          <div className="grid-2-v2">
            <div>
              <Text4R3F
                title={page_data.bulletSection.heading}
                paragraph={page_data.bulletSection.description}
              />
            </div>
            <div className="">
              <BulletList data={page_data.bulletSection.bullets_list} />
            </div>
          </div>
        </div>
        {/* SECTION 5 */}
        <div className="absolute top-[480vh] left-0 w-screen h-screen grid-2-v2 container-x">
          <div></div>
          <div className="h-screen flex-center flex-col">
            <Text4R3F
              title={page_data.footerSection.heading}
              paragraph={page_data.footerSection.description}
              buttons={page_data.footerSection.buttons}
            />
          </div>
        </div>
      </Scroll>
    </ScrollControls>
  );
}

export default function PageCanvas() {
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
      style={{ height: "100vh", width: "100vw" }}
      gl={{ toneMapping: THREE.NoToneMapping }}
    >
      <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={250} />

      <fog attach="fog" args={["#000000", 15, 20]} />

      <ambientLight intensity={0.2} />
      <Suspense fallback={null}>
        <SceneWrapper page_data={think_tank} isMobile={isMobile} />
      </Suspense>
      <Environment files="/env3.jpg" />
      <OrbitControls enabled={false} />
      {/* <OrbitControls /> */}
    </Canvas>
  );
}
