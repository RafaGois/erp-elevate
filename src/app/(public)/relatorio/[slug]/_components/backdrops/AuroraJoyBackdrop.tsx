"use client";

import { useEffect, useRef } from "react";

/**
 * Fundo "aurora de conquista": um brilho quente e sonhador (aurora em lima/
 * esmeralda com toques dourados) com orbes de luz (bokeh) subindo devagar —
 * a sensação de olhar para trás e ver um ótimo mês. O movimento ascendente
 * remete a crescimento/resultado e o calor das luzes a felicidade, fugindo do
 * visual de "rede tech". Canvas + requestAnimationFrame, com fallback estático
 * para prefers-reduced-motion.
 */
export default function AuroraJoyBackdrop({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Paleta: lima/esmeralda (marca) + dourado/rosa para calor e alegria.
    const PALETTE = [
      "189,250,60", // lima
      "52,211,153", // esmeralda
      "189,250,60",
      "250,204,21", // dourado
      "244,114,182", // rosa suave
      "255,255,255", // branco (cintilância)
    ];
    const AURORA = [
      { c: "189,250,60", fx: 0.07, fy: 0.05, px: 0.3, py: 0.0 },
      { c: "52,211,153", fx: 0.05, fy: 0.08, px: 0.72, py: 0.55 },
      { c: "250,204,21", fx: 0.09, fy: 0.06, px: 0.5, py: 1.05 },
    ];

    let w = 0;
    let h = 0;
    let raf = 0;
    let running = !reduce;
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    type Orb = {
      x: number;
      y: number;
      r: number;
      a: number;
      vy: number;
      sway: number;
      swayF: number;
      phase: number;
      twF: number;
      depth: number;
      color: string;
    };
    type Spark = { x: number; y: number; r: number; phase: number; speed: number };
    let orbs: Orb[] = [];
    let sparks: Spark[] = [];

    function rand(min: number, max: number) {
      return min + Math.random() * (max - min);
    }

    function seed() {
      const count = Math.round(Math.min(46, Math.max(18, (w * h) / 32000)));
      orbs = Array.from({ length: count }, () => {
        const depth = rand(0.3, 1); // mais perto = maior/mais rápido
        return {
          x: rand(0, w),
          y: rand(0, h),
          r: rand(6, 16) + depth * 34,
          a: rand(0.05, 0.16) * (0.6 + depth * 0.7),
          vy: (rand(0.12, 0.4) + depth * 0.35),
          sway: rand(10, 46),
          swayF: rand(0.15, 0.5),
          phase: rand(0, Math.PI * 2),
          twF: rand(0.4, 1.2),
          depth,
          color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        };
      });

      const sCount = Math.round(Math.min(22, Math.max(8, (w * h) / 70000)));
      sparks = Array.from({ length: sCount }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        r: rand(0.8, 1.8),
        phase: rand(0, Math.PI * 2),
        speed: rand(0.6, 1.8),
      }));
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function drawAurora(t: number) {
      ctx!.globalCompositeOperation = "lighter";
      for (const b of AURORA) {
        const cx = (b.px + Math.sin(t * b.fx + b.py * 6) * 0.12) * w;
        const cy = (b.py + Math.cos(t * b.fy + b.px * 6) * 0.1) * h;
        const rad = Math.max(w, h) * (0.42 + Math.sin(t * 0.12 + b.px) * 0.05);
        const pulse = 0.1 + (Math.sin(t * 0.2 + b.py * 3) * 0.5 + 0.5) * 0.07;
        const grad = ctx!.createRadialGradient(cx, cy, 0, cx, cy, rad);
        grad.addColorStop(0, `rgba(${b.c},${pulse})`);
        grad.addColorStop(0.55, `rgba(${b.c},${pulse * 0.32})`);
        grad.addColorStop(1, `rgba(${b.c},0)`);
        ctx!.fillStyle = grad;
        ctx!.fillRect(0, 0, w, h);
      }
      ctx!.globalCompositeOperation = "source-over";
    }

    function drawOrb(o: Orb, t: number, px: number, py: number) {
      const tw = 0.7 + (Math.sin(t * o.twF + o.phase) * 0.5 + 0.5) * 0.3;
      const x = o.x + Math.sin(t * o.swayF + o.phase) * o.sway + px * o.depth * 26;
      const y = o.y + py * o.depth * 18;
      const alpha = o.a * tw;
      const grad = ctx!.createRadialGradient(x, y, 0, x, y, o.r);
      grad.addColorStop(0, `rgba(${o.color},${alpha})`);
      grad.addColorStop(0.4, `rgba(${o.color},${alpha * 0.5})`);
      grad.addColorStop(1, `rgba(${o.color},0)`);
      ctx!.fillStyle = grad;
      ctx!.beginPath();
      ctx!.arc(x, y, o.r, 0, Math.PI * 2);
      ctx!.fill();

      // núcleo luminoso
      ctx!.fillStyle = `rgba(255,255,255,${alpha * 0.5})`;
      ctx!.beginPath();
      ctx!.arc(x, y, Math.max(1, o.r * 0.12), 0, Math.PI * 2);
      ctx!.fill();
    }

    function drawSpark(s: Spark, t: number) {
      const tw = Math.sin(t * s.speed + s.phase) * 0.5 + 0.5;
      if (tw < 0.05) return;
      const a = tw * 0.9;
      const len = s.r * (2.5 + tw * 2.5);
      ctx!.strokeStyle = `rgba(255,255,255,${a})`;
      ctx!.lineWidth = s.r * 0.6;
      ctx!.beginPath();
      ctx!.moveTo(s.x - len, s.y);
      ctx!.lineTo(s.x + len, s.y);
      ctx!.moveTo(s.x, s.y - len);
      ctx!.lineTo(s.x, s.y + len);
      ctx!.stroke();
    }

    function frame(t: number) {
      ctx!.clearRect(0, 0, w, h);

      // parallax suave do ponteiro
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      const px = (pointer.x - 0.5) * 2;
      const py = (pointer.y - 0.5) * 2;

      drawAurora(t);

      for (const o of orbs) {
        if (running) {
          o.y -= o.vy;
          if (o.y < -o.r - 20) {
            o.y = h + o.r + rand(10, 80);
            o.x = rand(0, w);
          }
        }
        drawOrb(o, t, px, py);
      }

      for (const s of sparks) drawSpark(s, t);
    }

    function loop() {
      frame(performance.now() / 1000);
      if (running) raf = requestAnimationFrame(loop);
    }

    resize();
    if (running) raf = requestAnimationFrame(loop);
    else frame(2.2);

    const onMove = (e: PointerEvent) => {
      const rect = canvas!.getBoundingClientRect();
      pointer.tx = (e.clientX - rect.left) / Math.max(1, rect.width);
      pointer.ty = (e.clientY - rect.top) / Math.max(1, rect.height);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden />;
}
