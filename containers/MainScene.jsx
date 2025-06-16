"use client";

import React, { useEffect, useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  OrthographicCamera,
  Environment,
} from "@react-three/drei";
import { EffectComposer, RenderPass, UnrealBloomPass } from "three-stdlib";
import * as THREE from "three";

import { SceneWrapper } from "@/components";

const SelectiveBloom = () => {
  const { gl, scene, camera, size } = useThree();
  const composer = useRef();
  const darkMaterial = new THREE.MeshBasicMaterial({ color: "black" });
  const materials = new Map();

  const bloomLayer = new THREE.Layers();
  bloomLayer.set(1); // Only objects on this layer will bloom

  useEffect(() => {
    const _composer = new EffectComposer(gl);
    _composer.addPass(new RenderPass(scene, camera));
    _composer.addPass(
      new UnrealBloomPass(
        new THREE.Vector2(size.width, size.height),
        1.5, // strength
        0, // radius
        0 // threshold
      )
    );
    composer.current = _composer;

    gl.autoClear = false;
  }, [gl, scene, camera, size]);

  useFrame(() => {
    if (!composer.current) return;

    // 1. DARKEN non-bloomed objects
    scene.traverse((obj) => {
      if (obj.isMesh && !bloomLayer.test(obj.layers)) {
        materials.set(obj.uuid, obj.material);
        obj.material = darkMaterial;
      }
    });

    // 2. Render BLOOM layer only
    camera.layers.set(1);
    composer.current.render();

    // 3. Restore materials
    scene.traverse((obj) => {
      if (materials.has(obj.uuid)) {
        obj.material = materials.get(obj.uuid);
        materials.delete(obj.uuid);
      }
    });

    // 4. Render full scene
    camera.layers.set(0);
    gl.clearDepth(); // Important: clear depth before next render
    gl.render(scene, camera);
  }, 1);

  return null;
};

export default function MainScene() {
  return (
    <Canvas
      camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 5] }}
      style={{ background: "black", height: "100vh", width: "100vw" }}
      gl={{ toneMapping: THREE.NoToneMapping }}
    >
      <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={250} />
      <ambientLight intensity={0.2} />
      <SceneWrapper />
      <Environment preset="studio" />
      <SelectiveBloom />
      <OrbitControls />
    </Canvas>
  );
}
