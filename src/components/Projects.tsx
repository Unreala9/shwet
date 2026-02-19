import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";
import { staggerContainer, staggerItem, fadeUp } from "@/lib/motion";
import { PROJECTS } from "@/lib/constants";

const Projects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-32 px-6 bg-card/20">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-16"
        >
          <span className="section-label">( PROJECTS )</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 leading-tight">
            Selected <span className="glow-text">Works</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg text-lg">
            Real-world applications built with production-grade code.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.name}
              variants={staggerItem}
              whileHover={{ y: -4, rotateX: 2 }}
              className="project-card"
            >
              {/* Top row */}
              <div className="flex items-center justify-between mb-4">
                <span className="section-label text-[10px]">{project.category}</span>
                <span className="text-xs text-muted-foreground font-mono">{project.year}</span>
              </div>

              {/* Project number */}
              <div className="text-6xl font-bold text-border/30 font-mono leading-none mb-3">
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Name */}
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {project.name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Links */}
              <div className="flex items-center gap-3 mt-auto">
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
                    Live
                  </a>
                )}
                <div className="ml-auto w-8 h-8 rounded-full border border-border/40 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/5 transition-all">
                  <ExternalLink size={12} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
