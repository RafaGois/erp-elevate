"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageCircle, Monitor, ScanSearch, TrendingUp } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import { ELEVATE_WHATSAPP_URL } from "@/lib/data/contact-links";
import type { ServiceLandingPage } from "@/types/service-landing";
import { cn } from "@/lib/utils";

const STEP_ICONS = [ScanSearch, Monitor, TrendingUp] as const;
const VH_PER_TRANSITION = 38;

type Props = {
  howItWorks: ServiceLandingPage["howItWorks"];
};

function StepWindow({
  label,
  className,
  children,
  ...rest
}: {
  label: string;
  className?: string;
  children: ReactNode;
} & React.ComponentProps<"div">) {
  return (
    <div className={cn("slp-win", className)} {...rest}>
      <div className="slp-win__chrome">
        <span className="slp-win__label">{label}</span>
        <div className="slp-win__dots" aria-hidden>
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="slp-win__body">{children}</div>
    </div>
  );
}

function WhatsappButton({
  children,
  size,
}: {
  children: ReactNode;
  size?: "lg";
}) {
  return (
    <a
      href={ELEVATE_WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={size === "lg" ? "slp-btn slp-btn--lg" : "slp-btn"}
    >
      <MessageCircle className="size-3.5" aria-hidden />
      {children}
    </a>
  );
}

export default function HowItWorksSection({ howItWorks }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const currentStepRef = useRef(0);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.getById("slp-how-pin")?.kill();

      const steps = howItWorks.steps;
      const n = steps.length;
      if (!sectionRef.current || !pinRef.current || !cardsRef.current || n === 0) {
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

          const cards =
            cardsRef.current!.querySelectorAll<HTMLElement>("[data-how-card]");

          if (!isDesktop || reduceMotion) {
            gsap.set(cards, {
              clearProps: "opacity,transform",
              pointerEvents: "auto",
            });
            if (ghostRef.current) {
              gsap.set(ghostRef.current, { clearProps: "transform" });
            }
            return;
          }

          cards.forEach((card, i) => {
            gsap.set(card, {
              opacity: i === 0 ? 1 : 0,
              y: i === 0 ? 0 : -32,
              scale: i === 0 ? 1 : 1.04,
              pointerEvents: i === 0 ? "auto" : "none",
            });
          });
          currentStepRef.current = 0;
          setActiveIndex(0);

          const transitions = Math.max(n - 1, 1);
          const scrollDistance = () =>
            `+=${(window.innerHeight * (n - 1) * VH_PER_TRANSITION) / 100}`;

          const goToStep = (step: number, prevStep: number) => {
            if (step === prevStep) return;
            setActiveIndex(step);
            currentStepRef.current = step;

            const prevEl = cards[prevStep];
            const nextEl = cards[step];

            if (prevEl) {
              prevEl.style.pointerEvents = "none";
              gsap.to(prevEl, {
                opacity: 0,
                y: 24,
                scale: 0.94,
                duration: 0.32,
                ease: "power2.in",
                overwrite: true,
              });
            }

            if (nextEl) {
              gsap.fromTo(
                nextEl,
                { opacity: 0, y: -32, scale: 1.04 },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.52,
                  ease: "power2.out",
                  delay: 0.15,
                  overwrite: true,
                  onStart: () => {
                    nextEl.style.pointerEvents = "auto";
                  },
                },
              );
            }
          };

          const pinTrigger = ScrollTrigger.create({
            id: "slp-how-pin",
            trigger: sectionRef.current,
            pin: pinRef.current,
            start: "top top",
            end: scrollDistance,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress;
              const step = Math.min(
                Math.floor(progress * transitions + 0.15),
                n - 1,
              );

              if (ghostRef.current) {
                gsap.set(ghostRef.current, { y: progress * -120 });
              }

              if (step !== currentStepRef.current) {
                goToStep(step, currentStepRef.current);
              }
            },
          });

          const initialStep = Math.min(
            Math.floor(pinTrigger.progress * transitions + 0.15),
            n - 1,
          );
          if (initialStep > 0) {
            cards.forEach((card, i) => {
              gsap.set(card, {
                opacity: i === initialStep ? 1 : 0,
                y: i === initialStep ? 0 : i < initialStep ? 24 : -32,
                scale: i === initialStep ? 1 : 0.94,
                pointerEvents: i === initialStep ? "auto" : "none",
              });
            });
            setActiveIndex(initialStep);
            currentStepRef.current = initialStep;
          }

          return () => {
            pinTrigger.kill();
            ScrollTrigger.getById("slp-how-pin")?.kill();
          };
        },
      );

      return () => {
        mm.revert();
      };
    },
    { scope: sectionRef, dependencies: [howItWorks.steps.length] },
  );

  const activeStep = howItWorks.steps[activeIndex] ?? howItWorks.steps[0];

  return (
    <section
      id="como-funciona"
      ref={sectionRef}
      className="slp-section slp-how"
      aria-labelledby="slp-how-title"
    >
      <div className="slp-how__bg" aria-hidden />

      <div ref={pinRef} className="slp-how__pin">
        <div className="slp-wrap slp-how__wrap">
          <header className="slp-head slp-head--center slp-how__head">
            <span className="slp-kicker">{howItWorks.kicker}</span>
            <h2 id="slp-how-title" className="slp-title">
              {howItWorks.title}
            </h2>
            <p className="slp-subtitle">{howItWorks.subtitle}</p>
          </header>

          <div className="slp-how__split">
            <nav className="slp-how__rail" aria-label="Etapas do processo">
              {howItWorks.steps.map((step, index) => (
                <div
                  key={step.step}
                  className={cn(
                    "slp-how__rail-item",
                    activeIndex === index && "is-active",
                  )}
                  aria-current={activeIndex === index ? "step" : undefined}
                >
                  <span className="slp-how__rail-marker" aria-hidden>
                    <span className="slp-how__rail-dot" />
                  </span>
                  <div className="slp-how__rail-copy">
                    <span className="slp-how__rail-num">{step.step}</span>
                    <span className="slp-how__rail-title">{step.title}</span>
                  </div>
                </div>
              ))}
            </nav>

            <div className="slp-how__card-stage" ref={cardsRef}>
              <div
                ref={ghostRef}
                className="slp-how__ghost-num"
                aria-hidden
              >
                {activeStep?.step}
              </div>

              {howItWorks.steps.map((step, index) => {
                const Icon = STEP_ICONS[index] ?? ScanSearch;
                return (
                  <div
                    key={step.step}
                    data-how-card
                    className="slp-how__card-slot"
                  >
                    <StepWindow
                      label={`STEP_${step.step}`}
                      className="slp-how__card"
                    >
                      <span className="slp-how__card-icon" aria-hidden>
                        <Icon className="size-5" />
                      </span>
                      <p className="slp-how__card-num">{step.step}</p>
                      <h3 className="slp-how__card-title">{step.title}</h3>
                      <p className="slp-how__card-desc">{step.description}</p>
                    </StepWindow>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="slp-how__cta" data-slp-reveal>
            <WhatsappButton size="lg">{howItWorks.cta}</WhatsappButton>
          </div>
        </div>
      </div>
    </section>
  );
}
