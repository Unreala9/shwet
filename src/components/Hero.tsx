import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Circle } from "lucide-react";
import { DEVELOPER } from "@/lib/constants";
import { heroTextStagger, heroWord, staggerContainer, staggerItem } from "@/lib/motion";

const ROTATING_LABELS = ["FULL STACK", "MERN", "DEVELOPER"];

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[80px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-16 w-full"
      >
        <div className="flex gap-8 items-start">
          {/* Left vertical labels */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="hidden lg:flex flex-col gap-3 pt-8 shrink-0"
          >
            {ROTATING_LABELS.map((label, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="writing-mode-vertical"
                style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
              >
                <span className="text-[10px] tracking-[0.3em] uppercase font-mono text-muted-foreground">
                  {label}
                </span>
              </motion.div>
            ))}
            <motion.div
              variants={staggerItem}
              className="mt-4 w-px h-20 bg-gradient-to-b from-primary/60 to-transparent mx-auto"
            />
          </motion.div>

          {/* Main content */}
          <div className="flex-1">
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-xs text-primary font-mono tracking-wider">
                {DEVELOPER.availability}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              variants={heroTextStagger}
              initial="hidden"
              animate="visible"
              className="mb-8"
            >
              <div className="overflow-hidden">
                <motion.h1
                  variants={heroWord}
                  className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight"
                >
                  Hi, I'm
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  variants={heroWord}
                  className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight glow-text"
                >
                  Shwet
                </motion.h1>
              </div>
              <div className="overflow-hidden mt-3">
                <motion.p
                  variants={heroWord}
                  className="text-xl md:text-2xl text-muted-foreground font-light max-w-xl leading-relaxed mt-4"
                >
                  {DEVELOPER.tagline}
                </motion.p>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-wrap items-center gap-4"
            >
              <button
                onClick={scrollToContact}
                className="btn-primary flex items-center gap-2 text-base px-8 py-4"
              >
                Let's Work Together
                <ArrowUpRight size={18} />
              </button>
              <a
                href={DEVELOPER.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border border-border/60 rounded-full text-sm font-medium text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-300"
              >
                View GitHub ↗
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="mt-16 pt-8 border-t border-border/30 flex flex-wrap gap-10"
            >
              {[
                { value: "7+", label: "Projects Shipped" },
                { value: "MERN", label: "Core Stack" },
                { value: "2025", label: "Graduate" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1 tracking-wider uppercase font-mono">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground font-mono tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-gradient-to-b from-primary/60 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
