import AboutUs from "@/components/landing/aboutus/AboutUs";
import Hero from "@/components/landing/hero/Hero";
import ScrollText from "@/components/landing/scrolltext/ScrollText";
import Services from "@/components/landing/services/Services";

export default function Home() {
  return (
     <div className="flex flex-col overflow-x-hidden overflow-y-clip">
      <Hero />
      <ScrollText />
      <AboutUs />
      <Services />
    </div>
  );
}
