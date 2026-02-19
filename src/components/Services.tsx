import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { staggerContainer, staggerItem, fadeUp } from "@/lib/motion";
import { SERVICES } from "@/lib/constants";

const Services = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-32 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-16"
        >
          <span className="section-label">( SERVICES )</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 leading-tight">
            What I <span className="glow-text">Build</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg text-lg">
            End-to-end solutions — from architecture to deployment.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-6"
        >
          {SERVICES.map((service) => (
            <motion.div key={service.number} variants={staggerItem} className="service-card">
              <div className="flex items-start justify-between mb-6">
                <span className="text-5xl font-bold text-border font-mono">{service.number}</span>
                <div className="w-2 h-2 rounded-full bg-primary mt-3" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-2.5 py-1 text-xs rounded-md bg-secondary/60 text-secondary-foreground border border-border/40"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
