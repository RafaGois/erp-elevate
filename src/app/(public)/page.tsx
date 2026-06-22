"use client";

import AboutUs from "@/components/landing/aboutus/AboutUs";
import Footer from "@/components/landing/footer/Footer";
import Hero from "@/components/landing/hero/Hero";
import ScrollText from "@/components/landing/scrolltext/ScrollText";
import Services from "@/components/landing/services/Services";
import Problems from "@/components/landing/problems/Problems";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";
import CallToAction from "@/components/landing/CTA/CallToAction";
import LandingCustomCursor from "@/components/landing/cursor/LandingCustomCursor";
import Lenis from "lenis";

const ANCHOR_SCROLL_OFFSET = -72;

export default function Home() {
  const container = useRef<HTMLDivElement | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useGSAP(
    () => {
      const lenis = new Lenis();
      lenisRef.current = lenis;
      lenis.on("scroll", ScrollTrigger.update);

      const onTick = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);

      return () => {
        gsap.ticker.remove(onTick);
        lenisRef.current = null;
        lenis.destroy();
      };
    },
    { scope: container }
  );

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      const sectionId = href.slice(1);
      if (!sectionId) return;

      const targetElement = document.getElementById(sectionId);
      if (!targetElement) return;

      e.preventDefault();

      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(targetElement, { offset: ANCHOR_SCROLL_OFFSET });
        return;
      }

      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    };

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
      <Problems />
      <ScrollText />
      <AboutUs />
      <Services />
      <CallToAction />
      <Footer />
    </div>
  );
}
