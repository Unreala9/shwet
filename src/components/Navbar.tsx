import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
      for (const s of sections.reverse()) {
        const el = document.getElementById(s);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(s);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed left-0 right-0 z-50 transition-all duration-500 flex justify-center ${
        scrolled ? "top-4 px-4" : "top-0 px-6 py-5"
      }`}
    >
      <div
        className={`w-full flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? "max-w-4xl bg-black/40 backdrop-blur-md border border-white/10 rounded-full py-3 px-6 shadow-2xl"
            : "max-w-6xl"
        }`}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo("#home")}
          className="text-foreground font-bold text-xl tracking-tighter hover:text-primary transition-colors flex items-center gap-1 group relative z-50"
        >
          SC
          <span className="text-primary -ml-0.5 group-hover:animate-pulse">
            .
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 relative z-50">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`nav-link text-sm font-medium transition-all duration-300 relative py-1 ${
                activeSection === link.href.replace("#", "")
                  ? "text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.8)]"
                  : "text-muted-foreground hover:text-foreground hover:-translate-y-0.5"
              }`}
            >
              {link.label}
              {activeSection === link.href.replace("#", "") && (
                <motion.div
                  layoutId="navbar-active"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-4 relative z-50">
          <button
            onClick={() => scrollTo("#contact")}
            className="hidden md:flex items-center gap-2 bg-primary text-primary-foreground rounded-full font-semibold text-sm px-5 py-2 hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_hsl(0_0_90%/0.15)]"
          >
            Hire Me <ArrowUpRight size={14} className="opacity-80" />
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-foreground p-1 z-50 relative hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{
              opacity: 0,
              y: -20,
              filter: "blur(10px)",
              transition: { duration: 0.2 },
            }}
            className={`absolute left-4 right-4 md:hidden bg-card/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden ${
              scrolled ? "top-20" : "top-16"
            }`}
          >
            <div className="px-6 py-10 flex flex-col gap-6 items-center">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`text-2xl font-semibold tracking-tight transition-colors ${
                    activeSection === link.href.replace("#", "")
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="w-full h-px bg-white/10 my-2" />
              <button
                onClick={() => scrollTo("#contact")}
                className="btn-primary w-full text-center py-4 text-base flex justify-center items-center gap-2"
              >
                Let's Work Together <ArrowUpRight size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
