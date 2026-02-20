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
        className="project-card group flex flex-col md:flex-row gap-0 overflow-hidden rounded-2xl hover:shadow-[0_0_30px_rgba(255,255,255,0.03)] border border-transparent hover:border-white/10 transition-all duration-500"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* ── Left: Content ── */}
        <div className="flex-1 flex flex-col p-6">
          {/* Top row */}
          <div className="flex items-center justify-between mb-4">
            <span className="section-label text-[10px] bg-primary/10 px-2 py-1 rounded-md">
              {project.category}
            </span>
            <span className="text-xs text-muted-foreground font-mono bg-white/5 px-2 py-1 rounded-md border border-white/5">
              {project.year}
            </span>
          </div>

          {/* Project number */}
          <div className="text-6xl font-bold text-border/30 font-mono leading-none mb-3 transition-all duration-500 group-hover:text-primary/20 group-hover:translate-x-2 group-hover:-translate-y-1">
            {String(i + 1).padStart(2, "0")}
          </div>

          {/* Name + description */}
          <h3 className="text-xl font-bold mb-2">{project.name}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
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
        <div className="relative w-full md:w-[320px] lg:w-[600px] shrink-0 overflow-hidden bg-black min-h-[240px] md:min-h-0 rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none">
          {/* Thumbnail */}
          <img
            src={project.image}
            alt={project.name}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isHovered ? "opacity-0" : "opacity-100"
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
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />
          )}

          {/* Play badge — shows when NOT hovered */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              isHovered ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="w-11 h-11 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <Play size={16} className="text-white fill-white ml-0.5" />
            </div>
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/20 hidden md:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:hidden" />
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
    <section id="projects" className="py-32 px-6 bg-card/20">
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
            className="section-label inline-block"
          >
            ( PROJECTS )
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 leading-tight">
            Selected <span className="glow-text">Works</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg text-lg">
            Real-world applications built with production-grade code.
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
