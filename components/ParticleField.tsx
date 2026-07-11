"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  opacity: number;
  drift: number;
}

const COLORS = [
  "rgba(103, 232, 249, VAR)",  // cyan
  "rgba(96, 165, 250, VAR)",   // blue
  "rgba(167, 139, 250, VAR)",  // violet
  "rgba(167, 243, 208, VAR)",  // mint
  "rgba(240, 171, 252, VAR)",  // rose
  "rgba(253, 230, 138, VAR)",  // gold
];

function generateParticles(count: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const opacity = 0.15 + Math.random() * 0.35;
    const colorTemplate = COLORS[Math.floor(Math.random() * COLORS.length)];
    particles.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1.5 + Math.random() * 3.5,
      duration: 14 + Math.random() * 22,
      delay: -(Math.random() * 30),
      color: colorTemplate.replace("VAR", String(opacity)),
      opacity,
      drift: -30 + Math.random() * 60,
    });
  }
  return particles;
}

export default function ParticleField() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      setVisible(false);
      return;
    }

    const mobileQuery = window.matchMedia("(max-width: 560px)");
    const count = mobileQuery.matches ? 20 : 50;
    setParticles(generateParticles(count));

    const handleMotionChange = (e: MediaQueryListEvent) => setVisible(!e.matches);
    motionQuery.addEventListener("change", handleMotionChange);
    return () => motionQuery.removeEventListener("change", handleMotionChange);
  }, []);

  if (!visible || particles.length === 0) return null;

  return (
    <div className="particle-field" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            ["--drift" as string]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
