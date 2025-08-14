"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";

import { Planet } from "@/components";

function SphereScene() {
  return (
    <mesh>
      <Planet radius={1.8} />
    </mesh>
  );
}

export default function SphereImage({ size = 300 }) {
  const canvasRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Grab WebGL canvas content as image
    const glCanvas = canvasRef.current.querySelector("canvas");
    if (glCanvas) {
      const dataUrl = glCanvas.toDataURL("image/png");
      setImgSrc(dataUrl);
    }
  }, []);

  return (
    <div>
      {!imgSrc && (
        <div
          className="bg-amber-400"
          style={{
            width: size,
            height: size,
          }}
        >
          <Canvas ref={canvasRef} camera={{ position: [0, 0, 3] }}>
            <SphereScene />
          </Canvas>
        </div>
      )}
      {imgSrc && <img src={imgSrc} width={size} height={size} alt="Sphere" />}
    </div>
  );
}
