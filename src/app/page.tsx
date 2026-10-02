import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Services from "@/components/Skills";
import WhyMe from "@/components/WhyMe";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";

export default function HomePage() {
  return (
    <main className="relative z-10">
      <Hero />
      <About />
      <Projects />
      <Services />
      {/* <WhyMe /> */}
      {/* <Testimonials /> */}
      <FAQ />
      <Contact />
    </main>
  );
}
