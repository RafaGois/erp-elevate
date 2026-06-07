"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Camera,
  Layers,
  Monitor,
  PackageCheck,
  Presentation,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import { useRef, useState } from "react";
import type { ServiceLandingPage } from "@/types/service-landing";

const DELIVERABLE_ICONS = [
  Users,
  Camera,
  Monitor,
  Presentation,
  SlidersHorizontal,
  PackageCheck,
] as const;

const VH_PER_STEP = 30;

type Props = {
  deliverables: ServiceLandingPage["deliverables"];
};

export default function DeliverablesSection({ deliverables }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lineHRef = useRef<HTMLDivElement>(null);
  const lineVRef = useRef<HTMLDivElement>(null);
  const [revealedCount, setRevealedCount] = useState(1);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.getById("slp-deliver-pin")?.kill();

      const items = deliverables.items;
      const n = items.length;
      if (
        !sectionRef.current ||
        !pinRef.current ||
        !trackRef.current ||
        n === 0
      ) {
        return;
      }

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions as {
            isDesktop: boolean;
            reduceMotion: boolean;
          };

          const steps =
            trackRef.current!.querySelectorAll<HTMLElement>(
              "[data-deliver-step]",
            );

          const revealAll = () => {
            gsap.set(steps, { clearProps: "opacity,transform" });
            gsap.set(
              steps,
              { opacity: 1, y: 0, scale: 1 },
            );
            steps.forEach((step) => {
              const cp = step.querySelector("[data-deliver-checkpoint]");
              const copy = step.querySelector("[data-deliver-copy]");
              if (cp) gsap.set(cp, { clearProps: "all", scale: 1, opacity: 1 });
              if (copy) gsap.set(copy, { clearProps: "all", opacity: 1, y: 0 });
            });
            if (lineHRef.current) {
              gsap.set(lineHRef.current, { clearProps: "transform", scaleX: 1 });
            }
            if (lineVRef.current) {
              gsap.set(lineVRef.current, { clearProps: "transform", scaleY: 1 });
            }
            setRevealedCount(n);
          };

          if (!isDesktop || reduceMotion) {
            revealAll();
            return;
          }

          gsap.set(lineHRef.current, {
            scaleX: 0,
            transformOrigin: "left center",
          });
          gsap.set(lineVRef.current, {
            scaleY: 0,
            transformOrigin: "top center",
          });

          steps.forEach((step, i) => {
            const cp = step.querySelector("[data-deliver-checkpoint]");
            const copy = step.querySelector("[data-deliver-copy]");
            const initial = i === 0 ? 1 : 0;
            if (cp) {
              gsap.set(cp, { scale: initial, opacity: initial });
            }
            if (copy) {
              gsap.set(copy, { opacity: initial, y: initial ? 0 : 18 });
            }
            step.classList.toggle("is-revealed", i === 0);
            step.classList.toggle("is-active", i === 0);
          });
          setRevealedCount(1);

          const transitions = Math.max(n - 1, 1);
          const scrollDistance = () =>
            `+=${(window.innerHeight * (n - 1) * VH_PER_STEP) / 100}`;

          const syncTimeline = (progress: number) => {
            const total = Math.max(n - 1, 1);
            const raw = progress * total;
            let count = 0;

            gsap.set(lineHRef.current, { scaleX: progress });
            gsap.set(lineVRef.current, { scaleY: progress });

            const activeIndex = Math.min(Math.floor(raw + 0.4), n - 1);

            steps.forEach((step, i) => {
              const nodeP = gsap.utils.clamp(0, 1, (raw - i + 0.35) / 0.45);
              const cp = step.querySelector("[data-deliver-checkpoint]");
              const copy = step.querySelector("[data-deliver-copy]");

              if (cp) {
                gsap.set(cp, {
                  scale: 0.35 + nodeP * 0.65,
                  opacity: nodeP,
                });
              }
              if (copy) {
                gsap.set(copy, {
                  opacity: nodeP,
                  y: (1 - nodeP) * 20,
                });
              }

              const isRevealed = nodeP > 0.08;
              step.classList.toggle("is-revealed", isRevealed);
              step.classList.toggle("is-active", i === activeIndex);

              if (isRevealed) count = i + 1;
            });

            setRevealedCount(Math.max(1, count));
          };

          const pinTrigger = ScrollTrigger.create({
            id: "slp-deliver-pin",
            trigger: sectionRef.current,
            pin: pinRef.current,
            start: "top top",
            end: scrollDistance,
            scrub: 0.45,
            invalidateOnRefresh: true,
            onUpdate: (self) => syncTimeline(self.progress),
          });

          syncTimeline(pinTrigger.progress);

          return () => {
            pinTrigger.kill();
            ScrollTrigger.getById("slp-deliver-pin")?.kill();
          };
        },
      );

      return () => {
        mm.revert();
      };
    },
    { scope: sectionRef, dependencies: [deliverables.items.length] },
  );

  return (
    <section
      id="entregaveis"
      ref={sectionRef}
      className="slp-section slp-deliver"
      aria-labelledby="slp-deliver-title"
    >
      <div className="slp-deliver__bg" aria-hidden />

      <div ref={pinRef} className="slp-deliver__pin">
        <div className="slp-wrap slp-deliver__wrap">
          <header className="slp-head slp-deliver__head">
            <span className="slp-kicker">{deliverables.kicker}</span>
            <h2 id="slp-deliver-title" className="slp-title">
              {deliverables.title}
            </h2>
            <p className="slp-subtitle">{deliverables.subtitle}</p>
          </header>

          <div className="slp-deliver__progress" aria-live="polite">
            <span className="slp-deliver__progress-label">ETAPAS</span>
            <span className="slp-deliver__progress-count">
              {String(revealedCount).padStart(2, "0")}
              <span className="slp-deliver__progress-sep">/</span>
              {String(deliverables.items.length).padStart(2, "0")}
            </span>
          </div>

          <div ref={trackRef} className="slp-deliver__track">
            <div
              ref={lineHRef}
              className="slp-deliver__line slp-deliver__line--h"
              aria-hidden
            />
            <div
              ref={lineVRef}
              className="slp-deliver__line slp-deliver__line--v"
              aria-hidden
            />

            <ol className="slp-deliver__steps">
              {deliverables.items.map((item, index) => {
                const Icon = DELIVERABLE_ICONS[index] ?? Layers;
                return (
                  <li
                    key={item.step}
                    data-deliver-step
                    className="slp-deliver__step"
                  >
                    <div
                      data-deliver-checkpoint
                      className="slp-deliver__checkpoint"
                    >
                      <Icon className="size-5" aria-hidden />
                      <span className="slp-deliver__step-num">{item.step}</span>
                    </div>
                    <div data-deliver-copy className="slp-deliver__copy">
                      <h3 className="slp-deliver__step-title">{item.title}</h3>
                      <p className="slp-deliver__step-desc">
                        {item.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
