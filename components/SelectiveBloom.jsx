"use client";

import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { EffectComposer, RenderPass, UnrealBloomPass } from "three-stdlib";
import * as THREE from "three";
import gsap from "gsap";

const SelectiveBloom = ({ animateBloom }) => {
  const { gl, scene, camera, size } = useThree();
  const composer = useRef();
  const bloomPassRef = useRef();
  const darkMaterial = new THREE.MeshBasicMaterial({ color: "black" });
  const materials = new Map();

  const bloomLayer = new THREE.Layers();
  bloomLayer.set(1); // Only objects on this layer will bloom

  useEffect(() => {
    const _composer = new EffectComposer(gl);
    _composer.addPass(new RenderPass(scene, camera));

    const _bloomPass = new UnrealBloomPass(
      new THREE.Vector2(size.width, size.height),
      1.0, // start strength
      0.0, // start radius
      0.5 // threshold
    );

    bloomPassRef.current = _bloomPass;

    _composer.addPass(_bloomPass);
    composer.current = _composer;

    gl.autoClear = false;

    if (animateBloom) {
      // ✨ Animate bloom properties with GSAP timeline
      const tl = gsap.timeline();
      tl.to(_bloomPass, {
        strength: 1.3,
        radius: 0.9,
        duration: 4, // Same as Sun's scale duration
        ease: "sine.inOut",
      });
      // gsap.to(bloomRef.current, {
      //   strength: 2,
      //   duration: 2,
      //   ease: "sine.inOut",
      // });
    }

    // gsap.to(_bloomPass, {
    //   strength: 2,
    //   duration: 4,
    //   ease: "sine.inOut",
    // });
  }, [gl, scene, camera, size, animateBloom]);

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

export default SelectiveBloom;
