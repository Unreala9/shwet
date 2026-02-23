import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Github, Play } from "lucide-react";
import { fadeUp } from "@/lib/motion";
import { PROJECTS } from "@/lib/constants";

const ProjectCard = ({
  project,
  i,
  total,
}: {
  project: (typeof PROJECTS)[0];
  i: number;
  total: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Each card sticks at a progressively lower top value so they fan out
  const topOffset = 80 + i * 24; // px from viewport top when sticky kicks in

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      ref={cardRef}
      className="sticky"
      style={{ top: `${topOffset}px`, zIndex: i + 1 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 70, scale: 0.96, filter: "blur(5px)" }}
        whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
        whileHover={{
          y: -5,
          scale: 1.01,
          transition: { type: "spring", stiffness: 260, damping: 22 },
        }}
        className="project-card group flex flex-col md:flex-row gap-0 overflow-hidden rounded-2xl bg-white/[0.02] backdrop-blur-md border border-white/[0.05] hover:border-white/[0.15] hover:bg-white/[0.04] hover:shadow-[0_8px_32px_rgba(255,255,255,0.04)] transition-all duration-500"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* ── Left: Content ── */}
        <div className="flex-1 flex flex-col p-6">
          {/* Top row */}
          <div className="flex items-center justify-between mb-4">
            <span className="section-label text-[10px] bg-primary/10 text-primary px-3 py-1.5 rounded-full border border-primary/20 tracking-wider">
              {project.category}
            </span>
            <span className="text-xs text-muted-foreground font-mono bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
              {project.year}
            </span>
          </div>

          {/* Project number */}
          <div className="text-6xl md:text-7xl font-bold text-white/5 font-mono leading-none mb-4 transition-all duration-500 group-hover:text-primary/20 xl:group-hover:translate-x-3 xl:group-hover:-translate-y-2">
            {String(i + 1).padStart(2, "0")}
          </div>

          {/* Name + description */}
          <h3 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-primary transition-colors duration-300">
            {project.name}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-8 flex-1">
            {project.description}
          </p>

          {/* Links */}
          <div className="flex items-center gap-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <Github size={13} />
              Code
            </a>
            {project.live !== "#" && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <ExternalLink size={13} />
                Live Site
              </a>
            )}
            <div className="ml-auto w-8 h-8 rounded-full border border-border/40 flex items-center justify-center hover:border-primary/50 hover:bg-primary/5 transition-all">
              <ExternalLink size={12} className="text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* ── Right: Media Panel ── */}
        <div className="relative w-full md:w-[320px] lg:w-[500px] xl:w-[600px] shrink-0 overflow-hidden bg-black/40 min-h-[240px] md:min-h-0 rounded-2xl md:rounded-2xl  border-t md:border-t-0 md:border-l border-white/5 p-4 flex items-center justify-center">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-white/10 shadow-2xl">
            {/* Thumbnail */}
            <img
              src={project.image}
              alt={project.name}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 origin-center ${
                isHovered ? "opacity-0 scale-105" : "opacity-100 scale-100"
              }`}
            />

            {/* Video */}
            {project.video && (
              <video
                ref={videoRef}
                src={project.video}
                muted
                loop
                playsInline
                preload="metadata"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 origin-center ${
                  isHovered ? "opacity-100 scale-100" : "opacity-0 scale-105"
                }`}
              />
            )}

          {/* Play badge — shows when NOT hovered */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
              isHovered ? "opacity-0 scale-90" : "opacity-100 scale-100"
            }`}
          >
            <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-xl group-hover:border-white/30 transition-all duration-500">
              <Play
                size={20}
                className="text-white fill-white ml-1 opacity-80 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* ─── Section ─── */
const Projects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Extra bottom padding so the last card can fully scroll into view before un-sticking
  const stackPadding = PROJECTS.length * 24;

  return (
    <section id="projects" className="pt-32 pb-10 px-6 bg-card/20">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
          animate={
            inView
              ? { opacity: 1, filter: "blur(0px)", y: 0 }
              : { opacity: 0, filter: "blur(10px)", y: 20 }
          }
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="section-label inline-flex items-center gap-3"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-primary/80 font-mono">( WORKS )</span>
            <span className="h-px w-12 bg-primary/30" />
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-bold mt-6 leading-[1.1] tracking-tight">
            Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/50 drop-shadow-[0_0_15px_rgba(var(--primary),0.3)]">Projects</span>
          </h2>
          <p className="text-muted-foreground mt-6 max-w-xl text-lg md:text-xl font-light leading-relaxed">
            A curated showcase of applications built with production-grade code, focusing on performance and user experience.
          </p>
        </motion.div>

        <div
          className="flex flex-col gap-5"
          style={{ paddingBottom: `${stackPadding}px` }}
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.name}
              project={project}
              i={i}
              total={PROJECTS.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
