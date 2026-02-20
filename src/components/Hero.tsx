import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { DEVELOPER } from "@/lib/constants";
import { heroTextStagger, heroWord } from "@/lib/motion";

const ROTATING_LABELS = ["FULL STACK", "MERN", "DEVELOPER"];
const HERO_IMAGE = "./me.jpeg";

/* ── Floating orbs in the background ── */
const FloatingOrbs = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[
      { size: 500, top: "10%", left: "55%", delay: 0, dur: 8 },
      { size: 300, top: "60%", left: "70%", delay: 2, dur: 10 },
      { size: 200, top: "30%", left: "20%", delay: 4, dur: 7 },
    ].map((orb, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-white/[0.025] blur-[100px]"
        style={{ width: orb.size, height: orb.size, top: orb.top, left: orb.left }}
        animate={{ y: [0, -30, 0], x: [0, 15, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: orb.dur, delay: orb.delay, repeat: Infinity, ease: "easeInOut" }}
      />
    ))}
    {/* Top edge line */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
  </div>
);

/* ── Animated background grid ── */
const AnimatedGrid = () => (
  <motion.div
    className="absolute inset-0 opacity-[0.025]"
    animate={{ backgroundPosition: ["0px 0px", "60px 60px"] }}
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    style={{
      backgroundImage:
        "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
      backgroundSize: "60px 60px",
    }}
  />
);

/* ── Stat counter box ── */
const StatBox = ({ value, label, delay }: { value: string; label: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -3, transition: { type: "spring", stiffness: 300, damping: 20 } }}
  >
    <div className="text-3xl font-bold text-foreground">{value}</div>
    <div className="text-xs text-muted-foreground mt-1 tracking-wider uppercase font-mono">{label}</div>
  </motion.div>
);

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center overflow-hidden">

      <AnimatedGrid />
      <FloatingOrbs />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-16 w-full"
      >
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* ══ LEFT — Text content ══ */}
          <div className="flex-1 order-2 lg:order-1">

            {/* Labels row */}
            <div className="hidden lg:flex items-center gap-4 mb-6">
              {ROTATING_LABELS.map((label, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[10px] tracking-[0.3em] uppercase font-mono text-muted-foreground"
                >
                  {label}
                  {i < ROTATING_LABELS.length - 1 && (
                    <span className="ml-4 text-border/60">·</span>
                  )}
                </motion.span>
              ))}
            </div>

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-xs text-primary font-mono tracking-wider">{DEVELOPER.availability}</span>
            </motion.div>

            {/* Headline */}
            <motion.div variants={heroTextStagger} initial="hidden" animate="visible" className="mb-8">
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

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4"
            >
              <motion.button
                onClick={scrollToContact}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="btn-primary flex items-center gap-2 text-base px-8 py-4"
              >
                Let's Work Together
                <motion.div animate={{ x: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                  <ArrowUpRight size={18} />
                </motion.div>
              </motion.button>
              <motion.a
                href={DEVELOPER.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="px-8 py-4 border border-border/60 rounded-full text-sm font-medium text-muted-foreground hover:border-white/30 hover:text-primary transition-all duration-300"
              >
                View GitHub ↗
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mt-14 pt-8 border-t border-border/30 flex flex-wrap gap-10"
            >
              <StatBox value="7+" label="Projects Shipped" delay={1.0} />
              <StatBox value="MERN" label="Core Stack" delay={1.1} />
              <StatBox value="2025" label="Graduate" delay={1.2} />
            </motion.div>
          </div>

          {/* ══ RIGHT — Styled image panel ══ */}
          <motion.div
            initial={{ opacity: 0, x: 70, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2 shrink-0 flex items-center justify-center"
          >
            <div className="relative w-[280px] sm:w-[320px] lg:w-[360px]">

              {/* Morphing blob backdrop — slowly animates border-radius */}
              <motion.div
                className="absolute inset-0 translate-x-5 translate-y-5"
                animate={{
                  borderRadius: [
                    "50% 50% 50% 50% / 60% 60% 40% 40%",
                    "45% 55% 55% 45% / 55% 65% 35% 45%",
                    "55% 45% 48% 52% / 65% 55% 45% 35%",
                    "50% 50% 50% 50% / 60% 60% 40% 40%",
                  ],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  background: "linear-gradient(160deg, hsl(0 0% 14%) 0%, hsl(0 0% 8%) 100%)",
                  border: "1px solid hsl(0 0% 20%)",
                }}
              />

              {/* Second depth ring — counter-morphs */}
              <motion.div
                className="absolute inset-0 -translate-x-3 -translate-y-2"
                animate={{
                  borderRadius: [
                    "50% 50% 50% 50% / 55% 55% 45% 45%",
                    "55% 45% 45% 55% / 45% 55% 55% 45%",
                    "48% 52% 52% 48% / 60% 50% 40% 50%",
                    "50% 50% 50% 50% / 55% 55% 45% 45%",
                  ],
                }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                style={{ border: "1px solid hsl(0 0% 15%)" }}
              />

              {/* Photo — uses scroll-driven scale */}
              <motion.div
                className="relative overflow-hidden"
                animate={{
                  borderRadius: [
                    "50% 50% 50% 50% / 60% 60% 40% 40%",
                    "45% 55% 55% 45% / 55% 65% 35% 45%",
                    "55% 45% 48% 52% / 65% 55% 45% 35%",
                    "50% 50% 50% 50% / 60% 60% 40% 40%",
                  ],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                style={{ height: "420px" }}
              >
                <motion.img
                  src={HERO_IMAGE}
                  alt="Shwet Chourey"
                  style={{
                    scale: imgScale,
                    filter: "grayscale(100%) contrast(1.1) brightness(0.85)",
                  }}
                  className="w-full h-full object-cover object-top origin-center"
                />
                {/* Vignette */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 55%, hsl(0 0% 5%) 100%), linear-gradient(to right, hsl(0 0% 5% / 0.3) 0%, transparent 30%)",
                  }}
                />
              </motion.div>

              {/* Floating tag — left, gentle float */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -left-8 top-10 bg-card border border-border/60 rounded-xl px-3 py-2 shadow-xl"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Stack</p>
                  <p className="text-xs font-bold text-foreground mt-0.5">MERN + Next.js</p>
                </motion.div>
              </motion.div>

              {/* Floating tag — right, offset float */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -right-6 bottom-10 bg-card border border-border/60 rounded-xl px-3 py-2 shadow-xl"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Projects</p>
                  <p className="text-xs font-bold text-foreground mt-0.5">7+ Shipped</p>
                </motion.div>
              </motion.div>

              {/* Dot grid — staggered fade-in */}
              <div className="absolute -bottom-4 -left-4 grid grid-cols-4 gap-1.5">
                {Array.from({ length: 16 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.3 + i * 0.03, duration: 0.3 }}
                    className="w-1 h-1 rounded-full bg-white/15"
                  />
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground font-mono tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-primary/60 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
