'use client';

import { useEffect, useRef } from 'react';

const STAR_COUNT = 150;
const CURSOR_RADIUS = 110;
const LERP_FACTOR = 0.06;

interface Star {
  x: number;
  y: number;
  originX: number;
  originY: number;
  radius: number;
  baseOpacity: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  vx: number;
  vy: number;
}

interface Burst {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  decay: number;
}

function makeStar(w: number, h: number): Star {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    originX: 0,
    originY: 0,
    radius: 0.5 + Math.random() * 1.2,
    baseOpacity: 0.08 + Math.random() * 0.07,
    opacity: 0,
    twinkleSpeed: 0.003 + Math.random() * 0.008,
    twinkleOffset: Math.random() * Math.PI * 2,
    vx: 0,
    vy: 0,
  };
}

export function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    let rafId: number;
    let frame = 0;

    const mouse = { x: -9999, y: -9999 };
    const bursts: Burst[] = [];

    // Build stars
    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => {
      const s = makeStar(w, h);
      s.originX = s.x;
      s.originY = s.y;
      s.opacity = s.baseOpacity;
      return s;
    });

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w;
      canvas!.height = h;
      // Redistribute stars proportionally
      for (const s of stars) {
        s.x = Math.random() * w;
        s.y = Math.random() * h;
        s.originX = s.x;
        s.originY = s.y;
        s.vx = 0;
        s.vy = 0;
      }
    }

    function spawnBurst(cx: number, cy: number) {
      const count = 10 + Math.floor(Math.random() * 6);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 3;
        bursts.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 0.8 + Math.random() * 1.4,
          opacity: 0.9 + Math.random() * 0.1,
          decay: 0.018 + Math.random() * 0.014,
        });
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      frame++;

      for (const s of stars) {
        const dx = mouse.x - s.x;
        const dy = mouse.y - s.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CURSOR_RADIUS) {
          const force = (CURSOR_RADIUS - dist) / CURSOR_RADIUS;
          s.vx -= (dx / dist) * force * 0.8;
          s.vy -= (dy / dist) * force * 0.8;
        }

        // Lerp back to origin
        s.vx += (s.originX - s.x) * LERP_FACTOR;
        s.vy += (s.originY - s.y) * LERP_FACTOR;

        // Dampen
        s.vx *= 0.82;
        s.vy *= 0.82;

        s.x += s.vx;
        s.y += s.vy;

        // Twinkle
        const twinkle = Math.sin(frame * s.twinkleSpeed + s.twinkleOffset);
        s.opacity = s.baseOpacity + twinkle * s.baseOpacity * 0.5;

        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255,255,255,${s.opacity.toFixed(3)})`;
        ctx!.fill();
      }

      // Draw bursts
      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i];
        b.x += b.vx;
        b.y += b.vy;
        b.vx *= 0.96;
        b.vy *= 0.96;
        b.opacity -= b.decay;

        if (b.opacity <= 0) {
          bursts.splice(i, 1);
          continue;
        }

        ctx!.beginPath();
        ctx!.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255,255,255,${b.opacity.toFixed(3)})`;
        ctx!.fill();
      }

      rafId = requestAnimationFrame(draw);
    }

    function onMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    function onMouseLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    function onClick(e: MouseEvent) {
      spawnBurst(e.clientX, e.clientY);
    }

    resize();
    canvas.width = w;
    canvas.height = h;
    rafId = requestAnimationFrame(draw);

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
