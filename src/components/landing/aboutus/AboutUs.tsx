"use client";

import { useRef } from "react";
import { DotGothic16, Press_Start_2P } from "next/font/google";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./about-us.css";

const fontDisplay = DotGothic16({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-au-display",
  display: "swap",
});

const fontPixel = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-au-pixel",
  display: "swap",
});

const STATS = [
  {
    id: "au-stat-0",
    value: 1000,
    prefix: "+",
    label: "Usuários\nImpactados",
    sys: "USR",
    snap: 10,
  },
  {
    id: "au-stat-1",
    value: 100,
    prefix: "+",
    label: "Projetos\nConcluídos",
    sys: "PROJ",
    snap: 5,
  },
  {
    id: "au-stat-2",
    value: 50,
    prefix: "",
    label: "Sistemas\nDesenvolvidos",
    sys: "SYS",
    snap: 1,
  },
  {
    id: "au-stat-3",
    value: 20,
    prefix: "+",
    label: "Cidades com\nSistemas Ativos",
    sys: "GEO",
    snap: 1,
  },
] as const;

const VALUES = [
  "Simplicidade com Propósito",
  "Visão de Processo",
  "Eficiência Operacional",
  "Precisão Técnica",
  "Compromisso com Resultado",
] as const;

export default function AboutUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      gsap.registerPlugin(ScrollTrigger);

      // Reveal stagger
      const reveals = section.querySelectorAll("[data-au-reveal]");
      gsap.set(reveals, { opacity: 0, y: 32, filter: "blur(6px)" });
      gsap.to(reveals, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          toggleActions: "play none none none",
        },
      });

      // Counter animations
      STATS.forEach((stat) => {
        const el = section.querySelector(`[data-au-counter="${stat.id}"]`);
        if (!el) return;
        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: stat.value,
            duration: 2.2,
            ease: "power2.out",
            snap: { innerText: stat.snap },
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="about-us"
      className={`au ${fontDisplay.variable} ${fontPixel.variable}`}
      aria-labelledby="au-title"
    >
      {/* Atmosphere */}
      <div className="au__scanlines" aria-hidden />
      <div className="au__grid" aria-hidden />
      <div className="au__glow au__glow--lime" aria-hidden />
      <div className="au__glow au__glow--emerald" aria-hidden />

      <div className="au__inner">
        {/* ── Header ── */}
        <header className="au__header" data-au-reveal>
          <p className="au__kicker">
            <span className="au__kicker-mark">// 02</span> — Nossa história
          </p>
          <h2 id="au-title" className="au__title">
            <span className="au__title-line">Sobre</span>
            <span className="au__title-line">
              a <span className="au__title-accent">Elevate</span>
            </span>
          </h2>
        </header>

        {/* ── About + Values cards ── */}
        <div className="au__main">
          {/* About card */}
          <article className="au__card" data-au-reveal aria-label="A Elevate">
            <div className="au__chrome">
              <span className="au__chrome-label">SYS://ABOUT.ERP</span>
              <div className="au__chrome-dots" aria-hidden>
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className="au__card-body">
              <div className="au__about-text">
                <p>
                  Somos uma empresa especializada no desenvolvimento de sistemas
                  sob medida para a indústria metal mecânica. Nosso trabalho nasce
                  da união entre conhecimento técnico em desenvolvimento de software
                  e experiência prática em planejamento, controle de processos e
                  engenharia de automação industrial.
                </p>
                <p>
                  Entendemos a realidade do chão de fábrica, os desafios do PCP, a
                  complexidade dos fluxos produtivos e a necessidade de integração
                  entre setores. Mais do que desenvolver aplicações, projetamos
                  soluções que organizam processos, reduzem retrabalho e aumentam a
                  eficiência operacional.
                </p>
                <p>
                  Acreditamos que um software industrial deve ser simples,
                  intencional e funcional. Simples para quem opera. Estruturado para
                  quem gerencia. Escalável para quem cresce.
                </p>
              </div>
            </div>
          </article>

          {/* Values card */}
          <article
            className="au__card"
            data-au-reveal
            aria-label="Nossos valores"
          >
            <div className="au__chrome">
              <span className="au__chrome-label">SYS://VALORES</span>
              <div className="au__chrome-dots" aria-hidden>
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className="au__card-body">
              <h3 className="au__values-heading">Nossos valores</h3>
              <ul className="au__values-list">
                {VALUES.map((v, i) => (
                  <li key={v} className="au__value-item">
                    <span className="au__value-num" aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="au__value-pip" aria-hidden />
                    <span className="au__value-label">{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>

        {/* ── Stats ── */}
        <div className="au__stats" data-au-reveal>
          <div className="au__stats-eyebrow">
            <span className="au__stats-eyebrow-label">
              Conquistas em números
            </span>
            <span className="au__stats-eyebrow-rule" aria-hidden />
          </div>

          <div className="au__stats-row">
            {STATS.map((stat) => (
              <article key={stat.id} className="au__stat">
                <div className="au__stat-chrome">
                  <span className="au__stat-chrome-label">
                    SYS://{stat.sys}
                  </span>
                  <span className="au__stat-chrome-dot" aria-hidden />
                </div>

                <div className="au__stat-body">
                  <div className="au__stat-num-row">
                    {stat.prefix && (
                      <span className="au__stat-prefix" aria-hidden>
                        {stat.prefix}
                      </span>
                    )}
                    <span
                      className="au__stat-number"
                      data-au-counter={stat.id}
                      aria-label={`${stat.prefix}${stat.value} ${stat.label.replace("\n", " ")}`}
                    >
                      0
                    </span>
                  </div>
                  <p className="au__stat-label">
                    {stat.label.split("\n").map((line, i) => (
                      <span key={i} style={{ display: "block" }}>
                        {line}
                      </span>
                    ))}
                  </p>
                  <span className="au__stat-cursor" aria-hidden>
                    _
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
