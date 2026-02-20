import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp } from "@/lib/motion";

const TECH_LOGOS: Record<string, string> = {
  "C++": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  "C": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
  "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "Java": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  "React.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  "Bootstrap": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  "HTML5": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  "CSS3": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "Express": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  "PostgreSQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  "Supabase": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
  "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  "GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  "VS Code": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  "Netlify": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg",
  "Vercel": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
  "Cloudflare": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg",
  "Figma": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  "Canva": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg",
};

// Skills that have dark/black logos — invert them on the dark bg
const DARK_LOGOS = new Set(["GitHub", "Vercel", "Next.js", "Express"]);

const SKILLS: { category: string; items: string[] }[] = [
  { category: "Languages",  items: ["JavaScript", "TypeScript", "Python", "Java", "C++", "C"] },
  { category: "Frontend",   items: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"] },
  { category: "Backend",    items: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Supabase"] },
  { category: "Tools",      items: ["Git", "GitHub", "VS Code", "Vercel", "Netlify", "Cloudflare"] },
  { category: "Design",     items: ["Figma", "Canva"] },
];

/* ── Single skill tile ── */
const SkillTile = ({
  skill,
  delay,
  inView,
}: {
  skill: string;
  delay: number;
  inView: boolean;
}) => {
  const logo = TECH_LOGOS[skill];
  const isDark = DARK_LOGOS.has(skill);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
      transition={{ delay, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, scale: 1.06, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      className="group relative flex flex-col items-center justify-center gap-2.5 p-4 rounded-2xl
                 border border-border/40 bg-card/50 cursor-default
                 hover:border-white/25 hover:bg-white/5
                 transition-colors duration-300"
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
                      shadow-[0_0_30px_hsl(0_0%_100%/0.06)] pointer-events-none" />

      {logo ? (
        <img
          src={logo}
          alt={skill}
          draggable={false}
          className="w-9 h-9 object-contain select-none"
          style={{ filter: isDark ? "invert(1) brightness(0.8)" : undefined }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
      ) : (
        /* Fallback monogram when no logo */
        <span className="w-9 h-9 flex items-center justify-center text-lg font-bold text-foreground/40 font-mono">
          {skill.slice(0, 2).toUpperCase()}
        </span>
      )}

      <span className="text-[11px] font-medium text-muted-foreground group-hover:text-foreground/90
                       transition-colors duration-200 text-center leading-tight whitespace-nowrap">
        {skill}
      </span>
    </motion.div>
  );
};

/* ── Category block ── */
const CategoryBlock = ({
  category,
  items,
  catIdx,
  inView,
}: {
  category: string;
  items: string[];
  catIdx: number;
  inView: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
    transition={{ delay: catIdx * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
  >
    {/* Category label */}
    <div className="flex items-center gap-3 mb-5">
      <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/40">
        {category}
      </span>
      <div className="flex-1 h-px bg-border/40" />
    </div>

    {/* Tile grid */}
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
      {items.map((skill, i) => (
        <SkillTile
          key={skill}
          skill={skill}
          delay={catIdx * 0.08 + i * 0.04}
          inView={inView}
        />
      ))}
    </div>
  </motion.div>
);

/* ── Section ── */
const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>

        {/* Header */}
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

        {/* Categories stacked vertically */}
        <div className="space-y-12">
          {SKILLS.map((group, catIdx) => (
            <CategoryBlock
              key={group.category}
              category={group.category}
              items={group.items}
              catIdx={catIdx}
              inView={inView}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
