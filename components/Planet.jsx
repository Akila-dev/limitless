"use client";

import { useMemo, useRef, useEffect } from "react";
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
  const sphereMaterialRef1 = useRef();
  const sphereMaterialRef2 = useRef();
  const textRef = useRef();
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

  // ! * HIDE OTHER PLANET WHEN IN A PLANET'S PAGE
  useEffect(() => {
    if (props.hide) {
      const tl = gsap.timeline({
        defaults: { duration: 1, ease: "power2.out" },
      });

      tl.to(sphereMaterialRef1.current, {
        opacity: 0,
      }).to(
        sphereMaterialRef2.current,
        {
          opacity: 0,
        },
        "<"
      );
      if (textRef && textRef.current) {
        tl.to(
          textRef.current.scale,
          {
            x: 0,
            y: 0,
            z: 0,
          },
          "<"
        );
      }
    } else {
      const tl = gsap.timeline();

      tl.set(sphereMaterialRef1.current.material, {
        opacity: 0.9,
      }).set(sphereMaterialRef2.current.material, {
        opacity: 1,
      });
      if (textRef && textRef.current) {
        tl.set(textRef.current.scale, {
          x: 1,
          y: 1,
          z: 1,
        });
      }
    }
  }, [props.hide]);

  // ! PLANET WHEN TRANSITIONED TO LARGE DOTS (WHEN IN THE PLANET'S PAGE)
  useEffect(() => {
    if (props.makeLargeDots) {
      const tl = gsap.timeline({
        defaults: { duration: 1, ease: "power2.out" },
      });

      tl.to(sphereMaterialRef1.current, {
        size: 0.08,
      }).to(
        sphereMaterialRef2.current,
        {
          size: 0.05,
        },
        "<"
      );
      if (textRef && textRef.current) {
        tl.to(
          textRef.current.scale,
          {
            x: 0,
            y: 0,
            z: 0,
          },
          "<"
        );
      }
    } else {
      const tl = gsap.timeline();

      tl.set(sphereMaterialRef1.current, {
        size: 0.04,
      }).set(sphereMaterialRef2.current, {
        size: 0.02,
      });
      if (textRef && textRef.current) {
        tl.set(textRef.current.scale, {
          x: 1,
          y: 1,
          z: 1,
        });
      }
    }
  }, [props.makeLargeDots]);

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
            ref={sphereMaterialRef1}
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
            ref={sphereMaterialRef2}
            color={light_color}
            size={props.largeDots ? 0.05 : 0.02}
            sizeAttenuation
            depthWrite={false}
            transparent
            opacity={1}
          />
        </Points>
      </mesh>
      {props.label && (
        // <mesh ref={textRef}>
        <mesh>
          <BillboardText
            text={props.label ? props.label.toUpperCase() : ""}
            color={light_color}
            fontSize={0.06}
            position={[0, -radius * 1.3, 0]}
            showText={props.showText && !props.hide && !props.makeLargeDots}
          />
        </mesh>
      )}
    </mesh>
  );
}
