"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { BillboardText } from "@/components";

gsap.registerPlugin(useGSAP);

export default function Planet(props) {
  const sphereContainerRef = useRef();
  const sphereRef1 = useRef();
  const sphereRef2 = useRef();
  const light_color = "#ffffff";

  const count = 1000;
  const radius = props.radius || 2.35;
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      positions.set([x, y, z], i * 3);
    }
    return positions;
  }, [count, radius]);

  useGSAP(
    () => {
      const sphScale1 = 0.95;
      const sphScale2 = 0.95;
      const sphDuration1 = 2;
      const sphDuration2 = sphDuration1 * 1.5;
      gsap.to(sphereRef1.current.scale, {
        duration: sphDuration1,
        x: sphScale1,
        y: sphScale1,
        z: sphScale1,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
      gsap.to(sphereRef2.current.scale, {
        duration: sphDuration2,
        x: sphScale2,
        y: sphScale2,
        z: sphScale2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    },
    { scope: sphereContainerRef }
  );

  useFrame((state, delta) => {
    sphereRef1.current.rotation.x -= delta / 20;
    sphereRef1.current.rotation.y -= delta / 12;
    sphereRef2.current.rotation.x += delta / 10;
    sphereRef2.current.rotation.y += delta / 12;
  });

  return (
    <mesh {...props}>
      <mesh ref={sphereContainerRef}>
        <Points ref={sphereRef1} positions={points} stride={3}>
          <PointMaterial
            color={light_color}
            size={props.largeDots ? 0.08 : 0.04}
            sizeAttenuation
            depthWrite={false}
            transparent
            opacity={0.9}
          />
        </Points>
        <Points ref={sphereRef2} positions={points} stride={3}>
          <PointMaterial
            color={light_color}
            size={props.largeDots ? 0.05 : 0.02}
            sizeAttenuation
            depthWrite={false}
            transparent
          />
        </Points>
      </mesh>
      <BillboardText
        text={props.label}
        color={light_color}
        fontSize={0.06}
        position={[0, -radius * 1.3, 0]}
        showText={props.showText}
      />
    </mesh>
  );
}
