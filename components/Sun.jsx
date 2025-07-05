"use client";

import { useEffect, useRef } from "react";

const Sun = (props) => {
  const ref = useRef();
  useEffect(() => {
    ref.current.layers.set(1); // Assign this mesh to bloom layer
  }, []);

  return (
    <mesh {...props}>
      <mesh ref={ref}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="white"
          emissive="white"
          emissiveIntensity={50}
          toneMapped={false}
          transparent={true}
          opacity={1}
        />
      </mesh>
    </mesh>
  );
};

export default Sun;
