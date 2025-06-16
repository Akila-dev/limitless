"use client";

import { useState, useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const Stars = (props) => {
  const [sphere, setSphere] = useState(null);

  useEffect(() => {
    setSphere(() => random.inSphere(new Float32Array(3600), { radius: 9 }));
    console.log(sphere);
  }, []);

  useFrame((state, delta) => {
    // props.ref.current.rotation.x -= delta / 20;
    props.ref.current.rotation.y -= delta / 12;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={props.ref}
        positions={sphere}
        stride={3}
        frustumCulled
        {...props}
      >
        <PointMaterial
          transparent
          color="#eed185"
          size={1.5}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export default Stars;
