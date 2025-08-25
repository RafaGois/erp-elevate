"use client";

import AboutUs from "@/components/landing/aboutus/AboutUs";
import Footer from "@/components/landing/footer/Footer";
import Hero from "@/components/landing/hero/Hero";
import ScrollText from "@/components/landing/scrolltext/ScrollText";
import Services from "@/components/landing/services/Services";
import Testimonials from "@/components/landing/testimonials/Testimonials";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";
import InstitutionalVideo from "@/components/landing/institutionalVideo/InstitutionalVideo";
import Clients from "@/components/landing/clients/Clients";
import CalLToAction from "@/components/landing/CTA/CallToAction";

export default function Home() {
  const container = useRef<HTMLDivElement | null>(null);
  const smootherRef = useRef<ScrollSmoother | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

      smootherRef.current = ScrollSmoother.create({
        smooth: 1.2, // how long (in seconds) it takes to "catch up" to the native scroll position
        effects: true,
        smoothTouch: 0.4, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
      });

      const cursor = container.current.querySelector(".cursor")
      container.current.addEventListener("mousemove", (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Atualizar cursor customizado
        gsap.to(cursor, {
          x: mouseX,
          y: mouseY,
          duration: 0.1,
          ease: "power2.out",
        });
      });
    },
    { scope: container }
  );

  // Função para navegação suave com ScrollSmoother
  const scrollToSection = (sectionId: string) => {
    if (!smootherRef.current) return;
    
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      // Usar ScrollSmoother para navegação suave
      const targetPosition = targetElement.offsetTop;
      smootherRef.current.scrollTo(targetPosition, true);
    }
  };

  // Interceptar cliques em links com âncoras
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]');
      
      if (link) {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          const sectionId = href.substring(1);
          scrollToSection(sectionId);
        }
      }
    };

    // Adicionar listener para todos os cliques
    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div
      ref={container}
      className="overflow-x-hidden relative cursor-none"
    >
      <div className="cursor fixed h-5 w-5 bg-amber-300 rounded-full cursor-none z-50 mix-blend-difference "></div>
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Hero />
          <ScrollText />
          <AboutUs />
          <Services />
          <InstitutionalVideo />
          <Testimonials />
          <Clients />
          <CalLToAction />
          <Footer />
        </div>
      </div>
    </div>
  );
}
