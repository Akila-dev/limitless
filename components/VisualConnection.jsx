"use client";

import { Line } from "@react-three/drei";
import * as THREE from "three";
import { useMemo } from "react";

const toV3 = (p) => (p && p.isVector3 ? p.clone() : new THREE.Vector3(...p));

const CurvedConnection = ({ start, end, arc = 0.5 }) => {
  const points = useMemo(() => {
    const a = toV3(start);
    const b = toV3(end);
    const mid = a.clone().add(b).multiplyScalar(0.5);
    mid.x += arc;
    const curve = new THREE.CatmullRomCurve3([a, mid, b]);
    return curve.getPoints(64); // OK now – all Vector3s
  }, [start, end, arc]);

  return <Line points={points} lineWidth={1.5} color="aqua" />;
};

const VisualConnection = ({ start, end, i }) => {
  return <CurvedConnection start={start} end={end} arc={0.1} />;
};
export default VisualConnection;
