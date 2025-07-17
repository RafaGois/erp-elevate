import AboutUs from "@/components/landing/aboutus/AboutUs";
import Hero from "@/components/landing/hero/Hero";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <AboutUs />
    </div>
  );
}
