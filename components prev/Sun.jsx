"use client";

import { useEffect } from "react";

const Sun = (props) => {
  useEffect(() => {
    props.ref.current.layers.set(1); // Assign this mesh to bloom layer
  }, []);

  return (
    <mesh {...props}>
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
  );
};

export default Sun;
