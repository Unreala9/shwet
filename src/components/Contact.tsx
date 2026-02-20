import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Send } from "lucide-react";
import { fadeUp } from "@/lib/motion";
import { DEVELOPER, SOCIALS } from "@/lib/constants";
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Facebook,
} from "lucide-react";

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("All fields are required.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${DEVELOPER.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _template: "box",
          _subject: "New Portfolio Message!",
        }),
      });

      const result = await response.json();

      if (response.ok && result.success === "true") {
        setSubmitted(true);
        setForm({ name: "", email: "", message: "" });
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to send message. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 px-6 bg-card/20" ref={ref}>
      <div className="max-w-6xl mx-auto">
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
            ( CONTACT )
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 leading-tight">
            Let's <span className="glow-text">Make It</span> Happen
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg text-lg">
            Have a project in mind? Let's build something great together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Info + Socials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="glass-card p-6">
              <p className="text-muted-foreground leading-relaxed mb-6">
                I'm currently open to freelance, full-time, and collaborative
                opportunities. Whether you need a full-stack app built from
                scratch or want to improve an existing system, reach out — I
                respond within 24 hours.
              </p>
              <a
                href={`mailto:${DEVELOPER.email}`}
                className="text-primary hover:underline font-mono text-sm"
              >
                {DEVELOPER.email}
              </a>
            </div>

            {/* Socials */}
            <div>
              <p className="section-label mb-4">Find Me Online</p>
              <div className="flex flex-wrap gap-2">
                {SOCIALS.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    aria-label={social.label}
                    className="hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 rounded"
                  >
                    <img
                      src={social.badge}
                      alt={social.label}
                      className="h-7 rounded"
                    />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6 }}
          >
            {submitted ? (
              <div className="glass-card p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Send size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                <p className="text-muted-foreground">
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="glass-card p-6 space-y-4"
              >
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2 block">
                    Name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    maxLength={100}
                    className="w-full bg-secondary/40 border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-all duration-200 focus:scale-[1.01]"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2 block">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    maxLength={255}
                    className="w-full bg-secondary/40 border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-all duration-200 focus:scale-[1.01]"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2 block">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or idea..."
                    rows={5}
                    maxLength={1000}
                    className="w-full bg-secondary/40 border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-all duration-200 resize-none focus:scale-[1.01]"
                  />
                </motion.div>
                {error && <p className="text-destructive text-xs">{error}</p>}

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className={`btn-primary w-full flex items-center justify-center gap-2 group overflow-hidden relative shadow-[0_0_20px_rgba(255,255,255,0.0)] ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"} transition-all duration-300`}
                  >
                    <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                    <motion.div
                      animate={
                        isSubmitting ? { rotate: 360 } : { x: [0, 4, 0] }
                      }
                      transition={
                        isSubmitting
                          ? { repeat: Infinity, duration: 1, ease: "linear" }
                          : { repeat: Infinity, duration: 1.5 }
                      }
                    >
                      {isSubmitting ? (
                        <div className="w-4 h-4 border-2 border-white/80 border-t-transparent rounded-full" />
                      ) : (
                        <Send
                          size={15}
                          className="group-hover:rotate-12 transition-transform duration-300"
                        />
                      )}
                    </motion.div>
                    {isSubmitting ? "Sending..." : "Get a Quote"}
                  </motion.button>
                </motion.div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
