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
          roughness={0.95}
          // envMapIntensity={1}
          toneMapped={true}
        />
      </mesh>
      <BillboardText
        text="LIMITLESS"
        position={[props.mobile ? -0.1 : -0.3, 0, 1]}
        fontSize={0.17}
        showText={props.showText}
      />
    </mesh>
  );
};

export default Moon;
