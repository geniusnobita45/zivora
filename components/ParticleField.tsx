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
  glowColor: string;
  opacityLow: number;
  opacityHigh: number;
  driftX: number;
  driftY: number;
  type: "star" | "drift";
}

const COLORS = [
  [180, 200, 255],  // bright periwinkle
  [200, 180, 255],  // bright lavender
  [140, 230, 235],  // bright seafoam
  [240, 190, 250],  // bright rose
  [255, 240, 180],  // bright warm gold
  [255, 255, 255],  // pure white stars
];

function generateParticles(count: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const isDrift = Math.random() > 0.65; // 35% drift, 65% twinkling stars
    const [r, g, b] = COLORS[Math.floor(Math.random() * COLORS.length)];
    const opacityHigh = isDrift ? (0.35 + Math.random() * 0.45) : (0.45 + Math.random() * 0.45);
    const opacityLow = isDrift ? 0 : (opacityHigh * 0.15);

    particles.push({
      id: i,
      x: Math.random() * 100,
      y: isDrift ? (60 + Math.random() * 50) : Math.random() * 100,
      // Increased sizes: stars (3px to 8px), drift (4px to 10px)
      size: isDrift ? (4.0 + Math.random() * 6.0) : (3.0 + Math.random() * 5.0),
      duration: isDrift ? (20 + Math.random() * 25) : (3.0 + Math.random() * 6),
      delay: isDrift ? -(Math.random() * 35) : -(Math.random() * 8),
      color: `rgba(${r}, ${g}, ${b}, ${opacityHigh.toFixed(2)})`,
      glowColor: `rgba(${r}, ${g}, ${b}, ${(opacityHigh * 0.5).toFixed(2)})`,
      opacityLow,
      opacityHigh,
      driftX: -60 + Math.random() * 120,
      driftY: -(120 + Math.random() * 140),
      type: isDrift ? "drift" : "star",
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
    const count = mobileQuery.matches ? 30 : 65; // Slightly reduced count to avoid cluttering with larger star sizes
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
          className={p.type === "star" ? "particle-star" : "particle-drift"}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.glowColor}, 0 0 ${p.size * 6}px ${p.glowColor}`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            "--o-lo": `${p.opacityLow}`,
            "--o-hi": `${p.opacityHigh}`,
            "--dx": `${p.driftX}px`,
            "--dy": `${p.driftY}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
