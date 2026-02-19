import { useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { fadeUp } from "@/lib/motion";
import { DEV_QUOTES } from "@/lib/constants";
import { Quote } from "lucide-react";

const DevQuote = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % DEV_QUOTES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 px-6 bg-card/20" ref={ref}>
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <p className="section-label mb-6">Random Developer Thought</p>
          <Quote size={32} className="text-primary/40 mx-auto mb-6" />
          <div className="h-20 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-xl md:text-2xl text-foreground/80 font-light leading-relaxed italic"
              >
                "{DEV_QUOTES[index]}"
              </motion.blockquote>
            </AnimatePresence>
          </div>
          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {DEV_QUOTES.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "bg-primary w-4" : "bg-border"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DevQuote;
