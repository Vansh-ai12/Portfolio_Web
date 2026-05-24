"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Points, PointMaterial, Stars } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

function ParticleField() {
  const positions = useMemo(() => {
    const values = new Float32Array(900);
    for (let i = 0; i < values.length; i += 3) {
      values[i] = (Math.random() - 0.5) * 8;
      values[i + 1] = (Math.random() - 0.5) * 5;
      values[i + 2] = (Math.random() - 0.5) * 7;
    }
    return values;
  }, []);

  return (
    <Points positions={positions} stride={3} frustumCulled>
      <PointMaterial transparent color="#67e8f9" size={0.018} sizeAttenuation depthWrite={false} opacity={0.72} />
    </Points>
  );
}

function CoreObject() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    group.current.rotation.x = clock.elapsedTime * 0.18 + pointer.y * 0.2;
    group.current.rotation.y = clock.elapsedTime * 0.25 + pointer.x * 0.3;
  });

  return (
    <group ref={group}>
      <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.7}>
        <mesh>
          <icosahedronGeometry args={[1.15, 4]} />
          <MeshDistortMaterial color="#22d3ee" emissive="#0e7490" roughness={0.18} metalness={0.7} distort={0.25} speed={1.4} />
        </mesh>
      </Float>
      <mesh rotation={[0.7, 0.4, 0.1]}>
        <torusGeometry args={[1.75, 0.012, 16, 160]} />
        <meshBasicMaterial color="#d946ef" transparent opacity={0.9} />
      </mesh>
      <mesh rotation={[1.2, -0.45, 1.7]}>
        <torusGeometry args={[2.05, 0.01, 16, 160]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.75} />
      </mesh>
    </group>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5.2], fov: 48 }} dpr={[1, 1.7]} gl={{ antialias: true, powerPreference: "high-performance" }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.55} />
          <pointLight position={[4, 3, 4]} intensity={2.4} color="#67e8f9" />
          <pointLight position={[-4, -2, 3]} intensity={1.6} color="#e879f9" />
          <Stars radius={40} depth={18} count={900} factor={3} saturation={0} fade speed={0.4} />
          <ParticleField />
          <CoreObject />
        </Suspense>
      </Canvas>
    </div>
  );
}
