"use client";

import { useState, useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const Stars = (props) => {
  const [sphere, setSphere] = useState(null);
  const ref = useRef();

  useEffect(() => {
    setSphere(() =>
      random.inSphere(new Float32Array(12000), {
        radius: props.radius ? props.radius : 6,
      })
    );
    console.log(sphere);
  }, []);

  useFrame((state, delta) => {
    // props.ref.current.rotation.x -= delta / 20;
    ref.current.rotation.y -= delta / 12;
  });

  return (
    <mesh {...props} rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#eed185"
          size={props.orthnographic ? 1 : 0.01}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={props.opacity || 1}
        />
      </Points>
    </mesh>
  );
};

export default Stars;
