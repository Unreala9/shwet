import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp } from "@/lib/motion";
import { DEVELOPER } from "@/lib/constants";

const GithubStats = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const username = DEVELOPER.githubUsername;

  const stats = [
    {
      label: "GitHub Stats",
      src: `https://github-readme-stats.vercel.app/api?username=${username}&theme=dark&bg_color=0d1117&title_color=4ade80&text_color=9ca3af&icon_color=4ade80&border_color=1f2937&hide_border=false`,
    },
    {
      label: "Streak Stats",
      src: `https://nirzak-streak-stats.vercel.app/?user=${username}&theme=dark&background=0d1117&stroke=1f2937&ring=4ade80&fire=4ade80&currStreakLabel=4ade80&border=1f2937`,
    },
    {
      label: "Top Languages",
      src: `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&theme=dark&bg_color=0d1117&title_color=4ade80&text_color=9ca3af&border_color=1f2937&layout=compact`,
    },
    {
      label: "Trophies",
      src: `https://github-profile-trophy.vercel.app/?username=${username}&theme=radical&no-frame=true&column=4&margin-w=4&margin-h=4`,
    },
  ];

  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-16"
        >
          <span className="section-label">( GITHUB )</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 leading-tight">
            GitHub <span className="glow-text">Insights</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg text-lg">
            My open-source activity and contributions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card p-6 overflow-hidden"
            >
              <p className="section-label mb-4">{stat.label}</p>
              <img
                src={stat.src}
                alt={stat.label}
                className="w-full rounded-lg"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GithubStats;
