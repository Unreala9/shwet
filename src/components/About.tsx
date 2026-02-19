import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { ABOUT_ITEMS, DEVELOPER, EDUCATION } from "@/lib/constants";
import {
  Telescope,
  Users,
  Handshake,
  Sprout,
  MessageCircle,
  Zap,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  telescope: Telescope,
  users: Users,
  handshake: Handshake,
  sprout: Sprout,
  "message-circle": MessageCircle,
  zap: Zap,
};

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 px-6 bg-card/20">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-16"
        >
          <span className="section-label">( ABOUT ME )</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 leading-tight">
            The <span className="glow-text">Dev</span> Behind
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left: Bio + Education */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass-card p-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 text-2xl font-bold text-primary font-mono">
                SC
              </div>
              <h3 className="text-xl font-bold mb-1">{DEVELOPER.name}</h3>
              <p className="text-sm text-primary font-mono mb-4">{DEVELOPER.title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Full Stack MERN Developer skilled in building dynamic, responsive, and user-friendly
                web applications. Quick to adapt, strong in problem-solving, and focused on
                delivering clean, efficient, and scalable solutions.
              </p>
            </div>

            {/* Education */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap size={16} className="text-primary" />
                <span className="text-sm font-mono text-primary uppercase tracking-wider">
                  Education
                </span>
              </div>
              {EDUCATION.map((edu) => (
                <div key={edu.year} className="mb-4 last:mb-0">
                  <div className="text-sm font-semibold text-foreground">{edu.degree}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{edu.institution}</div>
                  <div className="text-xs text-primary font-mono mt-1">{edu.year}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: About items */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="lg:col-span-3 grid gap-4"
          >
            {ABOUT_ITEMS.map((item, i) => {
              const Icon = iconMap[item.icon] || Zap;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  whileHover={{ x: 4 }}
                  className="glass-card p-5 flex gap-4 hover:border-primary/30 transition-all duration-200"
                >
                  <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Icon size={15} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-primary uppercase tracking-wider mb-1">
                      {item.label}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
