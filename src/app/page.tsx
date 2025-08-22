"use client";

import AboutUs from "@/components/landing/aboutus/AboutUs";
import Footer from "@/components/landing/footer/Footer";
import GalleryScroll from "@/components/landing/galeryscroll/GalleryScroll";
import Hero from "@/components/landing/hero/Hero";
import ScrollText from "@/components/landing/scrolltext/ScrollText";
import Services from "@/components/landing/services/Services";
import Testimonials from "@/components/landing/testimonials/Testimonials";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

export default function Home() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

      ScrollSmoother.create({
        smooth: 1.2, // how long (in seconds) it takes to "catch up" to the native scroll position
        effects: true,
        smoothTouch: 0.4, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
      });
    },
    { scope: container }
  );
  return (
    <div
      ref={container}
      id="smooth-wrapper"
      className="flex flex-col overflow-x-hidden overflow-y-clip"
    >
      <div id="smooth-content">
        <Hero />
        <ScrollText />
        <AboutUs />
        <Services />
        <GalleryScroll />
        <Testimonials />
        <Footer />
      </div>
    </div>
  );
}
