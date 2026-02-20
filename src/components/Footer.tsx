import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { NAV_LINKS, SOCIALS, DEVELOPER } from "@/lib/constants";
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Mail,
} from "lucide-react";

const Footer = () => {
  const [time, setTime] = useState("");
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Asia/Kolkata",
        }) + " IST",
      );
    };
    updateTime();
    const t = setInterval(updateTime, 1000);
    const scrollHandler = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", scrollHandler);
    return () => {
      clearInterval(t);
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const scrollTo = (href: string) => {
    const el = document.getElementById(href.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border/30 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold mb-3">
              SC<span className="text-primary">.</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Full Stack MERN Developer crafting scalable, performant web
              experiences.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
              Navigate
            </p>
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors text-left w-fit"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Socials + Time */}
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
              Socials
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="hover:scale-110 hover:opacity-90 transition-all duration-200"
                >
                  <img
                    src={social.badge}
                    alt={social.label}
                    className="h-[22px] rounded-sm"
                  />
                </a>
              ))}
            </div>
            {time && (
              <p className="text-xs font-mono text-muted-foreground">
                LOCAL TIME — {time}
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-border/30 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-mono">
            © 2025 {DEVELOPER.name} — Built with React & Framer Motion
          </p>
          <p className="text-xs text-muted-foreground">
            <a
              href={`mailto:${DEVELOPER.email}`}
              className="hover:text-primary transition-colors"
            >
              {DEVELOPER.email}
            </a>
          </p>
        </div>
      </div>

      {/* Scroll to top */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        animate={{ opacity: showTop ? 1 : 0, y: showTop ? 0 : 10 }}
        transition={{ duration: 0.2 }}
        aria-label="Scroll to top"
        className="fixed bottom-8 right-8 w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-110 hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)] transition-all duration-200 z-40"
        style={{ pointerEvents: showTop ? "auto" : "none" }}
      >
        <ArrowUp size={16} />
      </motion.button>
    </footer>
  );
};

export default Footer;
