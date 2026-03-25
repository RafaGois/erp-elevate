"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import type { CtaBlockData } from "@/lib/types/budget-content";
import EditableField from "./EditableField";

interface Props {
  data: CtaBlockData;
  isAdmin?: boolean;
  onChange?: (d: CtaBlockData) => void;
}

export default function CtaBlock({ data, isAdmin = false, onChange }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaBtnRef = useRef<HTMLAnchorElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const clickWrapRef = useRef<HTMLDivElement>(null);
  const clickRingRef = useRef<HTMLDivElement>(null);
  const clickLabelRef = useRef<HTMLDivElement>(null);

  function set<K extends keyof CtaBlockData>(key: K, value: CtaBlockData[K]) {
    onChange?.({ ...data, [key]: value });
  }

  useGSAP(
    () => {
      if (!container.current || !contentRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      gsap.set(contentRef.current, { opacity: 0, y: 32 });
      gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      const sectionEl = container.current;
      const btnEl = ctaBtnRef.current;
      const cursorEl = cursorRef.current;
      const clickWrapEl = clickWrapRef.current;
      const ringEl = clickRingRef.current;
      const labelEl = clickLabelRef.current;
      if (!sectionEl || !btnEl || !cursorEl || !clickWrapEl || !ringEl || !labelEl) return;

      const reduceMotion =
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
      if (reduceMotion) return;

      gsap.set([cursorEl, clickWrapEl], { opacity: 0 });
      gsap.set(ringEl, { opacity: 0, scale: 0.55 });
      gsap.set(labelEl, { opacity: 0, y: 8 });

      let tl: gsap.core.Timeline | null = null;

      const buildTimeline = () => {
        if (!sectionEl || !btnEl || !cursorEl || !clickWrapEl || !ringEl || !labelEl) return null;

        const sectionRect = sectionEl.getBoundingClientRect();
        const btnRect = btnEl.getBoundingClientRect();

        const targetX = btnRect.left - sectionRect.left + btnRect.width * 0.55;
        const targetY = btnRect.top - sectionRect.top + btnRect.height * 0.55;

        const startX = Math.max(22, targetX - 220);
        const startY = Math.min(
          Math.max(22, targetY - 160),
          Math.max(22, sectionRect.height - 140)
        );

        const t = gsap.timeline({ defaults: { ease: "power3.inOut" }, repeat: -1, repeatDelay: 3.2 });

        gsap.set(cursorEl, { x: startX, y: startY, scale: 0.92 });
        gsap.set(clickWrapEl, { x: startX, y: startY });
        gsap.set(ringEl, { opacity: 0, scale: 0.55 });
        gsap.set(labelEl, { opacity: 0, y: 8 });

        t.to(cursorEl, { opacity: 1, duration: 0.14 }, 0);
        t.to(clickWrapEl, { opacity: 1, duration: 0.14 }, 0);
        t.to(
          cursorEl,
          {
            x: targetX,
            y: targetY,
            duration: 1.05,
          },
          0.05
        );
        t.to(
          clickWrapEl,
          {
            x: targetX,
            y: targetY,
            duration: 1.05,
          },
          0.05
        );
        t.to(cursorEl, { scale: 0.78, duration: 0.08, ease: "power2.out" }, ">");
        t.to(
          ringEl,
          { opacity: 1, scale: 1.15, duration: 0.18, ease: "power2.out" },
          "<"
        );
        t.to(
          labelEl,
          { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
          "<0.03"
        );
        t.to(cursorEl, { scale: 1, duration: 0.14, ease: "back.out(2.2)" }, ">");
        t.to([ringEl, labelEl], { opacity: 0, duration: 0.22, ease: "power2.out" }, ">0.12");
        t.to([cursorEl, clickWrapEl], { opacity: 0, duration: 0.24, ease: "power2.out" }, ">0.35");

        return t;
      };

      const st = ScrollTrigger.create({
        trigger: sectionEl,
        start: "top 75%",
        end: "bottom 25%",
        onEnter: () => {
          tl?.kill();
          tl = buildTimeline();
        },
        onEnterBack: () => {
          tl?.kill();
          tl = buildTimeline();
        },
        onLeave: () => {
          tl?.kill();
          tl = null;
          gsap.set([cursorEl, clickWrapEl], { opacity: 0 });
          gsap.set([ringEl, labelEl], { opacity: 0 });
        },
        onLeaveBack: () => {
          tl?.kill();
          tl = null;
          gsap.set([cursorEl, clickWrapEl], { opacity: 0 });
          gsap.set([ringEl, labelEl], { opacity: 0 });
        },
      });

      const onResize = () => {
        if (!tl) return;
        tl.kill();
        tl = buildTimeline();
      };
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
        st.kill();
        tl?.kill();
      };
    },
    { scope: container }
  );

  const ctaHref =
    data.botaoUrl ??
    (data.whatsapp
      ? `https://wa.me/${data.whatsapp.replace(/\D/g, "")}`
      : data.email
        ? `mailto:${data.email}`
        : "#");

  return (
    <section
      id="contato"
      ref={container}
      className="proposal-section relative overflow-hidden bg-white flex flex-col items-center justify-center min-h-[70vh]"
    >
      {/* Fake cursor hint (repeats, fades out) */}
      <div className="pointer-events-none absolute inset-0 z-30">
        <div ref={clickWrapRef} className="absolute left-0 top-0">
          <div
            ref={clickRingRef}
            className="proposal-intro-click-ring absolute left-0 top-0 h-[3.75rem] w-[3.75rem] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-black bg-lime-300/25"
          />
          <div
            ref={clickLabelRef}
            className="proposal-intro-click-label absolute left-[3.1rem] top-2 -translate-y-1/2 border-[3px] border-black bg-lime-300 px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.12em] text-black md:text-[9px]"
          >
            click
          </div>
        </div>
        <div ref={cursorRef} className="absolute left-0 top-0">
          <div className="proposal-intro-cursor-wrap" style={{ width: 46, height: 60 }}>
            <svg
              className="proposal-intro-cursor-svg"
              style={{ width: 46, height: 60 }}
              viewBox="0 0 22 28"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <title>Cursor</title>
              <path
                d="M3 3v18.5l5.2-4.8 3.2 6.8 2.4-1.6-3-6.2 7.4-3.6z"
                fill="#000"
                transform="translate(2.25 2.25)"
              />
              <path
                d="M3 3v18.5l5.2-4.8 3.2 6.8 2.4-1.6-3-6.2 7.4-3.6z"
                fill="#bdfa3c"
                stroke="#000"
                strokeWidth="1.25"
                strokeLinejoin="miter"
              />
              <path d="M4.5 5.5v9l4-2.2v-4.2z" fill="#fff" opacity="0.42" />
              <rect
                x="2.25"
                y="2.25"
                width="2.5"
                height="2.5"
                fill="#fff"
                stroke="#000"
                strokeWidth="0.75"
              />
            </svg>
          </div>
        </div>
      </div>

      <div ref={contentRef} className="proposal-container text-center max-w-3xl">
        <h2 className="text-4xl font-bold text-black md:text-5xl lg:text-6xl">
          <EditableField
            value={data.titulo}
            onChange={(v) => set("titulo", v)}
            isAdmin={isAdmin}
            multiline
            className="block"
          />
        </h2>
        <p className="mt-4 text-lg text-[#7D6B58]">
          <EditableField
            value={data.subtitulo ?? ""}
            onChange={(v) => set("subtitulo", v)}
            isAdmin={isAdmin}
            multiline
            tag="span"
            className="inline"
          />
        </p>

        <a
          ref={ctaBtnRef}
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 preco-pixel-btn preco-pixel-btn--outline-lg gap-2"
        >
          {data.botaoTexto ?? "Aceitar proposta"}
          <ArrowUpRight className="h-4 w-4" />
        </a>

        {(data.email || data.whatsapp) && (
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-black/50">
            {data.email && (
              <a href={`mailto:${data.email}`} className="hover:text-black transition-colors">
                {data.email}
              </a>
            )}
            {data.whatsapp && (
              <a href={ctaHref} className="hover:text-black transition-colors">
                WhatsApp
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
