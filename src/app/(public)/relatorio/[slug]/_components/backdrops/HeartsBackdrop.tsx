"use client";

import { useEffect, useRef } from "react";

/**
 * Corações subindo como os "likes" do Instagram: surgem na base, flutuam com
 * leve balanço lateral, giram de leve e desaparecem ao chegar no topo. Cores
 * da marca (lime/emerald) + toques de branco, rosa e amarelo. Canvas +
 * requestAnimationFrame, com fallback para prefers-reduced-motion.
 */
export default function HeartsBackdrop({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const COLORS = ["189,250,60", "34,197,94", "255,255,255", "244,114,182", "253,224,71"];

    let w = 0;
    let h = 0;
    let raf = 0;
    let running = !reduce;
    let last = performance.now();

    type Heart = {
      x: number;
      y: number;
      vy: number;
      size: number;
      sway: number;
      swaySpeed: number;
      phase: number;
      life: number;
      maxLife: number;
      color: string;
      rot: number;
      spin: number;
    };
    let hearts: Heart[] = [];

    function spawn(initial: boolean): Heart {
      const size = 11 + Math.random() * 24;
      return {
        x: Math.random() * w,
        y: initial ? Math.random() * h : h + size,
        vy: 20 + Math.random() * 34,
        size,
        sway: 12 + Math.random() * 34,
        swaySpeed: 0.5 + Math.random() * 0.9,
        phase: Math.random() * Math.PI * 2,
        life: initial ? Math.random() * 3.5 : 0,
        maxLife: 6 + Math.random() * 4.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rot: (Math.random() - 0.5) * 0.5,
        spin: (Math.random() - 0.5) * 0.5,
      };
    }

    function target() {
      return Math.round(Math.min(36, Math.max(14, w / 42)));
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (hearts.length === 0) {
        const n = Math.round(Math.min(26, Math.max(10, w / 60)));
        hearts = Array.from({ length: n }, () => spawn(true));
      }
    }

    function drawHeart(x: number, y: number, s: number, rot: number, color: string, alpha: number) {
      ctx!.save();
      ctx!.translate(x, y);
      ctx!.rotate(rot);
      ctx!.scale(s / 16, s / 16);
      ctx!.beginPath();
      ctx!.moveTo(0, 3.6);
      ctx!.bezierCurveTo(-1.5, 0, -8, -1.6, -8, -7);
      ctx!.bezierCurveTo(-8, -11, -3.6, -12.6, 0, -8.4);
      ctx!.bezierCurveTo(3.6, -12.6, 8, -11, 8, -7);
      ctx!.bezierCurveTo(8, -1.6, 1.5, 0, 0, 3.6);
      ctx!.closePath();
      ctx!.shadowColor = `rgba(${color},${alpha * 0.7})`;
      ctx!.shadowBlur = 14;
      ctx!.fillStyle = `rgba(${color},${alpha})`;
      ctx!.fill();
      ctx!.restore();
    }

    function step(dt: number) {
      ctx!.clearRect(0, 0, w, h);
      for (const ht of hearts) {
        ht.life += dt;
        ht.y -= ht.vy * dt;
        ht.rot += ht.spin * dt;
        ht.phase += ht.swaySpeed * dt;
        const px = ht.x + Math.sin(ht.phase) * ht.sway;
        const t = ht.life / ht.maxLife;
        let alpha = 1;
        if (ht.life < 0.6) alpha = ht.life / 0.6; // pop-in
        if (t > 0.65) alpha *= 1 - (t - 0.65) / 0.35; // fade-out
        alpha = Math.max(0, Math.min(1, alpha)) * 0.85;
        drawHeart(px, ht.y, ht.size, ht.rot, ht.color, alpha);
      }
      hearts = hearts.filter((ht) => ht.life < ht.maxLife && ht.y > -ht.size * 2);
      if (running) {
        while (hearts.length < target()) hearts.push(spawn(false));
      }
    }

    function loop() {
      const now = performance.now();
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      step(dt);
      if (running) raf = requestAnimationFrame(loop);
    }

    resize();
    if (running) {
      last = performance.now();
      raf = requestAnimationFrame(loop);
    } else {
      step(0);
    }

    window.addEventListener("resize", resize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden />;
}
