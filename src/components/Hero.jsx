'use client';

import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useTransform,
  useSpring
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  FaReact, FaNodeJs, FaJs, FaPhp,
  FaLaravel, FaPython, FaAws, FaDocker
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiTypescript,
  SiPostgresql,
  SiNextdotjs,
  SiGraphql,
  SiRedis,
  SiVite,
} from "react-icons/si";
import { ArrowRight, Sparkles, ChevronRight, CheckCircle2 } from "lucide-react";
import Chatbot from "./Chatbot";
import TypewriterHeadline from "./TypewriterHeadline";

/* ================= DATA ================= */
const slides = [
  {
    category: "Architecture",
    title: "Web Systems & Cloud Platforms",
    desc: "High-performance enterprise applications engineered for ultra-low latency, bulletproof reliability, and scale.",
    badge: "Enterprise Ready"
  },
  {
    category: "Engineering",
    title: "Custom System Development",
    desc: "Bespoke digital platforms tailored precisely to streamline operations, automate workflows, and reduce overhead.",
    badge: "Full-Stack Precision"
  },
  {
    category: "Infrastructure",
    title: "Cloud Solutions & DevOps",
    desc: "Robust, auto-scaling cloud environments on AWS & modern clusters ensuring 99.9% uptime and compliance.",
    badge: "High Availability"
  },
  {
    category: "Mobile",
    title: "Cross-Platform Mobile Apps",
    desc: "Fluid, native-feel iOS and Android applications developed with modern design standards and responsive UX.",
    badge: "iOS & Android"
  },
  {
    category: "Design",
    title: "Human-Centric UI / UX Design",
    desc: "Intuitive product design systems and interactive interfaces that elevate customer retention and user delight.",
    badge: "Design Systems"
  },
  {
    category: "Security",
    title: "Cybersecurity & Data Governance",
    desc: "Continuous perimeter defenses, automated vulnerability audits, and bank-grade data encryption protocols.",
    badge: "Zero-Trust Security"
  },
];

const bgImages = ["/images/bg1.png", "/images/bg2.png", "/images/bg3.png", "/images/bg4.png"];

const gradients = [
  "from-black/75 via-black/45 to-transparent",
  "from-zinc-950/75 via-black/45 to-amber-950/20",
  "from-black/75 via-zinc-900/45 to-orange-950/20",
  "from-black/75 via-black/50 to-transparent",
];

const techStack = [
  { icon: FaReact, name: "React 19", category: "Frontend", color: "#61DAFB" },
  { icon: SiNextdotjs, name: "Next.js 15", category: "Full-Stack", color: "#FFFFFF" },
  { icon: SiTypescript, name: "TypeScript", category: "Type Safety", color: "#3178C6" },
  { icon: FaNodeJs, name: "Node.js", category: "Runtime", color: "#339933" },
  { icon: FaPython, name: "Python", category: "AI & Automation", color: "#3776AB" },
  { icon: FaAws, name: "AWS", category: "Cloud Infra", color: "#FF9900" },
  { icon: FaDocker, name: "Docker", category: "Containers", color: "#2496ED" },
  { icon: SiPostgresql, name: "PostgreSQL", category: "Database", color: "#4169E1" },
  { icon: SiTailwindcss, name: "Tailwind CSS", category: "Modern UI", color: "#06B6D4" },
  { icon: SiRedis, name: "Redis", category: "Cache & PubSub", color: "#DC382D" },
  { icon: SiGraphql, name: "GraphQL", category: "API Layer", color: "#E10098" },
  { icon: SiVite, name: "Vite", category: "Fast Bundler", color: "#646CFF" },
  { icon: FaLaravel, name: "Laravel", category: "Backend", color: "#FF2D20" },
  { icon: FaPhp, name: "PHP", category: "Server Logic", color: "#777BB4" },
  { icon: FaJs, name: "JavaScript", category: "Core Web", color: "#F7DF1E" },
];

export default function Hero({ loaded = true }) {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const reduceMotion = useReducedMotion();
  const timerRef = useRef(null);

  /* ================= AUTO SLIDE ================= */
  useEffect(() => {
    if (isHovered) return;

    const startTimer = () => {
      timerRef.current = setInterval(() => {
        setIndex((prev) => (prev + 1) % slides.length);
      }, 5500);
    };

    startTimer();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  const handleDotClick = (i) => {
    setIndex(i);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  /* ================= PARALLAX ================= */
  const mX = useMotionValue(0);
  const mY = useMotionValue(0);

  const smoothX = useSpring(mX, { damping: 25, stiffness: 150 });
  const smoothY = useSpring(mY, { damping: 25, stiffness: 150 });

  const bgX = useTransform(smoothX, [-0.5, 0.5], ["-12px", "12px"]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], ["-12px", "12px"]);

  const handleMouseMove = (e) => {
    if (window.innerWidth < 1024 || reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mX.set((e.clientX - rect.left) / rect.width - 0.5);
    mY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mX.set(0);
        mY.set(0);
      }}
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden text-white bg-transparent pt-28 pb-16 lg:py-0 lg:justify-center"
    >
      {/* BACKGROUND IMAGE & AMBIENT OVERLAYS */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={index % bgImages.length}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${bgImages[index % bgImages.length]})`,
              x: bgX,
              y: bgY
            }}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 0.35, scale: 1.02 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          />
        </AnimatePresence>

        {/* Ambient Gradient Mesh */}
        <div className={`absolute inset-0 bg-gradient-to-tr ${gradients[index % gradients.length]} z-10`} />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-horizon-orange/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-horizon-amber/15 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* MAIN CONTAINER (SCROLL UP & DOWN ANIMATED) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-12 my-auto"
      >
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* LEFT COLUMN: HERO CONTENT */}
          <div className="lg:col-span-7">
            {/* BADGE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-horizon-amber animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-horizon-amber">
                Next-Gen IT Solutions & Development
              </span>
            </motion.div>

            {/* HEADLINE WITH INTERACTIVE TYPEWRITER */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6"
            >
              <TypewriterHeadline loaded={loaded} />
            </motion.div>

            {/* DESCRIPTION */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
              transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
              className="text-zinc-300 text-sm sm:text-lg lg:text-xl font-light leading-relaxed max-w-2xl mb-8"
            >
              We craft mission-critical web systems, bespoke software platforms, and cloud infrastructure engineered for companies ready to lead the future.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
              transition={{ duration: 0.7, delay: 0.65, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4"
            >
              <button
                onClick={() => scrollTo("services")}
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl font-bold text-sm text-black bg-gradient-to-r from-horizon-orange via-horizon-amber to-horizon-yellow shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollTo("about")}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-medium text-sm text-zinc-200 bg-white/[0.05] border border-white/10 backdrop-blur-md hover:bg-white/[0.1] hover:text-white hover:border-white/20 transition-all duration-200"
              >
                <span>Why Horizon</span>
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </button>
            </motion.div>

            {/* HIGHLIGHT STATS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
              className="grid grid-cols-3 gap-3 sm:gap-6 pt-8 sm:pt-10 mt-8 sm:mt-10 border-t border-white/10 max-w-lg"
            >
              <div>
                <p className="text-xl sm:text-3xl font-extrabold text-white">99.9%</p>
                <p className="text-[10px] sm:text-xs text-zinc-400 font-medium mt-1 truncate">Uptime SLA</p>
              </div>
              <div className="border-x border-white/10 px-2 sm:px-4">
                <p className="text-xl sm:text-3xl font-extrabold text-white">50+</p>
                <p className="text-[10px] sm:text-xs text-zinc-400 font-medium mt-1 truncate">Systems Built</p>
              </div>
              <div>
                <p className="text-xl sm:text-3xl font-extrabold text-white">24/7</p>
                <p className="text-[10px] sm:text-xs text-zinc-400 font-medium mt-1 truncate">Monitoring</p>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: INTERACTIVE SHOWCASE CARD */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={loaded ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.92, y: 30 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-3xl p-6 sm:p-8 bg-zinc-950/60 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-black/80 group"
            >
              {/* GLOW DECORATION */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-horizon-orange/20 to-horizon-amber/20 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-horizon-amber/15 text-horizon-amber border border-horizon-amber/30">
                  {slides[index].category}
                </span>
                <span className="text-xs text-zinc-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-horizon-green" />
                  {slides[index].badge}
                </span>
              </div>

              {/* SLIDE CONTENT */}
              <div className="min-h-[140px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35 }}
                  >
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
                      {slides[index].title}
                    </h3>
                    <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                      {slides[index].desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* PROGRESS BAR */}
              <div className="mt-8">
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    key={index}
                    className="h-full bg-gradient-to-r from-horizon-orange to-horizon-amber"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5.5, ease: "linear" }}
                  />
                </div>
              </div>

              {/* SLIDE CONTROLS / DOTS */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                <div className="flex gap-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handleDotClick(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className="p-1 group focus:outline-none"
                    >
                      <div
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === index
                            ? "w-8 bg-gradient-to-r from-horizon-orange to-horizon-amber"
                            : "w-2.5 bg-white/20 group-hover:bg-white/40"
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => scrollTo("services")}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-horizon-amber hover:text-horizon-yellow transition-colors"
                >
                  <span>Learn more</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>

        </div>
      </motion.div>

      {/* ================= CONTINUOUS TECH STACK CAROUSEL (SCROLL UP & DOWN ANIMATED) ================= */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-20 w-full bg-zinc-950/85 border-t border-white/10 backdrop-blur-2xl py-6 mt-14 overflow-hidden"
      >
        {/* HEADER BAR */}
        <div className="max-w-7xl mx-auto px-6 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-horizon-amber opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-horizon-amber" />
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-horizon-orange via-horizon-amber to-horizon-yellow">
              Powered By Modern Stack
            </span>
          </div>

          <div className="flex items-center gap-2.5 text-[11px] font-medium text-zinc-400">
            <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5">Cloud-Native</span>
            <span>•</span>
            <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5">Zero-Downtime</span>
            <span>•</span>
            <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5">Enterprise-Grade</span>
          </div>
        </div>

        {/* CONTINUOUS MARQUEE TRACK WITH BILATERAL GRADIENT MASKS */}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] py-2">
          <div className="animate-marquee gap-4 flex py-1">
            {[...techStack, ...techStack].map((tech, i) => {
              const Icon = tech.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 px-4 sm:px-5 py-2.5 rounded-2xl bg-zinc-900/70 border border-white/10 hover:border-horizon-amber/50 hover:bg-white/[0.08] hover:shadow-lg hover:shadow-orange-500/10 backdrop-blur-xl transition-all duration-300 group shrink-0 cursor-default"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg transition-transform group-hover:scale-110 shrink-0">
                    <Icon style={{ color: tech.color }} />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs sm:text-sm font-bold text-white group-hover:text-horizon-amber transition-colors whitespace-nowrap">
                      {tech.name}
                    </span>
                    <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider whitespace-nowrap">
                      {tech.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      <Chatbot />
    </section>
  );
}