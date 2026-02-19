import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { SKILLS } from "@/lib/constants";

const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-16"
        >
          <span className="section-label">( SKILLS )</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 leading-tight">
            Tech <span className="glow-text">Stack</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg text-lg">
            Tools and technologies I work with daily.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {Object.entries(SKILLS).map(([category, skills], catIdx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: catIdx * 0.1, duration: 0.5 }}
              className="glass-card p-6"
            >
              <h3 className="text-sm font-mono tracking-widest text-primary uppercase mb-5">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ delay: catIdx * 0.1 + i * 0.05, duration: 0.3 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="skill-pill"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
