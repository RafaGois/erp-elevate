"use client";

import { useRef, useEffect } from "react";
import { DotGothic16, Press_Start_2P } from "next/font/google";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { ELEVATE_WHATSAPP_URL } from "@/lib/data/contact-links";
import "./cta.css";

/* ─── Fonts ──────────────────────────────────────────────────── */
const fontDisplay = DotGothic16({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-cta-display",
  display: "swap",
});

const fontPixel = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-cta-pixel",
  display: "swap",
});

/* ─── Fragment data ──────────────────────────────────────────── */
type Frag = {
  left: string;
  top: string;
  size: number;
  clipPath: string;
  color: string;
  opacity: number;
  rotate: number;
};

const FRAGS: Frag[] = [
  { left: "7%",  top: "22%", size: 40, clipPath: "polygon(50% 0%,100% 100%,0% 100%)", color: "#dfff00",              opacity: 0.65, rotate: 15  },
  { left: "88%", top: "14%", size: 28, clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)",  color: "#22c55e",          opacity: 0.55, rotate: 45  },
  { left: "82%", top: "74%", size: 36, clipPath: "circle(50%)",                            color: "#dfff00",          opacity: 0.45, rotate: 0   },
  { left: "11%", top: "68%", size: 32, clipPath: "polygon(50% 0%,100% 50%,50% 100%,0% 50%)", color: "#22c55e",       opacity: 0.50, rotate: 20  },
  { left: "49%", top: "5%",  size: 22, clipPath: "polygon(50% 0%,100% 100%,0% 100%)",     color: "#dfff00",          opacity: 0.40, rotate: -10 },
  { left: "1%",  top: "44%", size: 18, clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)",  color: "rgba(223,255,0,.6)", opacity: 0.50, rotate: 30 },
  { left: "95%", top: "46%", size: 24, clipPath: "circle(50%)",                            color: "#22c55e",          opacity: 0.40, rotate: 0   },
  { left: "27%", top: "8%",  size: 16, clipPath: "polygon(50% 0%,100% 50%,50% 100%,0% 50%)", color: "rgba(34,197,94,.7)", opacity: 0.50, rotate: 0  },
  { left: "72%", top: "87%", size: 30, clipPath: "polygon(50% 0%,100% 100%,0% 100%)",     color: "#dfff00",          opacity: 0.55, rotate: 180 },
  { left: "40%", top: "90%", size: 18, clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)",  color: "#22c55e",          opacity: 0.40, rotate: 22  },
  { left: "60%", top: "91%", size: 14, clipPath: "circle(50%)",                            color: "#dfff00",          opacity: 0.35, rotate: 0   },
  { left: "18%", top: "11%", size: 14, clipPath: "circle(50%)",                            color: "rgba(34,197,94,.6)", opacity: 0.45, rotate: 0  },
  { left: "92%", top: "83%", size: 22, clipPath: "polygon(50% 0%,100% 50%,50% 100%,0% 50%)", color: "rgba(223,255,0,.5)", opacity: 0.40, rotate: 45 },
  { left: "4%",  top: "78%", size: 17, clipPath: "polygon(50% 0%,100% 100%,0% 100%)",     color: "#22c55e",          opacity: 0.50, rotate: 210 },
  { left: "76%", top: "34%", size: 12, clipPath: "circle(50%)",                            color: "#dfff00",          opacity: 0.35, rotate: 0   },
  { left: "22%", top: "54%", size: 13, clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)",  color: "rgba(34,197,94,.5)", opacity: 0.30, rotate: 15 },
  { left: "58%", top: "3%",  size: 10, clipPath: "polygon(50% 0%,100% 50%,50% 100%,0% 50%)", color: "#dfff00",       opacity: 0.50, rotate: 0   },
  { left: "35%", top: "84%", size: 10, clipPath: "circle(50%)",                            color: "#22c55e",          opacity: 0.35, rotate: 0   },
  { left: "64%", top: "18%", size: 20, clipPath: "polygon(50% 0%,100% 100%,0% 100%)",     color: "rgba(223,255,0,.5)", opacity: 0.42, rotate: -30 },
  { left: "33%", top: "35%", size: 10, clipPath: "circle(50%)",                            color: "#dfff00",          opacity: 0.30, rotate: 0   },
];

/* ─── Sonar ring data ────────────────────────────────────────── */
const SONAR_CX = 50;
const SONAR_CY = 50;

/* ─── Component ──────────────────────────────────────────────── */
export default function CallToAction() {
  const sectionRef  = useRef<HTMLElement>(null);
  const videoRef    = useRef<HTMLVideoElement>(null);
  const gateRef     = useRef<HTMLDivElement>(null);
  const fragsRef    = useRef<HTMLDivElement>(null);

  /* ── Lazy-play video only when in view ──────────────────── */
  useEffect(() => {
    const video   = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 },
    );

    io.observe(section);
    return () => io.disconnect();
  }, []);

  /* ── Morph Gate entrance animation ──────────────────────── */
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const gate    = gateRef.current;
      const frags   = fragsRef.current?.querySelectorAll("[data-cta-frag]");
      const reveals = sectionRef.current?.querySelectorAll("[data-cta-reveal]");

      if (!gate) return;

      /* --- initial states --- */
      gsap.set(gate, { clipPath: "circle(0% at 50% 50%)" });
      if (reveals?.length) gsap.set(reveals, { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          toggleActions: "play none none none",
        },
      });

      /* 1 ── Fragment burst → implode (storm effect) */
      if (frags?.length) {
        tl.to(
          frags,
          {
            scale: 1.55,
            opacity: (i, el) => Math.min(Number((el as HTMLElement).style.opacity) * 1.8, 1),
            duration: 0.28,
            stagger: { from: "random", amount: 0.18 },
            ease: "power2.out",
          },
          0,
        ).to(
          frags,
          {
            scale: 0,
            opacity: 0,
            duration: 0.55,
            stagger: { from: "random", amount: 0.22 },
            ease: "power3.in",
          },
          0.25,
        );
      }

      /* 2 ── Gate portal opens (clip-path circle expands) */
      tl.to(
        gate,
        {
          clipPath: "circle(160% at 50% 50%)",
          duration: 1.15,
          ease: "power3.inOut",
        },
        0,
      );

      /* 3 ── Content reveals stagger */
      if (reveals?.length) {
        tl.to(
          reveals,
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.65,
            ease: "power3.out",
          },
          0.55,
        );
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="cta"
      className={`cta ${fontDisplay.variable} ${fontPixel.variable}`}
      aria-labelledby="cta-title"
    >
      {/* ── Video background ─────────────────────────────────── */}
      <video
        ref={videoRef}
        className="cta__video"
        src="/videofundo3.mp4"
        muted
        loop
        playsInline
        preload="none"
        aria-hidden
      />

      {/* ── Atmosphere ───────────────────────────────────────── */}
      <div className="cta__scrim"     aria-hidden />
      <div className="cta__scanlines" aria-hidden />
      <div className="cta__grid"      aria-hidden />

      {/* ── Fragments (above scrim, below gate) ──────────────── */}
      <div ref={fragsRef} className="cta__frags" aria-hidden>
        {FRAGS.map((f, i) => (
          <div
            key={i}
            data-cta-frag
            style={{
              position: "absolute",
              left: f.left,
              top: f.top,
              width: f.size,
              height: f.size,
              background: f.color,
              clipPath: f.clipPath,
              opacity: f.opacity,
              rotate: `${f.rotate}deg`,
              willChange: "transform, opacity",
            }}
          />
        ))}
      </div>

      {/* ── Gate (clip-path portal) ───────────────────────────── */}
      <div ref={gateRef} className="cta__gate">

        {/* sonar rings SVG */}
        <svg
          className="cta__sonar"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          {[0, 1, 2].map((i) => (
            <circle
              key={i}
              className="cta__sonar-ring"
              cx={SONAR_CX}
              cy={SONAR_CY}
              r="0"
            />
          ))}
        </svg>

        {/* content */}
        <div className="cta__inner">

          <p className="cta__kicker" data-cta-reveal>
            // próximo passo
          </p>

          <h2 id="cta-title" className="cta__title" data-cta-reveal>
            <span className="cta__title-l1">Pronto para elevar</span>
            <span className="cta__title-l2">sua operação?</span>
          </h2>

          <hr className="cta__rule" data-cta-reveal aria-hidden />

          <p className="cta__subtitle" data-cta-reveal>
            A solução do seu problema está a um clique de distância… Vamos
            construir juntos.
          </p>

          <div className="cta__actions" data-cta-reveal>
            <a
              href={ELEVATE_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta__btn-primary"
            >
              <MessageCircle
                style={{ width: "0.85rem", height: "0.85rem" }}
                strokeWidth={2}
                aria-hidden
              />
              Falar com a equipe
            </a>

            <Link href="#services" className="cta__btn-secondary">
              Ver o que fazemos
              <ArrowRight
                style={{ width: "0.75rem", height: "0.75rem" }}
                strokeWidth={2}
                aria-hidden
              />
            </Link>
          </div>

          <p className="cta__tag" data-cta-reveal aria-hidden>
            <span className="cta__tag-dot" />
            Resposta em até 24h · sem compromisso
          </p>

        </div>
      </div>
    </section>
  );
}
