"use client";

import AboutUs from "@/components/landing/aboutus/AboutUs";
import Footer from "@/components/landing/footer/Footer";
import Hero from "@/components/landing/hero/Hero";
import ScrollText from "@/components/landing/scrolltext/ScrollText";
import Services from "@/components/landing/services/Services";
// import Testimonials from "@/components/landing/testimonials/Testimonials";
import Problems from "@/components/landing/problems/Problems";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";
import InstitutionalVideo from "@/components/landing/institutionalVideo/InstitutionalVideo";
import Clients from "@/components/landing/clients/Clients";
import CallToAction from "@/components/landing/CTA/CallToAction";
import LandingCustomCursor from "@/components/landing/cursor/LandingCustomCursor";
import Lenis from "lenis";

export default function Home() {
  const container = useRef<HTMLDivElement | null>(null);
  const smootherRef = useRef<ScrollSmoother | null>(null);

  useGSAP(
    () => {
      const lenis = new Lenis();
      lenis.on("scroll", ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000); // Convert time from seconds to milliseconds
      });

      // Disable lag smoothing in GSAP to prevent any delay in scroll animations
      gsap.ticker.lagSmoothing(0);

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
        const href = link.getAttribute("href");
        if (href && href.startsWith("#")) {
          const sectionId = href.substring(1);
          scrollToSection(sectionId);
        }
      }
    };

    // Adicionar listener para todos os cliques
    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return (
    <div
      ref={container}
      data-custom-cursor=""
      className="relative overflow-x-hidden select-none"
    >
      <LandingCustomCursor />
      <Hero />
      <ScrollText />
      <AboutUs />
      <Services />
      <InstitutionalVideo />
      {/* <Testimonials /> */}
      <Problems />
      {/* <Clients /> */}
      <CallToAction />
      <Footer />
    </div>
  );
}
