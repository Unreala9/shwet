import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { fadeUp } from "@/lib/motion";
import { Star, GitFork, Users, BookOpen, ExternalLink, Trophy, Crown, Terminal, Zap, Flame, Award, Code } from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const USERNAME = "Unreala9";

/* ─── Types ─── */
interface GHUser { public_repos: number; followers: number; }
interface GHRepo {
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  language: string | null;
}
interface GHOrg {
  login: string;
  avatar_url: string;
  id: number;
}
interface ContribDay { date: string; count: number; level: 0 | 1 | 2 | 3 | 4; }
interface ContribData { total: Record<string, number>; contributions: ContribDay[]; }

/* ─── Monochrome level colours ─── */
const LEVEL_COLORS = [
  "bg-white/5",      // 0  – none
  "bg-white/20",     // 1  – low
  "bg-white/40",     // 2  – medium
  "bg-white/65",     // 3  – high
  "bg-white/90",     // 4  – max
] as const;

/* ─── Chart Colors (Monochrome/Accent) ─── */
const CHART_COLORS = [
  "#ffffff", // White
  "#a3a3a3", // Neutral 400
  "#525252", // Neutral 600
  "#262626", // Neutral 800
  "#e5e5e5", // Neutral 200
  "#737373", // Neutral 500
];

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS   = ["","Mon","","Wed","","Fri",""];

/* ─── Helper: Auth Headers ─── */
const _rawToken = import.meta.env.VITE_GITHUB_TOKEN as string | undefined;
const GITHUB_TOKEN = _rawToken && (_rawToken.startsWith("ghp_") || _rawToken.startsWith("github_pat_")) ? _rawToken : undefined;

const authHeaders = (extra?: Record<string, string>) => ({
  Accept: "application/vnd.github+json",
  ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
  ...extra,
});

/* ─── Stat Card Component ─── */
const StatBadge = ({ icon: Icon, label, value, delay, inView }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
    animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
    transition={{ delay, duration: 0.5, ease: "easeOut" }}
    whileHover={{ y: -5, scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }}
    className="glass-card p-5 flex items-center gap-4 group hover:border-primary/20 hover:bg-white/5 transition-all duration-300 cursor-default"
  >
    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
      <Icon size={20} className="text-foreground/80 group-hover:text-primary transition-colors duration-300" />
    </div>
    <div>
      <p className="text-3xl font-bold text-foreground tracking-tight">
        {value === null ? <span className="inline-block w-8 h-6 bg-white/5 animate-pulse rounded" /> : value.toLocaleString()}
      </p>
      <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mt-1">{label}</p>
    </div>
  </motion.div>
);

/* ─── Activity Chart Tooltip ─── */
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/80 backdrop-blur-md border border-white/10 p-3 rounded-lg shadow-xl">
        <p className="text-sm font-semibold mb-1">{label}</p>
        <p className="text-xs text-muted-foreground">
          <span className="text-white font-mono">{payload[0].value}</span> contributions
        </p>
      </div>
    );
  }
  return null;
};

/* ─── Contribution Calendar Component ─── */
const ContribCalendar = ({ data, year }: { data: ContribDay[]; year: number }) => {
  const yearStr = String(year);

  // Create full year data map
  const dataMap = new Map(data.map(d => [d.date, d]));

  // Generate distinct full year array
  const fullYearDays: ContribDay[] = [];
  const start = new Date(`${yearStr}-01-01`);
  const end = new Date(`${yearStr}-12-31`);

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split("T")[0];
    const existing = dataMap.get(dateStr);
    fullYearDays.push(existing || { date: dateStr, count: 0, level: 0 });
  }

  const jan1Dow = new Date(`${yearStr}-01-01`).getDay();
  const cells: (ContribDay | null)[] = [...Array(jan1Dow).fill(null), ...fullYearDays];
  const numWeeks = Math.ceil(cells.length / 7);
  // Pad end
  while (cells.length < numWeeks * 7) cells.push(null);

  const weeks: (ContribDay | null)[][] = [];
  for (let w = 0; w < numWeeks; w++) weeks.push(cells.slice(w * 7, w * 7 + 7));

  // Month labels
  const monthLabels: { label: string; col: number }[] = [];
  weeks.forEach((week, col) => {
    week.forEach(day => {
      if (day && day.date.endsWith("-01")) {
        const m = parseInt(day.date.split("-")[1], 10) - 1;
        monthLabels.push({ label: MONTHS[m], col });
      }
    });
  });

  const totalYear = fullYearDays.reduce((s, d) => s + d.count, 0);

  return (
    <div className="overflow-x-auto pb-2">
      <div style={{ minWidth: `${numWeeks * 15}px` }}> {/* Slightly tighter packing */}
        <div className="flex justify-between items-end mb-4">
          <p className="text-sm text-muted-foreground">
            <span className="text-foreground font-bold text-lg">{totalYear.toLocaleString()}</span> contributions in {year}
          </p>
        </div>

        <div className="flex gap-2">
          <div className="flex flex-col gap-[3px] pt-[22px] pr-2">
            {DAYS.map((d, i) => (
              <span key={i} className="text-[10px] text-muted-foreground/50 h-[12px] flex items-center leading-none">{d}</span>
            ))}
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex gap-[3px] mb-1 h-[14px] relative">
              {monthLabels.map((m, i) => (
                <span key={i} className="absolute text-[10px] text-muted-foreground/70" style={{ left: m.col * 15 }}>{m.label}</span>
              ))}
            </div>

            {Array.from({ length: 7 }).map((_, row) => (
              <div key={row} className="flex gap-[2px]">
                {weeks.map((week, col) => {
                  const day = week[row];
                  return (
                    <div
                      key={col}
                      title={day ? `${day.date}: ${day.count} contributions` : ""}
                      className={`w-[12px] h-[12px] rounded-[2px] transition-all duration-200 hover:scale-125 hover:z-10 ${day ? LEVEL_COLORS[day.level] : "bg-transparent"}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


/* ─── Main Component ─── */
const GithubStats = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [userData, setUserData] = useState<GHUser | null>(null);
  const [repos, setRepos] = useState<GHRepo[]>([]);
  const [orgs, setOrgs] = useState<GHOrg[]>([]);
  const [totalStars, setTotalStars] = useState<number | null>(null);
  const [totalForks, setTotalForks] = useState<number | null>(null);
  const [contribs, setContribs] = useState<ContribDay[] | null>(null);
  const [contribYear, setContribYear] = useState(new Date().getFullYear());

  // Derived state for charts
  const [activityData, setActivityData] = useState<any[]>([]);
  const [langData, setLangData] = useState<any[]>([]);

  /* ── Initial Data Fetch ── */
  useEffect(() => {
    // User Profile
    fetch(`https://api.github.com/users/${USERNAME}`, { headers: authHeaders() })
      .then(r => r.json())
      .then((u: GHUser) => setUserData(u))
      .catch(() => {});

    // Orgs
    fetch(`https://api.github.com/users/${USERNAME}/orgs`, { headers: authHeaders() })
      .then(r => r.json())
      .then((o: GHOrg[]) => setOrgs(o))
      .catch(() => {});

    // Repos (All Pages)
    (async () => {
      let allRepos: GHRepo[] = [];
      let page = 1;
      try {
        while (true) {
          const r = await fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&page=${page}`, { headers: authHeaders() });
          const list: GHRepo[] = await r.json();
          if (!Array.isArray(list) || !list.length) break;
          allRepos.push(...list);
          if (list.length < 100) break;
          page++;
        }
      } catch {}

      setRepos(allRepos);

      // Calculate Stars & Forks
      let s = 0, f = 0;
      allRepos.forEach(r => {
        if (!r.fork) { s += r.stargazers_count; f += r.forks_count; }
      });
      setTotalStars(s);
      setTotalForks(f);

      // Calculate Languages (Top 5)
      const langs: Record<string, number> = {};
      allRepos.forEach(r => {
        if (r.language) langs[r.language] = (langs[r.language] || 0) + 1;
      });
      const langChartData = Object.entries(langs)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);
      setLangData(langChartData);

    })();
  }, []);

  /* ── Contributions Fetch ── */
  useEffect(() => {
    setContribs(null);

    const processContributions = (days: ContribDay[]) => {
      setContribs(days);

      // Aggregate for Activity Chart (Monthly)
      const monthly: Record<string, number> = {};
      days.forEach(d => {
        const month = d.date.slice(0, 7); // YYYY-MM
        monthly[month] = (monthly[month] || 0) + d.count;
      });
      const chartData = Object.entries(monthly)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([date, count]) => ({ date, count }));

      setActivityData(chartData);
    };

    if (GITHUB_TOKEN) {
      /* GraphQL (Private Included) */
      const from = `${contribYear}-01-01T00:00:00Z`;
      const to = contribYear === new Date().getFullYear() ? new Date().toISOString() : `${contribYear}-12-31T23:59:59Z`;

      fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: authHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({
          query: `query {
            user(login: "${USERNAME}") {
              contributionsCollection(from: "${from}", to: "${to}") {
                contributionCalendar {
                  totalContributions
                  weeks { contributionDays { date contributionCount contributionLevel } }
                }
              }
            }
          }`
        })
      })
      .then(r => r.json())
      .then(json => {
        const cal = json?.data?.user?.contributionsCollection?.contributionCalendar;
        if (!cal) return;
        const levelMap: any = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 };
        const days = cal.weeks.flatMap((w: any) => w.contributionDays.map((d: any) => ({
          date: d.date, count: d.contributionCount, level: levelMap[d.contributionLevel] ?? 0
        })));
        processContributions(days);
      })
      .catch(() => useFallbackApi());
    } else {
      useFallbackApi();
    }

    function useFallbackApi() {
      fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=${contribYear}`)
        .then(r => r.json())
        .then((d: ContribData) => processContributions(d.contributions))
        .catch(() => setContribs([]));
    }

  }, [contribYear]);


  return (
    <section className="py-24 px-6 md:px-12 bg-black/40">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
          animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0 } : { opacity: 0, filter: "blur(10px)", y: 20 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="section-label mb-2 block text-primary/80 tracking-widest text-xs font-bold uppercase"
            >
              ( ANALYTICS )
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              GitHub <span className="text-white">Overview</span>
            </h2>
          </div>
          <a href={`https://github.com/${USERNAME}`} target="_blank" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors group">
            View Profile <ExternalLink size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>

        {/* ─── KPI Cards ─── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatBadge icon={BookOpen} label="Public Repos" value={userData?.public_repos ?? null} delay={0.1} inView={inView} />
          <StatBadge icon={Users} label="Followers" value={userData?.followers ?? null} delay={0.2} inView={inView} />
          <StatBadge icon={Star} label="Stars Earned" value={totalStars} delay={0.3} inView={inView} />
          <StatBadge icon={GitFork} label="Forks" value={totalForks} delay={0.4} inView={inView} />
        </div>

        {/* ─── Dashboard Grid ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

          {/* Main Chart: Activity Trends */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 glass-card p-6 min-h-[350px] flex flex-col"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-white/90">Activity Trends</h3>
              <div className="flex gap-2">
                 {[new Date().getFullYear(), new Date().getFullYear()-1, new Date().getFullYear()-2].map(y => (
                   <button key={y} onClick={() => setContribYear(y)} className={`px-3 py-1 text-xs rounded-full border transition-all ${contribYear === y ? "bg-white text-black border-white" : "border-white/10 text-muted-foreground hover:border-white/30"}`}>{y}</button>
                 ))}
              </div>
            </div>

            <div className="flex-1 w-full min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#fff" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#fff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" hide />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }} />
                  <Area type="monotone" dataKey="count" stroke="#fff" strokeWidth={2} fillOpacity={1} fill="url(#colorCount)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Calendar Grid Below Chart */}
            <div className="mt-8 pt-6 border-t border-white/5">
               {contribs ? <ContribCalendar data={contribs} year={contribYear} /> : <div className="h-[120px] bg-white/5 animate-pulse rounded-lg" />}
            </div>
          </motion.div>

          {/* Right Column: Languages & Achievements */}
          <div className="flex flex-col gap-6">

            {/* Languages Donut */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="glass-card p-6 flex-1 min-h-[300px]"
            >
              <h3 className="text-lg font-semibold text-white/90 mb-4">Top Languages</h3>
              <div className="h-[200px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={langData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {langData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#000', borderRadius: '8px', border: '1px solid #333' }} itemStyle={{ color: '#fff' }} />
                  </PieChart>
                </ResponsiveContainer>
                {/* Centered Total Label */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                   <div className="text-center">
                      <span className="block text-2xl font-bold text-white">{langData.length}</span>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Langs</span>
                   </div>
                </div>
              </div>

              {/* Legend */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                {langData.map((l, i) => (
                   <div key={l.name} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }} />
                      {l.name}
                   </div>
                ))}
              </div>
            </motion.div>

            {/* Organizations */}
            {orgs.length > 0 && (
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={inView ? { opacity: 1, y: 0 } : {}}
                 transition={{ delay: 0.4 }}
                 className="glass-card p-6"
               >
                 <h3 className="text-sm font-semibold text-white/90 mb-3 uppercase tracking-wider">Organizations</h3>
                 <div className="flex flex-wrap gap-3">
                   {orgs.map(org => (
                     <a key={org.id} href={`https://github.com/${org.login}`} target="_blank" title={org.login} className="block transition-transform hover:scale-110">
                        <img src={org.avatar_url} alt={org.login} className="w-10 h-10 rounded-lg border border-white/10" />
                     </a>
                   ))}
                 </div>
               </motion.div>
            )}

          </div>
        </div>

        {/* ─── Footer: Trophies & Streak ─── */}
        <div className="grid md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }} className="glass-card p-6 flex flex-col justify-center items-center">
               <div className="flex items-center gap-2 mb-4 w-full text-left">
                 <Trophy size={16} className="text-yellow-500" />
                 <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest">Achievements</h3>
               </div>

               <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3">
                 {[
                   { id: "stargazer", name: "Stargazer", desc: `${totalStars || 0} Stars`, icon: Star, color: "text-amber-400", bg: "bg-amber-400/10", active: (totalStars || 0) > 0 },
                   { id: "forks", name: "Forked", desc: `${totalForks || 0} Forks`, icon: GitFork, color: "text-emerald-400", bg: "bg-emerald-400/10", active: (totalForks || 0) > 0 },
                   { id: "polyglot", name: "Polyglot", desc: `${langData.length || 0} Langs`, icon: Code, color: "text-blue-400", bg: "bg-blue-400/10", active: (langData.length || 0) >= 3 },
                   { id: "creator", name: "Creator", desc: `${userData?.public_repos || 0} Repos`, icon: BookOpen, color: "text-purple-400", bg: "bg-purple-400/10", active: (userData?.public_repos || 0) >= 10 },
                   { id: "influencer", name: "Influencer", desc: `${userData?.followers || 0} Follows`, icon: Users, color: "text-pink-400", bg: "bg-pink-400/10", active: (userData?.followers || 0) >= 5 },
                   { id: "pro", name: "Pro Coder", desc: "Elite Stats", icon: Crown, color: "text-orange-400", bg: "bg-orange-400/10", active: (totalStars || 0) > 20 || (userData?.followers || 0) > 10 },
                 ].map((ach, i) => (
                    <motion.div
                      key={ach.id}
                      initial={{ opacity: 0, y: 15, scale: 0.9 }}
                      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 15, scale: 0.9 }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.4, type: "spring", stiffness: 200 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border ${ach.active ? 'border-white/10 bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.02)] hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]' : 'border-transparent bg-white/5 opacity-40 grayscale'} transition-all hover:bg-white/10`}
                    >
                       <div className={`w-8 h-8 rounded-full mb-2 flex items-center justify-center transition-transform duration-300 ${ach.active ? 'group-hover:scale-110 ' + ach.bg : 'bg-black/20'}`}>
                         <ach.icon size={16} className={ach.active ? ach.color : 'text-muted-foreground'} />
                       </div>
                       <span className="text-xs font-semibold text-foreground text-center line-clamp-1">{ach.name}</span>
                       <span className="text-[10px] text-muted-foreground text-center line-clamp-1">{ach.desc}</span>
                    </motion.div>
                 ))}
               </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6 }} className="glass-card p-6 flex items-center justify-center">
              <img
                src={`https://streak-stats.demolab.com?user=${USERNAME}&hide_border=true&background=00000000&ring=e5e5e5&fire=e5e5e5&currStreakLabel=e5e5e5&sideLabels=888888&dates=555555&currStreakNum=ffffff&sideNums=aaaaaa&stroke=2a2a2a`}
                alt="Streak"
                className="w-full max-w-sm"
              />
            </motion.div>
        </div>

      </div>
    </section>
  );
};

export default GithubStats;
