import Hero         from "@/components/Hero";
import Brands       from "@/components/Brands";
import About        from "@/components/About";
import Stats        from "@/components/Stats";
import Projects     from "@/components/Projects";
import Services     from "@/components/Services";
import WhyMe        from "@/components/WhyMe";
import Testimonials from "@/components/Testimonials";
import FAQ          from "@/components/FAQ";
import Contact      from "@/components/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Brands />
      <About />
      <Stats />
      <Projects />
      <Services />
      <WhyMe />
      {/* <Testimonials /> */}
      <FAQ />
      <Contact />
    </>
  );
}
