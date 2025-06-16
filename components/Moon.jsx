"use client";

const Moon = (props) => {
  return (
    <mesh {...props}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color="#000000" // deep black with a hint of tone
        metalness={1} // full metal
        roughness={0.85} // slight roughness = reflectivity with softness
        envMapIntensity={1} // boost reflection visibility (needs environment map)
        toneMapped={true}
      />
    </mesh>
  );
};

export default Moon;
