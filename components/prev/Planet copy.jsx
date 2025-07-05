import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import * as THREE from "three";

const Planet = (props) => {
  const [pos, setPos] = useState(new Float32Array());

  useEffect(() => {
    const num_particles = 100;
    var distance = 0.5;
    const radius = 1.0;
    var particlesArray = [];
    for (let i = 0; i < num_particles; i++) {
      var theta = THREE.MathUtils.randFloatSpread(360);
      var phi = THREE.MathUtils.randFloatSpread(360);

      particlesArray.push(distance * Math.sin(theta) * Math.sin(phi));
      particlesArray.push(distance * Math.sin(theta) * Math.cos(phi));
      particlesArray.push(distance * Math.cos(theta));
    }
    setPos(() => new Float32Array(particlesArray));
  }, []);

  useFrame((state, delta) => {
    props.ref.current.rotation.x -= delta / 20;
    props.ref.current.rotation.y -= delta / 12;
  });

  return (
    <points {...props}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          count={pos.length / 3}
          array={pos}
          itemSize={3}
          normalize={false}
        />
      </bufferGeometry>
      <pointsMaterial
        transparent
        color="red"
        // map={grayTexture}
        // opacity={active ? 1 : 0.2}
        size={0.1}
        sizeAttenuation={true}
        depthWrite={false}
        // roughness={0.1}
        // metalness={1}
      />
    </points>
  );
};

export default Planet;
