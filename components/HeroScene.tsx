"use client";

import { Float, Line, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const nodePositions: [number, number, number][] = [
  [-2.15, 1.18, -0.35],
  [-1.55, -1.18, 0.28],
  [-0.78, 1.72, -0.75],
  [-0.25, -1.72, -0.18],
  [0.72, 1.66, 0.18],
  [1.32, -1.16, -0.55],
  [2.08, 0.58, 0.12],
  [1.78, -0.28, -1.08],
  [-1.82, 0.05, -1.02],
  [0.12, 0.18, 1.18],
];

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}

function LiquidGlassCore({ isMobile, animate }: { isMobile: boolean; animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const film = useRef<THREE.Mesh>(null);
  const ribbonOne = useRef<THREE.Mesh>(null);
  const ribbonTwo = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!animate) return;

    const time = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y += delta * 0.12;
      group.current.rotation.x = Math.sin(time * 0.22) * 0.08;
      group.current.rotation.z = Math.cos(time * 0.16) * 0.035;
    }
    if (core.current) {
      core.current.scale.setScalar(1 + Math.sin(time * 1.4) * 0.025);
    }
    if (film.current) {
      film.current.rotation.y -= delta * 0.08;
      film.current.rotation.z += delta * 0.045;
    }
    if (ribbonOne.current) ribbonOne.current.rotation.z += delta * 0.16;
    if (ribbonTwo.current) ribbonTwo.current.rotation.z -= delta * 0.11;
  });

  const connections = useMemo(
    () => [
      [nodePositions[0], nodePositions[2]],
      [nodePositions[0], nodePositions[8]],
      [nodePositions[1], nodePositions[3]],
      [nodePositions[1], nodePositions[8]],
      [nodePositions[2], nodePositions[4]],
      [nodePositions[3], nodePositions[5]],
      [nodePositions[4], nodePositions[6]],
      [nodePositions[5], nodePositions[6]],
      [nodePositions[6], nodePositions[7]],
      [nodePositions[7], nodePositions[9]],
      [nodePositions[8], nodePositions[9]],
      [nodePositions[4], nodePositions[9]],
      [nodePositions[3], nodePositions[9]],
    ] as [[number, number, number], [number, number, number]][],
    [],
  );
  const coreDetail = isMobile ? 3 : 5;
  const filmDetail = isMobile ? 2 : 3;
  const nodeSegments = isMobile ? 16 : 28;
  const torusSegments = isMobile ? 112 : 180;

  return (
    <group ref={group}>
      <Float speed={1.1} rotationIntensity={0.18} floatIntensity={0.24}>
        <mesh ref={core}>
          <icosahedronGeometry args={[1.05, coreDetail]} />
          <meshPhysicalMaterial
            color="#dff7ff"
            emissive="#60a5fa"
            emissiveIntensity={0.46}
            roughness={0.02}
            metalness={0.04}
            transparent
            opacity={0.48}
            transmission={0.72}
            thickness={1.35}
            ior={1.42}
            clearcoat={1}
            clearcoatRoughness={0.04}
          />
        </mesh>

        <mesh ref={film} scale={[1.23, 1.23, 1.23]} rotation={[0.44, 0.1, 0.28]}>
          <icosahedronGeometry args={[1, filmDetail]} />
          <meshPhysicalMaterial
            color="#93c5fd"
            emissive="#22d3ee"
            emissiveIntensity={0.28}
            roughness={0.08}
            metalness={0.02}
            transparent
            opacity={0.18}
            transmission={0.58}
            thickness={0.65}
            wireframe
          />
        </mesh>

        <mesh ref={ribbonOne} scale={[1.7, 1.7, 1.7]} rotation={[0.84, -0.24, 0.58]}>
          <torusGeometry args={[1, 0.013, 10, torusSegments]} />
          <meshPhysicalMaterial color="#e0f2fe" emissive="#60a5fa" emissiveIntensity={0.7} transparent opacity={0.46} roughness={0.05} />
        </mesh>
        <mesh ref={ribbonTwo} scale={[2.03, 2.03, 2.03]} rotation={[-0.45, 0.62, -0.25]}>
          <torusGeometry args={[1, 0.008, 8, torusSegments]} />
          <meshPhysicalMaterial color="#a7f3d0" emissive="#22d3ee" emissiveIntensity={0.54} transparent opacity={0.3} roughness={0.08} />
        </mesh>
      </Float>

      {connections.map((points, index) => (
        <Line
          key={index}
          points={points}
          color={index % 2 === 0 ? "#bfdbfe" : "#67e8f9"}
          lineWidth={0.78}
          transparent
          opacity={0.28}
        />
      ))}

      {nodePositions.map((position, index) => (
        <Float key={index} speed={1 + (index % 3) * 0.2} floatIntensity={0.28}>
          <mesh position={position}>
            <sphereGeometry args={[index % 3 === 0 ? 0.108 : 0.078, nodeSegments, nodeSegments]} />
            <meshPhysicalMaterial
              color={index % 2 === 0 ? "#e0f2fe" : "#a7f3d0"}
              emissive={index % 2 === 0 ? "#60a5fa" : "#22d3ee"}
              emissiveIntensity={1.8}
              roughness={0.02}
              metalness={0.02}
              transparent
              opacity={0.82}
              transmission={0.34}
              thickness={0.4}
              clearcoat={1}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function HeroScene({ active = true }: { active?: boolean }) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const animate = active && !reduceMotion;
  const particleCount = isMobile ? 38 : 95;
  const sparkleSpeed = animate ? 0.16 : 0;

  return (
    <div className="hero-canvas" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 42 }}
        dpr={isMobile ? [0.75, 1] : [1, 1.5]}
        frameloop={animate ? "always" : "demand"}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={1.05} />
        <pointLight position={[3.2, 3.4, 4]} intensity={24} color="#dbeafe" />
        <pointLight position={[-4, -2.2, 3]} intensity={18} color="#22d3ee" />
        <pointLight position={[0, -3.5, 5]} intensity={10} color="#8b5cf6" />
        <LiquidGlassCore isMobile={isMobile} animate={animate} />
        <Sparkles count={particleCount} scale={7.2} size={1.25} speed={sparkleSpeed} color="#dff7ff" opacity={0.32} />
      </Canvas>
    </div>
  );
}
