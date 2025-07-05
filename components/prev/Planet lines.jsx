import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

import { BillboardText } from "@/components";

export default function Planet(props) {
  const groupRef = useRef(); // Shared rotation
  const light_color = "#ffffff";

  const count = 800;
  const radius = props.radius;

  const { points, linePositions } = useMemo(() => {
    const points = new Float32Array(count * 3);
    const lines = new Float32Array(count * 2 * 3); // 2 vertices per line

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      points.set([x, y, z], i * 3);
      lines.set([0, 0, 0, x, y, z], i * 6);
    }

    return { points, linePositions: lines };
  }, [count, radius]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += delta / 20;
      groupRef.current.rotation.y += delta / 15;
    }
  });

  return (
    <mesh {...props}>
      <group ref={groupRef}>
        {/* Lines from center to each point */}
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              array={linePositions}
              count={linePositions.length / 3}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color={light_color} transparent opacity={0.1} />
        </lineSegments>

        {/* Points layer 1 */}
        <Points positions={points} stride={3}>
          <PointMaterial
            color={light_color}
            size={0.04}
            sizeAttenuation
            depthWrite={false}
            transparent
            opacity={0.9}
          />
        </Points>

        {/* Points layer 2 */}
        <Points positions={points} stride={3}>
          <PointMaterial
            color={light_color}
            size={0.02}
            sizeAttenuation
            depthWrite={false}
            transparent
            opacity={0.5}
          />
        </Points>
      </group>

      {/* Floating label */}
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
