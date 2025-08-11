"use client";

import Image from "next/image";
import Lenis from "lenis";

import "./styles.css";
import React, { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const config = {
  gap: 0.8,
  speed: 0.3,
  arcRadius: 500,
};

const spotlightItems = [
  { name: "Silent Arc", img: "/image_1.jpg" },
  { name: "Noites Brancas", img: "/image_2.jpg" },
  { name: "Irmaos Karasmov", img: "/image_1.jpg" }, // ajuste para imagem existente
  { name: "Metamorfose", img: "/image_2.jpg" }, // ajuste para imagem existente
  { name: "Blade Runner", img: "/image_1.jpg" }, // ajuste para imagem existente
];

export default function Categories() {
  const container = useRef<HTMLDivElement | null>(null);
  const imagesRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titlesRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis();
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);

      // Remover criação dinâmica de elementos
      // Animação de entrada para as imagens
      imagesRefs.current.forEach((img, i) => {
        if (!img) return;
        const t = i / (spotlightItems.length - 1);
        const { x, y } = getBezierPosition(t);
        gsap.set(img, { opacity: 0, x, y });
        gsap.to(img, {
          opacity: 1,
          x: 0,
          y: 0,
          delay: i * 0.2,
          duration: 1.2,
          ease: "power3.out",
        });
      });
      // Animação dos títulos
      titlesRefs.current.forEach((title, i) => {
        if (!title) return;
        gsap.fromTo(
          title,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            delay: 0.5 + i * 0.15,
            duration: 0.8,
            ease: "power2.out",
          }
        );
      });

      // Função getBezierPosition com tipagem
      function getBezierPosition(t: number) {
        const containerWidth = window.innerWidth * 0.3;
        const containerHeight = window.innerWidth;
        const arcStartX = containerWidth - 220;
        const arcStartY = -220;
        const arcEndY = containerHeight + 200;
        const arcControlPointX = arcStartX + config.arcRadius;
        const arcControlPointY = containerHeight / 2;
        const x =
          (1 - t) * (1 - t) * arcStartX +
          2 * (1 - t) * t * arcControlPointX +
          t * t * arcStartX;
        const y =
          (1 - t) * (1 - t) * arcStartY +
          2 * (1 - t) * t * arcControlPointY +
          t * t * arcEndY;
        return { x, y };
      }

      // Função getImgProgressState com tipagem
      function getImgProgressState(index: number, overallProgress: number) {
        const startTime = index * config.gap;
        const endTime = startTime + config.speed;
        if (overallProgress < startTime) return -1;
        if (overallProgress > endTime) return 2;
        return (overallProgress - startTime) / config.speed;
      }

      // imagesRefs.current.forEach((img) => gsap.set(img, {opacity: 0})); // This line is removed as per the new_code
    },
    { scope: container }
  );

  return (
    <section ref={container} className="spotlight">
      <div className="spotlight-intro-text-wrapper">
        <div className="spotlight-intro-text">
          <p>Nossas</p>
        </div>
        <div className="spotlight-intro-text">
          <p>Categorias</p>
        </div>
      </div>
      <div className="spotlight-bg-img">
        <Image
          src="/natureza.jpg"
          alt="spotlight-bg-img"
          width={1000}
          height={1000}
        />
      </div>
      <div className="spotlight-titles-container">
        <div className="spotlight-titles">
          {spotlightItems.map((item, i) => (
            <h1
              key={item.name}
              ref={el => {
                titlesRefs.current[i] = el;
              }}
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              {item.name}
            </h1>
          ))}
        </div>
      </div>
      <div className="spotlight-images">
        {spotlightItems.map((item, i) => (
          <div
            className="spotlight-img"
            key={item.name}
            ref={el => {
              imagesRefs.current[i] = el;
            }}
            style={{ position: "absolute" }}
          >
            <Image
              src={item.img}
              alt={item.name}
              width={180}
              height={180}
              style={{ borderRadius: 16 }}
            />
          </div>
        ))}
      </div>
      <div className="spotlight-header">
        <p>Categorias</p>
      </div>
    </section>
  );
}
