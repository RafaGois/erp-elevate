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
import CallToAction from "@/components/landing/CTA/CallToAction";
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

      const cursor = container.current.querySelector(".cursor");
      const cursorDot = container.current.querySelector(".cursor-point");

      container.current.addEventListener("mousemove", (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Atualizar cursor customizado
        gsap.to(cursor, {
          x: mouseX,
          y: mouseY,
          ease: "power2.out",
          duration: 1,
        });

        gsap.to(cursorDot, {
          x: mouseX + 20,
          y: mouseY + 20,
          ease: "power2.out",
          duration: 1.4,
        }); 
      });


      container.current.addEventListener("mousedown", () => {
        
       gsap.to(cursor, {
        scale: 2,
        backgroundColor: "#fff",
        duration: 0.5,
        ease: "power4.inOut",
       })

       gsap.to(cursorDot, {
        scale: 2,
        backgroundColor: "#bdfa3c",
       })
      });

      container.current.addEventListener("mouseup", () => {
        gsap.to(cursor, {
         scale: 1,
         backgroundColor: "transparent",
         
         ease: "bounce",
        })
        gsap.to(cursorDot, {
          scale: 1,
          backgroundColor: "#fff",
          ease: "bounce",
          duration: 1,
         })
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
    <div ref={container} className="overflow-x-hidden relative select-none">
      <div className="hidden cursor fixed h-12 w-12 border border-white rounded-full cursor-none z-50 sm:flex justify-center items-center mix-blend-difference"></div>
      <div className="hidden sm:flex cursor-point fixed bg-white h-2 w-2 rounded-full z-50 mix-blend-difference"></div>
      <Hero />
      <ScrollText />
      <AboutUs />
      <Services />
      <InstitutionalVideo />
      <Testimonials />
      <Clients />
      <CallToAction />
      <Footer />
    </div>
  );
}
