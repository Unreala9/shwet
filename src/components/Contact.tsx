import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Send } from "lucide-react";
import { fadeUp } from "@/lib/motion";
import { DEVELOPER, SOCIALS } from "@/lib/constants";
import { Github, Linkedin, Twitter, Instagram, Youtube, Mail, Facebook } from "lucide-react";

const socialIconMap: Record<string, React.ReactNode> = {
  github: <Github size={18} />,
  linkedin: <Linkedin size={18} />,
  twitter: <Twitter size={18} />,
  instagram: <Instagram size={18} />,
  youtube: <Youtube size={18} />,
  mail: <Mail size={18} />,
  facebook: <Facebook size={18} />,
};

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
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
    console.log("Contact form submitted:", form);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-32 px-6 bg-card/20" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-16"
        >
          <span className="section-label">( CONTACT )</span>
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
                I'm currently open to freelance, full-time, and collaborative opportunities.
                Whether you need a full-stack app built from scratch or want to improve
                an existing system, reach out — I respond within 24 hours.
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
              <div className="flex flex-wrap gap-3">
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-11 h-11 rounded-xl border border-border/60 bg-card/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
                  >
                    {socialIconMap[social.icon]}
                  </a>
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
              <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
                <div>
                  <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2 block">
                    Name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    maxLength={100}
                    className="w-full bg-secondary/40 border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-all duration-200"
                  />
                </div>
                <div>
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
                    className="w-full bg-secondary/40 border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-all duration-200"
                  />
                </div>
                <div>
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
                    className="w-full bg-secondary/40 border border-border/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:bg-primary/5 transition-all duration-200 resize-none"
                  />
                </div>
                {error && <p className="text-destructive text-xs">{error}</p>}
                <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                  <Send size={15} />
                  Get a Quote
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
