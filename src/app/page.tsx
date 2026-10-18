import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Services from "@/components/Skills";
import WhyMe from "@/components/WhyMe";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import {
  getProjects,
  getServices,
  getSkills,
  getAboutProfile,
  getFaqs,
} from "@/lib/data-service";

export default async function HomePage() {
  const [projects, services, skills, aboutProfile, faqs] = await Promise.all([
    getProjects(),
    getServices(),
    getSkills(),
    getAboutProfile(),
    getFaqs(),
  ]);

  return (
    <main className="relative z-10">
      <Hero />
      <About initialProfile={aboutProfile} />
      <Projects initialProjects={projects} />
      <Services initialServices={services} initialSkills={skills} />
      {/* <WhyMe /> */}
      {/* <Testimonials /> */}
      <FAQ initialFaqs={faqs} />
      <Contact />
    </main>
  );
}
