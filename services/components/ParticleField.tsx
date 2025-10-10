"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Particle = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
};

function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function ParticleField() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [bounds, setBounds] = useState({ w: 0, h: 0 });
  const [mounted, setMounted] = useState(false);

  const particles = useMemo<Particle[]>(() => {
    const count = 18;
    const list: Particle[] = [];
    for (let i = 0; i < count; i++) {
      list.push({
        id: i,
        x: random(0, typeof window !== "undefined" ? window.innerWidth : 1200),
        y: random(0, typeof window !== "undefined" ? window.innerHeight : 800),
        vx: random(-0.3, 0.3),
        vy: random(-0.3, 0.3),
        size: random(6, 14),
      });
    }
    return list;
  }, []);

  useEffect(() => {
    setMounted(true);
    function handleMove(e: MouseEvent) {
      setCursor({ x: e.clientX, y: e.clientY });
    }
    function handleResize() {
      setBounds({ w: window.innerWidth, h: window.innerHeight });
    }
    handleResize();
    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    let raf = 0;
    const friction = 0.995;
    const speedCap = 0.9;
    const repelRadius = 160;
    const repelStrength = 1200; // larger -> stronger repulsion

    function step() {
      for (const p of particles) {
        // Repel from cursor
        const dx = p.x - cursor.x;
        const dy = p.y - cursor.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < repelRadius * repelRadius && distSq > 0.001) {
          const dist = Math.sqrt(distSq);
          const force = repelStrength / (distSq + 100);
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Gentle pull back towards center to avoid drift
        const cx = (bounds.w || window.innerWidth) / 2;
        const cy = (bounds.h || window.innerHeight) / 2;
        p.vx += (cx - p.x) * 0.00002;
        p.vy += (cy - p.y) * 0.00002;

        // Integrate
        p.vx = Math.max(-speedCap, Math.min(speedCap, p.vx * friction));
        p.vy = Math.max(-speedCap, Math.min(speedCap, p.vy * friction));
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        const W = bounds.w || window.innerWidth;
        const H = bounds.h || window.innerHeight;
        if (p.x < -50) p.x = W + 50;
        if (p.x > W + 50) p.x = -50;
        if (p.y < -50) p.y = H + 50;
        if (p.y > H + 50) p.y = -50;
      }

      // Paint via transforms
      if (containerRef.current) {
        const children = containerRef.current.children;
        for (let i = 0; i < children.length; i++) {
          const el = children[i] as HTMLElement;
          const p = particles[i];
          if (p) {
            el.style.transform = `translate(${p.x}px, ${p.y}px)`;
          }
        }
      }

      raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [particles, cursor.x, cursor.y, bounds.w, bounds.h]);

  if (!mounted) return null;

  return (
    <div aria-hidden ref={containerRef} className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: p.size,
            height: p.size,
            background:
              "radial-gradient(circle, rgba(167,139,250,0.9) 0%, rgba(139,92,246,0.35) 50%, rgba(124,58,237,0.0) 70%)",
            filter: "blur(1px)",
            boxShadow: "0 0 24px rgba(139,92,246,0.35)",
          }}
        />
      ))}
    </div>
  );
}