import AboutUs from "@/components/landing/aboutus/AboutUs";
import Hero from "@/components/landing/hero/Hero";
import Services from "@/components/landing/services/Services";

export default function Home() {
  return (
     <div className="flex flex-col">
      <Hero />
      <AboutUs />
      <Services />
    </div>
  );
}
