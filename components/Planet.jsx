import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Text, Billboard } from "@react-three/drei";
import * as THREE from "three";

export default function Planet(props) {
  const sphereRef = useRef();
  const light_color = "#e0e0ef";

  const count = 1000;
  const radius = 0.25;
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

  useFrame((state, delta) => {
    sphereRef.current.rotation.x -= delta / 20;
    sphereRef.current.rotation.y -= delta / 12;
  });

  return (
    <mesh {...props}>
      <Points ref={sphereRef} positions={points} stride={3}>
        <PointMaterial
          color={light_color}
          size={0.02}
          sizeAttenuation
          depthWrite={false}
          transparent
        />
      </Points>
      <Billboard
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false} // Lock the rotation on the z axis (default=false)
      >
        <Text
          color={light_color}
          anchorX="center"
          anchorY="middle"
          fontSize={0.06}
          position={[0, -radius * 1.3, 0]}
          // rotation={[Math.PI / 1, Math.PI / 0.5, 0]}
          // font={"/fonts/satoshi.otf"}
        >
          {props.label}
        </Text>
      </Billboard>
    </mesh>
  );
}
