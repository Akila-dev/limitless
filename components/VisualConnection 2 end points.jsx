"use client";

import { useMemo, useRef } from "react";
import { Line, Trail } from "@react-three/drei";
import * as THREE from "three";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const PulseConnection = ({ start, end, end2, i }) => {
  const containerRef = useRef();
  const pulseRef = useRef();
  const tlRef = useRef();

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        tlRef.current = gsap.timeline({
          repeat: -1,
          repeatDelay: i * Math.random() * 2,
          duration: 2,
          yoyo: true,
          ease: "power2.inOut",
          delay: i * Math.random() * 2,
        });

        tlRef.current
          .to(pulseRef.current.position, {
            x: end[0],
            y: end[1],
            z: end[2],
          })
          .to(pulseRef.current.position, {
            x: end2[0],
            y: end2[1],
            z: end2[2],
          });
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef }
  );

  return (
    <group ref={containerRef}>
      <Trail width={0.5} color={"grey"} length={10} decay={0.1}>
        <mesh ref={pulseRef} scale={0.005} position={start}>
          <sphereGeometry />
          <meshBasicMaterial color={"grey"} />
        </mesh>
      </Trail>
    </group>
  );
};

const VisualConnection = ({ i, orbitRadius, orbitVal, lastPlanet }) => {
  const start = [
    Math.cos(orbitVal + Math.PI * 0.25 * i) * orbitRadius,
    0,
    Math.sin(orbitVal + Math.PI * 0.25 * i) * orbitRadius,
  ];
  const end =
    i === lastPlanet
      ? [
          Math.cos(orbitVal + Math.PI * 0.25 * 0) * orbitRadius,
          0,

          Math.sin(orbitVal + Math.PI * 0.25 * 0) * orbitRadius,
        ]
      : [
          Math.cos(orbitVal + Math.PI * 0.25 * (i + 1)) * orbitRadius,
          0,

          Math.sin(orbitVal + Math.PI * 0.25 * (i + 1)) * orbitRadius,
        ];
  const end2 =
    i + 4 <= lastPlanet
      ? [
          Math.cos(orbitVal + Math.PI * 0.25 * (i + 4)) * orbitRadius,
          0,

          Math.sin(orbitVal + Math.PI * 0.25 * (i + 4)) * orbitRadius,
        ]
      : [
          Math.cos(orbitVal + Math.PI * 0.25 * (i + 4 - lastPlanet)) *
            orbitRadius,
          0,

          Math.sin(orbitVal + Math.PI * 0.25 * (i + 4 - lastPlanet)) *
            orbitRadius,
        ];

  return <PulseConnection start={start} end={end} end2={end2} i={i} />;
};
export default VisualConnection;
