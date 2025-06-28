"use client";

import { BillboardText } from "@/components";

const Moon = (props) => {
  return (
    <mesh {...props}>
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#000000" // deep black with a hint of tone
          metalness={1} // full metal
          roughness={0.85} // slight roughness = reflectivity with softness
          envMapIntensity={1} // boost reflection visibility (needs environment map)
          toneMapped={true}
        />
      </mesh>
      <BillboardText
        text="LIMITLESS"
        position={[-0.3, 0, 1]}
        fontSize={0.17}
        showText={props.showText}
      />
    </mesh>
  );
};

export default Moon;
