"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import { Line, Trail } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const PulseConnection = ({ start, end, end2, i }) => {
  const [trailLength, setTrailLength] = useState(1);
  const containerRef = useRef();
  const pulseRef = useRef();
  const tlRef = useRef();

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        tlRef.current = gsap.timeline({
          repeat: -1,
          repeatDelay: i * Math.random() * 3,
          duration: 3,
          yoyo: true,
          ease: "expo.inOut",
          delay: i * Math.random() * 3,
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
      <Trail width={0.5} color={"grey"} length={trailLength} decay={0.1}>
        <mesh ref={pulseRef} scale={1} position={start}>
          <sphereGeometry args={[0.01, 32, 32]} />
          <meshStandardMaterial
            emissive="white"
            emissiveIntensity={4}
            color={"grey"}
            transparent
            opacity={0.7}
          />
        </mesh>
      </Trail>
    </group>
  );
};

const VisualConnection = ({
  i,
  orbitRadius,
  orbitVal,
  lastPlanet = 7,
  show,
}) => {
  const [showConnections, setShowConnections] = useState(false);
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

  useEffect(() => {
    if (show) {
      setShowConnections(true);
    } else {
      setShowConnections(false);
    }
  }, [show]);

  return (
    showConnections && (
      <PulseConnection start={start} end={end} end2={end2} i={i} />
    )
  );
};
export default VisualConnection;
