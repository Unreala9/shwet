import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import About from "@/components/About";
import GithubStats from "@/components/GithubStats";
import DevQuote from "@/components/DevQuote";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Projects />
        <Skills />
        <About />
        <GithubStats />
        <DevQuote />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
